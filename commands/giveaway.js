/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable no-inner-declarations */
/* eslint-disable max-nested-callbacks */
const Discord = require('discord.js');

module.exports = {
	name: 'giveaway',
	description: 'giveaway command for Birdy Birdy',
	async execute(message, server) {
		let embed = new Discord.MessageEmbed()
			.setTitle('New Giveaway')
			.setColor('BLUE')
			.setDescription('After this message, add a channel for me to use so then we can start the giveaway creation process. If you want to cancel, you type `cancel` anytime during the giveaway creation process to cancel it.')
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
			// Taken from https://media.hearthpwn.com/attachments/96/923/tadapopper.png
		const attach = new Discord.MessageAttachment('https://media.hearthpwn.com/attachments/96/923/tadapopper.png', 'tada.png');
		embed.setThumbnail(attach.attachment);
		const users = [`${message.author.id}`];
		const filter = response => {
			return users.some(a => a.toLowerCase() == response.author.id);
		};
		message.channel.send(embed).then(() => {
			message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] })
				.then(collected => {
					if (collected.first().content.toLowerCase() == 'cancel') return message.channel.send('Okay, cancelling giveaway creation process.');
					const channel = collected.first().mentions.channels.first() || message.guild.channels.cache.find(c => c.name == `${collected.first().content.toLowerCase()}`) || message.guild.channels.cache.get(collected.first().content.toLowerCase());
					if (!channel) return message.channel.send('This isn\'t a channel... I will have to cancel the giveaway creation process. Next time remember that you have to ping a channel, put the channel name in your content, or add the channel ID in your content.');
					embed.setDescription('Now that you have added a channel, add what the prize is below this message.');
					embed.addField('Channel', channel, true);
					message.channel.send(embed).then(() => {
						message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] })
							.then(collecte => {
								if (collecte.first().content.toLowerCase() == 'cancel') return message.channel.send('Okay, cancelling giveaway creation process.');
								const prize = collecte.first().content;
								embed.setDescription('You have added a prize, so now let\'s start getting complicated. First of all, choose the type of time you want to use. Options are minutes and seconds.');
								embed.addField('Prize', prize, true);
								const answers = ['seconds', 'minutes', 'cancel'];
								const newfilter = response => {
									return answers.some(n => n.toLowerCase() == response.content.toLowerCase()) && users.some(a => a.toLowerCase() == response.author.id);
								};
								message.channel.send(embed).then(() => {
									message.channel.awaitMessages(newfilter, { max: 1, time: 20000, errors: ['time'] })
										.then(collect => {
											if (collect.first().content.toLowerCase() == 'cancel') return message.channel.send('Okay, cancelling giveaway creation process.');
											const timetype = collect.first().content.toLowerCase();
											embed.setDescription(`Good. Now that you have chosen your time type as ${timetype}, we can choose how much time you want. The maximum time for minutes and seconds is 60.`);
											message.channel.send(embed).then(() => {
												let ans = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', 'cancel'];
												const newerfilter = response => {
													return ans.some(n => n.toLowerCase() == response.content.toLowerCase()) && users.some(a => a.toLowerCase() == response.author.id);
												};
												message.channel.awaitMessages(newerfilter, { max: 1, time: 20000, errors: ['time'] })
													.then(collec => {
														if (collec.first().content.toLowerCase() == 'cancel') return message.channel.send('Okay, cancelling giveaway creation process.');
														const timenum = collec.first().content.toLowerCase();
														embed.setDescription('Now that you have set your time, we can begin the giveaway. For now, let me remind you that if the bot goes down, your giveaway will stop.');
														const tt = timetype == 'minutes' ? 'minute(s)' : 'second(s)';
														embed.addField('Time', `${timenum} ${tt}`, true);
														message.channel.send(embed);
														let time = parseInt(timenum);
														let t;
														if (timetype == 'seconds') {
															function SecondsToMilliseconds(d) {
																d = Number(d);
																let tnum = Math.floor(d * 1000);
																return tnum;
															}
															t = SecondsToMilliseconds(time);
														}
														else if (timetype == 'minutes') {
															function MinutesToMilliseconds(d) {
																d = Number(d);
																let tnum = Math.floor(d * 60000);
																return tnum;
															}
															t = MinutesToMilliseconds(time);
														}
														setTimeout(async () => {
															let em = new Discord.MessageEmbed();
															em.setTitle('Giveaway');
															em.setThumbnail(attach.attachment);
															em.setColor('BLUE');
															em.setDescription(`${message.author} has created a giveaway. React with 🎉 to enter!`);
															em.addFields(
																{ name: 'Prize', value: prize, inline: true },
																{ name: 'Time', value: `${timenum} ${tt}`, inline: true },
															);
															em.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL());
															em.setTimestamp();
															const msg = await channel.send(em);
															msg.react('🎉');
															const giveaway = {
																author: message.author,
																member: message.member,
																channel: channel,
																prize: prize,
																time: `${timenum} ${tt}`,
																timetype: timetype,
																timenum: timenum,
																msgID: msg.id,
																users: [],
															};
															server.giveaways.push(giveaway);
															setTimeout(async () => {
																const emb = new Discord.MessageEmbed();
																let index;
																for (var i = 0; i < server.giveaways.length; i++) {
																	if (server.giveaways[i].msgID == msg.id) {
																		index = i;
																	}
																}
																if (server.giveaways[index].users.length == 0) {
																	channel.send('Huh, it looks like nobody entered the giveaway. Well, I guess nobody wanted the prize.');
																	return server.giveaways.splice(index, 1);
																}
																else {
																	emb.setTitle(`${server.giveaways[index].member.displayName}'s giveaway`);
																	const winnerid = server.giveaways[index].users[Math.floor(Math.random() * server.giveaways[index].users.length)];
																	const winner = message.guild.members.cache.get(winnerid);
																	emb.setDescription(`${winner} won the giveaway in ${server.giveaways[index].channel.guild.name}! As their prize, they get ${server.giveaways[index].prize}! For everyone else, good luck next time!`);
																	emb.setFooter(`Giveaway created by ${message.author.tag}`, message.author.displayAvatarURL());
																	emb.setTimestamp();
																	emb.setColor('BLUE');
																	emb.setThumbnail(attach.attachment);
																	const hyperlink = `[Click here](https://discord.com/channels/${server.giveaways[index].channel.guild.id}/${server.giveaways[index].channel.id}/${server.giveaways[index].msgID})`;
																	emb.addFields(
																		{ name: 'Participants', value: server.giveaways[index].users.length, inline: true },
																		{ name: 'Prize', value: server.giveaways[index].prize, inline: true },
																		{ name: 'Giveaway Message', value: `${hyperlink}`, inline: true },
																	);
																	channel.send(emb);
																	for (var e = 0; e < server.giveaways[index].users.length; e++) {
																		const memberid = server.giveaways[index].users[e];
																		const member = message.guild.members.cache.get(memberid);
																		member.user.send(emb);
																	}
																	return server.giveaways.splice(index, 1);
																}
															}, t);
														}, 5000);
													})
													.catch(() => {
														message.channel.send('You did not choose a number in time so I will cancel the giveaway creation process.');
													});
											});
										})
										.catch(() => {
											message.channel.send('You did not add a time type so I have to cancel the giveaway creation process.');
										});
								});
							})
							.catch(() => {
								message.channel.send('You didn\'t add a prize in time so I have to cancel the giveaway creation process.');
							});
					});
				})
				.catch(() => {
					message.channel.send('You didn\'t ping a channel so I have to cancel the giveaway creation process.');
				});
		});
	},
};