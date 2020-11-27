const Discord = require('discord.js');

module.exports = {
	name: 'singlememe',
	description: 'singlememe command',
	async execute(message) {
		const command = ('>singlememe ');
		const args = message.content.slice(command.length).trim().split(/ -/);
		if (!args[0]) return message.channel.send('You need to add an argument for this to work!');
		const embed = new Discord.MessageEmbed()
			.setDescription(`${args[0]}`)
			.setColor(0xFFFF00)
			.setFooter(`Meme by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		const msg = await message.channel.send(embed);
		msg.react('⬆️');
		msg.react('⬇️');
		message.delete();
	},
};