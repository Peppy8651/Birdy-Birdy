/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
/* eslint-disable no-inline-comments */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const { version } = require('./config.json');
const { globalPrefix } = require('./config.json');
const { token } = require('./config.json');
client.setMaxListeners(100);
client.commands = new Discord.Collection();
var servers = {};
client.on('message', message => {
	if (!message.guild) return;
	if (!servers[message.guild.id]) {
		servers[message.guild.id] = {
			yes: false,
			parrot: false,
			communism: false,
			queue: [],
			loopvalue: false,
		};
	}
});
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.login(`${token}`).then(() => {
	console.log('Ready!');
	console.log(`Logged in as ${client.user.tag}`);
	console.log(`${client.user.tag} is in ${client.guilds.cache.size} servers`);
	client.user.setActivity(`${globalPrefix}help`, {
		type: 'LISTENING',
		name: `**${globalPrefix}help**`,
	});
});

process.on('unhandledRejection', async error => {
	console.error('Unhandled promise rejection:', error);
});

client.on('message', async (message) => {
	if (!message.guild) return;
	client.helpcommands = new Discord.Collection();
	const helpcommandFiles = fs.readdirSync('./commands/help').filter(file => file.endsWith('.js'));

	for (const file of helpcommandFiles) {
		const helpcommand = require(`./commands/help/${file}`);

		// set a new item in the Collection
		// with the key as the command name and the value as the exported module
		client.helpcommands.set(helpcommand.name, helpcommand);
	}
	if(message.author.id === client.user.id) return;
	if (message.content.toLowerCase() === globalPrefix + 'help') {
		client.helpcommands.get('help').execute(message, client);
	}
	else if (message.content.toLowerCase().startsWith('>help' + ' info')) {
		client.helpcommands.get('helpinfo').execute(message, client);
	}
	else if (message.content.toLowerCase().startsWith('>help' + ' fun')) {
		client.helpcommands.get('helpfun').execute(message, client);
	}
	else if (message.content.toLowerCase().startsWith('>help' + ' misc')) {
		client.helpcommands.get('helpmisc').execute(message, client);
	}
	else if (message.content.toLowerCase().startsWith('>help' + ' music')) {
		client.helpcommands.get('helpmusic').execute(message, client);
	}
});
const PEPPY_ID = '490548233601417223';
client.on('message', async message => {
	if (!message.guild) return;
	if(message.author.id === client.user.id) return;
	if(message.content.toLowerCase().includes(globalPrefix + 'about')) {
		const embed = new Discord.MessageEmbed()
			.setTitle('**About Birdy Birdy**')
			.setColor(0x00ff00)
			.setThumbnail(client.user.displayAvatarURL())
			.addFields(
				{ name: 'Details', value: `**Prefix**: ${globalPrefix}
**Version**: ${version}	
**Tag**: ${client.user.tag}
**ID**: ${client.user.id}
**Library**: discord.js
**Creator/Owner**: <@${PEPPY_ID}>

Any suggestions or feedback? Message my owner!` },
			)
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL());
		message.channel.send(embed);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if(message.author.id === client.user.id) return;
	if(message.content.toLowerCase().includes(globalPrefix + 'ping')) {
		const command = await client.commands.get('ping');
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}
		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;
		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.channel.send(`Sorry, but since you're probably spamming this command, you need to wait ${timeLeft.toFixed(1)} more second(s) to ping that person again.`);
			}
		}
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		client.commands.get('ping').execute(message);
	}
});

client.on('message', async message => {
	if(!message.guild) return;
	if(message.author.id === client.user.id) return;
	if(message.content.toLowerCase().startsWith(globalPrefix + 'kick')) {
		if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You don\'t have the permissions to use this command!');
		client.commands.get('kick').execute(message);
	}
});

client.on('message', async message => {
	if(!message.guild) return;
	if(message.author.id === client.user.id) return;
	if(message.content.toLowerCase().startsWith(globalPrefix + 'ban')) {
		if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You don\'t have the permissions to use this command!');
		client.commands.get('ban').execute(message);
	}
});

