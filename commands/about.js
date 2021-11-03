const Discord = require('discord.js');
const { version, globalPrefix } = require('../config.json');
const PEPPY_ID = '490548233601417223';
module.exports = {
	name: 'about',
	description: 'about command',
	execute(message, client) {
		const embed = new Discord.MessageEmbed()
			.setTitle('**About Birdy Birdy**')
			.setColor(0x00ff00)
			.setThumbnail(client.user.displayAvatarURL());
		embed.addFields(
			{ name: 'Details', value: `**Prefix**: ${globalPrefix}
**Servers**: ${client.guilds.cache.size}
**Version**: ${version}	
**Tag**: ${client.user.tag}
**ID**: ${client.user.id}
**Discord Library**: discord.js
**Creator/Owner**: <@${PEPPY_ID}>

Any suggestions or feedback? Message my owner!` });
		embed.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL());
		message.channel.send({ embeds: [embed] });
	},
};