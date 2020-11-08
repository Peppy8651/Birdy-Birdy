/* eslint-disable no-var */
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
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
	name: 'plplay',
	description: 'playlist part of play command',
	async execute(message, server, playingMap) {
		// eslint-disable-next-line no-inner-declarations
		const command = '>play';
		const args = message.content.slice(command.length).trim().split(/ -/);
		const query = args.join(' ');
		if (ytpl.validateID(query) === false) return message.channel.send('This is not a valid playlist URL!');
		const listquery = query;
		const queryplaylist = await ytpl(`${listquery}`, { limit: Infinity });
		for(var i = 0; i < queryplaylist.total_items; i++) {
			const listurls = queryplaylist.items[i].url_simple;
			server.queue.push(listurls);
		}
		if (playingMap.has(`${message.guild.id}`, 'Now Playing')) {
			console.log('Added playlist to queue');
			return message.channel.send(`Added **${queryplaylist.title}** to queue.`);
		}
		else {
			playPlayList();
			playingMap.set(`${message.guild.id}`, 'Now Playing');
		}
		// eslint-disable-next-line no-inner-declarations
		async function playPlayList() {
			const connection = await message.member.voice.channel.join();
			const stream = ytdl(`${server.queue[0]}`, { filter: 'audioonly' });
			server.dispatcher = connection.play(stream);
			server.dispatcher.on('start', async () => {
				const info = await ytdl.getInfo(`${server.queue[0]}`);
				let videothumb;
				if (!info.videoDetails.thumbnail.thumbnails[1]) videothumb = info.videoDetails.thumbnail.thumbnails[0].url;
				if (!info.videoDetails.thumbnail.thumbnails[2]) videothumb = info.videoDetails.thumbnail.thumbnails[1].url;
				if (!info.videoDetails.thumbnail.thumbnails[3]) videothumb = info.videoDetails.thumbnail.thumbnails[2].url;
				if (!info.videoDetails.thumbnail.thumbnails[4]) videothumb = info.videoDetails.thumbnail.thumbnails[3].url;
				if (info.videoDetails.thumbnail.thumbnails[4]) videothumb = info.videoDetails.thumbnail.thumbnails[4].url;
				const embed = new Discord.MessageEmbed()
					.setTitle('**Now Playing Playlist**')
					.setURL(queryplaylist.url)
					.setDescription(`**[${info.videoDetails.title}](${info.videoDetails.video_url})**`)
					.setAuthor(`${info.videoDetails.author.name} on Youtube`)
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
				if (!message.guild.voice.selfDeaf) connection.voice.setSelfDeaf(true).then(console.log('Birdy deafened'));
			});
			server.dispatcher.on('finish', async () => {
				if (server.loopvalue === false) server.queue.shift();
				if (server.queue.length == 0) {
					message.channel.send('The music is done!');
					playingMap.delete(`${message.guild.id}`, 'Now Playing');
					return console.log(`Music now finished in ${message.guild.name}`);
				}
				else {
					playPlayList(message);
				}
			});
			server.dispatcher.on('error', async () => {
				message.channel.send('There was an error while playing your music. Please try again.').then(() => connection.disconnect());
				server.queue.splice(0, server.queue.length);
			});
		}
	},
};