client.on('message', async message => {
	if(!message.guild) return;
	if(message.author.id === client.user.id) return;
	if(message.content.toLowerCase().startsWith('hello there')) {
		// eslint-disable-next-line no-shadow
		message.channel.send('General Kenobi').then(async sentMessage => {
			await sentMessage.react('👏');
		});
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if(message.author.id === client.user.id) return;
	client.timercommands = new Discord.Collection();
	const timercommandFiles = fs.readdirSync('./commands/timer').filter(file => file.endsWith('.js'));

	for (const file of timercommandFiles) {
		const timercommand = require(`./commands/timer/${file}`);

		// set a new item in the Collection
		// with the key as the command name and the value as the exported module
		client.timercommands.set(timercommand.name, timercommand);
	}
	if(message.content.toLowerCase().startsWith(globalPrefix + 'timer')) {
		client.timercommands.get('timer').execute(message);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if(message.author.id === client.user.id) return;
	if(message.content.toLowerCase().startsWith(globalPrefix + 'info')) {
		client.commands.get('info').execute(message);
	}
});

client.on('message', message => {
	if(!message.guild) return;
	if(message.author.id === client.user.id) return;
	if(message.content.toLowerCase().startsWith(globalPrefix + 'singlememe')) {
		const command = ('>singlememe ');
		const args = message.content.slice(command.length).trim().split(/ -/);
		if (!args.length) return message.channel.send('You need to add an argument for this to work!');
		const embed = new Discord.MessageEmbed()
			.setDescription(`${args[0]}`)
			.setColor(0xFFFF00)
			.setFooter(`Meme by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed);
	}
});

client.on('message', async message => {
	if(!message.guild) return;
	if(message.author.id === client.user.id) return;
	if(message.content.toLowerCase().startsWith(globalPrefix + 'picmeme')) {
		const command = (globalPrefix + 'picmeme');
		const args = message.content.slice(command.length).split(' | ');
		if (message.content.includes(`${args.length}`)) {
			const embed = new Discord.MessageEmbed()
				.setAuthor(`Posted by ${message.author.tag}`)
				.setDescription(args[0])
				.setColor(0xFFFF00)
				.setImage(`${args[1]}`)
				.setTimestamp();
			// eslint-disable-next-line no-shadow
			message.channel.send(embed).then(async function(message) {
				await message.react('⬆️');
				await message.react('⬇️');
			});
		}
		else {
			message.channel.send('COMMAND: There\'s no arguments among us!');
			message.channel.send('Anyway, here\'s how to use this command. First of all, you need two arguments: description and link. The first one is the description and the second is the link for the image.');
			message.channel.send('EXAMPLE: >picmeme (DESCRIPTION HERE) | (IMAGE URL HERE)');
		}
	}
});

const fetch = require('node-fetch');
client.on('message', async message => {
	const args = message.content.slice(globalPrefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if (command === 'cat') {
		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
		const embed = new Discord.MessageEmbed()
			.setTitle('**Cat Pic**')
			.setColor(0xFFC0CB)
			.setImage(`${file}`)
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed);
	}
});

client.on('message', async message => {
	if (!message.content.startsWith(globalPrefix) || message.author.id === client.user.id) return;
	const args = message.content.slice(globalPrefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if (command === 'dog') {
		// eslint-disable-next-line no-shadow
		const { url } = await fetch('https://random.dog/woof.json').then(response => response.json());
		const embed = new Discord.MessageEmbed()
			.setTitle('**Dog Pic**')
			.setColor(0xFFC0CB)
			.setImage(`${url}`)
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if(message.author.id === client.user.id) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'rickroll')) {
		client.commands.get('rickroll').execute(message);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if(message.author.id === client.user.id) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'pause')) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this command outside a voice channel!');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('There isn\'t anything playing in this server.');
		if (message.member.voice.channelID != message.guild.me.voice.channelID) return message.channel.send('Looks like there isn\'t anything playing in this channel.');
		if (message.guild.voice.connection.dispatcher.paused) {
			message.guild.voice.connection.dispatcher.resume();
			message.channel.send('⏯️ Music now resuming... ⏯️');
		}
		else if (!message.guild.voice.connection.dispatcher.paused) {
			message.guild.voice.connection.dispatcher.pause(true);
			message.channel.send('⏸️ Music now paused ⏸️');
		}
	}
});

client.on('message', message => {
	if (!message.guild) return;
	if(message.author.id === client.user.id) return;
	if (message.content.toLowerCase() === globalPrefix + '1-10') {
		const BirdyNumber = Math.floor(Math.random() * 10) + 1;
		// eslint-disable-next-line no-unused-vars
		message.channel.send(`Your number is **${BirdyNumber}**`).catch(e => {
			return message.channel.send('There was a problem doing that.');
		});
	}
});

client.on('message', message => {
	if(!message.guild) return;
	if(message.author.id === client.user.id) return;
	if(message.content.toLowerCase().startsWith(globalPrefix + 'steamuser')) {
		client.commands.get('steamuser').execute(message);
	}
});

client.on('message', async message => {
	if(!message.guild) return;
	if(message.author.id === client.user.id) return;
	if(message.content.toLowerCase().startsWith(globalPrefix + 'steamgame')) {
		client.commands.get('steamgame').execute(message);
	}
});

client.on('message', async message => {
	if(!message.guild) return;
	if(message.author.id === client.user.id) return;
	if(message.content.toLowerCase().startsWith(globalPrefix + 'delete')) {
		if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Oh you wanna be sneaky, huh? Violating your permissions by using a Discord bot? Nice try, Mister!');
		const command = '>delete ';
		const args = message.content.slice(command.length).trim().split(/ -/);
		const amount = (parseInt(args[0]));
		if (!args[0]) {
			return message.channel.send(`Mario says, "You don't have to put arguments you can use commands without them!"
**Luigi says, "Put the arguments what is wrong with you?"**`);
		}
		if (isNaN(amount)) return message.channel.send('This isn\'t a valid number!');
		if(amount > 99 || amount < 1) return message.channel.send('You can\'t delete this number of messages!');
		// eslint-disable-next-line no-shadow
		// eslint-disable-next-line no-unused-vars
		message.channel.bulkDelete(amount + 1, true).then(async m => {
			const msg = await message.channel.send(`Deleted ${amount} messages!`);
			setTimeout(() => {
				msg.delete().catch(() => console.log('Sorry, couldn\'t delete message'));
			}, 2500);
		}).catch(err => {
			console.error(err);
			message.channel.send('There was an error trying to delete messages in this channel!');
		});
	}
});

client.on('message', message => {
	if(!message.guild) return;
	if(message.author.id === client.user.id) return;
	if(message.author.bot) return;
	if (message.author.id == '593591171293511681') return;
	if(message.content.toLowerCase().startsWith(globalPrefix + 'function')) {
		const command = '>function ';
		const server = servers[message.guild.id];
		const args = message.content.slice(command.length).trim().split(/ +/);
		if (!args[0]) return message.channel.send('You can\'t turn nothing on or off unfortunately. This is true unless Peppy decides to make a function named "nothing." But for now, put those arguments!');
		// eslint-disable-next-line no-inner-declarations
		async function parrottoggle() {
			if(server.parrot === true) {
				server.parrot = false;
				console.log(`Parrot function set to ${server.parrot}`);
			}
			else if(server.parrot === false) {
				server.parrot = true;
				console.log(`Parrot functon set to ${server.parrot}`);
			}
		}
		// eslint-disable-next-line no-inner-declarations
		async function yestoggle() {
			if (server.yes === true) {
				server.yes = false;
				console.log(`Yes function set to ${server.yes}`);
			}
			else if(server.yes === false) {
				server.yes = true;
				console.log(`Yes function set to ${server.yes}`);
			}
		}
		// eslint-disable-next-line no-inner-declarations
		async function communismtoggle() {
			if(server.communism === false) {
				server.communism = true;
				console.log(`Communism function set to ${server.communism}`);
			}
			else if(server.communism === true) {
				server.communism = false;
				console.log(`Communism function set to ${server.communism}`);
			}
		}
		if (message.content.toLowerCase().includes('yes')) {
			if (message.content.toLowerCase().includes('true')) {
				server.yes = true;
				message.channel.send(`Set yes function to \`\`${server.yes}\`\``);
				console.log(`Yes functon set to ${server.yes}`);
			}
			else if (message.content.toLowerCase().includes('false')) {
				server.yes = false;
				message.channel.send(`Set yes function to \`\`${server.yes}\`\``);
				console.log(`Yes function set to ${server.yes}`);
			}
			else {
				yestoggle();
				message.channel.send(`Set yes function to \`\`${server.yes}\`\``);
			}
		}
		else if(message.content.toLowerCase().includes('parrot')) {
			if (message.content.toLowerCase().includes('true')) {
				server.parrot = true;
				message.channel.send(`Set parrot function to \`\`${server.parrot}\`\``);
				console.log(`Parrot functon set to ${server.parrot}`);
			}
			else if (message.content.toLowerCase().includes('false')) {
				server.parrot = false;
				message.channel.send(`Set parrot function to \`\`${server.parrot}\`\``);
				console.log(`Parrot function set to ${server.parrot}`);
			}
			else {
				parrottoggle();
				message.channel.send(`Set parrot function to \`\`${server.parrot}\`\``);
			}
		}
		else if(message.content.toLowerCase().includes('communism')) {
			if (message.content.toLowerCase().includes('true')) {
				server.communism = true;
				message.channel.send(`Set communism function to \`\`${server.communism}\`\``);
				console.log(`Communism functon set to ${server.communism}`);
			}
			else if (message.content.toLowerCase().includes('false')) {
				server.communism = false;
				message.channel.send(`Set communism function to \`\`${server.communism}\`\``);
				console.log(`Communism function set to ${server.communism}`);
			}
			else {
				communismtoggle();
				message.channel.send(`Set communism function to \`\`${server.communism}\`\``);
			}
		}
	}
});

