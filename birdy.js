/* eslint-disable no-inner-declarations */
/* eslint-disable max-nested-callbacks */
/* eslint-disable indent */
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
// eslint-disable-next-line no-unused-vars
async function BetaCheck(msg) {
	const Cobras = await client.guilds.fetch('774316995897982980');
	const LS = await client.guilds.fetch('699461818422394910');
	const DFMD = await client.guilds.fetch('615884282040287242');
	if (msg.guild.id != Cobras.id && msg.guild.id != LS.id && msg.guild.id != DFMD.id) return message.channel.send('This command is currently being tested and cannot be used outside of featured servers.');
}

client.on('guildCreate', async guild => {
	console.log(`Was added to ${guild.name}!`);
});

client.on('message', message => {
	if (!message.guild) return;
	if (!servers[message.guild.id]) {
		servers[message.guild.id] = {
			yes: false,
			communism: false,
			queue: [],
			loopvalue: false,
			loopqueue: false,
			snipe: [],
			editsnipe: [],
			turkeyfight: {
				players: [],
				playersconstant: [],
				playing: false,
				turn: null,
			},
			giveaways: [],
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

client.on('ready', async () => {
	console.log('Ready!');
	console.log(`Logged in as ${client.user.tag}`);
	const command = client.commands.get('status');
	const BirdyActivity = command.fetchStatus();
	console.log(`${client.user.tag} is in ${client.guilds.cache.size} servers`);
	client.user.setActivity(BirdyActivity, {
		type: 'LISTENING',
		name: BirdyActivity,
	});
});

client.login(`${token}`);

process.on('unhandledRejection', async error => {
	console.error('Unhandled promise rejection:', error);
});
client.on('message', async (message) => {
	if (!message.guild) return;
	if(message.author.id == client.user.id) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'help')) {
		const command = '>help ';
		const args = message.content.slice(command.length).trim().split(/ +/);
		const action = args[0];
		if (!action) return client.commands.get('help').execute(message, client, globalPrefix);
		if (action.toLowerCase() == 'define') {
			client.commands.get('helpdefine').execute(message, args, client);
		}
		else {
			client.commands.get('help').execute(message, client, globalPrefix);
		}
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
**Discord Library**: discord.js
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
		if (!message.guild.me.hasPermission('ADMINISTRATOR') && !message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('Sorry, can\'t kick anybod since I don\'t have the permissions to.');
		if (!message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('You don\'t have the permissions to use this command!');
		client.commands.get('kick').execute(message);
	}
});

client.on('message', async message => {
	if(!message.guild) return;
	if(message.author.id === client.user.id) return;
	if(message.content.toLowerCase().startsWith(globalPrefix + 'ban')) {
		if (!message.guild.me.hasPermission('ADMINISTRATOR') && !message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('Sorry, can\'t ban anybody since I don\'t have the permissions to.');
		if (!message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You don\'t have the permissions to use this command!');
		client.commands.get('ban').execute(message);
	}
});

client.on('message', async message => {
	if(!message.guild) return;
	if(message.author.id === client.user.id) return;
	if(message.content.toLowerCase().startsWith('hello there')) {
		// eslint-disable-next-line no-shadow
		const sentMessage = message.channel.send('General Kenobi');
		await sentMessage.react('👏');
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

client.on('message', async message => {
	if(!message.guild) return;
	if(message.author.id === client.user.id) return;
	if(message.content.toLowerCase().startsWith(globalPrefix + 'singlememe')) {
		const command = ('>singlememe ');
		const args = message.content.slice(command.length).trim().split(/ -/);
		if (!args[0]) return message.channel.send('You need to add an argument for this to work!');
		const embed = new Discord.MessageEmbed()
			.setDescription(`${args[0]}`)
			.setColor(0xFFFF00)
			.setFooter(`Meme by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		const msg = await message.channel.send(embed);
		msg.react('⬆️');
		msg.react('⬇️');
		message.delete();
	}
});

client.on('message', async message => {
	if(!message.guild) return;
	if(message.author.id === client.user.id) return;
	if(message.content.toLowerCase().startsWith(globalPrefix + 'picmeme')) {
		const command = (globalPrefix + 'picmeme');
		const args = message.content.slice(command.length).split(' | ');
		let image;
		let img;
		if (!message.attachments.first()) {
			if (!args[1]) return message.channel.send('You need arguments for this! Example: >picmeme "text" | "imagelink"');
			if (args[1].includes('?')) image = args[1].split('?');
			if (!args[1].includes('?')) image = args[1];
			if (args[1].includes('?')) img = image[0];
			if (!args[1].includes('?')) img = image;
		}
		if (message.attachments.first()) {
			img = message.attachments.first().proxyURL;
		}
		try {
			const embed = new Discord.MessageEmbed()
				.setAuthor(`Posted by ${message.author.tag}`)
				.setDescription(args[0])
				.setColor(0xFFFF00)
				.setTimestamp()
				.setImage(img);
			const msg = await message.channel.send(embed);
			msg.react('⬆️');
			msg.react('⬇️');
			message.delete();
		}
		catch (error) {
			return message.channel.send('There was an error sending your meme.');
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

client.on('message', message => {
	if (!message.guild) return;
	if (!message.guild.me.voice.channel && playingMap.has(`${message.guild.id}`, 'Now Playing')) {
		playingMap.delete(`${message.guild.id}`, 'Now Playing');
		const server = servers[message.guild.id];
		server.queue.splice(0, server.queue.length);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if(message.author.id === client.user.id) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'rr')) {
		const server = servers[message.guild.id];
		client.commands.get('rickroll').execute(message, server, playingMap);
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
		if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Sorry, I don\'t have the permissions to use this. Check my role and see if it has the permission MANAGE_MESSAGES enabled.');
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
		message.channel.bulkDelete(amount + 1, true).then(async () => {
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
		client.commands.get('function').execute(message, server);
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
	if (client.user.id == message.author.id) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + '8ball') || message.content.toLowerCase().startsWith(globalPrefix + 'eightball')) {
		client.commands.get('8ball').execute(message, client);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (client.user.id == message.author.id) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'urban')) {
		client.commands.get('urban').execute(message);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (client.user.id == message.author.id) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'trickortreat')) {
		const today = new Date();
		if (today.getMonth() != 9) return message.channel.send('We\'re not in October so there is definitely nobody trick-or-treating!');
		client.commands.get('trickortreat').execute(message);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (client.user.id == message.author.id) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'loop')) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this command outside a voice channel!');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('There isn\'t anything playing in this server.');
		if (message.member.voice.channelID != message.guild.me.voice.channelID) return message.channel.send('Looks like there isn\'t anything playing in this channel.');
		const command = '>loop ';
		const args = message.content.slice(command.length).trim().split(/ +/);
		const value = args[0];
		const server = servers[message.guild.id];
		client.commands.get('loop').execute(message, server, args, value);
	}
});

// const ytsr = require('ytsr');
const playingMap = new Map();
client.on('message', async message => {
	if (!message.guild) return;
	if (client.user.id == message.author.id) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'play')) {
		if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to perform this command.');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == true && message.member.voice.channelID != message.guild.me.voice.channelID) return message.channel.send('There is already someone playing music in this server!');
		const server = servers[message.guild.id];
		if (message.content.includes('https://www.youtube.com/playlist?')) {
			return message.channel.send('Sorry, but playlist support has been removed because the library I use is giving errors. It will be added back once this is resolved.');
			// eslint-disable-next-line no-unreachable
			client.commands.get('plplay').execute(message, server, playingMap);
		}
		else {
			client.commands.get('play').execute(message, server, playingMap);
		}
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (client.user.id == message.author.id) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'skip')) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this command outside of a voice channel!');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('Looks like there isn\'t anything playing in this server. Or at least nothing other than maybe playlists.');
		if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send('Looks like there isn\'t anything playing in this channel.');
		const command = '>skip ';
		const args = message.content.slice(command.length).trim().split(/ +/);
		const server = servers[message.guild.id];
		client.commands.get('skip').execute(message, server, args);
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
		if (server.loopvalue != false) server.loopvalue = false;
		if (server.loopqueue != false) server.loopqueue = false;
		server.queue.splice(0, server.queue.length);
		playingMap.delete(message.guild.id, 'Now Playing');
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (client.user.id == message.author.id) return;
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
			// eslint-disable-next-line no-case-declarations
			const URLtitles = [];
			// eslint-disable-next-line no-case-declarations
			let embed;
			for(let i = 0; i < server.queue.length; i++) {
				const queueNumber = i + 1;
				URLtitles.push(`${queueNumber}. **[${server.queue[i].title}](${server.queue[i].url})**: ${server.queue[i].duration}`);
			}
			embed = new Discord.MessageEmbed()
				.setTitle('Current Queue')
				.setColor(0xFF0000)
				.setDescription(URLtitles)
				.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
				.setTimestamp();
			message.channel.send(embed).catch(() => message.channel.send('Sorry, couldn\'t send the embed.'));
			break;
		}
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (client.user.id == message.author.id) return;
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
		if (amountnum < 1) return message.channel.send(`There definitely isn't a video in the queue numbered as ${amountnum}`);
		if (amountnum == 1) return message.channel.send('But why would you want to cut out the song that\'s currently playing? Just wait for it to finish or use >skip!');
		const clearcount = amountnum - 1;
		if (server.queue[clearcount] == undefined) return message.channel.send('This video is not in the queue!');
		message.channel.send(`Cut **${server.queue[clearcount].title}** out of queue.`);
		server.queue.splice(clearcount, 1);
	}
});

client.on('message', message => {
	if (!message.guild) return;
	if (client.user.id == message.author.id) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'disconnect')) {
		if (!message.member.voice.channel) return message.channel.send('You cannot perform this command outside a voice channel.');
		if (!message.guild.me.voice.channel) return message.channel.send('I\'m not in a channel so I can\'t leave.');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing')) return message.channel.send('Sorry, but I can\'t let you disconnect me from a voice channel while I\'m playing.');
		message.guild.voice.channel.leave();
		const server = servers[message.guild.id];
		if (server.loopvalue != false) server.loopvalue = false;
		if (server.loopqueue != false) server.loopqueue = false;
		message.channel.send('Ok, see you soon.');
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (client.user.id == message.author.id) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'np')) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this command outside of a voice channel!');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('There isn\'t anything playing in this server.');
		if (message.member.voice.channelID != message.guild.me.voice.channelID) return message.channel.send('Doesn\'t look like there is anything playing in this channel.');
		const server = servers[message.guild.id];
		const value = server.loopvalue == true ? 'Yes' : 'No';
		const queuevalue = server.loopqueue == true ? 'Yes' : 'No';
		const embed = new Discord.MessageEmbed()
			.setTitle('**Currently Playing**')
			.setColor(0xFF0000)
			.setThumbnail(server.queue[0].thumbnail)
			.addFields(
				{ name: 'Looping?', value: value, inline: true },
				{ name: 'Looping Queue?', value: queuevalue, inline: true },
			)
			.setDescription(`**[${server.queue[0].title}](${server.queue[0].url})**: ${server.queue[0].duration}`)
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (client.user.id == message.author.id) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'add')) {
		if (!message.member.voice.channel) return message.channel.send('You can\'t use this command outside of a voice channel!');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == false) return message.channel.send('You can\'t add anything to a non-existant queue!');
		if (message.member.voice.channelID != message.guild.me.voice.channelID) return message.channel.send('You can\'t add anything to a non-existant queue!');
		client.commands.get('add').execute(message, servers);
	}
});

client.on('message', message => {
	if (!message.guild) return;
	if (client.user.id == message.author.id) return;
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

const Canvas = require('canvas');
client.on('message', async message => {
	if (!message.guild) return;
	if (client.user.id == message.author.id) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'greg')) {
		const command = '>greg ';
		const args = message.content.slice(command.length).trim().split(/ -/);
		const user = message.mentions.users.first() || client.users.cache.get(`${args[0]}`) || client.users.cache.find(u => u.tag == `${args[0]}`);
		const canvas = Canvas.createCanvas(1289, 1024);
		const ctx = canvas.getContext('2d');
		const background = await Canvas.loadImage('./image assets/greg.png');
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		let avatar;
		if (user) avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'png' }));
		if (!user) avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));
		ctx.drawImage(avatar, 315, 240, 250, 250);
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'greggyboy.png');
		message.channel.send(attachment);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (client.user.id == message.author.id) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'sprite')) {
		const command = '>sprite ';
		const args = message.content.slice(command.length).trim().split(/ -/);
		const user = message.mentions.users.first() || client.users.cache.get(`${args[0]}`) || client.users.cache.find(u => u.tag == `${args[0]}`);
		const canvas = Canvas.createCanvas(600, 336);
		const ctx = canvas.getContext('2d');
		const background = await Canvas.loadImage('./image assets/sprite.png');
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		let avatar;
		if (user) avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'png' }));
		if (!user) avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));
		ctx.drawImage(avatar, 290, 10, 170, 170);
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'sprite.png');
		message.channel.send(attachment);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'search')) {
		if (!message.member.voice.channel) return message.channel.send('You cannot use this command outside of a voice channel.');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing') == true && message.member.voice.channelID != message.guild.me.voice.channelID) return message.channel.send('There is already someone playing music in this server!');
		client.commands.get('search').execute(message, servers, playingMap);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'invite')) {
		const command = '>invite ';
		const args = message.content.slice(command.length).trim().split(/ +/);
		const invite = await message.channel.createInvite({
			maxAge: 0,
			maxUses: 0,
		});
		const user = message.mentions.users.first() || client.users.cache.get(`${args[0]}`) || client.users.cache.find(u => u.tag == `${args[0]}`);
		const Invite = new Discord.Invite(client, invite);
		const embed = new Discord.MessageEmbed()
			.setAuthor('You have been invited to join a server')
			.setTitle(`${message.guild.name}`)
			.setDescription(`${message.guild.members.cache.filter(m => m.presence.status == 'online').size} Online, ${message.guild.memberCount} Members, **[Click here to join](${Invite.url})**`)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setImage(message.guild.bannerURL({ dynamic: true }))
			.setFooter(`Invite sent by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		if (!user && !args[0]) message.channel.send(embed);
		if (!user && args[0]) message.channel.send('Sorry, but I couldn\'t find anyone based on your arguments. However, I will still give you a link for you to use or for you to send to that person.', embed);
		if (user && user.bot) return message.channel.send('Sorry, but I can\'t send invites to bots.');
		if (user) {
			user.send(`Hi! ${message.author} sent you an invite! If you want to, go ahead and click the blue text to join! If you think this was a mistake or unintended, just ignore it.`, embed).then(() => message.channel.send(`Sent invite to **${user.tag}**`)).catch(() => message.channel.send('Sorry, couldn\'t send the invite to them. Make sure that they allow all messages in their DMs.'));
		}
	}
});

client.on('messageDelete', message => {
	if (!message.guild) return;
	const server = servers[message.guild.id];
	const time = new Date();
	const timefiltered = `${time.getMonth() + 1}/${time.getDate()}/${time.getFullYear()}`;
	let img;
	h = time.getHours();
	const ampm = h > 12 ? 'PM' : 'AM';
	const hours = h > 12 ? h - 12 : h;
	const m = time.getMinutes();
	const minutes = m < 10 ? '0' + `${m}` : m == 0 ? '00' : m;
	const stamp = `${hours}:${minutes} ${ampm}`;
	if (!message.attachments.first()) img = undefined;
	if (message.attachments.first()) img = message.attachments.first().proxyURL;
	const msg = {
		content: message.content,
		channel: message.channel,
		member: message.member,
		author: message.author,
		guild: message.guild,
		time: timefiltered,
		timestamp: stamp,
		image: img,
	};
	if (!server.snipe[0]) server.snipe.push(msg);
	if (server.snipe[0]) {
		server.snipe.splice(0, server.snipe.length);
		server.snipe.push(msg);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'snipe')) {
		const server = servers[message.guild.id];
		if (!server.snipe[0]) return message.channel.send('Nothing to snipe. Remember that someone needs to delete a message in this server in order to be sniped.');
		const { snipe } = server;
		if (!snipe[0].content && !snipe[0].image) return message.channel.send('This message seems to be empty.').then(snipe.splice(0, snipe.length));
		if (snipe[0].content == '' && !snipe[0].image) return message.channel.send('This message seems to be empty.').then(snipe.splice(0, snipe.length));
		const embed = new Discord.MessageEmbed()
			.setTitle('Sniped Message')
			.setAuthor(`${snipe[0].author.tag}`, snipe[0].author.displayAvatarURL())
			.setColor(snipe[0].member.displayHexColor)
			.setDescription(`${snipe[0].content}`)
			.addFields(
				{ name: 'Deleted on', value: `${snipe[0].time} at ${snipe[0].timestamp} CT`, inline: true },
				{ name: 'Channel', value: snipe[0].channel, inline: true },
			)
			.setImage(snipe[0].image)
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed).catch(() => message.channel.send('Sorry, couldn\'t snipe successfully.'));
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'reddit')) {
		const command = await client.commands.get('reddit');
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
				return message.channel.send(`WOAH WOAH WOAH! Calm down there, buddy. We need to wait ${timeLeft.toFixed(1)} more second(s) before searching another subreddit. It shouldn't be that much...`);
			}
		}
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		client.commands.get('reddit').execute(message);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'changelog')) {
		client.commands.get('changelog').execute(message, client, version);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'suggest')) {
		const Peppy = await client.users.fetch(`${PEPPY_ID}`);
		const embed = new Discord.MessageEmbed()
			.setTitle('Suggesting')
			.setThumbnail(client.user.displayAvatarURL())
			.setColor(0x00FF00)
			.setDescription('Have a suggestion? DM my owner on Discord or make an issue with your suggestion on the Github Repository! He is usually open to suggestions since he always needs new ideas for Birdy Birdy!')
			.addFields(
				{ name: 'Discord', value: Peppy, inline: true },
				{ name: 'Github', value: '[Birdy\'s Repo](https://github.com/Peppy8651/Birdy-Birdy/issues/)', inline: true },
			)
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'log')) {
		const command = '>log ';
		const args = message.content.slice(command.length).trim().split(/ -/);
		const catchinput = args.join(' ');
		const input = !catchinput ? 'You need to add arguments to use this command' : catchinput;
		const colors = ['CSS', 'fix', 'yaml', 'brainfuck', 'ini', 'css', null];
		const color = colors[Math.floor(Math.random() * colors.length)];
		const inp = color == 'ini' ? `[${input}]` : color == 'css' ? `[${input}]` : input;
		const outputcolored = `\`\`\`${color}
${inp} \`\`\``;
		const outputnotcolored = `\`\`\`${inp} \`\`\``;
		const output = color == null ? outputnotcolored : outputcolored;
		message.channel.send(output);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'turkeyfight')) {
		const server = servers[message.guild.id];
		if (server.turkeyfight.playing == true) return message.channel.send('There is already two people turkeyfighting in this server!');
		const member = message.mentions.members.first();
		if (!member) return message.channel.send('You need to ping a member to start turkeyfighting!');
		if (member.user.id == message.author.id) return message.channel.send('Ok you punch yourself and die game over.');
		if (member.user.id == client.user.id) return message.channel.send('I will destroy you immediately. Don\'t challenge a bot.');
		if (member.user.bot) {
			const embed = new Discord.MessageEmbed();
			embed.setTitle('Seriously, why are you fighting bots?');
			embed.setColor('PURPLE');
			embed.setDescription(`Leaked footage of ${message.author} turkeyfighting a bot:`);
			embed.setImage('https://media1.tenor.com/images/7bceb53c8046319b0016443cb1947a94/tenor.gif?itemid=18667615');
			embed.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL());
			embed.setTimestamp();
			return message.channel.send(embed);
		}
		client.commands.get('turkey').execute(message, server, member);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'turkeystats')) {
		const server = servers[message.guild.id];
		if (server.turkeyfight.playing != true) return message.channel.send('There isn\'t anyone playing Turkey Fight in this server...');
		const embed = new Discord.MessageEmbed()
			.setTitle('Current Turkey Fight Game')
			.setThumbnail(message.guild.iconURL())
			.setColor('BLUE')
			.addFields(
				{ name: 'Players', value: `${server.turkeyfight.playersconstant[0].player}
${server.turkeyfight.playersconstant[1].player}`, inline: true },
				{ name: 'Health Stats', value: `${server.turkeyfight.players[0].player}: ${server.turkeyfight.players[0].health}
${server.turkeyfight.players[1].player}: ${server.turkeyfight.players[1].health}`, inline: true },
				{ name: 'Current Turn', value: server.turkeyfight.turn, inline: true },
			)
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'fortune')) {
		const f = require('./commands/fortunes.json');
		const fortune = f.fortunes[Math.floor(Math.random() * f.fortunes.length)];
		const embed = new Discord.MessageEmbed()
		.setTitle('Fortune Cookie')
		.setColor('RANDOM')
		.setThumbnail(client.user.displayAvatarURL())
		.setDescription('Follow this wisdom and let it improve who you are unless it states you don\'t need improvement.')
		.addFields(
			{ name: 'Your Fortune', value: fortune },
		)
		.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
		.setTimestamp();
		message.channel.send(embed);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'poggers')) {
		const command = '>poggers ';
		const args = message.content.slice(command.length).trim().split(/ -/);
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.tag == args[0]);
		if (!member) return message.channel.send(`${message.member.nickname} didn't add a member. Poggers!`);
		if (member.user.id == message.author.id) return message.channel.send(`${message.member.nickname} added themselves as their member. Poggers!`);
		const events = ['left their homework at home', 'died while grabbing their chair', 'fell off a cliff', 'was desintegrated', 'lost their job', 'went to sleep', 'failed their test', 'became sick', 'grew a plant', 'got destroyed by someone in Rocket League', 'forgot they had a meeting today', 'breathed once', 'went to sleep', 'did a random thing', 'punched someone else', 'went on Reddit and insulted everyone who had an opinion', 'went on Twitter and stood up to a misandrist', 'cried after being rejected by their crush', 'hid in a closet', 'tickled the cheese', 'went to a restaurant', 'caused a war between two Discord servers', 'joined the Reddit hivemind', 'read a book', 'sat in their backyard', 'listened to music', 'kicked a tree'];
		const event = events[Math.floor(Math.random() * events.length)];
		message.channel.send(`${member.nickname} ${event}. In response, ${message.member.nickname} said "Poggers!".`);
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'giveaway')) {
		BetaCheck(message);
		// eslint-disable-next-line no-unused-vars
		const server = servers[message.guild.id];
		client.commands.get('giveaway').execute(message, server);
	}
});

