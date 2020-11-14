/* eslint-disable indent */
// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
const { globalPrefix } = require('../config.json');

module.exports = {
	name: '8ball',
	description: '8ball command hear Birdy\'s wisdom',
	async execute(message) {
		let command;
		if (message.content.toLowerCase().startsWith(globalPrefix + '8ball')) {
			command = '>8ball ';
		}
		else if (message.content.toLowerCase().startsWith(globalPrefix + 'eightball')) {
			command = '>eightball ';
		}
		const args = message.content.slice(command.length).trim().split(/ -/);
		const request = args.join(' ');
		if (request.length > 1024) return message.channel.send('I can\'t give you my wisdom since your request is too long. Make it shorter.');
		const authorname = message.member.nickname || message.author.username;
		if (!request) return message.reply('you need to type a request in order to hear my wisdom.');
		const responses = [
			'From my point of view, yes.',
			'Feeling lazy so ask again later.',
			'Now is not the best time to tell you that.',
			'Unfortunately, I\'m too dumb to predict anything right now.',
			`Concentrate, ${authorname}. Do that and ask again.`,
			`Don't count on anything in your mind right now, ${authorname}. Not even me.`,
			'It is certain yet it is certain at the same time. Someone has wasted their time coding this command.',
			'It is decidedly so. This is probably one of the most unoriginal responses you\'ll get by using this command.',
			'Most likely.',
			'My most likely honest reply is no.',
			'My unknowingly nonexistant sources say no.',
			'Sheesh. This outlook is pretty bad tbh. What have you been doing all this time to earn this?',
			`Yea, this outlook seems pretty good. Good job ${authorname}!`,
			'Bruh your request is so vague and hazy that if it was a Youtube video it would be less than a second long. Try again ffs.',
			'Signs point to yes.',
			`Yea this is pretty doubtful ngl. ${authorname} sus as hell rn.`,
			`Without a doubt, ${authorname}. There is so little doubt here that if it was a Sci-Fi movie it would be considered a documentary.`,
			`Yes, ${authorname}. Yes it is.`,
			`Yes. Definitely. Absolutely. Without a single doubt in my mind, ${authorname}.`,
			'You can definitely rely on it. That\'s for sure.',
		];
		const eightball = responses[Math.floor(Math.random() * responses.length)];
		const r = Math.floor(Math.random() * (255 - 0 + 1));
		const g = Math.floor(Math.random() * (255 - 0 + 1));
		const b = Math.floor(Math.random() * (255 - 0 + 1));
		const colors = [[r, g, b], 'RANDOM'];
		const color = colors[Math.floor(Math.random() * colors.length)];
		const embed = new Discord.MessageEmbed()
			.setAuthor(`${authorname}'s 8Ball`, message.author.displayAvatarURL())
			.setColor(color)
			.addFields(
				{ name: 'Your Request', value: request },
				{ name: 'My Answer', value: eightball },
			)
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed);
	},
};