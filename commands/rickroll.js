// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
	name: 'rickroll',
	description: 'rickroll command',
	async execute(message) {
		if (message.member.voice.channel) {
			const connection = await message.member.voice.channel.join();
			try {
				message.author.lastMessage.delete();
				console.log('Message deleted');
			}
			catch (error) {
				console.log('Message deletion failure');
			}
			const stream = ytdl('https://www.youtube.com/watch?v=dQw4w9WgXcQ', { filter: 'audio' });
			const dispatcher = connection.play(stream);
			dispatcher.on('start', () => {
				console.log('Video now being played!');
				message.channel.send('lol');
			});

			dispatcher.on('finish', () => {
				message.channel.send('Rickrolled');
				console.log('Aight the rickroll ended');
			});

			// Always remember to handle errors appropriately!
			dispatcher.on('error', console.error);
		}
		else if (!message.member.voice.channel) {
			message.channel.send('You need to be in a voice channel for this command to work!');
		}
	},
};