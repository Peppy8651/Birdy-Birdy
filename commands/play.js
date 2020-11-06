/* eslint-disable no-var */
/* eslint-disable indent */
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
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
	name: 'play',
    description: 'New play command',
    async execute(message, server, playingMap) {
        let video;
		const command = ('>play ');
		const args = message.content.slice(command.length).trim().split();
		const query = args.join(' ');
		if (message.content.toLowerCase().includes('https://www.youtube.com/watch?')) {
			video = query;
			if (ytdl.validateURL(video) === false) return message.channel.send('This is not a valid URL!');
		}
		else {
			const res = await ytsr(query).catch(() => {
				return void message.channel.send('Sorry, couldn\'t find anything.');
			});
			if (!res) return;
			const vid = res.items.filter(i => i.type === 'video')[0];
			if (!vid) return message.channel.send('Couldn\'t find a video, at least correctly.');
			video = vid.link;
		}
		server.queue.push(video);
		try {
			if (playingMap.has(`${message.guild.id}`, 'Now Playing')) {
				const newInfo = await ytdl.getBasicInfo(`${video}`);
				message.channel.send(`Added **${newInfo.videoDetails.title}** to queue.`);
				console.log('Added new video to queue');
			}
			else {
				playingMap.set(`${message.guild.id}`, 'Now Playing');
				playSong();
			}
			// eslint-disable-next-line no-inner-declarations
			async function playSong() {
				let connection;
				if (message.member.voice.channel.joinable == null) console.log('Idk why but this happened.');
				if (message.member.voice.channel.joinable) connection = await message.member.voice.channel.join();
				const stream = ytdl(`${server.queue[0]}`, { filter: 'audio' });
				server.dispatcher = connection.play(stream);
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
		}
		catch (error) {
			message.channel.send('Sorry, there was an error doing that.');
		}
    },
};