/* eslint-disable comma-dangle */
/* eslint-disable no-unreachable */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
const Discord = require('discord.js');
const nodefetch = require('node-fetch');
const fs = require('fs');
module.exports = {
    name: 'meme',
    cooldown: 2.5,
    description: 'meme command that fetches memes from reddit',
	async execute(message) {
        memeChecker(message);
        dankMemeChecker(message);
        const command = '>meme ';
        const args = message.content.slice(command.length).trim().split(/ -/);
        const subreddits = ['memes', 'dankmemes', 'memes', 'dankmemes', 'memes', 'dankmemes'];
        let subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
        if (args[0].toLowerCase().startsWith('r/')) args[0] = args[0].slice(2);
        if (args[0] == 'dankmemes' || args[0] == 'dank') subreddit = 'dankmemes';
        if (args[0] == 'memes') subreddit = 'memes';
        fetchMeme(message, subreddit);
	},
};

async function memeChecker(message) {
    fs.readFile('./memes.json', 'utf8', async function(err, data) {
        if (err) {
            const res = await nodefetch('https://api.reddit.com/r/memes/hot.json?count=2&sort=hot&t=week&limit=100').then(response => response.json());
            fs.writeFile('./memes.json', JSON.stringify(res), async function(ror) {
                if (ror) {
                    message.channel.send('Could not fetch your meme.');
                    return;
                }
            });
        }
        if (data) {
            const d = JSON.parse(`${data}`);
            if (!d.data) {
                const res = await nodefetch('https://api.reddit.com/r/memes/hot.json?count=2&sort=hot&t=week&limit=100').then(response => response.json());
                fs.writeFile('./memes.json', JSON.stringify(res), async function(p) {
                    if (p) {
                        message.channel.send('Sorry, couldn\'t fetch your meme.');
                        return;
                    }
                });
            }
            else {
                const time = new Date();
                const hour = time.getHours();
                    const memeCheck = require('../memechecker.json');
                    if (memeCheck.meme === hour) return;
                    const res = await nodefetch('https://api.reddit.com/r/memes/hot.json?count=2&sort=hot&t=week&limit=100').then(response => response.json());
                    fs.writeFile('./memes.json', JSON.stringify(res), async function(e) {
                        if (e) {
                            message.channel.send('Sorry, couldn\'t fetch your meme.');
                            return;
                        }
                        delete require.cache[require.resolve('../memes.json')];
                    });
            }
        }
    });
}

async function dankMemeChecker(message) {
    fs.readFile('./dankmemes.json', 'utf8', async function(err, data) {
        if (err) {
            const res = await nodefetch('https://api.reddit.com/r/dankmemes/hot.json?count=2&sort=hot&t=week&limit=100').then(response => response.json());
            fs.writeFile('./dankmemes.json', JSON.stringify(res), async function(ror) {
                if (ror) {
                    message.channel.send('Could not fetch your meme.');
                    return;
                }
            });
        }
        if (data) {
            const d = JSON.parse(`${data}`);
            if (!d.data) {
                const res = await nodefetch('https://api.reddit.com/r/dankmemes/hot.json?count=2&sort=hot&t=week&limit=100').then(response => response.json());
                fs.writeFile('./dankmemes.json', JSON.stringify(res), async function(p) {
                    if (p) {
                        message.channel.send('Sorry, couldn\'t fetch your meme.');
                        return;
                    }
                });
                const time = new Date();
                const hour = time.getHours();
                const memeCheck = require('../memechecker.json');
                if (memeCheck.meme == hour) return;
                const memeCheckyHour = {
                    meme: hour,
                };
                fs.writeFile('./memechecker.json', JSON.stringify(memeCheckyHour), function(err) {
                    if (err) console.log('Error', err);
                    delete require.cache[require.resolve('../memechecker.json')];
                });
            }
            else {
                const time = new Date();
                const hour = time.getHours();
                    const memeCheck = require('../memechecker.json');
                    if (memeCheck.meme === hour) return;
                    const res = await nodefetch('https://api.reddit.com/r/dankmemes/hot.json?count=2&sort=hot&t=week&limit=100').then(response => response.json());
                    fs.writeFile('./dankmemes.json', JSON.stringify(res), async function(e) {
                        if (e) {
                            message.channel.send('Sorry, couldn\'t fetch your meme.');
                            return;
                        }
                        delete require.cache[require.resolve('../dankmemes.json')];
                    });
                    const memeCheckyHour = {
                        meme: hour,
                    };
                    fs.writeFile('./memechecker.json', JSON.stringify(memeCheckyHour), function(err) {
                        if (err) console.log('Error', err);
                        delete require.cache[require.resolve('../memechecker.json')];
                    });
            }
        }
    });
}

async function fetchMeme(message, subreddit) {
    const results = require(`../${subreddit}.json`);
            const postnum = Math.floor(Math.random() * 99);
            let image = `${results.data.children[postnum].data.url_overridden_by_dest}`;
            if (image.endsWith('.gifv')) {
                return fetchMeme(message, subreddit);
            }
            const over18 = results.data.children[postnum].data.over_18;
            if (over18 == true) {
                return fetchMeme(message, subreddit);
            }
            if (image.startsWith('https://preview.redd.it/')) {
                const img = image.replace('preview.redd.it', 'i.redd.it').split('?');
                image = img[0];
            }
            if (image.endsWith('.mp4')) {
                return fetchMeme(message, subreddit);
            }
            if (image.startsWith('https://v.redd.it')) return fetchMeme(message, subreddit);
            if (image.startsWith('https://gfycat.com/')) return fetchMeme(message, subreddit);
            var x = Math.floor(Math.random() * 30);
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`${results.data.children[postnum].data.subreddit_name_prefixed} • Posted by u/${results.data.children[postnum].data.author}`)
                    .setColor(0xFF4500)
                    .setTitle(`**${results.data.children[postnum].data.title}**`)
                    .setURL(`https://www.reddit.com${results.data.children[postnum].data.permalink}`)
                    .setImage(image)
                    .setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL());
                    embed.setTimestamp();
                message.channel.send(embed).catch(() => {
                    fetchMeme(message, subreddit);
                    return;
                });
            if (x === 15) {
            message.channel.send('Hey, these memes come from Reddit; therefore, if you want to get more memes, you can either click the hyperlink as the title or you can go to Reddit and find memes!');
            }
}