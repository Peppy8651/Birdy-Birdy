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
		const args = message.content.toLowerCase().slice(command.length).trim().split(/ -/);
		const request = args.join(' ');
		if (!request) return message.reply('you need to type a request in order to hear my wisdom.');
		const responses = [
			'From my point of view, yes.',
			'Feeling lazy so ask again later.',
			'Now is not the best time to tell you that.',
			'Unfortunately, I\'m too dumb to predict anything right now.',
			`Concentrate, ${message.member.nickname}. Do that and ask again.`,
			`Don't count on anything in your mind right now, ${message.member.nickname}. Not even me.`,
			'It is certain yet it is certain at the same time. Someone has wasted their time coding this command.',
			'It is decidedly so. This is probably one of the most unoriginal responses you\'ll get by using this command.',
			'Most likely.',
			'My most likely honest reply is no.',
			'My unknowingly nonexistant sources say no.',
			'Sheesh. This outlook is pretty bad tbh. What have you been doing all this time to earn this?',
			`Yea, this outlook seems pretty good. Good job ${message.member.nickname}!`,
			'Bruh your request is so vague and hazy that if it was a Youtube video it would be less than a second long. Try again for Pete\'s sake.',
			'Signs point to yes.',
			`Yea this is pretty doubtful ngl. ${message.member.nickname} sus as hell rn.`,
			`Without a doubt, ${message.member.nickname}. There is so little doubt here that if it was a Sci-Fi movie it would be considered a documentary.`,
			`Yes, ${message.member.nickname}. Yes it is.`,
			`Yes. Definitely. Absolutely. Without a single doubt in my mind, ${message.member.nickname}.`,
			'You can definitely rely on it. That\'s for sure.',
		];
		const eightball = responses[Math.floor(Math.random() * responses.length)];
		message.reply(`
Your request: **${request}**,
My answer: **${eightball}**`);
	},
};