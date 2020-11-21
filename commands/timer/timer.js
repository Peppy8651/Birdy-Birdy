// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');

module.exports = {
	name: 'timer',
	description: 'timer command lololool',
	execute(message) {
		const embed = new Discord.MessageEmbed()
			.setTitle('**New Timer**')
			.setColor(0x00FF00)
			.setDescription(`Please add a message below this embed of how much time you need.

**How to type the amount of time you need**

If you want to type a certain amount of seconds, type **SECONDS**!
If you want to type a certain amount of minutes, type **MINUTES**!
If you want to type a certain amount of hours, type **HOURS**!

After that, you will be asked to type a number, which will be the amount of time until it sends a ping! By default, tts will be on.

***PLEASE REMEMBER THAT YOUR TIMER MIGHT BE STOPPED IF THE BOT GOES OFFLINE!*** 
`)
			.setTimestamp()
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL());
		message.channel.send(embed);
		const timechoose = require('./timetype.json');
		const timechooseitem = timechoose[Math.floor(Math.random() * timechoose.length)];
		const users = [message.author.id];
		const filter = response => {
			return timechooseitem.answers.some(answer => answer.toLowerCase() == response.content.toLowerCase()) && users.some(a => a.toLowerCase() == response.author.id);
		};
		message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
			.then(collected => {
				if(collected.first().content.toLowerCase() == 'hours') {
					const hoursquiz = require('./hours.json');
					const hoursitem = hoursquiz[Math.floor(Math.random() * hoursquiz.length)];
					const hoursfilter = response => {
						return hoursitem.answers.some(answer => answer.toLowerCase() == response.content.toLowerCase()) && users.some(a => a.toLowerCase() == response.author.id);
					};

					message.channel.send(hoursitem.question).then(() => {
						message.channel.awaitMessages(hoursfilter, { max: 1, time: 15000, errors: ['time'] })
							// eslint-disable-next-line no-shadow
							.then(collected => {
								if(collected.first().content === '1') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 3600000);
								}
								else if(collected.first().content === '2') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 7200000);
								}
								else if(collected.first().content === '3') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 10800000);
								}
								else if(collected.first().content === '4') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 14400000);
								}
								else if(collected.first().content === '5') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 18000000);
								}
								else if(collected.first().content === '6') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 21600000);
								}
								else if(collected.first().content === '7') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 25200000);
								}
								else if(collected.first().content === '8') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 28800000);
								}
								else if(collected.first().content === '9') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 32400000);
								}
								else if(collected.first().content === '10') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 36000000);
								}
								else if(collected.first().content === '11') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 39600000);
								}
								else if(collected.first().content === '12') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 43200000);
								}
								else if(collected.first().content === '13') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 46800000);
								}
								else if(collected.first().content === '14') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 50400000);
								}
								else if(collected.first().content === '15') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 54000000);
								}
								else if(collected.first().content === '16') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 61200000);
								}
								else if(collected.first().content === '17') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 61200000);
								}
								else if(collected.first().content === '18') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 64800000);
								}
								else if(collected.first().content === '19') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 68400000);
								}
								else if(collected.first().content === '20') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 72000000);
								}
								else if(collected.first().content === '21') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 75600000);
								}
								else if(collected.first().content === '22') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 79200000);
								}
								else if(collected.first().content === '23') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 82800000);
								}
								else if(collected.first().content === '24') {
									message.channel.send('WOAH WOAH WOAH! You expect me to make a timer for a whole day? Sorry, but for now setting a timer for 23 hours is not supported!');
								}
							})
							// eslint-disable-next-line no-unused-vars
							.catch(collectedA => {
								message.channel.send('Unfortunately, you did not choose your amount of hours in time!');
							});
					});
				}
				else if (collected.first().content.toLowerCase() == 'seconds') {
					const secondsquiz = require('./minutes.json');
					const secondsitem = secondsquiz[Math.floor(Math.random() * secondsquiz.length)];
					const secondsfilter = response => {
						return secondsitem.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase()) && users.some(a => a.toLowerCase() == response.author.id);
					};

					message.channel.send(secondsitem.question).then(() => {
						message.channel.awaitMessages(secondsfilter, { max: 1, time: 15000, errors: ['time'] })
						// eslint-disable-next-line no-shadow
							.then(collected => {
								if(collected.first().content === '1') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 1000);
								}
								else if(collected.first().content === '2') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 2000);
								}
								else if(collected.first().content === '3') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 3000);
								}
								else if(collected.first().content === '4') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 4000);
								}
								else if(collected.first().content === '5') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 5000);
								}
								else if(collected.first().content === '6') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 6000);
								}
								else if(collected.first().content === '7') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 7000);
								}
								else if(collected.first().content === '8') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 8000);
								}
								else if(collected.first().content === '9') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 9000);
								}
								else if(collected.first().content === '10') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 10000);
								}
								else if(collected.first().content === '11') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 11000);
								}
								else if(collected.first().content === '12') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 12000);
								}
								else if(collected.first().content === '13') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 13000);
								}
								else if(collected.first().content === '14') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 14000);
								}
								else if(collected.first().content === '15') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 15000);
								}
								else if(collected.first().content === '16') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 16000);
								}
								else if(collected.first().content === '17') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 17000);
								}
								else if(collected.first().content === '18') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 18000);
								}
								else if(collected.first().content === '19') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 19000);
								}
								else if(collected.first().content === '20') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 20000);
								}
								else if(collected.first().content === '21') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 21000);
								}
								else if(collected.first().content === '22') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 22000);
								}
								else if(collected.first().content === '23') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 23000);
								}
								else if(collected.first().content === '24') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 24000);
								}
								else if(collected.first().content === '25') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 25000);
								}
								else if(collected.first().content === '26') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 26000);
								}
								else if(collected.first().content === '27') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 27000);
								}
								else if(collected.first().content === '28') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 28000);
								}
								else if(collected.first().content === '29') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 29000);
								}
								else if(collected.first().content === '30') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 30000);
								}
								else if(collected.first().content === '31') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 31000);
								}
								else if(collected.first().content === '32') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 32000);
								}
								else if(collected.first().content === '33') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 33000);
								}
								else if(collected.first().content === '34') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 34000);
								}
								else if(collected.first().content === '35') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 35000);
								}
								else if(collected.first().content === '36') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 36000);
								}
								else if(collected.first().content === '37') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 37000);
								}
								else if(collected.first().content === '38') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 38000);
								}
								else if(collected.first().content === '39') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 39000);
								}
								else if(collected.first().content === '40') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 40000);
								}
								else if(collected.first().content === '41') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 41000);
								}
								else if(collected.first().content === '42') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 42000);
								}
								else if(collected.first().content === '43') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 43000);
								}
								else if(collected.first().content === '44') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 44000);
								}
								else if(collected.first().content === '45') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 45000);
								}
								else if(collected.first().content === '46') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 46000);
								}
								else if(collected.first().content === '47') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 47000);
								}
								else if(collected.first().content === '48') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 48000);
								}
								else if(collected.first().content === '49') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 49000);
								}
								else if(collected.first().content === '50') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 50000);
								}
								else if(collected.first().content === '51') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 51000);
								}
								else if(collected.first().content === '52') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 52000);
								}
								else if(collected.first().content === '53') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 53000);
								}
								else if(collected.first().content === '54') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 54000);
								}
								else if(collected.first().content === '55') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 55000);
								}
								else if(collected.first().content === '56') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 56000);
								}
								else if(collected.first().content === '57') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 57000);
								}
								else if(collected.first().content === '58') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 58000);
								}
								else if(collected.first().content === '59') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 59000);
								}
								else if (collected.first().content === '60') {
									message.channel.send('Why didn\'t you just choose the minute type?');
								}
							})
						// eslint-disable-next-line no-unused-vars
							.catch(collectedS1 => {
								message.client.user.lastMessage.delete();
								message.channel.send('Unfortunately, you did not choose your amount of seconds in time!');
							});
					});
				}
				else if(collected.first().content.toLowerCase() == 'minutes') {
					const minutesquiz = require('./minutes.json');
					const minutesitem = minutesquiz[Math.floor(Math.random() * minutesquiz.length)];
					const minutesfilter = response => {
						return minutesitem.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase()) && users.some(a => a.toLowerCase() == response.author.id);
					};

					message.channel.send(minutesitem.question).then(() => {
						message.channel.awaitMessages(minutesfilter, { max: 1, time: 15000, errors: ['time'] })
							// eslint-disable-next-line no-shadow
							.then(collected => {
								if(collected.first().content === '1') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 60000);
								}
								else if(collected.first().content === '2') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 120000);
								}
								else if(collected.first().content === '3') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 180000);
								}
								else if(collected.first().content === '4') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 240000);
								}
								else if(collected.first().content === '5') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 300000);
								}
								else if(collected.first().content === '6') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 360000);
								}
								else if(collected.first().content === '7') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 420000);
								}
								else if(collected.first().content === '8') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 480000);
								}
								else if(collected.first().content === '9') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 540000);
								}
								else if(collected.first().content === '10') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 600000);
								}
								else if(collected.first().content === '11') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 660000);
								}
								else if(collected.first().content === '12') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 720000);
								}
								else if(collected.first().content === '13') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 780000);
								}
								else if(collected.first().content === '14') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 840000);
								}
								else if(collected.first().content === '15') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 900000);
								}
								else if(collected.first().content === '16') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 960000);
								}
								else if(collected.first().content === '17') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 1020000);
								}
								else if(collected.first().content === '18') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 1080000);
								}
								else if(collected.first().content === '19') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 1140000);
								}
								else if(collected.first().content === '20') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 1200000);
								}
								else if(collected.first().content === '21') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 1260000);
								}
								else if(collected.first().content === '22') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 1320000);
								}
								else if(collected.first().content === '23') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 1380000);
								}
								else if(collected.first().content === '24') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 1440000);
								}
								else if(collected.first().content === '25') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 1500000);
								}
								else if(collected.first().content === '26') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 1560000);
								}
								else if(collected.first().content === '27') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 1620000);
								}
								else if(collected.first().content === '28') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 1680000);
								}
								else if(collected.first().content === '29') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 1740000);
								}
								else if(collected.first().content === '30') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 1800000);
								}
								else if(collected.first().content === '31') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 1860000);
								}
								else if(collected.first().content === '32') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 1920000);
								}
								else if(collected.first().content === '33') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 1980000);
								}
								else if(collected.first().content === '34') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 2040000);
								}
								else if(collected.first().content === '35') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 2100000);
								}
								else if(collected.first().content === '36') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 2160000);
								}
								else if(collected.first().content === '37') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 2220000);
								}
								else if(collected.first().content === '38') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 2280000);
								}
								else if(collected.first().content === '39') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 2340000);
								}
								else if(collected.first().content === '40') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 2400000);
								}
								else if(collected.first().content === '41') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 2460000);
								}
								else if(collected.first().content === '42') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 2520000);
								}
								else if(collected.first().content === '43') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 2580000);
								}
								else if(collected.first().content === '44') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 2640000);
								}
								else if(collected.first().content === '45') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 2700000);
								}
								else if(collected.first().content === '46') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 2760000);
								}
								else if(collected.first().content === '47') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 2820000);
								}
								else if(collected.first().content === '48') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 2880000);
								}
								else if(collected.first().content === '49') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 2940000);
								}
								else if(collected.first().content === '50') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 3000000);
								}
								else if(collected.first().content === '51') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 3060000);
								}
								else if(collected.first().content === '52') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 3120000);
								}
								else if(collected.first().content === '53') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 3180000);
								}
								else if(collected.first().content === '54') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 3240000);
								}
								else if(collected.first().content === '55') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 3300000);
								}
								else if(collected.first().content === '56') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 3360000);
								}
								else if(collected.first().content === '57') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 3420000);
								}
								else if(collected.first().content === '58') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 3480000);
								}
								else if(collected.first().content === '59') {
									message.channel.send('Timer set!');
									setTimeout(() => {
										message.channel.send(`${message.author}, time's up!`, {
											tts:true,
										});
									}, 3540000);
								}
								else if (collected.first().content === '60') {
									message.channel.send('Why didn\'t you just choose the hour type?');
								}
							})
							// eslint-disable-next-line no-unused-vars
							.catch(collectedC => {
								message.channel.send('Unfortunately, you did not choose your amount of minutes in time!');
							});
					});
				}
			})
		// eslint-disable-next-line no-unused-vars
			.catch(collected => {
				message.client.user.lastMessage.delete();
				message.channel.send('Unfortunately, you did not choose the type of time in time! Please try again!');
			});
	},
};