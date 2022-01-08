const { MessageEmbed } = require('discord.js');
const { ClientServer } = require('../server');
module.exports = {
	name: 'preview',
	description: 'sends an embed with a preview of some code or something',
	async execute(message, servers, client) {
		const command = '>preview ';
		const args = message.content.slice(command.length).trim().split(/ +/);
		const thing = args[0];
		if (!thing) return message.channel.send('You need to supply a thing to preview it!');
		const embed = new MessageEmbed();
		const server = servers.find(s => s.id == message.guild.id);
		const availableobjects = ['ClientServer', 'server'];
		if (availableobjects.some(o => o == thing) == false) return message.channel.send('The added object is not available.');
		let object;
		if (thing == 'ClientServer') object = new ClientServer(message.guild.id, client);
		if (thing == 'server') object = server;
		const ob = JSON.stringify(object, null, 3);
		const description = `\`\`\`${ob}\`\`\``;
		embed.setDescription(description);
		embed.setColor('RANDOM');
		if (description.length > 2044) return message.channel.send('This object is too big, can\'t send it.');
		if (description.length < 2045) message.channel.send({ embeds: [embed] });
	},
};