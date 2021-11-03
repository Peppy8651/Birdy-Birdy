module.exports = {
	name: 'pause',
	description: 'pause command',
	async execute(message, server, playingMap) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this command outside a voice channel!');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('There isn\'t anything playing in this server.');
		if (message.member.voice.channelId != message.guild.me.voice.channelId) return message.channel.send('Looks like there isn\'t anything playing in this channel.');
		if (server.paused) {
			server.player.unpause();
			server.paused = false;
			message.channel.send('⏯️ Music now resuming... ⏯️');
		}
		else if (!server.paused) {
			server.player.pause();
			server.paused = true;
			message.channel.send('⏸️ Music now paused ⏸️');
		}
	},
};