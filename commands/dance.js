const Discord = require('discord.js');

module.exports = {
	name: 'dance',
	description: 'dance command',
	async execute(message) {
    const starter = 'https://birdymemeapi.peppy8651.repl.co/images/';
    // chicken dance gif op: https://media.giphy.com/media/3oEdv5jk7miq98Jv0c/giphy.gif
    // freddy dance gif op: https://tenor.com/view/oofie-dancing-bear-fortnite-default-dance-default-dance-gif-14469215
    const images = ['freddy.gif', 'chickendance.gif'];
    const url = starter + images[Math.floor(Math.random() * images.length)];
		const embed = new Discord.MessageEmbed();
    embed.setImage(url);
    if (url.endsWith('freddy.gif')) {
      embed.setTitle('I swear I was not on drugs while doing this');
    }
    message.channel.send({ embeds: [embed] });
	},
};