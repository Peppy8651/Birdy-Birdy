/* eslint-disable no-var */
// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
const { globalPrefix } = require('C:/Users/Owner/Documents/BirdyBirdy/config.json');

module.exports = {
	name: 'helpfun',
	description: 'fun section of help command',
	execute(message, client) {
		const embed = new Discord.MessageEmbed()
			.setTitle('**Fun Commands**')
			.setColor(0x00FF00)
			.setThumbnail(client.user.displayAvatarURL())
			.setDescription(`**Prefix**: ${globalPrefix}. Here's all the commands that are in the fun section;

**cat**: gives a random cat picture.

**cursed**: gives a cursed image from a random subreddit. Why is this in the fun section? A 5 second cooldown applies to this command.

**dog**: sends a random dog picture.

**meme**: posts a meme from a random meme subreddit to the channel. A 5 second cooldown applies to this command.

**singlememe (args: args)** - makes a memeish embed using an argument. You could also make normal embeds with it I dunno.

**picmeme (description: args[0]) | (imageurl: args[1])** - makes a memeish embed using arguments and urls. If you don't put a url or argument Birdy gets an error, boohoo.

**rickroll**: plays Never Gonna Give You Up in the voice channel that you are in. Pretty good for pranks isn't it?

**yes**: Gives you the yes role! I'm pretty sure that role is useless, but who cares?

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