client.on('messageReactionAdd', async (reaction, user) => {
	if (!reaction.message.guild) return;
	const server = servers[reaction.message.guild.id];
	if (reaction.emoji.url != null && reaction.emoji.name != 'tada') return;
	for (var i = 0; i < server.giveaways.length; i++) {
		if (server.giveaways[i].msgID == reaction.message.id) {
			if (user.bot) return;
			const embed = new Discord.MessageEmbed();
			embed.setTitle(`${server.giveaways[i].member.displayName}'s giveaway`);
			embed.setDescription(`Hi! It looks like you have entered to the giveaway in ${server.giveaways[i].channel.guild.name}! Just telling you that once the giveaway ends, you will be sent a message telling you if you won or not! If you leave the giveaway by removing your reaction, you will not be sent a message and will be removed from the participant list.`);
			embed.setFooter(`Giveaway started by ${server.giveaways[i].author.tag}`, server.giveaways[i].author.displayAvatarURL());
			embed.setTimestamp();
			embed.setColor('BLUE');
			// Taken from https://media.hearthpwn.com/attachments/96/923/tadapopper.png
			const attach = new Discord.MessageAttachment('https://media.hearthpwn.com/attachments/96/923/tadapopper.png', 'tada.png');
			embed.setThumbnail(attach.attachment);
			user.send(embed).catch(() => console.log('Could not send user message.'));
			server.giveaways[i].users.push(user.id);
		}
	}
});