client.on('message', message => {
	if(!message.guild) return;
	if (message.author.id === client.user.id) return;
	const server = servers[message.guild.id];
	if (server.communism === false) return;
	if(message.content.toLowerCase().includes('my')) {
		message.channel.send('You mean **OUR**?');
	}
	else if(message.content.toLowerCase().includes('mine')) {
		message.channel.send('You mean **OURS**?');
	}
});


client.on('message', message => {
	if(!message.guild) return;
	if(message.author.id === client.user.id) return;
	const server = servers[message.guild.id];
	if(server.yes === false) return;
	if(message.content.toLowerCase().includes('yes')) {
		message.channel.send('no');
	}
	else if(message.content.toLowerCase().includes('no')) {
		message.channel.send('yes');
	}
});

client.on('message', message => {
	if(!message.guild) return;
	if(message.author.id === client.user.id) return;
	if(!message.content) return;
	const server = servers[message.guild.id];
	if(server.parrot === false) return;
	message.channel.send(message.content);
});

client.on('message', async message => {
	if(!message.guild) return;
	if(message.author.id === client.user.id) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'meme')) {
		const command = await client.commands.get('meme');
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}
		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;
		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.channel.send(`WOAH WOAH WOAH! Calm down there, buddy. We need to wait ${timeLeft.toFixed(1)} more second(s) before getting another meme. It shouldn't be that much...`);
			}
		}
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		client.commands.get('meme').execute(message);
	}
});

