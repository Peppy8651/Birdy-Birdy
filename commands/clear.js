module.exports = {
	name: 'clear',
	description: 'clears the queue',
	async execute(message, server, playingMap) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this command outside of a voice channel!');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('There isn\'t anything playing in this server.');
		if (message.member.voice.channelID != message.guild.me.voice.channelID) return message.channel.send('Doesn\'t look like there is anything playing in this channel.');
		if (!server.queue[0]) return message.channel.send('Doesn\'t seem like there is anything in this server\'s queue.');
		if (!server.queue[1]) return message.channel.send('But what are you trying to clear? Once this song ends the queue will be cleared anyway!');
		server.queue.splice(1, server.queue.length);
		message.channel.send('Cleared queue!');
	},
};