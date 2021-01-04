const Discord = require('discord.js');
const e = true;
module.exports = {
	name: 'snipe',
	description: 'snipe command',
	async execute(message, server) {
	  if (e === true) return message.channel.send('Command is disabled for now, will fix later.');
		if (!server.snipe[0]) return message.channel.send('Nothing to snipe. Remember that someone needs to delete a message in this server in order to be sniped.');
		const { snipe } = server;
		if (!snipe[0].content && !snipe[0].image) return message.channel.send('This message seems to be empty.').then(snipe.splice(0, snipe.length));
		if (snipe[0].content == '' && !snipe[0].image) return message.channel.send('This message seems to be empty.').then(snipe.splice(0, snipe.length));
		const embed = new Discord.MessageEmbed()
			.setTitle('Sniped Message')
			.setAuthor(`${snipe[0].author.tag}`, snipe[0].author.displayAvatarURL())
			.setColor(snipe[0].member.displayHexColor)
			.setDescription(`${snipe[0].content}`)
			.addFields(
        { name: 'Created At', value: `${snipe[0].createdAt} UTC`, inline: true },
				{ name: 'Deleted On', value: `${snipe[0].time} UTC`, inline: true },
				{ name: 'Channel', value: snipe[0].channel, inline: true },
			)
			.setImage(snipe[0].image)
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed).catch(() => message.channel.send('Sorry, couldn\'t snipe successfully.'));
	},
};