client.on('messageReactionRemove', async (reaction, user) => {
	if (!reaction.message.guild) return;
	const server = servers[reaction.message.guild.id];
	if (reaction.emoji.url != null && reaction.emoji.name != 'tada') return;
	for (var i = 0; i < server.giveaways.length; i++) {
		if (server.giveaways[i].msgID == reaction.message.id) {
			if (user.bot) return;
			const attach = new Discord.MessageAttachment('https://media.hearthpwn.com/attachments/96/923/tadapopper.png', 'tada.png');
			const embed = new Discord.MessageEmbed();
			embed.setFooter(`Giveaway started by ${server.giveaways[i].author.tag}`, server.giveaways[i].author.displayAvatarURL());
			embed.setTimestamp();
			embed.setDescription(`Since you left the giveaway in ${server.giveaways[i].channel.guild}, you will no longer be receiving messages related to that giveaway and have been removed from the participant list. Of course, you can join back by reacting to it again.`);
			embed.setTitle(`${server.giveaways[i].member.displayName}'s giveaway`);
			embed.setThumbnail(attach.attachment);
			embed.setColor('BLUE');
			user.send(embed);
			const index = server.giveaways[i].users.indexOf(user.id);
			server.giveaways[i].users.splice(index, 1);
		}
	}
});

client.on('guildMemberRemove', async member => {
	if (!member.guild) return;
	const server = servers[member.guild.id];
	for (var i = 0; i < server.giveaways.length; i++) {
		if (server.giveaways[i].users.some(a => a.toLowerCase() == member.user.id.toLowerCase()) == true) {
			const index = server.giveaways[i].users.indexOf(member.user.id);
			server.giveaways[i].users.splice(index, 1);
		}
	}
});

client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'reload')) {
		if (message.author.id != PEPPY_ID) return message.channel.send('You do not have permission to use this.');
		const c = '>reload ';
		const args = message.content.slice(c.length).trim().split(/ +/);
		if (!args[0]) return message.channel.send('You didn\'t pass any command to reload!');
		client.commands.get('reload').execute(message, client, args);
	}
});