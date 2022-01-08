/* eslint-disable prefer-const */
const Discord = require('discord.js');

module.exports = {
	name: 'reddit',
	cooldown: 5,
	description: 'reddit command for BirdyBirdy',
	async execute(message) {
		const command = '>reddit ';
		const args = message.content.slice(command.length).trim().split(/ +/);
		let subreddit;
		const r = 'r/';
		if (args[0].toLowerCase().startsWith('r/')) subreddit = args[0].slice(r.length);
		if (!args[0].toLowerCase().startsWith('r/')) subreddit = args[0];
		if (!subreddit) return message.channel.send('You need a subreddit for this command.');
		const got = require('got');
		const countnum = Math.floor(Math.random() * 100);
		const response = await got(`https://api.reddit.com/r/${subreddit}/hot.json?count=2&sort=hot&t=week&limit=100`);
		const content = JSON.parse(response.body);
		if (!content || content == undefined) return message.channel.send('This subreddit is invalid!');
		if (content.data == undefined) return message.channel.send('This is invalid!');
		if (!content.data.children) return message.channel.send('This is invalid!');
		if (!content.data.children[countnum]) return message.channel.send('Sorry, couldn\'t find anything.');
		if (content.data.children[countnum].data.over_18 == true) return message.channel.send('Sorry, but I can\'t send NFSW content.');
		let image;
		image = content.data.children[countnum].data.url_overridden_by_dest;
		const embed = new Discord.MessageEmbed();
		embed.setColor(0xFF4500);
		embed.setAuthor({ name: `${content.data.children[countnum].data.subreddit_name_prefixed} • Posted by u/${content.data.children[countnum].data.author}` });
		embed.setTitle(content.data.children[countnum].data.title);
		embed.setURL(`https://www.reddit.com${content.data.children[countnum].data.permalink}`);
		embed.setImage(image);
		embed.setFooter({ text: `Command used by ${message.author.tag}`, iconURL:  message.author.displayAvatarURL() });
		if (content.data.children[countnum].data.selftext != undefined) embed.setDescription(content.data.children[countnum].data.selftext);
		message.channel.send({ embeds: [embed] }).catch(async () => message.channel.send('Sorry, but I had a problem sending your embed.'));
	},
};