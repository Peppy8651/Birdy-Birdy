const Discord = require('discord.js');
const { globalPrefix } = require('C:/Users/Owner/Documents/BirdyBirdy/config.json');

module.exports = {
	name: 'helpinfo',
	description: 'info section of help command',
	execute(message, client) {
		const embed = new Discord.MessageEmbed()
			.setTitle('**Info Commands**')
			.setColor(0x00FF00)
			.setThumbnail(client.user.displayAvatarURL())
			.setDescription(`**Prefix**: ${globalPrefix}. Here's all the commands that are in the info section;
	
**about**: gives details about Birdy Birdy including version and ways to contact the creator.

**help**: gives a list of commands.

**info (member: GuildMember)** - gives information about the pinged member.

**info (role: role)** - gives information about the pinged role.

**info server** - gives you information about the server the command was sent in.

**steamgame (args: AppID)** - gives information about a game on the Steam platform.

**steamuser (args: username/id)** - gives information about a user on the Steam platform.

**urban (args: query)** - gives information from the Urban Dictionary related to the search query.

**Index**

**1** = a work on progress command that cannot be used if birdycopy.js is being used by the bot.`)
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed);
	},
};