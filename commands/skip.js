// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');

module.exports = {
	name: 'skip',
	description: 'skip command for Birdy Birdy',
	async execute(message, servers, playingMap) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this command outside of a voice channel!');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('Looks like there isn\'t anything playing in this server. Or at least nothing other than maybe playlists.');
		if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send('Looks like there isn\'t anything playing in this channel.');
		const command = '>skip ';
		const args = message.content.slice(command.length).trim().split(/ +/);
		const server = servers[message.guild.id];
		if (!args[0]) {
			if (server.loopvalue == true) {
				server.queue.shift();
				message.guild.voice.connection.dispatcher.end();
				server.loopcount = 0;
				console.log(server.loopcount);
				message.channel.send('⏩ Skipped! ⏩');
			}
			else {
				message.guild.voice.connection.dispatcher.end();
				message.channel.send('⏩ Skipped! ⏩');
			}
		}
		else {
			const skipCount = parseInt(args[0]);
			if (isNaN(skipCount)) return message.channel.send('You didn\'t put a number to skip by!');
			const amount = skipCount - 1;
			if (amount < 1) {
				if (server.loopvalue == true) {
					server.queue.shift();
					message.guild.voice.connection.dispatcher.end();
					server.loopcount = 0;
					message.channel.send('⏩ Skipped! ⏩');
				}
				else {
					message.guild.voice.connection.dispatcher.end();
					message.channel.send('⏩ Skipped! ⏩');
				}
			}
			if (server.queue[1] == undefined) {
				if (server.loopvalue == true) {
					server.queue.shift();
					message.guild.voice.connection.dispatcher.end();
					server.loopcount = 0;
					message.channel.send('⏩ Skipped! ⏩');
				}
				else {
					message.guild.voice.connection.dispatcher.end();
					message.channel.send('⏩ Skipped! ⏩');
				}
			}
			if (server.queue[amount] == undefined) return message.channel.send('Doesn\'t look like there is a URL in this queue in the order of that number. Remember that the URLs start with 0 and then go on.');
			if (server.loopvalue == true) {
				server.queue.shift();
				server.queue.splice(1, amount);
				message.guild.voice.connection.dispatcher.end();
				server.loopcount = 0;
				message.channel.send('⏩ Skipped! ⏩');
			}
			else if (server.loopqueue == true) {
				message.guild.voice.connection.dispatcher.end();
				const p = server.queue.splice(0, amount);
				for (let i = 0; i < p.length; i++) {
					server.queue.push(p[i]);
				}
				message.channel.send('⏩ Skipped! ⏩');
			}
			else {
				server.queue.splice(1, amount);
				message.guild.voice.connection.dispatcher.end();
				message.channel.send('⏩ Skipped! ⏩');
			}
		}
	},
};