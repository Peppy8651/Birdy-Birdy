// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');

module.exports = {
	name: 'helpmisc',
	description: 'misc section of help command',
	async execute(message, client, globalPrefix) {
		const embed = new Discord.MessageEmbed()
			.setTitle('**Miscellaneous Commands**')
			.setColor(0x00FF00)
			.setThumbnail(client.user.displayAvatarURL())
			.setDescription(`**Prefix**: ${globalPrefix}. Here's all the commands in the miscellaneous section;

**delete (args: amount)** - deletes a certain amount of messages up to 99.

**function (args: function) (args: boolean)** - turns a certain Birdy function(parrot, yes, communism) on or off.

**kick (member: GuildMember)** - kicks a member. You need to have the Administrator permission to use this command.

**ping (member: GuildMember)** - pings a member multiple times in a single message. You probably shouldn't use this, but there is a 2.5 second cooldown anyway.

**ping (member: GuildMember) true** - pings a member multiple times in a single message and uses text-to-speech. You probably shouldn't use this either, but there's still the 2.5 second cooldown.

**timer**: makes a timer that lasts for up to 23 hours as long as the bot stays online during the selected time.

**Index**

**1** = a work on progress command that cannot be used if birdycopy.js is being used by the bot.`)
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed);
	},
};