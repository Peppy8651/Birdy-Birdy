const Discord = require('discord.js');

module.exports = {
	name: 'turkeystats',
	description: 'turkeystats command',
	async execute(message, servers) {
		const server = servers.find(s => s.id == message.guild.id);
		if (server.turkeyfight.playing != true) return message.channel.send('There isn\'t anyone playing Turkey Fight in this server...');
		const embed = new Discord.MessageEmbed()
			.setTitle('Current Turkey Fight Game')
			.setThumbnail(message.guild.iconURL())
			.setColor('BLUE')
			.addFields(
				{ name: 'Players', value: `${server.turkeyfight.playersconstant[0].player}
${server.turkeyfight.playersconstant[1].player}`, inline: true },
				{ name: 'Health Stats', value: `${server.turkeyfight.players[0].player}: ${server.turkeyfight.players[0].health}
${server.turkeyfight.players[1].player}: ${server.turkeyfight.players[1].health}`, inline: true },
				{ name: 'Current Turn', value: server.turkeyfight.turn, inline: true },
			)
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed);
	},
};