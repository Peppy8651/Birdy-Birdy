/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
const Discord = require('discord.js');
const miniget = require('miniget');

module.exports = {
    name: 'cursed',
    cooldown: 5,
    description: 'cursed image command',
	async execute(message) {
        const subreddits = ['cursedmemes', 'cursed_cats', 'Cursed_Images', 'CursedMinecraft'];
        const randomsub = subreddits[Math.floor(Math.random() * subreddits.length)];
        miniget(`https://api.reddit.com/r/${randomsub}/hot.json?count=2&sort=hot&t=week&limit=100`, { headers:{ 'User-Agent':'a/b' } }).text().then(res => {
            const postnum = Math.floor(Math.random() * 100);
            var x = Math.floor(Math.random() * 30);
            const response = JSON.parse(res);
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`${response.data.children[postnum].data.subreddit_name_prefixed} • Posted by u/${response.data.children[postnum].data.author}`)
                    .setColor(0xFF4500)
                    .setTitle(`**${response.data.children[postnum].data.title}**`)
                    .setURL(`https://www.reddit.com${response.data.children[postnum].data.permalink}`)
                    .setImage(response.data.children[postnum].data.url_overridden_by_dest)
                    .setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL());
                message.channel.send(embed);
            if (x === 15) {
                message.channel.send(`**TIP**
Wanna know why there's a cooldown? Well, this cooldown ensures that every cursed image command you use works unless it's on cooldown. Without the cooldown, there would probably be some times where the command wouldn't work and I would get an error! Either way, the cooldown shouldn't take too long since it's only 5 seconds and loading the cursed image and reading it would take more.`);
            }
        });
	},
};