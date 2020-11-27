// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');

module.exports = {
	name: 'helpmusic',
	description: 'helpmusic command',
	async execute(message, client, globalPrefix) {
		const embed = new Discord.MessageEmbed()
			.setTitle('**Music Commands**')
			.setColor(0x00FF00)
			.setDescription(`**Prefix**: ${globalPrefix}. Here's all the commands that are in the music section;

**add (query/link: youtubevid)** - adds a video or song to the queue if something is currently playing in a server.

**clear**: clears the queue.
			
**cut (args: count)** - cuts out a certain URL in a queue and keeps it from being played if it is not already being played.

**disconnect**: makes Birdy disconnect from a voice channel.

**loop (args: optionalboolean)** - loops audio from an already playing video.

**np**: shows what is currently playing in the server queue.
            
**play (query: searchquery)** - plays the audio from the selected Youtube search query video in a voice channel. If something is already being played, it is added to the server's queue.

**play (link: videolink)** - plays the audio from the Youtube video link in a voice channel. If something is already being played, it is added to the server's queue.

**play (link: playlistlink)** - plays videos from a Youtube playlist link in a voice channel in a queue. If something is already being played, it is added to the server's queue.

**stop**: if audio is being played in a voice channel, this command ends that session by destroying the dispatcher connection.

**pause**: if audio is being played in a voice channel, this command will pause that audio until it is eventually resumed or the bot leaves the voice channel. If the audio is paused, this command will unpause the audio.

**queue**: gives the current queue.

**skip (args: optionalAmount)** - skips either a song or a certain amount of songs in the queue.`)
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
			.setThumbnail(client.user.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed);
	},
};