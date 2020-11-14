/* eslint-disable prefer-const */
/* eslint-disable no-var */
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
	name: 'search',
	description: 'search command for searching music',
	async execute(message, servers, playingMap) {
		const command = '>search ';
		const args = message.content.slice(command.length).trim().split(/ -/);
		const query = args.join(' ');
		if (!query) return message.channel.send('You need a query for this!');
		const URLSinfo = [];
		const URLs = [];
		if (message.content.includes('https://www.youtube.com/')) return message.channel.send('You can\'t use links for this command.');
		const loadingmsg = await message.channel.send('Loading...');
		for (var r = 0; r < 5; r++) {
			const res = await ytsr(query).catch(() => {
				return void message.channel.send('Sorry, couldn\'t find anything.');
			});
			if (!res) return;
			const vid = res.items.filter(i => i.type === 'video')[r];
			if (!vid) return message.channel.send('Couldn\'t find a video, at least correctly.');
			const info = await ytdl.getBasicInfo(`${vid.link}`);
			const vidtitle = info.videoDetails.title;
			const vidurl = info.videoDetails.video_url;
			const vidduration = secondsToHms(info.videoDetails.lengthSeconds);
			const rnumber = r + 1;
			var song = {
				title: vidtitle,
				number: rnumber,
				link: vidurl,
				length: vidduration,
			};
			URLSinfo.push(`${rnumber}. **[${song.title}](${song.link})**: ${song.length}`);
			if (rnumber > 1) loadingmsg.edit(`Loading... ${rnumber} videos loaded`);
			if (rnumber == 1) loadingmsg.edit(`Loading... ${rnumber} video loaded`);
			URLs.push(song.link);
		}
		loadingmsg.delete();
		const embed = new Discord.MessageEmbed()
			.setTitle('**Search Results**')
			.setColor(0xFF0000)
			.addFields(
				{ name: 'Choose a video by typing and entering their number or type cancel to cancel your search!', value: URLSinfo },
			)
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed);
		const item = ['1', '2', '3', '4', '5', 'cancel'];
		const filter = response => {
			return item.some(answer => answer.toLowerCase() == response.content.toLowerCase());
		};
		message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
			.then(async collected => {
				let num;
				if (collected.first().content.toLowerCase().includes('cancel')) return message.channel.send('Alright, cancelling search process.');
				if (collected.first().content.includes('1')) num = 1;
				if (collected.first().content.includes('2')) num = 2;
				if (collected.first().content.includes('3')) num = 3;
				if (collected.first().content.includes('4')) num = 4;
				if (collected.first().content.includes('4')) num = 5;
				const server = servers[message.guild.id];
				const video = URLs[num - 1];
				const info = await ytdl.getBasicInfo(video);
				let videothumb;
				if (!info.videoDetails.thumbnail.thumbnails[1]) videothumb = info.videoDetails.thumbnail.thumbnails[0].url;
				if (!info.videoDetails.thumbnail.thumbnails[2]) videothumb = info.videoDetails.thumbnail.thumbnails[1].url;
				if (!info.videoDetails.thumbnail.thumbnails[3]) videothumb = info.videoDetails.thumbnail.thumbnails[2].url;
				if(!info.videoDetails.thumbnail.thumbnails[4]) videothumb = info.videoDetails.thumbnail.thumbnails[3].url;
				if (info.videoDetails.thumbnail.thumbnails[4]) videothumb = info.videoDetails.thumbnail.thumbnails[4].url;
				let vid = {
					title: info.videoDetails.title,
					url: info.videoDetails.video_url,
					author: info.videoDetails.author.name,
					thumbnail: videothumb,
					duration: secondsToHms(info.videoDetails.lengthSeconds),
					uploadDate: info.videoDetails.uploadDate,
				};
				server.queue.push(vid);
				try {
					if (playingMap.has(`${message.guild.id}`, 'Now Playing')) {
						message.channel.send(`Added **${vid.title}** to queue.`);
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
						const stream = ytdl(`${server.queue[0].url}`, { filter: 'audioonly' });
						server.dispatcher = message.guild.voice.connection.play(stream);
						server.dispatcher.on('start', async () => {
							const embed1 = new Discord.MessageEmbed()
								.setAuthor(`${info.videoDetails.author.name} on Youtube`)
								.setTitle('**Now Playing**')
								.setDescription(`**[${server.queue[0].title}](${server.queue[0].url})**`)
								.setColor(0xFF0000)
								.setImage(server.queue[0].thumbnail)
								.addFields(
									{ name: 'Duration', value: server.queue[0].duration, inline: true },
									{ name: 'Upload Date', value: server.queue[0].uploadDate, inline: true },
								)
								.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
								.setTimestamp();
							message.channel.send(embed1);
							console.log(`Now playing in ${message.guild.name}!`);
							if (!message.guild.voice.selfDeaf) message.guild.voice.connection.voice.setSelfDeaf(true).then(() => console.log('Birdy deafened'));
						});
						server.dispatcher.on('finish', async () => {
							if (server.loopvalue == false) server.queue.shift();
							switch(server.queue.length) {
							case 0:
								playingMap.delete(`${message.guild.id}`, 'Now Playing');
								message.channel.send('The music is done!');
								console.log(`Music now finished in ${message.guild.name}`);
								if (server.loopvalue == true) server.loopvalue = false;
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
			})
		// eslint-disable-next-line no-unused-vars
			.catch(collected => {
				return message.channel.send('You didn\'t pick a video in time.');
			});
	},
};