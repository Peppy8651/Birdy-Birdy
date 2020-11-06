// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');

module.exports = {
	name: 'trickortreat',
	description: 'trickortreat command for October',
	async execute(message) {
		const answers = ['trick', 'treat'];
		const filter = response => {
			return answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
		};
		message.channel.send('You hear knocking on the door. You assume it\'s the trick-or-treaters. You head to the door. Trick or treat?').then(() => {
			message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time', 'incorrect'] })
				.then(collected => {
					if (collected.first().content.toLowerCase() === 'trick') {
						const trickevents = ['You go inside to "grab a treat." You go inside your closet, grab your very scary Chucky mask, and put it on. You scream loudly to alert the children outside. You then run to the door and scream at the children. They get scared and run away.', 'Inside a candy wrapper you put a piece of poo. You then put that inside the kid\'s candy baskets. They\'ll be in for a surprise.', `You tell the children to wait since you're grabbing candy. You never come back as the children tell you, "${message.member.nickname}, are you gonna give us our candy?" How mean.`, 'You let the children inside since your candy is in the basement. It actually is, so I won\'t put quotes. You lead the children into the basement, they go first. Once they\'re all in, you close and lock the door. This isn\'t even a trick. What the actual hell is wrong with you?', 'When you open the door, you tell the children to leave. They don\'t go away so you tell them a scary story about your house and ghosts. They leave out of fear. When you\'re asleep, they come back with weapons. You hear them come in so you wake up. Since you\'re tired, you moan and groan a bit. The children think there\'s a ghost. They use their weapons and destroy lots of things in the house. Talk about backfiring.', 'You play spooky music to scare off the trick-or-treaters. Unfortunately, they\'re teenagers. They don\'t get scared but run off without candy. Don\'t ask me why they want candy. Every day after Halloween they come back to harass you and every night they toilet-paper your house. You call the police but they can\'t find the teenagers. You get frustrated when everyday you have to go through the same thing without anyone to help you.', 'You open the door to trick them, but wait what? There isn\'t anyone outside. You look everywhere but just can\'t find them. You give up and go back inside.'];
						const trick = trickevents[Math.floor(Math.random() * trickevents.length)];
						message.channel.send(trick);
					}
					else if (collected.first().content.toLowerCase() === 'treat') {
						const treatevents = ['You open the door and see that the trick-or-treaters are teenagers. You don\'t give them candy and lecture them about that they shouldn\'t be trick-or-treating because of their age. They get pissed off and leave. You\'re a dick. Next time give them the candy ffs.', 'You hand 2 small M&Ms packs to each child. They thank you for giving them candy and leave.', 'Since you\'re so rich, you hand each children one whole bag filled with Snickers and other treats inside. The kids thank you very much for your kindness and leave gracefully. Hopefully they don\'t eat it all at once.', 'You start to put a pack of raisins and an apple inside each of their baskets but they see them and just walk away. You shout at them for being so ungrateful but by the time you finish they\'re at the next block. Bruh maybe you should look at the mirror next time you decide to give them non-treats.', 'You hand each of them just one lollipop. They just shrug and leave after putting their lollipops in their baskets.', 'You come up with a stunt and make a slingshot to throw candy at the kids. When the first group of kids arrive, you sling a bunch of candy at them and their parents. They leave immediately as one kid starts to cry. You\'re definitely gonna have a talk with the police for this one.', 'For this Halloween, you decide to just leave all the candy in a basket outside. 30 minutes after trick-or-treating starts, the whole basket is empty. Those little fuckers took it all!'];
						const treat = treatevents[Math.floor(Math.random() * treatevents.length)];
						message.channel.send(treat);
					}
				})
				// eslint-disable-next-line no-unused-vars
				.catch(collected => {
					message.channel.send('Alright I guess you don\'t open the door.');
				});
		}).catch(() => {
			message.channel.send('There was a problem doing that. Please try again.');
		});
	},
};