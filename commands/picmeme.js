const Discord = require('discord.js');
const globalPrefix = '>';
module.exports = {
	name: 'picmeme',
	description: 'picmeme commmand',
	async execute(message) {
		const command = (globalPrefix + 'picmeme');
		const args = message.content.slice(command.length).split(' | ');
		let image;
		let img;
		if (!message.attachments.first()) {
			if (!args[1]) return message.channel.send('You need arguments for this! Example: >picmeme "text" | "imagelink"');
			if (args[1].includes('?')) image = args[1].split('?');
			if (!args[1].includes('?')) image = args[1];
			if (args[1].includes('?')) img = image[0];
			if (!args[1].includes('?')) img = image;
		}
		if (message.attachments.first()) {
			img = message.attachments.first().proxyURL;
		}
		try {
			const embed = new Discord.MessageEmbed()
				.setAuthor({ name: `Posted by ${message.author.tag}` })
				.setDescription(args[0])
				.setColor(0xFFFF00)
				.setTimestamp()
				.setImage(img);
			const msg = await message.channel.send({ embeds: [embed] });
			msg.react('⬆️');
			msg.react('⬇️');
			message.delete();
		}
		catch (error) {
			return message.channel.send('There was an error sending your meme.');
		}
	},
};