client.on('message', async message => {
	if(!message.guild) return;
	if(message.author.id === client.user.id) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'cursed')) {
		const command = await client.commands.get('cursed');
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}
		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;
		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.channel.send(`WOAH WOAH WOAH! Calm down there, buddy. We need to wait ${timeLeft.toFixed(1)} more second(s) before getting another cursed image. It shouldn't be that much...`);
			}
		}
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		client.commands.get('cursed').execute(message);
	}
});

client.on('message', message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + '8ball') || message.content.toLowerCase().startsWith(globalPrefix + 'eightball')) {
		client.commands.get('8ball').execute(message);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'urban')) {
		client.commands.get('urban').execute(message);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'trickortreat')) {
		const today = new Date();
		if (today.getMonth() != 9) return message.channel.send('We\'re not in October so there is definitely nobody trick-or-treating!');
		client.commands.get('trickortreat').execute(message);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'loop')) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this command outside a voice channel!');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('There isn\'t anything playing in this server.');
		if (message.member.voice.channelID != message.guild.me.voice.channelID) return message.channel.send('Looks like there isn\'t anything playing in this channel.');
		const command = '>loop ';
		const args = message.content.slice(command.length).trim().split(/ +/);
		const value = args[0];
		const server = servers[message.guild.id];
		// eslint-disable-next-line no-inner-declarations
		async function loop(loopparam) {
			if (loopparam == undefined) {
				if (server.loopvalue == true) {
					server.loopvalue = false;
					console.log(`Loop set to ${server.loopvalue}`);
				}
				else if(server.loopvalue == false) {
					server.loopvalue = true;
					console.log(`Loop set to ${server.loopvalue}`);
				}
			}
			else if (loopparam == true) {
				server.loopvalue = true;
				console.log(`Loop set to ${server.loopvalue}`);
			}
			else if (loopparam == false) {
				server.loopvalue = false;
				console.log(`Loop set to ${server.loopvalue}`);
			}
		}
		if (value.includes('true')) {
			loop(true);
			message.channel.send('🔁 Looping... 🔁');
		}
		else if (value.includes('false')) {
			loop(false);
			message.channel.send('↪️ No longer looping. ↪️');
		}
		else {
			loop();
			if (server.loopvalue == true) message.channel.send('🔁 Looping... 🔁');
			if (server.loopvalue == false) message.channel.send('↪️ No longer looping. ↪️');
		}
	}
});

