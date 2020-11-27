module.exports = {
	name: 'disconnect',
	description: 'disconnect command',
	authorcheck: true,
	async execute(message, servers, playingMap) {
		if (!message.member.voice.channel) return message.channel.send('You cannot perform this command outside a voice channel.');
		if (!message.guild.me.voice.channel) return message.channel.send('I\'m not in a channel so I can\'t leave.');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing')) return message.channel.send('Sorry, but I can\'t let you disconnect me from a voice channel while I\'m playing.');
		message.guild.voice.channel.leave();
		const server = servers[message.guild.id];
		if (server.loopvalue != false) server.loopcount = 0;
		if (server.loopvalue != false) server.loopvalue = false;
		if (server.loopqueue != false) server.loopqueue = false;
		message.channel.send('Ok, see you soon.');
	},
};