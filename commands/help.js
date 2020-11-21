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
				{ name: 'Fun Commands', value: 'cat, cursed, dog, greg, meme, singlememe, picmeme, rr, sprite, 1-10, turkeyfight, trickortreat, 8ball' },
				{ name: 'Info Commands', value: 'about, changelog, help, info, steamgame, steamuser, urban' },
				{ name: 'Miscellaneous Commands', value: 'delete, fortune, function, kick, log, ping, snipe, suggest, timer, invite' },
				{ name: 'Music Commands', value: 'add, clear, cut, disconnect, loop, np, play, stop, pause, queue, skip' },
			)
			.setFooter(`Command used by ${ message.author.tag }`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed);
	},
};