function secondsToHms(d) {
	d = Number(d);
	var h = Math.floor(d / 3600);
	var m = Math.floor(d % 3600 / 60);
	var s = Math.floor(d % 3600 % 60);
	var hDisplay = h > 9 ? h + (h == 1 ? ':' : ':') : h > 0 ? h + ':' : '';
	var mDisplay = m > 9 ? m + (m == 1 ? ':' : ':') : h == 0 ? m + (m == 1 ? ':' : ':') : m > 0 ? '0' + m + (m == 1 ? ':' : ':') : '00:';
	var sDisplay = s > 9 ? s + (s == 1 ? '' : '') : s > 0 ? '0' + s + (s == 1 ? '' : '') : '00';
	return hDisplay + mDisplay + sDisplay;
}

const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const playingMap = new Map();
client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'play')) {
		if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to perform this command.');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == true && message.member.voice.channelID != message.guild.me.voice.channelID) return message.channel.send('There is already someone playing music in this server!');
		const server = servers[message.guild.id];
		if (message.content.includes('https://www.youtube.com/playlist?')) {
			client.commands.get('plplay').execute(message, server, playingMap);
		}
		else {
			client.commands.get('play').execute(message, server, playingMap);
		}
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'skip')) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this command outside of a voice channel!');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('Looks like there isn\'t anything playing in this server. Or at least nothing other than maybe playlists.');
		if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send('Looks like there isn\'t anything playing in this channel.');
		const command = '>skip ';
		const args = message.content.slice(command.length).trim().split(/ +/);
		const server = servers[message.guild.id];
		if (!args[0]) {
			if (server.loopvalue == true) {
				server.queue.shift();
				message.guild.voice.connection.dispatcher.end();
				message.channel.send('⏩ Skipped! ⏩');
			}
			else {
				message.guild.voice.connection.dispatcher.end();
				message.channel.send('⏩ Skipped! ⏩');
			}
		}
		else {
			const skipCount = parseInt(args[0]);
			if (isNaN(skipCount)) return message.channel.send('You didn\'t put a number to skip by!');
			const amount = skipCount - 1;
			if (amount < 1) {
				if (server.loopvalue == true) {
					server.queue.shift();
					message.guild.voice.connection.dispatcher.end();
					message.channel.send('⏩ Skipped! ⏩');
				}
				else {
					message.guild.voice.connection.dispatcher.end();
					message.channel.send('⏩ Skipped! ⏩');
				}
			}
			if (server.queue[1] == undefined) {
				if (server.loopvalue == true) {
					server.queue.shift();
					message.guild.voice.connection.dispatcher.end();
					message.channel.send('⏩ Skipped! ⏩');
				}
				else {
					message.guild.voice.connection.dispatcher.end();
					message.channel.send('⏩ Skipped! ⏩');
				}
			}
			if (server.queue[amount] == undefined) return message.channel.send('Doesn\'t look like there is a URL in this queue in the order of that number. Remember that the URLs start with 0 and then go on.');
			if (server.loopvalue == true) {
				server.queue.shift();
				server.queue.splice(1, amount);
				message.guild.voice.connection.dispatcher.end();
				message.channel.send('⏩ Skipped! ⏩');
			}
			else {
				server.queue.splice(1, amount);
				message.guild.voice.connection.dispatcher.end();
				message.channel.send('⏩ Skipped! ⏩');
			}
		}
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if(message.author.id === client.user.id) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'stop')) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this command outside a voice channel!');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('There isn\'t anything playing in this server.');
		if (message.member.voice.channelID != message.guild.me.voice.channelID) return message.channel.send('Looks like there isn\'t anything playing in this channel.');
		const server = servers[message.guild.id];
		message.guild.voice.connection.dispatcher.destroy();
		message.channel.send('⏹️ Music content stopped successfully ⏹️');
		if (server.loopvalue == true) server.loopvalue == false;
		server.queue.splice(0, server.queue.length);
		playingMap.delete(message.guild.id, 'Now Playing');
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content == '>queue') {
		const server = servers[message.guild.id];
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this outside a voice channel.');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('Doesn\'t look like there is anything playing in this server.');
		if (message.member.voice.channelID != message.guild.me.voice.channelID) return message.channel.send('Sorry, nothing is playing in this channel.');
		switch (server.queue.length) {
		case 0:
			message.channel.send('Doesn\'t look like there is anything in the queue.');
			break;
		default:
			try {
				const URLtitles = [];
				let embed;
				for(let i = 0; i < server.queue.length; i++) {
					const urlInfo = await ytdl.getBasicInfo(`${server.queue[i]}`);
					const infotitles = urlInfo.videoDetails.title;
					const infodurations = secondsToHms(urlInfo.videoDetails.lengthSeconds);
					const queueNumber = i + 1;
					URLtitles.push(`${queueNumber}. **[${infotitles}](${server.queue[i]})**: ${infodurations}`);
				}
				embed = new Discord.MessageEmbed()
					.setTitle('Current Queue')
					.setColor(0xFF0000)
					.setDescription(URLtitles)
					.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
					.setTimestamp();
				message.channel.send(embed);
			}
			catch (error) {
				message.channel.send('Sorry, couldn\'t give you the queue. It might be because there are so many songs in the queue that Discord won\'t let me type all of them in a single embed!');
			}
			break;
		}
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'cut')) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this command outside a voice channel.');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('Nothing is playing in this server.');
		if (message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send('There isn\'t anything playing in this channel.');
		const command = '>cut ';
		const server = servers[message.guild.id];
		const args = message.content.slice(command.length).trim().split(/ +/);
		if (!args[0]) return message.channel.send('You\'re trying to cut **nothing**.');
		const amountnum = parseInt(args[0]);
		if (isNaN(amountnum)) return message.channel.send('This isn\'t a number. Therefore, I cannot clear anything for you.');
		const clearcount = amountnum - 1;
		if (server.queue[clearcount] == undefined) return message.channel.send('This video is not in the queue!');
		const clearedInfo = await ytdl.getBasicInfo(`${server.queue[clearcount]}`);
		server.queue.splice(clearcount, clearcount);
		message.channel.send(`Cut **${clearedInfo.videoDetails.title}** out of queue.`);
	}
});

