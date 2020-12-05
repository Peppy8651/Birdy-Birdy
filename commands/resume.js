module.exports = {
	name: 'resume',
	description: 'resumes dispatcher if paused',
	async execute(message, playingMap) {
		if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel for this command!');
		if (!message.guild.me.voice.channel && !playingMap.has('Now Playing', message.guild.id)) return message.channel.send('There is nothing playing in this server!');
		if (message.guild.me.voice.channelID != message.member.voice.channelID) return message.channel.send('There isn\'t anything playing in this channel.');
		if (message.guild.voice.connection.dispatcher.paused == false) return message.channel.send('The dispatcher isn\'t paused.');
		message.guild.voice.connection.dispatcher.resume();
		message.channel.send('⏯️ Music now resuming... ⏯️');
	},
};