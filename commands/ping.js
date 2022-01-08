// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'pings someone',
	cooldown: 10,
	async execute(message) {
		const member = message.mentions.members.first();
		if (!member) return message.channel.send('You need to ping a member for this to work, silly!');
		const command = '>ping ';
		const args = message.content.slice(command.length).trim().split(/ +/);
		const boolean = args[1];
		if (boolean == true) {
			message.channel.send(`${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member} ${member}`, {
				tts: true,
			});
		}
		else {
			message.channel.send(`${member} ${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}${member}`, {
				tts: false,
			});
		}
	},
};