const Canvas = require('canvas');
const Discord = require('discord.js');
module.exports = {
	name: 'greg',
	description: 'greg command',
	async execute(message, client) {
		const command = '>greg ';
		const args = message.content.slice(command.length).trim().split(/ -/);
		const user = message.mentions.users.first() || client.users.cache.get(`${args[0]}`) || client.users.cache.find(u => u.tag == `${args[0]}`);
		const canvas = Canvas.createCanvas(1289, 1024);
		const ctx = canvas.getContext('2d');
		const background = await Canvas.loadImage('C:/Users/Owner/Documents/BirdyBirdy/commands/assets/greg.png');
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		let avatar;
		if (user) avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'png' }));
		if (!user) avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));
		ctx.drawImage(avatar, 315, 240, 250, 250);
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'greggyboy.png');
		message.channel.send(attachment);
	},
};