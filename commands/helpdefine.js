/* eslint-disable quotes */
const Discord = require('discord.js');
module.exports = {
	name: 'helpdefine',
	description: 'define part of help command',
	async execute(message, args, client) {
		if (!args[1]) return message.channel.send('You need a query to get information about this command.');
		let query = args[1].toLowerCase();
		if (args[1] == 'eightball') query = '8ball';
		let cmd;
		try {
			cmd = require(`./cmdinfo/${query}`);
		}
		catch {
			return message.channel.send('I could not find any commands in my library using your query. Remember, some commands haven\'t gotten their information yet.');
		}
		const embed = new Discord.MessageEmbed();
		embed.setTitle(cmd.command);
		embed.setColor(0x00FF00);
		embed.setThumbnail(client.user.displayAvatarURL());
		embed.setDescription(cmd.description);
		embed.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL());
		embed.setTimestamp();
		if (cmd.usage1 && !cmd.usage2) embed.addField('Usage', cmd.usage1);
		if (cmd.usage1 && cmd.usage2) {
			embed.addFields(
				{ name: 'Usage (1)', value: cmd.usage1 },
				{ name: 'Usage (2)', value: cmd.usage2 },
			);
		}
		if (cmd.usage3) embed.addField('Usage (3)', cmd.usage3);
		if (cmd.usage4) embed.addField('Usage (4)', cmd.usage4);
		message.channel.send(embed);
	},
};