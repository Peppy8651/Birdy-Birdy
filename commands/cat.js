const Discord = require('discord.js');
const { globalPrefix } = require('../config.json');
const fetch = require('node-fetch');
module.exports = {
	name: 'cat',
	description: 'cat command',
	async execute(message) {
		const args = message.content.slice(globalPrefix.length).trim().split(/ +/);
		const command = args.shift().toLowerCase();
		if (command === 'cat') {
			const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
			const embed = new Discord.MessageEmbed()
				.setTitle('**Cat Pic**')
				.setColor(0xFFC0CB)
				.setImage(`${file}`)
				.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
				.setTimestamp();
			message.channel.send(embed);
		}
	},
};