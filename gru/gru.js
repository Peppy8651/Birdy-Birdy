/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('>help', {
		type: 'LISTENING',
		name: '>help',
	});
});

client.login('NzU2MTQ4NjMwNTc4MTM1MTgy.X2NoSg.SqcWTpQoxlWkghTKtuTTztNGj40');

const prefix = '>';
client.on('message', message => {
	if(message.content.toLowerCase().startsWith(prefix + 'gru')) {
		const embed = new Discord.MessageEmbed()
			.setTitle('**Start**')
			.setColor(0x6a0dad)
			.setDescription(`You wake up in a dimly lit room. There are 4 things that are close enough for you to see. Find the right one.
								 
A. A can of beans. Who would use this?
								
B. A flashlight. Does it have a long-lasting battery inside it?
								
C. A lever. Wonder what this one does?
								
D. A piece of paper. It's too dark to read the writing on it, but there seems to be a lot of it.`)
			.setFooter('Start');
		message.channel.send(embed);
		const gruquiz = require('./gru.json');
		const item = gruquiz[Math.floor(Math.random() * gruquiz.length)];
		const filter = response => {
			return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
		};

		message.channel.send(item.question).then(() => {
			message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
				.then(collected => {
					if(collected.first().content === 'A') {
						message.client.user.lastMessage.delete();
						embed
							.setTitle('**Can of Beans**')
							.setColor(0x6a0dad)
							.setDescription(`You pick up the can of beans. You hear something opening. You look to the left and see a hole. Should you enter it or stay in the room and explore?
	
1. Enter the hole.
									
2. Stay in the room.`);
						message.channel.send(embed);
						const gruA1quiz = require('./gru2.json');
						const itemA1 = gruA1quiz[Math.floor(Math.random() * gruA1quiz.length)];
						const filterA1 = response => {
							return itemA1.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
						};

						message.channel.send(itemA1.question).then(() => {
							message.channel.awaitMessages(filterA1, { max: 1, time: 10000, errors: ['time'] })
								// eslint-disable-next-line no-shadow
								.then(collected => {
									if(collected.first().content === '1') {
										message.client.user.lastMessage.delete();
										embed
											.setTitle('**Enter**')
											.setColor(0x6a0dad)
											.setDescription(`You enter the hole. Inside is a factory filled with minions. You find blood spattered everywhere and decomposed bodies. You see one body. It looks like whoever was the body was abused harshly. You go to the working minions. Their expressions are chilling, as if they are traumatised and depressed at the same time. You notice a door oddly placed in the middle of a wall. The minions notice you looking at it, and in Minionese say, "Don't go, please. Nobody who goes comes back." Should you keep going or keep trying to find more information?

A. Open the door and go inside.

B. Search for more info.`);
										message.channel.send(embed);
									}
									else if (collected.first().content === '2') {
										message.client.user.lastMessage.delete();
										embed
											.setTitle('**Stay**')
											.setColor(0x6a0dad)
											.setDescription(`You decide to stay and keep looking. Suddenly, you hear a door creaking. Your instincts tell you to hide somewhere. There are two places where you can hide, an open cabinet, and a vent. Where do you hide?
											
A. Hide in the cabinet.

B. Hide in the vent.`);
										message.channel.send(embed);
									}
								})
								// eslint-disable-next-line no-shadow
								.catch(collected => {
									embed
										.setTitle('**Failure**')
										.setColor(0xFF0000)
										.setDescription(`Unfortunately, you chose the wrong answer or did not respond correctly. You get sad over your wrong choice until you hear a door creaking. You look behind and you see this.

**GAME OVER**`)
										.setFooter('Failure')
										.setImage('https://i.redd.it/jm02r71xhfv11.jpg');
									message.channel.send(embed);
								});
						});
					}
					else if(collected.first().content === 'B') {
						message.client.user.lastMessage.delete();
						embed
							.setTitle('**Flashlight**')
							.setColor(0xFF0000)
							.setDescription(`You pick up the flashlight. You turn it on. It works! Unfortunately, the light is very dim. The battery goes out quickly. You look around for a new battery. Suddenly, the door creaks. You turn around and see him.
						
**GAME OVER**`)
							.setImage('https://i.redd.it/jm02r71xhfv11.jpg');
						message.channel.send(embed);
					}
					else if(collected.first().content === 'C') {
						message.client.user.lastMessage.delete();
						embed
							.setTitle('**Lever**')
							.setColor(0x6a0dad)
							.setDescription(`You go to the lever and switch it. Nothing happens. Seriously? Then what is this lever for anyway!? You go back to your three other choices.

E. A can of beans. Who would use this?

F. A flashlight. Does it have a long-lasting battery inside it?

G. A piece of paper. It's too dark to read the writing on it, but there seems to be a lot of it.`);
						message.channel.send(embed);
						// eslint-disable-next-line no-shadow
						const gruquiz1 = require('./gru1.json');
						const item1 = gruquiz1[Math.floor(Math.random() * gruquiz1.length)];
						const filter1 = response => {
							return item1.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
						};
						message.channel.send(item1.question).then(() => {
							message.channel.awaitMessages(filter1, { max: 1, time: 10000, errors: ['time'] })
								// eslint-disable-next-line no-shadow
								.then(collected => {
									if(collected.first().content === 'E') {
										message.client.user.lastMessage.delete();
										embed
											.setTitle('**Can of Beans**')
											.setColor(0x6a0dad)
											.setDescription(`You pick up the can of beans. You hear something opening. You look to the left and see a hole. Should you enter it or stay in the room and explore? Unfortunately, now you only have 5 seconds to choose an answer since you wasted time.
					
1. Enter the hole.
													
2. Stay in the room.`);
										message.channel.send(embed);
										const gruA1quiz = require('./gru2.json');
										const itemA1 = gruA1quiz[Math.floor(Math.random() * gruA1quiz.length)];
										const filterA1 = response => {
											return itemA1.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
										};

										message.channel.send(itemA1.question).then(() => {
											message.channel.awaitMessages(filterA1, { max: 1, time: 10000, errors: ['time'] })
												// eslint-disable-next-line no-shadow
												.then(collected => {
													if(collected.first().content === '1') {
														message.client.user.lastMessage.delete();
														embed
															.setTitle('**Enter**')
															.setColor(0x6a0dad)
															.setDescription(`You enter the hole. Inside is a factory filled with minions. You find blood spattered everywhere and decomposed bodies. You see one body. It looks like whoever was the body was abused harshly. You go to the working minions. Their expressions are chilling, as if they are traumatised and depressed at the same time. You notice a door oddly placed in the middle of a wall. The minions notice you looking at it, and in Minionese say, "Don't go, please. Nobody who goes comes back." Should you keep going or keep trying to find more information?
				
A. Open the door and go inside.
				
B. Search for more info.`);
														message.channel.send(embed);
													}
													else if (collected.first().content === '2') {
														message.client.user.lastMessage.delete();
														embed
															.setTitle('**Stay**')
															.setColor(0x6a0dad)
															.setDescription(`You decide to stay and keep looking. Suddenly, you hear a door creaking. Your instincts tell you to hide somewhere. There are two places where you can hide, an open cabinet, and a vent. Where do you hide?
															
A. Hide in the cabinet.
				
B. Hide in the vent.`);
														message.channel.send(embed);
													}
												})
												// eslint-disable-next-line no-shadow
												.catch(collected => {
													embed
														.setTitle('**Failure**')
														.setColor(0xFF0000)
														.setDescription(`Unfortunately, you chose the wrong answer or did not respond correctly. You get sad over your wrong choice until you hear a door creaking. You look behind and you see this.

**GAME OVER**`)
														.setFooter('Failure')
														.setImage('https://i.redd.it/jm02r71xhfv11.jpg');
													message.channel.send(embed);
												});
										});
									}
									else if(collected.first().content === 'F') {
										message.client.user.lastMessage.delete();
										embed
											.setTitle('**Flashlight**')
											.setColor(0xFF0000)
											.setDescription(`You pick up the flashlight. You turn it on. It works! Unfortunately, the light is very dim. The battery goes out quickly. You look around for a new battery. Suddenly, the door creaks. You turn around and see him.
										
**GAME OVER**`)
											.setImage('https://i.redd.it/jm02r71xhfv11.jpg');
										message.channel.send(embed);
									}
									else if (collected.first().content === 'G') {
										message.client.user.lastMessage.delete();
										embed
											.setTitle('**Piece of Paper**')
											.setColor(0xFF0000)
											.setDescription(`You read the piece of paper. It is still too dark to read even a single word. You decide to pick up the flashlight. The light is dim, the battery will probably die out soon. You light it over the paper. Apparently, it is mostly gibberish expect for one word. "RUN." This frightens you, so you turn around. Suddenly, you see this.
											
*GAME OVER**`)
											.setImage('https://i.redd.it/jm02r71xhfv11.jpg');
										message.channel.send(embed);
									}
								})
								// eslint-disable-next-line no-unused-vars
								.catch(collected1 => {
									embed
										.setTitle('**Failure**')
										.setColor(0xFF0000)
										.setDescription(`Unfortunately, you chose the wrong answer or did not respond correctly. You get sad over your wrong choice until you hear a door creaking. You look behind and you see this.

**GAME OVER**`)
										.setFooter('Failure')
										.setImage('https://i.redd.it/jm02r71xhfv11.jpg');
									message.channel.send(embed);
								});
						});
					}
					else if (collected.first().content === 'D') {
						message.client.user.lastMessage.delete();
						embed
							.setTitle('**Piece of Paper**')
							.setColor(0xFF0000)
							.setDescription(`You read the piece of paper. It is still too dark to read even a single word. You decide to pick up the flashlight. The light is dim, the battery will probably die out soon. You light it over the paper. Apparently, it is mostly gibberish expect for one word. "RUN." This frightens you, so you turn around. Suddenly, you see this.
							
							**GAME OVER**`)
							.setImage('https://i.redd.it/jm02r71xhfv11.jpg');
						message.channel.send(embed);
					}
				})
				// eslint-disable-next-line no-unused-vars
				.catch(collected => {
					embed
						.setTitle('**Failure**')
						.setColor(0xFF0000)
						.setDescription(`Unfortunately, you chose the wrong answer or did not respond correctly. You get sad over your wrong choice until you hear a door creaking. You look behind and you see this.

**GAME OVER**`)
						.setFooter('Failure')
						.setImage('https://i.redd.it/jm02r71xhfv11.jpg');
					message.channel.send(embed);
				},
				);
		});
	}
});