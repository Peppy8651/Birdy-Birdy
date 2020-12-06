/* eslint-disable prefer-const */
// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
function secondsToHms(d) {
	d = Number(d);
	let h = Math.floor(d / 3600);
	let m = Math.floor(d % 3600 / 60);
	let s = Math.floor(d % 3600 % 60);
	let hDisplay = h > 9 ? h + (h == 1 ? ':' : ':') : h > 0 ? h + ':' : '';
	let mDisplay = m > 9 ? m + (m == 1 ? ':' : ':') : h === 0 ? m + (m == 1 ? ':' : ':') : m > 0 ? '0' + m + (m == 1 ? ':' : ':') : '00:';
	let sDisplay = s > 9 ? s + (s == 1 ? '' : '') : s > 0 ? '0' + s + (s == 1 ? '' : '') : '00';
	return hDisplay + mDisplay + sDisplay;
}

module.exports = {
	name: 'add',
	description: 'add command for Birdy Birdy',
	async execute(message, servers, playingMap) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this command outside of a voice channel!');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') === false) return message.channel.send('You can\'t add anything to a non-existant queue!');
		if (message.member.voice.channelID != message.guild.me.voice.channelID) return message.channel.send('You can\'t add anything to a non-existant queue!');
		const command = '>add ';
		const args = message.content.slice(command.length).trim().split(/ -/);
		const query = args.join(' ');
		if (!query) return message.channel.send('We need a query in order to play your video!');
		let video;
		if (message.content.toLowerCase().includes('https://www.youtube.com/watch?')) {
			video = query;
			if (ytdl.validateURL(video) === false) return message.channel.send('This is not a valid URL!');
		}
		else {
			const loadingmsg = await message.channel.send(`Searching for \`\`${query}\`\``);
			const res = await ytsr(query).catch(() => {
				return message.channel.send('Sorry, couldn\'t find anything.');
			});
			const vid = res.items.filter(i => i.type === 'video')[0];
			if (!vid) return message.channel.send('Couldn\'t find a video, at least correctly.');
			video = vid.link;
			loadingmsg.delete().catch(() => console.log('Had a problem deleting this message.'));
		}
		const server = servers.find(s => s.id == message.guild.id);
		if (!server.queue) return message.channel.send('Looks like there isn\'t a queue. Weird how you got here.');
		const info = await ytdl.getBasicInfo(`${video}`);
		let videothumb;
		if (!info.videoDetails.thumbnail.thumbnails[1]) videothumb = info.videoDetails.thumbnail.thumbnails[0].url;
		if (!info.videoDetails.thumbnail.thumbnails[2]) videothumb = info.videoDetails.thumbnail.thumbnails[1].url;
		if (!info.videoDetails.thumbnail.thumbnails[3]) videothumb = info.videoDetails.thumbnail.thumbnails[2].url;
		if(!info.videoDetails.thumbnail.thumbnails[4]) videothumb = info.videoDetails.thumbnail.thumbnails[3].url;
		if (info.videoDetails.thumbnail.thumbnails[4]) videothumb = info.videoDetails.thumbnail.thumbnails[4].url;
		let song = {
			msgauthor: message.author,
			title: info.videoDetails.title,
			url: info.videoDetails.video_url,
			author: info.videoDetails.author.name,
			thumbnail: videothumb,
			duration: secondsToHms(info.videoDetails.lengthSeconds),
			uploadDate: info.videoDetails.uploadDate,
		};
		server.queue.push(song);
		message.channel.send(`Added **${song.title}** to the queue.`);
	},
};