/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
const Discord = require('discord.js');
const got = require('got');

module.exports = {
    name: 'meme',
    cooldown: 2.5,
    description: 'meme command that fetches memes from reddit',
	async execute(message) {
        const subreddits = ['memes', 'dankmemes'];
        const randomsub = subreddits[Math.floor(Math.random() * subreddits.length)];
        const response = await got(`https://api.reddit.com/r/${randomsub}/random/.json`);
        const content = JSON.parse(response.body);
            const postnum = 0;
            var x = Math.floor(Math.random() * 30);
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`${content[0].data.children[0].data.subreddit_name_prefixed} • Posted by u/${content[0].data.children[0].data.author}`)
                    .setColor(0xFF4500)
                    .setTitle(`**${content[0].data.children[0].data.title}**`)
                    .setURL(`https://www.reddit.com${content[0].data.children[0].data.permalink}`)
                    .setImage(content[0].data.children[0].data.url_overridden_by_dest)
                    .setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL());
                message.channel.send(embed);
            if (x === 15) {
                message.channel.send(`**TIP**
Wanna know why there's a cooldown? Well, this cooldown ensures that every meme command you use works unless it's on cooldown. Without the cooldown, there would probably be some times where the command wouldn't work and I would get an error! Either way, the cooldown shouldn't take too long since it's only 5 seconds and loading the meme and reading it would take more.`);
            }
	},
};