// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');

module.exports = {
	name: 'timer',
	description: 'timer command lololool',
	execute(message, timers) {
		if (timers.has(message.author.id)) return message.channel.send('But you already are either setting up or using a timer!');
		const embed = new Discord.MessageEmbed()
			.setTitle('**New Timer**')
			.setColor(0x00FF00)
			.setDescription(`Please add a message below this embed of how much time you need.

**How to type the amount of time you need**

If you want to type a certain amount of seconds, type **SECONDS**!
If you want to type a certain amount of minutes, type **MINUTES**!
If you want to type a certain amount of hours, type **HOURS**!
If you want to cancel your timer anytime while setting it up, type **CANCEL**!

After that, you will be asked to type a number, which will be the amount of time until it sends a ping! By default, tts will be on. If your status is Do Not Disturb, you should put it to idle or online so then you can see the message I'll send when the time is up!

***PLEASE REMEMBER THAT YOUR TIMER MIGHT BE STOPPED IF THE BOT GOES OFFLINE!***`)
			.setTimestamp()
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL());
		message.channel.send(embed);
		timers.set(message.author.id, message.guild.id);
		const timechoose = require('./timer/timetype.json');
		const timechooseitem = timechoose[Math.floor(Math.random() * timechoose.length)];
		const users = [message.author.id];
		const filter = response => {
			return timechooseitem.answers.some(answer => answer.toLowerCase() == response.content.toLowerCase()) && users.some(a => a.toLowerCase() == response.author.id);
		};
		message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
			.then(collected => {
				if (collected.first().content.toLowerCase() == 'cancel') return message.channel.send('Okay, cancelling timer.') && timers.delete(message.author.id);
				if(collected.first().content.toLowerCase() == 'hours') {
					const hoursquiz = require('./timer/hours.json');
					const hoursitem = hoursquiz[Math.floor(Math.random() * hoursquiz.length)];
					const hoursfilter = response => {
						return hoursitem.answers.some(answer => answer.toLowerCase() == response.content.toLowerCase()) && users.some(a => a.toLowerCase() == response.author.id);
					};

					message.channel.send(hoursitem.question).then(() => {
						message.channel.awaitMessages(hoursfilter, { max: 1, time: 15000, errors: ['time'] })
							// eslint-disable-next-line no-shadow
							.then(collected => {
								if (collected.first().content.toLowerCase() == 'cancel') return message.channel.send('Okay, cancelling timer.') && timers.delete(message.author.id);
								if(collected.first().content === '24') return message.channel.send('WOAH WOAH WOAH! You expect me to make a timer for a whole day? Sorry, but for now setting a timer for 23 hours is not supported!');
								message.channel.send('Timer set!');
								const t = parseInt(collected.first().content);
								const time = t * 3600000;
								setTimeout(() => {
									message.channel.send(`${message.author}, time's up!`).then(() => timers.delete(message.author.id));
									message.author.send(`${message.author}, time's up!`, {
										tts: true,
									}).catch(() => message.channel.send('I couldn\'t send you a DM most likely because you turned them off or something.'));
								}, time);
							})
							// eslint-disable-next-line no-unused-vars
							.catch(collectedA => {
								message.channel.send('Unfortunately, you did not choose your amount of hours in time!');
								timers.delete(message.author.id);
							});
					});
				}
				else if (collected.first().content.toLowerCase() == 'seconds') {
					const secondsquiz = require('./timer/minutes.json');
					const secondsitem = secondsquiz[Math.floor(Math.random() * secondsquiz.length)];
					const secondsfilter = response => {
						return secondsitem.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase()) && users.some(a => a.toLowerCase() == response.author.id);
					};

					message.channel.send(secondsitem.question).then(() => {
						message.channel.awaitMessages(secondsfilter, { max: 1, time: 15000, errors: ['time'] })
						// eslint-disable-next-line no-shadow
							.then(collected => {
								if (collected.first().content.toLowerCase() == 'cancel') return message.channel.send('Okay, cancelling timer.') && timers.delete(message.author.id);
								const t = parseInt(collected.first().content);
								const time = t * 1000;
								message.channel.send('Timer set!');
								setTimeout(() => {
									message.channel.send(`${message.author}, time's up!`).then(() => timers.delete(message.author.id));
									message.author.send(`${message.author}, time's up!`, {
										tts: true,
									}).catch(() => message.channel.send('I couldn\'t send you a DM most likely because you turned them off or something.'));
								}, time);
							})
						// eslint-disable-next-line no-unused-vars
							.catch(collectedS1 => {
								message.client.user.lastMessage.delete();
								message.channel.send('Unfortunately, you did not choose your amount of seconds in time!');
								timers.delete(message.author.id);
							});
					});
				}
				else if(collected.first().content.toLowerCase() == 'minutes') {
					const minutesquiz = require('./timer/minutes.json');
					const minutesitem = minutesquiz[Math.floor(Math.random() * minutesquiz.length)];
					const minutesfilter = response => {
						return minutesitem.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase()) && users.some(a => a.toLowerCase() == response.author.id);
					};

					message.channel.send(minutesitem.question).then(() => {
						message.channel.awaitMessages(minutesfilter, { max: 1, time: 15000, errors: ['time'] })
							// eslint-disable-next-line no-shadow
							.then(collected => {
								if (collected.first().content.toLowerCase() == 'cancel') return message.channel.send('Okay, cancelling timer.') && timers.delete(message.author.id);
								const t = parseInt(collected.first().content);
								const time = t * 60000;
								message.channel.send('Timer set!');
								setTimeout(() => {
									message.channel.send(`${message.author}, time's up!`).then(() => timers.delete(message.author.id));
									message.author.send(`${message.author}, time's up!`, {
										tts: true,
									}).catch(() => message.channel.send('I couldn\'t send you a DM most likely because you turned them off or something.'));
								}, time);
							})
							// eslint-disable-next-line no-unused-vars
							.catch(collectedC => {
								message.channel.send('Unfortunately, you did not choose your amount of minutes in time!');
								timers.delete(message.author.id);
							});
					});
				}
			})
		// eslint-disable-next-line no-unused-vars
			.catch(collected => {
				message.client.user.lastMessage.delete();
				message.channel.send('Unfortunately, you did not choose the type of time in time! Please try again!');
				timers.delete(message.author.id);
			});
	},
};