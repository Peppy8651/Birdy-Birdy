const Discord = require('discord.js');
module.exports = {
	name: 'np',
	description: 'now playing command',
	async execute(message, server, playingMap) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this command outside of a voice channel!');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('There isn\'t anything playing in this server.');
		if (message.member.voice.channelId != message.guild.me.voice.channelId) return message.channel.send('Doesn\'t look like there is anything playing in this channel.');
		const value = server.loopvalue == true ? server.loopqueue == true ? 'Song & Queue' : 'Song' : server.loopqueue == true ? 'Queue' : 'No' ;
		const embed = new Discord.MessageEmbed()
			.setTitle('**Currently Playing**')
			.setColor(0xFF0000)
			.setThumbnail(server.queue[0].thumbnail)
			.addFields(
				{ name: 'Looping?', value: value, inline: true },
				{ name: 'Duration', value: server.queue[0].duration, inline: true },
				{ name: 'Upload Date', value: server.queue[0].uploadDate, inline: true },
			)
			.setDescription(`**[${server.queue[0].title}](${server.queue[0].url})**: ${server.queue[0].duration} || ${server.queue[0].msgauthor}`)
			.setFooter({ text: `Command used by ${message.author.tag}`, iconURL:  message.author.displayAvatarURL() })
			.setTimestamp();
		message.channel.send({ embeds: [embed] });
	},
};