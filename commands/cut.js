module.exports = {
	name: 'cut',
	description: 'cut command',
	async execute(message, server, playingMap) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this command outside a voice channel.');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('Nothing is playing in this server.');
		if (message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send('There isn\'t anything playing in this channel.');
		const command = '>cut ';
		const args = message.content.slice(command.length).trim().split(/ +/);
		if (!args[0]) return message.channel.send('You\'re trying to cut **nothing**.');
		const amountnum = parseInt(args[0]);
		if (isNaN(amountnum)) return message.channel.send('This isn\'t a number. Therefore, I cannot clear anything for you.');
		if (amountnum < 1) return message.channel.send(`There definitely isn't a video in the queue numbered as ${amountnum}`);
		if (amountnum == 1) return message.channel.send('But why would you want to cut out the song that\'s currently playing? Just wait for it to finish or use >skip!');
		const clearcount = amountnum - 1;
		if (server.queue[clearcount] == undefined) return message.channel.send('This video is not in the queue!');
		message.channel.send(`Cut **${server.queue[clearcount].title}** out of queue.`);
		server.queue.splice(clearcount, 1);
	},
};