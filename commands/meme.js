/* eslint-disable comma-dangle */
/* eslint-disable no-unreachable */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
module.exports = {
    name: 'meme',
    cooldown: 2.5,
    description: 'meme command that fetches memes from reddit',
	async execute(message) {
        memeChecker(message);
        dankMemeChecker(message);
        const subreddits = ['memes', 'dankmemes'];
        const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
        const results = require(`../${subreddit}.json`);
            const postnum = Math.floor(Math.random() * 100);
            var x = Math.floor(Math.random() * 30);
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`${results.data.children[postnum].data.subreddit_name_prefixed} • Posted by u/${results.data.children[postnum].data.author}`)
                    .setColor(0xFF4500)
                    .setTitle(`**${results.data.children[postnum].data.title}**`)
                    .setURL(`https://www.reddit.com${results.data.children[postnum].data.permalink}`)
                    .setImage(results.data.children[postnum].data.url_overridden_by_dest)
                    .setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL());
                message.channel.send(embed);
            if (x === 15) {
                message.channel.send(`**TIP**
Wanna know why there's a cooldown? Well, this cooldown ensures that every meme command you use works unless it's on cooldown. Without the cooldown, there would probably be some times where the command wouldn't work and I would get an error! Either way, the cooldown shouldn't take too long since it's only 5 seconds and loading the meme and reading it would take more.`);
            }
	},
};

async function memeChecker(message) {
    fs.readFile('../memes.json', async function(err, data) {
        if (err) {
            const res = await fetch('https://api.reddit.com/r/memes/hot.json?count=2&sort=hot&t=week&limit=100').then(response => response.json());
            fs.writeFile('../memes.json', JSON.stringify(res), async function(ror) {
                if (ror) {
                    message.channel.send('Could not fetch your meme.');
                    return;
                }
            });
        }
        if (data) {
            if (!data.data) {
                const res = await fetch('https://api.reddit.com/r/memes/hot.json?count=2&sort=hot&t=week&limit=100').then(response => response.json());
                fs.writeFile('C:/Users/Owner/Documents/BirdyBirdy/memes.json', JSON.stringify(res), async function(p) {
                    if (p) {
                        message.channel.send('Sorry, couldn\'t fetch your meme.');
                        return;
                    }
                });
                const time = new Date();
                const hour = time.getMonth() + 1;
                const memeCheck = require('C:/Users/Owner/Documents/BirdyBirdy/memechecker.json');
                if (memeCheck.memes == hour) return;
                const memeCheckyHour = {
                    memes: hour
                };
                fs.writeFile('C:/Users/Owner/Documents/BirdyBirdy/memechecker.json', JSON.stringify(memeCheckyHour), function(err) {
                    if (err) console.log('Error', err);
                    delete require.cache[require.resolve('C:/Users/Owner/Documents/BirdyBirdy/memechecker.json')];
                });
            }
            else {
                const time = new Date();
                const hour = time.getMonth() + 1;
                const hoursToUpdate = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24];
                if (hoursToUpdate.some(hour) == true) {
                    const memeCheck = require('C:/Users/Owner/Documents/BirdyBirdy/memechecker.json');
                    if (memeCheck.memes == hour) return;
                    const res = await fetch('https://api.reddit.com/r/memes/hot.json?count=2&sort=hot&t=week&limit=100').then(response => response.json());
                    fs.writeFile('C:/Users/Owner/Documents/BirdyBirdy/memes.json', JSON.stringify(res), async function(e) {
                        if (e) {
                            message.channel.send('Sorry, couldn\'t fetch your meme.');
                            return;
                        }
                        delete require.cache[require.resolve('C:/Users/Owner/Documents/BirdyBirdy/memes.json')];
                    });
                    const memeCheckyHour = {
                        meme: hour
                    };
                    fs.writeFile('C:/Users/Owner/Documents/BirdyBirdy/memechecker.json', JSON.stringify(memeCheckyHour), function(err) {
                        if (err) console.log('Error', err);
                        delete require.cache[require.resolve('C:/Users/Owner/Documents/BirdyBirdy/memechecker.json')];
                    });
                }
            }
        }
    });
}

async function dankMemeChecker(message) {
    fs.readFile('../memes.json', async function(err, data) {
        if (err) {
            const res = await fetch('https://api.reddit.com/r/memes/hot.json?count=2&sort=hot&t=week&limit=100').then(response => response.json());
            fs.writeFile('../memes.json', JSON.stringify(res), async function(ror) {
                if (ror) {
                    message.channel.send('Could not fetch your meme.');
                    return;
                }
            });
        }
        if (data) {
            if (!data.data) {
                const res = await fetch('https://api.reddit.com/r/dankmemes/hot.json?count=2&sort=hot&t=week&limit=100').then(response => response.json());
                fs.writeFile('C:/Users/Owner/Documents/BirdyBirdy/dankmemes.json', JSON.stringify(res), async function(p) {
                    if (p) {
                        message.channel.send('Sorry, couldn\'t fetch your meme.');
                        return;
                    }
                });
                const time = new Date();
                const hour = time.getMonth() + 1;
                const memeCheck = require('C:/Users/Owner/Documents/BirdyBirdy/memechecker.json');
                if (memeCheck.memes == hour) return;
                const memeCheckyHour = {
                    memes: hour,
                };
                fs.writeFile('C:/Users/Owner/Documents/BirdyBirdy/memechecker.json', JSON.stringify(memeCheckyHour), function(err) {
                    if (err) console.log('Error', err);
                    delete require.cache[require.resolve('C:/Users/Owner/Documents/BirdyBirdy/memechecker.json')];
                });
            }
            else {
                const time = new Date();
                const hour = time.getMonth() + 1;
                const hoursToUpdate = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24];
                if (hoursToUpdate.some(hour) == true) {
                    const memeCheck = require('C:/Users/Owner/Documents/BirdyBirdy/memechecker.json');
                    if (memeCheck.memes == hour) return;
                    const res = await fetch('https://api.reddit.com/r/dankmemes/hot.json?count=2&sort=hot&t=week&limit=100').then(response => response.json());
                    fs.writeFile('C:/Users/Owner/Documents/BirdyBirdy/dankmemes.json', JSON.stringify(res), async function(e) {
                        if (e) {
                            message.channel.send('Sorry, couldn\'t fetch your meme.');
                            return;
                        }
                        delete require.cache[require.resolve('C:/Users/Owner/Documents/BirdyBirdy/dankmemes.json')];
                    });
                    const memeCheckyHour = {
                        memes: hour,
                    };
                    fs.writeFile('C:/Users/Owner/Documents/BirdyBirdy/memechecker.json', JSON.stringify(memeCheckyHour), function(err) {
                        if (err) console.log('Error', err);
                        delete require.cache[require.resolve('C:/Users/Owner/Documents/BirdyBirdy/memechecker.json')];
                    });
                }
            }
        }
    });
}