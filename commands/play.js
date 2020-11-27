/* eslint-disable prefer-const */
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
    async execute(message, servers, playingMap) {
		let video;
		const server = servers[message.guild.id];
		const command = ('>play ');
		const args = message.content.slice(command.length).trim().split();
		const query = args.join(' ');
		if (message.content.toLowerCase().includes('https://www.youtube.com/watch?') || message.content.toLowerCase().includes('https://youtu.be/') || message.content.toLowerCase().includes('https://m.youtube.com/watch?')) {
			video = query;
			if (ytdl.validateURL(video) === false) return message.channel.send('This is not a valid URL!');
		}
		else {
			const loadingmsg = await message.channel.send(`Searching for \`\`${query}\`\``);
			const res = await ytsr(query).catch(() => {
				message.channel.send('Sorry, couldn\'t find anything.');
			});
			if (!res) return;
			const vid = res.items.filter(i => i.type === 'video')[0];
			if (!vid) return message.channel.send('Couldn\'t find a video, at least correctly.');
			video = vid.link;
			loadingmsg.delete().catch(() => console.log('Had a problem deleting this message.'));
		}
		let info = await ytdl.getBasicInfo(video).catch(async () => info = await ytdl.getBasicinfo(video));
		let videothumb;
		if (!info.videoDetails.thumbnail.thumbnails[1]) videothumb = info.videoDetails.thumbnail.thumbnails[0].url;
		if (!info.videoDetails.thumbnail.thumbnails[2]) videothumb = info.videoDetails.thumbnail.thumbnails[1].url;
		if (!info.videoDetails.thumbnail.thumbnails[3]) videothumb = info.videoDetails.thumbnail.thumbnails[2].url;
		if(!info.videoDetails.thumbnail.thumbnails[4]) videothumb = info.videoDetails.thumbnail.thumbnails[3].url;
		if (info.videoDetails.thumbnail.thumbnails[4]) videothumb = info.videoDetails.thumbnail.thumbnails[4].url;
		let song = {
			title: info.videoDetails.title,
			url: info.videoDetails.video_url,
			author: info.videoDetails.author.name,
			thumbnail: videothumb,
			duration: secondsToHms(info.videoDetails.lengthSeconds),
			uploadDate: info.videoDetails.uploadDate,
		};
		server.queue.push(song);
			if (playingMap.has(`${message.guild.id}`, 'Now Playing')) {
				message.channel.send(`Added **${song.title}** to queue.`);
				console.log('Added new video to queue');
			}
			else {
				// eslint-disable-next-line no-unused-vars
				const connection = await message.member.voice.channel.join();
				playSong();
			}
			// eslint-disable-next-line no-inner-declarations
			async function playSong() {
				if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) playingMap.set(`${message.guild.id}`, 'Now Playing');
				const stream = ytdl(`${server.queue[0].url}`, { filter: 'audioonly', dlChunkSize: 0 });
				server.dispatcher = message.guild.voice.connection.play(stream);
				server.dispatcher.on('start', async () => {
					if (server.errorcount != 0) server.errorcount = 0;
					const embed = new Discord.MessageEmbed()
						.setAuthor(`${server.queue[0].author} on Youtube`)
						.setTitle('**Now Playing**')
						.setDescription(`**[${server.queue[0].title}](${server.queue[0].url})**`)
						.setColor(0xFF0000)
						.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
						.setTimestamp();
					if (server.loopcount < 2) embed.setImage(server.queue[0].thumbnail);
					if (server.loopcount < 2) {
						embed.addFields(
							{ name: 'Duration', value: server.queue[0].duration, inline: true },
							{ name: 'Upload Date', value: server.queue[0].uploadDate, inline: true },
						);
					}
					message.channel.send(embed);
					console.log(`Now playing in ${message.guild.name}!`);
					if (!message.guild.voice.selfDeaf) message.guild.voice.connection.voice.setSelfDeaf(true).then(() => console.log('Birdy deafened'));
				});
				server.dispatcher.on('finish', async () => {
					if (server.loopvalue == false && server.loopqueue == false) server.queue.shift();
					if (server.loopvalue == false && server.loopqueue == true) server.queue.push(server.queue.shift());
					switch(server.queue.length) {
					case 0:
						playingMap.delete(`${message.guild.id}`, 'Now Playing');
						message.channel.send('The music is done!');
						console.log(`Music now finished in ${message.guild.name}`);
						if (server.loopvalue != false) server.loopvalue = false;
						if (server.loopqueue != false) server.loopqueue = false;
						if (server.loopcount != 0) server.loopcount = 0;
						break;
					default:
						if (server.loopvalue == false) server.loopcount = 0;
						if (server.loopvalue == true) server.loopcount++;
						playSong();
						break;
					}
				});
				server.dispatcher.on('error', async () => {
					server.errorcount++;
					if (server.errorcount > 3) {
						return message.channel.send('I could not play your music so I give up.');
					}
					else {
						message.channel.send('There was an error while playing your music. I will now attempt to replay your song.');
						playSong();
					}
				});
			}
		},
    };