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
let servers = {};
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
			loopcount: 0,
			errorcount: 0,
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
const playingMap = new Map();
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

client.on('message', async message => {
	if (!message.content.toLowerCase().startsWith(globalPrefix)) return;
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
	else {
		let cmd = message.content.slice(globalPrefix.length).trim().split(/ +/)[0].toLowerCase();
		const command = await client.commands.get(`${cmd}`);
		const server = servers[message.guild.id];
		if (cmd == 'eightball') cmd = '8ball';
		if (!cmd) return;
		if (!command) return;
		if (!command.execute) return;
		if (command.beta == false) BetaCheck(message);
		if (command.authorcheck == true && message.author.id == client.user.id) return;
		if (cmd == 'changelog') return command.execute(message, client, version);
		if (cmd == 'function' || cmd == 'giveaway' || cmd == 'snipe') return command.execute(message, server);
		if (cmd == 'loop' || cmd == 'add' || cmd == 'search' || cmd == 'skip' || cmd == 'stop' || cmd == 'disconnect') return command.execute(message, servers, playingMap);
		if (cmd == 'timer') return;
		if (cmd == 'rr' || cmd == 'cut' || cmd == 'queue' || cmd == 'np' || cmd == 'clear') return command.execute(message, server, playingMap);
		if (cmd == 'pause') return command.execute(message, playingMap);
		if (cmd == 'turkeystats') return command.execute(message, servers);
		if (cmd == 'meme' || cmd == 'cursed' || cmd == 'reddit' || cmd == 'ping') {
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
					return message.channel.send(`WOAH WOAH WOAH! Calm down there, buddy. We need to wait ${timeLeft.toFixed(1)} more second(s). It shouldn't be that much...`);
				}
			command.execute(message);
		}
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		}
		if (cmd == 'turkeyfight') return command.execute(message, server, client);
		if (cmd == 'reload' || cmd == 'greg' || cmd == 'about' || cmd == 'sprite' || cmd == 'invite' || cmd == 'suggest' || cmd == 'fortune') return command.execute(message, client);
		if (cmd == 'play') {
			if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to perform this command.');
			if (playingMap.has(`${message.guild.id}`, 'Now Playing') == true && message.member.voice.channelID != message.guild.me.voice.channelID) return message.channel.send('There is already someone playing music in this server!');
			if (message.content.includes('https://www.youtube.com/playlist?')) {
				return message.channel.send('Sorry, but playlist support has been removed.');
				// eslint-disable-next-line no-unreachable
				client.commands.get('plplay').execute(message, server, playingMap);
			}
			else {
				command.execute(message, servers, playingMap);
				return;
			}
		}
		else {
			command.execute(message);
		}
	}
});
// eslint-disable-next-line no-unused-vars
const PEPPY_ID = '490548233601417223';
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

client.on('message', message => {
	if (!message.guild) return;
	if (!message.guild.me.voice.channel && playingMap.has(`${message.guild.id}`, 'Now Playing')) {
		playingMap.delete(`${message.guild.id}`, 'Now Playing');
		const server = servers[message.guild.id];
		server.queue.splice(0, server.queue.length);
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