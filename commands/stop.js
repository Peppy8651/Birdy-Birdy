module.exports = {
	name: 'stop',
	description: 'stops the queue',
	async execute(message, servers, playingMap) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this command outside a voice channel!');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('There isn\'t anything playing in this server.');
		if (message.member.voice.channelID != message.guild.me.voice.channelID) return message.channel.send('Looks like there isn\'t anything playing in this channel.');
		const server = servers[message.guild.id];
		message.guild.voice.connection.dispatcher.destroy();
		message.channel.send('⏹️ Music content stopped successfully ⏹️');
		if (server.loopvalue != false) server.loopcount = 0;
		if (server.loopvalue != false) server.loopvalue = false;
		if (server.loopqueue != false) server.loopqueue = false;
		server.queue.splice(0, server.queue.length);
		playingMap.delete(message.guild.id, 'Now Playing');
	},
};