client.on('message', message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'disconnect')) {
		if (!message.guild.me.voice.channel) return message.channel.send('I\'m not in a channel so I can\'t leave.');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing')) return message.channel.send('Sorry, but I can\'t let you disconnect me from a voice channel while I\'m playing.');
		message.guild.me.voice.channel.leave();
		message.channel.send('Ok, see you soon.');
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'np')) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this command outside of a voice channel!');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('There isn\'t anything playing in this server.');
		if (message.member.voice.channelID != message.guild.me.voice.channelID) return message.channel.send('Doesn\'t look like there is anything playing in this channel.');
		const server = servers[message.guild.id];
		const info = await ytdl.getBasicInfo(`${server.queue[0]}`);
		const title = info.videoDetails.title;
		const link = info.videoDetails.video_url;
		let thumbnail;
		if (!info.videoDetails.thumbnail.thumbnails[1]) thumbnail = info.videoDetails.thumbnail.thumbnails[0].url;
		if (!info.videoDetails.thumbnail.thumbnails[2]) thumbnail = info.videoDetails.thumbnail.thumbnails[1].url;
		if (!info.videoDetails.thumbnail.thumbnails[3]) thumbnail = info.videoDetails.thumbnail.thumbnails[2].url;
		if (!info.videoDetails.thumbnail.thumbnails[4]) thumbnail = info.videoDetails.thumbnail.thumbnails[3].url;
		if (info.videoDetails.thumbnail.thumbnails[4]) thumbnail = info.videoDetails.thumbnail.thumbnails[4].url;
		const duration = secondsToHms(info.videoDetails.lengthSeconds);
		let value;
		if (server.loopvalue == true) value = 'Yes';
		if (server.loopvalue == false) value = 'No';
		const embed = new Discord.MessageEmbed()
			.setTitle('**Currently Playing**')
			.setColor(0xFF0000)
			.setThumbnail(thumbnail)
			.addFields(
				{ name: 'Looping?', value: value, inline: true },
			)
			.setDescription(`**[${title}](${link})**: ${duration}`)
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'add')) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this command outside of a voice channel!');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('You can\'t add anything to a non-existant queue!');
		if (message.member.voice.channelID != message.guild.me.voice.channelID) return message.channel.send('You can\'t add anything to a non-existant queue!');
		const command = '>add ';
		const args = message.content.slice(command.length).trim().split(/ -/);
		const query = args.join(' ');
		if (!query) return message.channel.send('We need a query in order to play your video!');
		let video;
		if (message.content.toLowerCase().includes('https://www.youtube.com/watch?')) {
			video = query;
			if (ytdl.validateURL(video) === false) return message.channel.send('This is not a valid URL!');
		}
		else {
			const res = await ytsr(query).catch(() => {
				return message.channel.send('Sorry, couldn\'t find anything.');
			});
			const vid = res.items.filter(i => i.type === 'video')[0];
			if (!vid) return message.channel.send('Couldn\'t find a video, at least correctly.');
			video = vid.link;
		}
		const server = servers[message.guild.id];
		if (!server.queue) return message.channel.send('Looks like there isn\'t a queue. Weird how you got here.');
		server.queue.push(video);
		const info = await ytdl.getBasicInfo(`${video}`);
		message.channel.send(`Added **${info.videoDetails.title}** to the queue.`);
	}
});

client.on('message', message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'clear')) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this command outside of a voice channel!');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('There isn\'t anything playing in this server.');
		if (message.member.voice.channelID != message.guild.me.voice.channelID) return message.channel.send('Doesn\'t look like there is anything playing in this channel.');
		const server = servers[message.guild.id];
		if (!server.queue[0]) return message.channel.send('Doesn\'t seem like there is anything in this server\'s queue.');
		if (!server.queue[1]) return message.channel.send('But what are you trying to clear? Once this song ends the queue will be cleared anyway!');
		server.queue.splice(1, server.queue.length);
		message.channel.send('Cleared queue!');
	}
});