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

client.on('guildCreate', async guild => {
	console.log(`Was added to ${guild.name}!`);
});

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
		client.helpcommands.get('help').execute(message, client, globalPrefix);
	}
	else if (message.content.toLowerCase().startsWith('>help' + ' info')) {
		client.helpcommands.get('helpinfo').execute(message, client, globalPrefix);
	}
	else if (message.content.toLowerCase().startsWith('>help' + ' fun')) {
		client.helpcommands.get('helpfun').execute(message, client, globalPrefix);
	}
	else if (message.content.toLowerCase().startsWith('>help' + ' misc')) {
		client.helpcommands.get('helpmisc').execute(message, client, globalPrefix);
	}
	else if (message.content.toLowerCase().startsWith('>help' + ' music')) {
		client.helpcommands.get('helpmusic').execute(message, client, globalPrefix);
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
		if (!message.guild.me.hasPermission('ADMINISTRATOR')) return message.channel.send('Sorry, can\'t kick anybody without the ADMINISTRATOR permission.');
		if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You don\'t have the permissions to use this command!');
		client.commands.get('kick').execute(message);
	}
});

client.on('message', async message => {
	if(!message.guild) return;
	if(message.author.id === client.user.id) return;
	if(message.content.toLowerCase().startsWith(globalPrefix + 'ban')) {
		if (!message.guild.me.hasPermission('ADMINISTRATOR')) return message.channel.send('Sorry, can\'t ban anybody without the ADMINISTRATOR permission.');
		if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You don\'t have the permissions to use this command!');
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
			img = message.attachments.first().url;
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

const ytdl = require('ytdl-core');
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
		if (server.loopvalue != false) server.loopvalue == false;
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
				URLtitles.push(`${queueNumber}. **[${server.queue[0].title}](${server.queue[0].url})**: ${server.queue[0].duration}`);
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
		const clearedInfo = await ytdl.getBasicInfo(`${server.queue[clearcount]}`);
		server.queue.splice(clearcount, 1);
		message.channel.send(`Cut **${clearedInfo.videoDetails.title}** out of queue.`);
	}
});

client.on('message', message => {
	if (!message.guild) return;
	if (client.user.id == message.author.id) return;
	if (message.content.toLowerCase().startsWith(globalPrefix + 'disconnect')) {
		if (!message.member.voice.channel) return message.channel.send('You cannot perform this command outside a voice channel.');
		if (!message.guild.me.voice.channel) return message.channel.send('I\'m not in a channel so I can\'t leave.');
		if (playingMap.has(`${message.guild.id}`, 'Now Playing')) return message.channel.send('Sorry, but I can\'t let you disconnect me from a voice channel while I\'m playing.');
		try {
			message.guild.voice.connection.disconnect();
		}
		catch (error) {
			message.guild.voice.channel.leave();
		}
		finally {
			loopvalue = false;
		}
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
		let value;
		if (server.loopvalue == true) value = 'Yes';
		if (server.loopvalue == false) value = 'No';
		const embed = new Discord.MessageEmbed()
			.setTitle('**Currently Playing**')
			.setColor(0xFF0000)
			.setThumbnail(server.queue[0].thumbnail)
			.addFields(
				{ name: 'Looping?', value: value, inline: true },
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
		const member = message.mentions.members.first() || message.guild.members.cache.get(`${args[0]}`) || message.guild.members.cache.find(m => m.user.tag == `${args[0]}`);
		const canvas = Canvas.createCanvas(1289, 1024);
		const ctx = canvas.getContext('2d');
		const background = await Canvas.loadImage('./greg.png');
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		let avatar;
		if (member) avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
		if (!member) avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));
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
		const member = message.mentions.members.first() || message.guild.members.cache.get(`${args[0]}`) || message.guild.members.cache.find(m => m.user.tag == `${args[0]}`);
		const canvas = Canvas.createCanvas(600, 336);
		const ctx = canvas.getContext('2d');
		const background = await Canvas.loadImage('./sprite.jpg');
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		let avatar;
		if (member) avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
		if (!member) avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));
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
			.setThumbnail(message.guild.iconURL())
			.setImage(message.guild.bannerURL())
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