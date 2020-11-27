module.exports = {
	name: 'pause',
	description: 'pause command',
	async execute(message, playingMap) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this command outside a voice channel!');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('There isn\'t anything playing in this server.');
		if (message.member.voice.channelID != message.guild.me.voice.channelID) return message.channel.send('Looks like there isn\'t anything playing in this channel.');
		if (message.guild.voice.connection.dispatcher.paused) {
			message.guild.voice.connection.dispatcher.resume();
			message.channel.send('⏯️ Music now resuming... ⏯️');
		}
		else if (!message.guild.voice.connection.dispatcher.paused) {
			message.guild.voice.connection.dispatcher.pause(true);
			message.channel.send('⏸️ Music now paused ⏸️');
		}
	},
};