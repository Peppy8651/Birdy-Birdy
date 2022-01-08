const PEPPY_ID = '490548233601417223';
const Discord = require('discord.js');
module.exports = {
	name: 'suggest',
	description: 'suggest command',
	async execute(message, client) {
		const Peppy = `<@${PEPPY_ID}>`;
		const embed = new Discord.MessageEmbed()
			.setTitle('Suggesting')
			.setThumbnail(client.user.displayAvatarURL())
			.setColor(0x00FF00)
			.setDescription('Have a suggestion? DM my owner on Discord or make an issue with your suggestion on the Github Repository! He is usually open to suggestions since he always needs new ideas for Birdy Birdy!')
			.addFields(
				{ name: 'Discord', value: Peppy, inline: true },
				{ name: 'Github', value: '[Birdy\'s Repo](https://github.com/Peppy8651/Birdy-Birdy/issues/)', inline: true },
			)
			.setFooter({ text: `Command used by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
			.setTimestamp();
		message.channel.send({ embeds: [embed] });
	},
};