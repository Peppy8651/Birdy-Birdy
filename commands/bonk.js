/* eslint-disable indent */
const { MessageAttachment, MessageEmbed } = require('discord.js');
const Canvas = require('canvas');
module.exports = {
	name: 'bonk',
	description: 'BONK',
  cooldown: 5,
	async execute(message) {
		const command = '>bonk ';
		const args = message.content
			.slice(command.length)
			.trim()
			.split(/ -/);
		const member =
			message.mentions.members.first() ||
			message.guild.members.cache.get(`${args[0]}`) ||
			message.guild.members.cache.find(m => m.user.tag == `${args[0]}`);
		if (!member) return message.channel.send('No, you need a member to bonk.');
		const canvas = Canvas.createCanvas(680, 476);
		const ctx = canvas.getContext('2d');
		const background = await Canvas.loadImage('https://BirdyMemeAPI.peppy8651.repl.co/images/bonk.jpg');
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		const authorpic = await Canvas.loadImage(
			message.author.displayAvatarURL({ format: 'jpg' })
		);
		ctx.drawImage(authorpic, 150, 75, 150, 150);
		const memberpic = await Canvas.loadImage(
			member.user.displayAvatarURL({ format: 'jpg' })
		);
		ctx.drawImage(memberpic, 450, 250, 150, 150);
		const attachment = new MessageAttachment(canvas.toBuffer(), 'bonk.jpeg');
    const embed = new MessageEmbed();
		embed.attachFiles([attachment]);
		embed.setImage('attachment://bonk.jpeg');
		if (member.user.id == message.author.id)
			return message.channel.send(
				"Holy crap, if you're willing to bonk yourself I have no idea what's going on in your head.",
				embed
			);
		message.channel.send(embed);
	}
};
