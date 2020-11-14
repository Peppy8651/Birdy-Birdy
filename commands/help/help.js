const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'help command',
	async execute(message, client, globalPrefix) {
		const embed = new Discord.MessageEmbed()
			.setTitle('**Command Types**')
			.setThumbnail(client.user.displayAvatarURL())
			.setColor(0x00FF00)
			.setDescription(`**Prefix**: ${globalPrefix}. Please choose a type of command.
			
**help info** - gives a list of commands that relate to information.

**help fun** - gives a list of commands that you can use to have fun.

**help music** - gives a list of commands related to music and audio.

**help misc** - gives a list of other commands that don't belong in other command types yet.`)
			.setFooter(`Command used by ${ message.author.tag }`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed);
	},
};