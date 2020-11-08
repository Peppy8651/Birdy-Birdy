/* eslint-disable no-var */
// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
function secondsToHms(d) {
	d = Number(d);
	var h = Math.floor(d / 3600);
	var m = Math.floor(d % 3600 / 60);
	var s = Math.floor(d % 3600 % 60);
	var hDisplay = h > 9 ? h + (h == 1 ? ':' : ':') : h > 0 ? h + ':' : '';
	var mDisplay = m > 9 ? m + (m == 1 ? ':' : ':') : h == 0 ? m + (m == 1 ? ':' : ':') : m > 0 ? '0' + m + (m == 1 ? ':' : ':') : '00:';
	var sDisplay = s > 9 ? s + (s == 1 ? '' : '') : s > 0 ? '0' + s + (s == 1 ? '' : '') : '00';
	return hDisplay + mDisplay + sDisplay;
}
module.exports = {
	name: 'rickroll',
	description: 'rickroll command',
	async execute(message, server, playingMap) {
		if (message.member.voice.channel) return message.channel.send('You need to be in a voice channel for this!');
		const connection = await message.member.voice.channel.join();
		playingMap.delete(`${message.guild.id}`, 'Now Playing');
		try {
			message.author.lastMessage.delete();
			console.log('Message deleted');
		}
		catch (error) {
			console.log('Message deletion failure');
		}
		const stream = ytdl('https://www.youtube.com/watch?v=dQw4w9WgXcQ', { filter: 'audioonly' });
		const dispatcher = connection.play(stream);
		dispatcher.on('start', () => {
			console.log('Video now being played!');
			message.channel.send('lol');
		});

		dispatcher.on('finish', () => {
			message.channel.send('Rickrolled');
			if (server.queue[0]) {
				message.channel.send('Alright now to continue with your queue.');
				playSong();
			}
		});
		// eslint-disable-next-line no-inner-declarations
		async function playSong() {
			playingMap.set(`${message.guild.id}`, 'Now Playing');
			if (message.member.voice.channel.joinable == null) console.log('Idk why but this happened.');
			const newstream = ytdl(`${server.queue[0]}`, { filter: 'audioonly' });
			server.dispatcher = connection.play(newstream);
			server.dispatcher.on('start', async () => {
				const info = await ytdl.getInfo(`${server.queue[0]}`);
				let videothumb;
				if (!info.videoDetails.thumbnail.thumbnails[1]) videothumb = info.videoDetails.thumbnail.thumbnails[0].url;
				if (!info.videoDetails.thumbnail.thumbnails[2]) videothumb = info.videoDetails.thumbnail.thumbnails[1].url;
				if (!info.videoDetails.thumbnail.thumbnails[3]) videothumb = info.videoDetails.thumbnail.thumbnails[2].url;
				if(!info.videoDetails.thumbnail.thumbnails[4]) videothumb = info.videoDetails.thumbnail.thumbnails[3].url;
				if (info.videoDetails.thumbnail.thumbnails[4]) videothumb = info.videoDetails.thumbnail.thumbnails[4].url;
				const embed = new Discord.MessageEmbed()
					.setAuthor(`${info.videoDetails.author.name} on Youtube`)
					.setTitle('**Now Playing**')
					.setDescription(`**[${info.videoDetails.title}](${info.videoDetails.video_url})**`)
					.setColor(0xFF0000)
					.setImage(videothumb)
					.addFields(
						{ name: 'Duration', value: secondsToHms(info.videoDetails.lengthSeconds), inline: true },
						{ name: 'Upload Date', value: info.videoDetails.uploadDate, inline: true },
					)
					.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
					.setTimestamp();
				message.channel.send(embed);
				console.log(`Now playing in ${message.guild.name}!`);
				if (!message.guild.voice.selfDeaf) connection.voice.setSelfDeaf(true).then(() => console.log('Birdy deafened'));
			});
			server.dispatcher.on('finish', async () => {
				if (server.loopvalue == false) server.queue.shift();
				switch(server.queue.length) {
				case 0:
					playingMap.delete(`${message.guild.id}`, 'Now Playing');
					message.channel.send('The music is done!');
					console.log(`Music now finished in ${message.guild.name}`);
					break;
				default:
					playSong();
					break;
				}
			});
			server.dispatcher.on('error', async () => {
				message.channel.send('There was an error while playing your music. I will now attempt to replay your song.');
				playSong();
			});
		}
		// Always remember to handle errors appropriately!
		dispatcher.on('error', async () => {
			message.channel.send('Sorry, had a problem playing this. You are free to go, but just for now.');
		});
	},
};