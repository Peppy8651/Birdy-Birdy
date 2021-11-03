const Discord = require('discord.js');
module.exports = {
	name: 'queue',
	description: 'queue command',
	async execute(message, server, playingMap) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this outside a voice channel.');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('Doesn\'t look like there is anything playing in this server.');
		if (message.member.voice.channelId != message.guild.me.voice.channelId) return message.channel.send('Sorry, nothing is playing in this channel.');
		switch (server.queue.length) {
		case 0:
			message.channel.send('Doesn\'t look like there is anything in the queue.');
			break;
		default:
			// eslint-disable-next-line no-case-declarations
			const URLtitles = [];
			for(let i = 0; i < server.queue.length; i++) {
				const queueNumber = i + 1;
				URLtitles.push(`${queueNumber}. **[${server.queue[i].title}](${server.queue[i].url})**: ${server.queue[i].duration}`);
			}
			// eslint-disable-next-line no-case-declarations
			let stringshit = '';
			for (let i = 0; i < URLtitles.length; i++) {
				let moreshit;
				if (i == 0) {
					moreshit = URLtitles[i];
				}
				else {
					moreshit = '\n' + URLtitles[i];
				}
				stringshit = stringshit + moreshit;
			}
			// eslint-disable-next-line no-case-declarations
			const embed = new Discord.MessageEmbed()
				.setTitle(`Current Queue [${server.queue.length}]`)
				.setColor(0xFF0000)
				.setDescription(stringshit)
				.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
				.setTimestamp();
			message.channel.send({ embeds: [embed] }).catch(() => message.channel.send('Sorry, couldn\'t send the embed.'));
			break;
		}
	},
};