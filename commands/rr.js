/* eslint-disable no-var */
// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
module.exports = {
	name: 'rr',
	description: 'rickroll command',
	async execute(message, server, playingMap) {
		if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel for this!');
		const connection = await message.member.voice.channel.join();
		playingMap.delete(`${message.guild.id}`, 'Now Playing');
		try {
			message.author.lastMessage.delete();
			console.log('Message deleted');
		}
		catch (error) {
			console.log('Message deletion failure');
		}
		const stream = ytdl('https://www.youtube.com/watch?v=dQw4w9WgXcQ', { filter: 'audioonly', quality: 'highestaudio', dlChunkSize: 0, highWaterMark: 1<<25 });
		const dispatcher = connection.play(stream, { highWaterMark: 1 });
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
			const newstream = ytdl(`${server.queue[0].url}`, { filter: 'audioonly' });
			server.dispatcher = connection.play(newstream);
			server.dispatcher.on('start', async () => {
				const embed = new Discord.MessageEmbed()
					.setAuthor(`${server.queue[0].author} on Youtube`)
					.setTitle('**Now Playing**')
					.setDescription(`**[${server.queue[0].title}](${server.queue[0].url})**`)
					.setColor(0xFF0000)
					.setImage(server.queue[0].thumbnail)
					.addFields(
						{ name: 'Duration', value: server.queue[0].duration, inline: true },
						{ name: 'Upload Date', value: server.queue[0].uploadDate, inline: true },
					)
					.setFooter(`Song added by ${server.queue[0].msgauthor.tag}`, server.queue[0].msgauthor.displayAvatarURL())
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
					if (server.loopvalue != false) server.loopvalue = false;
					console.log(`Music now finished in ${message.guild.name}`);
					break;
				default:
					playSong();
					break;
				}
			});
			server.dispatcher.on('error', async () => {
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
		// Always remember to handle errors appropriately!
		dispatcher.on('error', async () => {
			message.channel.send('Sorry, had a problem playing this. You are free to go, but just for now.');
		});
	},
};