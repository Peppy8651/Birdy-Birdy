// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
module.exports = {
	name: 'steamuser',
	description: 'steam command lololol',
	async execute(message, steam) {
		const command = ('>steamuser ');
		const args = message.content.slice(command.length).trim().split(/ -/);
		const query = args.join(' ');
		if (!query) return message.channel.send('Keep searching boys! We gotta find those arguments!');
		steam.resolve(`https://steamcommunity.com/id/${query}`).then(id => {
			// eslint-disable-next-line no-unused-vars
			steam.getUserSummary(id).then(summary => {
				steam.getUserLevel(id).then(level => {
					if (summary.personaState == 1) {
						const embed = new Discord.MessageEmbed()
							.setAuthor('Steam')
							.setTitle(summary.nickname)
							.setColor(0x2a475e)
							.addFields(
								{ name: 'Presence', value: 'Online', inline: true },
								{ name: 'Steam ID', value: `[${summary.steamID}](https://steamcommunity.com/profiles/${summary.steamID})`, inline: true },
								{ name: 'Level', value: level, inline: true },
							)
							.setThumbnail(summary.avatar.large);
						message.channel.send(embed);
					}
					else if (summary.personaState === 0) {
						const embed = new Discord.MessageEmbed()
							.setAuthor('Steam')
							.setTitle(summary.nickname)
							.setColor(0x2a475e)
							.addFields(
								{ name: 'Presence', value: 'Offline', inline: true },
								{ name: 'Steam ID', value: `[${summary.steamID}](https://steamcommunity.com/profiles/${summary.steamID})`, inline: true },
								{ name: 'Level', value: level, inline: true },
							)
							.setThumbnail(summary.avatar.large)
							.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
							.setTimestamp();
						message.channel.send(embed);
					}
					else {
						const embed = new Discord.MessageEmbed()
							.setAuthor('Steam')
							.setTitle(summary.nickname)
							.setColor(0x2a475e)
							.addFields(
								{ name: 'Steam ID', value: `[${summary.steamID}](https://steamcommunity.com/profiles/${summary.steamID})`, inline: true },
								{ name: 'Level', value: level, inline: true },
							)
							.setThumbnail(summary.avatar.large);
						message.channel.send(embed);
					}
				});
			});
		// eslint-disable-next-line no-unused-vars
		}).catch(e => {
			message.channel.send('There was a problem doing that. Either you entered a nonexistant user or the Steam API had a problem inputting your username or ID into the profile data.');
		});
	},
};