module.exports = {
	name: 'forcedisconnect',
	description: 'force disconnect command',
	authorcheck: true,
	async execute(message, servers) {
		if (!message.member.voice.channel) return message.channel.send('You cannot perform this command outside a voice channel.');
		if (!message.guild.me.voice.channel) return message.channel.send('I\'m not in a channel so I can\'t leave.');
		message.guild.me.voice.disconnect();
		const server = servers.find(s => s.id == message.guild.id);
		if (server.loopvalue != false) server.loopcount = 0;
		if (server.loopvalue != false) server.loopvalue = false;
		if (server.loopqueue != false) server.loopqueue = false;
		message.channel.send('Forcefully disconnected.');
	},
};