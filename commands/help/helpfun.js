/* eslint-disable no-var */
// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');

module.exports = {
	name: 'helpfun',
	description: 'fun section of help command',
	async execute(message, client, globalPrefix) {
		const embed = new Discord.MessageEmbed()
			.setTitle('**Fun Commands**')
			.setColor(0x00FF00)
			.setThumbnail(client.user.displayAvatarURL())
			.setDescription(`**Prefix**: ${globalPrefix}. Here's all the commands that are in the fun section;

**cat**: gives a random cat picture.

**cursed**: gives a cursed image from a random subreddit. Why is this in the fun section? A 5 second cooldown applies to this command.

**dog**: sends a random dog picture.

**greg**: sends a picture from Diary of A Wimpy Kid with the message author's profile picture in it.

**greg (member: guildMember)** sends a picture from Diary of A Wimpy Kid with the pinged member's profile picture on it.

**meme**: posts a meme from a random meme subreddit to the channel. A 5 second cooldown applies to this command.

**singlememe (args: args)** - makes a memeish embed using an argument. You could also make normal embeds with it I dunno.

**picmeme (description: args[0]) | (imageurl: args[1])** - makes a memeish embed using arguments and urls. If you don't put a url or argument Birdy gives you an error, boohoo.

**picmeme (description: args[0])** - makes a memeish embed using message attachments. You MUST put a message attachment if you don't want to use links or else Birdy will throw an error at you.

**rr**: nothing to see here. If you want to use this command for nothing other than curiousity, just join a voice channel and use it. If you know what it already is, go ahead and use it on your friends or other online users in a voice channel.

**sprite**: sends a picture of your profile picture on Lebron James holding a gun in a Sprite Cranberry commercial.

**sprite (member: guildMember)** - sends a picture of the pinged member's profile picture on Lebron James holding a gun in a Sprite Cranberry commercial.

**trickortreat**: You're an adult on Halloween. Some trick-or-treaters knock on your door, so it's time to give them a trick or a treat!

**1-10**: gives a random number from 1 to 10.

**8ball (args: request)** - you give Birdy a request, you get Birdy's answer.

**Index**

**1** = a work on progress command that cannot be used if birdycopy.js is being used by the bot.`)
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed);
	},
};