const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'help command',
	async execute(message, client, globalPrefix) {
		const embed = new Discord.MessageEmbed()
			.setTitle('**Commands**')
			.setThumbnail(client.user.displayAvatarURL())
			.setColor(0x00FF00)
			.setDescription(`**Prefix**: ${globalPrefix}. If you need help with the usage of a command use ${globalPrefix}help define <command>.`)
			.addFields(
				{ name: 'Fun Commands', value: 'bonk, cat, cursed, dog, greg, giveaway, meme, singlememe, picmeme, rr, sprite, 1-10, turkeyfight, trickortreat, 8ball, dance' },
				{ name: 'Info Commands', value: 'about, changelog, help, steamgame, steamuser, urban' },
				{ name: 'Miscellaneous Commands', value: 'delete, fortune, function, kick, log, ping, suggest, timer, reload' },
				{ name: 'Music Commands', value: 'add, clear, cut, disconnect, loop, np, play, stop, pause, queue, skip, search, resume, forcedisconnect' },
			)
			.setFooter({ text: `Command used by ${ message.author.tag }`, iconURL: message.author.displayAvatarURL() })
			.setTimestamp();
		message.channel.send({ embeds: [embed] });
	},
};