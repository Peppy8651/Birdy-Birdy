const Canvas = require('canvas');
const Discord = require('discord.js');
module.exports = {
	name: 'greg',
	description: 'greg command',
	cooldown: 5,
	async execute(message) {
		const command = '>greg ';
		const args = message.content.slice(command.length).trim().split(/ -/);
		const user = message.mentions.members.first() || message.guild.members.cache.get(`${args[0]}`) || message.guild.members.cache.find(u => u.user.tag == `${args[0]}`);
		const canvas = Canvas.createCanvas(640, 512);
		const ctx = canvas.getContext('2d');
		const background = await Canvas.loadImage('https://BirdyMemeAPI.peppy8651.repl.co/images/greg.jpg');
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		let avatar;
		if (user) avatar = await Canvas.loadImage(user.user.displayAvatarURL({ format: 'jpg' }));
		if (!user) avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
		ctx.drawImage(avatar, 155, 125, 120, 120);
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'greggyboy.jpeg');
		const embed = new Discord.MessageEmbed();
		embed.setImage('attachment://greggyboy.jpeg');
		message.channel.send({ embeds: [embed], files: [attachment] });
	},
};