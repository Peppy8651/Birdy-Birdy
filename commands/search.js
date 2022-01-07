/* eslint-disable prefer-const */
/* eslint-disable no-var */
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const voice = require('@discordjs/voice');
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

function getStream(message, server) {
	let stream;
	try {
		stream = ytdl(`${server.queue[0].url}`, { filter: 'audioonly', dlChunkSize: 0, quality: 'highestaudio', highWaterMark: 1 << 25 });
	}
	catch(err) {
		message.channel.send(`Unable to play song. Error: ${err.message}`);
		server.queue.shift();
		if (server.queue[0]) return getStream(message, server);
		return;
	}
	return stream;
}

module.exports = {
	name: 'search',
	description: 'search command for searching music',
	async execute(message, servers, playingMap) {
		if (!message.member.voice.channel) return message.channel.send('You cannot use this command outside of a voice channel.');
		if (!message.guild.me.permissions.has('CONNECT')) return message.channel.send('I cannot connect to the voice channel!');
		if (!message.guild.me.permissions.has('SPEAK')) return message.channel.send('I cannot speak in the voice channel!');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == true && message.member.voice.channelId != message.guild.me.voice.channelId) return message.channel.send('There is already someone playing music in this server!');
		const command = '>search ';
		const args = message.content.slice(command.length).trim().split(/ -/);
		const query = args.join(' ');
		if (!query) return message.channel.send('You need a query for this!');
		const URLSinfo = [];
		const URLs = [];
		if (message.content.includes('https://www.youtube.com/')) return message.channel.send('You can\'t use links for this command.');
		const loadingmsg = await message.channel.send('Searching...');
		const res = await ytsr(query).catch(() => {
			return void message.channel.send('Sorry, couldn\'t find anything.');
		});
		if (!res) return;
		let index = 5;
		for (var i = 0; i < index; i++) {
			const vid = res.items.filter(e => e.type === 'video')[i];
			if (!vid) return message.channel.send('Couldn\'t find a video, at least correctly.');
			const info = await ytdl.getBasicInfo(`${vid.url}`);
			if (info.videoDetails.isLiveContent == true) {
				index++;
				return i++;
			}
			let vidtitle = info.videoDetails.title;
			if (vidtitle.startsWith('**') && vidtitle.endsWith('**')) {
				const songtitle = vidtitle.slice(2).split('*');
				const songytitle = songtitle[0];
				vidtitle = songytitle;
			}
			const vidurl = info.videoDetails.video_url;
			const vidduration = secondsToHms(info.videoDetails.lengthSeconds);
			const rnumber = i + 1;
			let videothumb;
			if (!info.videoDetails.thumbnails[1]) videothumb = info.videoDetails.thumbnails[0].url;
			if (!info.videoDetails.thumbnails[2]) videothumb = info.videoDetails.thumbnails[1].url;
			if (!info.videoDetails.thumbnails[3]) videothumb = info.videoDetails.thumbnails[2].url;
			if(!info.videoDetails.thumbnails[4]) videothumb = info.videoDetails.thumbnails[3].url;
			if (info.videoDetails.thumbnails[4]) videothumb = info.videoDetails.thumbnails[4].url;
			const author = info.videoDetails.author.name == undefined ? info.videoDetails.ownerChannelName : info.videoDetails.author.name;
			let song = {
				msgauthor: message.author,
				title: vidtitle,
				url: vidurl,
				author: author,
				thumbnail: videothumb,
				duration: vidduration,
				uploadDate: info.videoDetails.uploadDate,
			};
			URLSinfo.push(`${rnumber}. **[${song.title}](${song.url})**: ${song.duration}`);
			URLs.push(song);
		}
		loadingmsg.delete();
		let stringBullcrap = '';
		for (i = 0; i < URLSinfo.length; i++) {
			const bullshit = '\n' + URLSinfo[i];
			stringBullcrap = stringBullcrap + bullshit;
		}
		const embed = new Discord.MessageEmbed()
			.setTitle('**Search Results**')
			.setColor(0xFF0000)
			.addFields(
				{ name: 'Choose a video by typing and entering their number or type cancel to cancel your search!', value: stringBullcrap },
			)
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send({ embeds: [embed] });
		const item = ['1', '2', '3', '4', '5', 'cancel'];
		const users = [message.author.id];
		const filter = response => {
			return item.some(answer => answer.toLowerCase() == response.content.toLowerCase()) && users.some(a => a.toLowerCase() == response.author.id);
		};
		message.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ['time'] })
			.then(async collected => {
				let num;
				if (collected.first().content.toLowerCase().includes('cancel')) return message.channel.send('Alright, cancelling search process.');
				if (collected.first().content.includes('1')) num = 1;
				if (collected.first().content.includes('2')) num = 2;
				if (collected.first().content.includes('3')) num = 3;
				if (collected.first().content.includes('4')) num = 4;
				if (collected.first().content.includes('5')) num = 5;
				const server = servers.find(s => s.id == message.guild.id);
				const video = URLs[num - 1];
				server.queue.push(video);
				try {
					if (playingMap.has(`${message.guild.id}`, 'Now Playing')) {
						message.channel.send(`Added **${video.title}** to queue.`);
						console.log('Added new video to queue');
					}
					else {
						// eslint-disable-next-line no-unused-vars
						const connection = voice.joinVoiceChannel({
							channelId: message.member.voice.channel.id,
							guildId: message.guild.id,
							adapterCreator: message.channel.guild.voiceAdapterCreator,
						});
						playSong();
					}
					// eslint-disable-next-line no-inner-declarations
					async function playSong() {
						if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) playingMap.set(`${message.guild.id}`, 'Now Playing');
						const stream = getStream(message, server);
						const crap = await voice.demuxProbe(stream);
						const resource = voice.createAudioResource(crap.stream, { inlineVolume: false, inputType: crap.type });
						server.player = voice.createAudioPlayer();
						const connection = voice.getVoiceConnection(message.guild.id);
						connection.subscribe(server.player);
						server.player.play(resource);
						server.player.on(voice.AudioPlayerStatus.Playing, async () => {
							if (server.errorcount != 0) server.errorcount = 0;
							const embed1 = new Discord.MessageEmbed()
								.setAuthor(`${server.queue[0].author} on Youtube`)
								.setTitle('**Now Playing**')
								.setDescription(`**[${server.queue[0].title}](${server.queue[0].url})**`)
								.setColor(0xFF0000)
								.setFooter(`Song added by ${server.queue[0].msgauthor.tag}`, server.queue[0].msgauthor.displayAvatarURL())
								.setTimestamp();
							if (server.loopcount < 1) embed1.setImage(server.queue[0].thumbnail);
							if (server.loopcount < 1) {
								embed1.addFields(
									{ name: 'Duration', value: server.queue[0].duration, inline: true },
									{ name: 'Upload Date', value: server.queue[0].uploadDate, inline: true },
								);
							}
							message.channel.send({ embeds: [embed1] });
							console.log(`Now playing in ${message.guild.name}!`);
							if (!message.guild.me.voice.selfDeaf) message.guild.me.voice.setSelfDeaf(true).then(() => console.log('Birdy deafened'));
						});
						server.player.on(voice.AudioPlayerStatus.Idle, async () => {
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
								server.paused = false;
								break;
							default:
								if (server.loopvalue == false) server.loopcount = 0;
								if (server.loopvalue == true) server.loopcount++;
								playSong();
								break;
							}
						});
						server.player.on('error', async () => {
							server.errorcount++;
							if (server.errorcount > 3) {
								message.channel.send('I could not play your music so I give up and will play the next song.');
								server.queue.shift();
								playSong();
							}
							else {
								message.channel.send('There was an error while playing your music. I will now attempt to replay your song.');
								playSong();
							}
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