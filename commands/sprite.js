const Canvas = require('canvas');
const Discord = require('discord.js');
module.exports = {
	name: 'sprite',
	description: 'sprite command',
  cooldown: 5,
	async execute(message) {
		const command = '>sprite ';
		const args = message.content.slice(command.length).trim().split(/ -/);
		const user = message.mentions.members.first() || message.guild.members.cache.get(`${args[0]}`) || message.guild.members.cache.find(m => m.user.tag == `${args[0]}`);
		const canvas = Canvas.createCanvas(482, 288);
		const ctx = canvas.getContext('2d');
		const background = await Canvas.loadImage('https://BirdyMemeAPI.peppy8651.repl.co/images/sprite.jpg');
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		let avatar;
		if (user) avatar = await Canvas.loadImage(user.user.displayAvatarURL({ format: 'jpg' }));
		if (!user) avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
		ctx.drawImage(avatar, 230, 10, 140, 140);
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'sprite.jpeg');
		const embed = new Discord.MessageEmbed();
		embed.attachFiles([attachment]);
		embed.setImage('attachment://sprite.jpeg')
		message.channel.send(embed);
	},
};