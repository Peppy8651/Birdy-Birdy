const Discord = require('discord.js');

module.exports = {
	name: 'fortune',
	description: 'fortune command',
	async execute(message, client) {
		const f = require('./fortunes.json');
		const fortune = f.fortunes[Math.floor(Math.random() * f.fortunes.length)];
		const embed = new Discord.MessageEmbed()
			.setTitle('Fortune Cookie')
			.setColor('RANDOM')
			.setThumbnail(client.user.displayAvatarURL())
			.setDescription('Follow this wisdom and let it improve who you are unless it states you don\'t need improvement.')
			.addFields(
				{ name: 'Your Fortune', value: fortune },
			)
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed);
	},
};