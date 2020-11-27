const Discord = require('discord.js');
const fetch = require('node-fetch');
const { globalPrefix } = require('../config.json');
module.exports = {
	name: 'dog',
	description: 'dog command',
	async execute(message) {
		const args = message.content.slice(globalPrefix.length).trim().split(/ +/);
		const command = args.shift().toLowerCase();
		if (command === 'dog') {
			// eslint-disable-next-line no-shadow
			const { url } = await fetch('https://random.dog/woof.json').then(response => response.json());
			const embed = new Discord.MessageEmbed()
				.setTitle('**Dog Pic**')
				.setColor(0xFFC0CB)
				.setImage(`${url}`)
				.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
				.setTimestamp();
			message.channel.send(embed);
		}
	},
};