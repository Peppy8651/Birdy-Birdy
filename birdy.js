/* eslint-disable no-unreachable */
/* eslint-disable curly */
/* eslint-disable brace-style */
/* eslint-disable no-inner-declarations */
/* eslint-disable max-nested-callbacks */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-inline-comments */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
const http = require('http');
const server = http.createServer((req, res) => {
	res.writeHead(200);
	res.end('ok ok ok');
});
const fs = require('fs');
server.listen(3000);
const Discord = require('discord.js');
const SteamAPI = require('steamapi');
const steam = new SteamAPI(`${process.env.SteamKey}`);
const { Intents } = require('discord.js');
const int = [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES];
const client = new Discord.Client({ intents: int });
let { version } = require('./package.json');
const globalPrefix = '>';
const token = process.env.TOKEN;
client.setMaxListeners(100);
client.commands = new Discord.Collection();
const timers = new Discord.Collection();
// eslint-disable-next-line no-unused-vars
function BetaCheck(msg) {
	if (
		msg.guild.id != '774316995897982980' &&
		msg.guild.id != '699461818422394910' &&
		msg.guild.id != '615884282040287242'
	) {
		msg.channel.send('This command is currently being tested and cannot be used outside of featured servers.');
		return false;
	} else {
		return true;
	}
}

const playingMap = new Map();
const commandFiles = fs
	.readdirSync('./commands')
	.filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}
const cooldowns = new Discord.Collection();

client.login(`${token}`);
client.on('ready', () => {
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


client.on('guildCreate', guild => {
	console.log(`Was added to ${guild.name}!`);
});
const { ClientServer } = require('./server.js');
const MYGUILD = new ClientServer('615884282040287242', client);
let servers = [MYGUILD];

client.on('messageCreate', message => {
	if (!message.guild) return;
	if (servers.some(s => s.id == message.guild.id) === true) return;
	const serve = new ClientServer(message.guild.id, client);
	servers.push(serve);
});
// eslint-disable-next-line no-unused-vars
function spooky(msg) {
  if (typeof msg === 'string') {
    client.guilds.cache.find(g => g.name === 'Bruhchannel Official').channels.cache.find(c => c.name == 'general').send(msg);
  }
}
client.on('messageCreate', message => {
  switch (message.content.toLowerCase()) {
    case 'you\'re a chicken':
      message.channel.send('no u');
      break;
    case 'youre a chicken':
		message.channel.send('no u');
      break;
    case 'your a chicken':
		message.channel.send('no u');
      break;
    case 'ur a chicken':
		message.channel.send('no u');
      break;
	case 'you are a chicken':
		message.channel.send('no u');
		break;
    default:
      break;
  }
});

process.on('unhandledRejection', error => {
	console.log(`Got an error: ${error.message}. You should go check it out in /home/runner/Birdy-Birdy/errors`);
    fs.writeFile(`./errors/${error.message}.txt`, error + error.stack, function(err) {
      if (err) console.log(err);
    });
});

client.on('messageCreate', message => {
	if (!message.content.toLowerCase().startsWith(globalPrefix) || message.author.bot == true) {
		return;
	}
	if (message.content.toLowerCase().startsWith(globalPrefix + 'help')) {
		const command = '>help ';
		const args = message.content
			.slice(command.length)
			.trim()
			.split(/ +/);
		const action = args[0];
		if (!action)
			return client.commands.get('help').execute(message, client, globalPrefix);
		if (action.toLowerCase() == 'define') {
			client.commands.get('helpdefine').execute(message, args, client);
		} else {
			client.commands.get('help').execute(message, client, globalPrefix);
		}
	} else if (message.content.toLowerCase() == globalPrefix + 'reset') {
		if (!message.member.permissions.has('ADMINISTRATOR'))
			return message.channel.send('Only admins can use this command.');
		const servey = servers.find(s => s.id == message.guild.id);
		if (
			playingMap.has('Now Playing', message.guild.id) ||
			servey.turkeyfight.playing === true ||
			servey.giveaways.length > 0
		)
			return message.channel.send('Sorry, cannot reset the server settings and functions while someone else is using it.');
		const ClientServerDefault = {
			id: this.id,
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
		if (servey == ClientServerDefault)
			return message.channel.send('There is nothing to change, it\'s already set to the default settings.');
		message.channel.send('Reset the server data!');
	} else {
		let cmd = message.content
			.slice(globalPrefix.length)
			.trim()
			.split(/ +/)[0]
			.toLowerCase();
		if (cmd == 'eightball') cmd = '8ball';
		if (cmd == 'unpause') cmd = 'resume';
		if (cmd == 'fd') cmd = 'forcedisconnect';
		if (!cmd) return;
		const command = client.commands.get(`${cmd}`);
		const servey = servers.find(s => s.id == message.guild.id);
		if (!command) return;
		if (!command.execute || command.execute === undefined) return;
		if (!command.execute || command.execute === undefined) return;
		if (command.beta === true && BetaCheck(message) === true) return;
		if (command.authorcheck === true && message.author.id == client.user.id)
			return;
		if (cmd == 'changelog') return command.execute(message, client, version);
		if (cmd == 'timer') return command.execute(message, timers);
		if (cmd == 'function' || cmd == 'giveaway' || cmd == 'snipe')
			return command.execute(message, servey);
		if (
			cmd == 'loop' ||
			cmd == 'add' ||
			cmd == 'disconnect'
		)
			return command.execute(message, servers, playingMap);
		// eslint-disable-next-line no-unused-vars
		if (
			cmd == 'search' ||
			cmd == 'skip' ||
			cmd == 'stop'
		)
			return command.execute(message, servers, playingMap);
		if (cmd == 'reset' || cmd == 'preview')
			return command.execute(message, servers, client);
		if (
			cmd == 'cut' ||
			cmd == 'queue' ||
			cmd == 'np' ||
			cmd == 'clear'
		)
			return command.execute(message, servey, playingMap);
		if (cmd == 'rr')
			return command.execute(message, servey, playingMap);
		if (cmd == 'pause' || cmd == 'resume')
			return command.execute(message, servey, playingMap);
		if (cmd == 'turkeystats') return command.execute(message, servers);
		if (cmd == 'forcedisconnect') return command.execute(message, servers);
		if (
			cmd == 'meme' ||
			cmd == 'cursed' ||
			cmd == 'reddit' ||
			cmd == 'ping' ||
			cmd == 'dog' ||
			cmd == 'delete' ||
			cmd == 'bonk' ||
			cmd == 'greg' ||
			cmd == 'sprite' ||
			cmd == 'urban' ||
			cmd == 'cat'
		) {
			if (!cooldowns.has(command.name)) {
				cooldowns.set(command.name, new Discord.Collection());
			}
			const now = Date.now();
			const timestamps = cooldowns.get(command.name);
			const cooldownAmount = (command.cooldown || 3) * 1000;
			if (timestamps.has(message.author.id)) {
				const expirationTime =
					timestamps.get(message.author.id) + cooldownAmount;
				if (now < expirationTime) {
					const timeLeft = (expirationTime - now) / 1000;
					return message.channel.send(`WOAH WOAH WOAH! Calm down there, buddy. We need to wait ${timeLeft.toFixed(1)} more second(s). It shouldn't be that much...`);
				}
				command.execute(message);
			}
			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		}
		if (cmd == 'turkeyfight') return command.execute(message, servey, client);
		if (
			cmd == 'reload' ||
			cmd == 'about' ||
			cmd == 'suggest' ||
			cmd == 'fortune'
		)
			return command.execute(message, client);
    if (cmd == 'steamgame' || cmd == 'steamuser' || cmd == 'steamsearch') return command.execute(message, steam);
		if (cmd == 'play') {
			if (!message.member.voice.channel)
				return message.channel.send('You need to be in a voice channel to perform this command.');
			if (!message.guild.me.permissions.has('CONNECT'))
				return message.channel.send('I cannot connect to the voice channel!');
			if (!message.guild.me.permissions.has('SPEAK'))
				return message.channel.send('I cannot speak in the voice channel!');
			if (
				playingMap.has(`${message.guild.id}`, 'Now Playing') == true &&
				message.member.voice.channelID != message.guild.me.voice.channelID
			)
				return message.channel.send('There is already someone playing music in this server!');
			if (message.content.includes('https://www.youtube.com/playlist?')) {
				return message.channel.send('Sorry, but playlist support has been removed.');
				// client.commands.get('plplay').execute(message, servey, playingMap);
			} else {
				command.execute(message, servers, playingMap);
				return;
			}
		} else {
			command.execute(message);
		}
	}
});
// eslint-disable-next-line no-unused-vars
const PEPPY_ID = '490548233601417223';

client.on('voiceStateUpdate', (oldState, newState) => {
	if (!newState.guild) return;
  if (newState.member.user.id != client.user.id) return;
	if (!newState.channel && playingMap.has(`${newState.guild.id}`, 'Now Playing')) {
		playingMap.delete(`${newState.guild.id}`, 'Now Playing');
		const servie = servers.find(s => s.id == newState.guild.id);
		servie.queue.splice(0, servie.queue.length);
		servie.loopvalue = false;
		servie.loopqueue = false;
		servie.loopcount = 0;
		servie.errorcount = 0;
		servie.paused = false;
		servie.player = null;
	}
});

client.on('messageCreate', message => {
	if (!message.guild) return;
	if (message.author.id === client.user.id) return;
	const serv = servers.find(s => s.id == message.guild.id);
	if (serv.communism === false) return;
	if (message.content.toLowerCase().includes('my')) {
		message.channel.send('You mean **OUR**?');
	} else if (message.content.toLowerCase().includes('mine')) {
		message.channel.send('You mean **OURS**?');
	}
});

client.on('messageCreate', message => {
	if (!message.guild) return;
	if (message.author.id === client.user.id) return;
	const serve = servers.find(s => s.id == message.guild.id);
	if (serve.yes === false) return;
	if (message.content.toLowerCase().includes('yes')) {
		message.channel.send('no');
	} else if (message.content.toLowerCase().includes('no')) {
		message.channel.send('yes');
	}
});

client.on('messageDelete', message => {
	if (!message.guild) return;
	const serve = servers.find(s => s.id == message.guild.id);
	if (!serve) return;
	const time = new Date();
	const timetime = time.toLocaleString('en-US', { timeZone: 'UTC' });
	if (!message.attachments.first()) img = undefined;
	if (message.attachments.first()) img = message.attachments.first().proxyURL;
  const createdAtTime = message.createdAt.toLocaleString('en-US', { timeZone: 'UTC' });
	const msg = {
		content: message.content,
		channel: message.channel,
		member: message.member,
		author: message.author,
		guild: message.guild,
		time: timetime,
		image: img,
    createdAt: createdAtTime,
	};
	if (!serve.snipe[0]) serve.snipe.push(msg);
	if (serve.snipe[0]) {
		serve.snipe.splice(0, serve.snipe.length);
		serve.snipe.push(msg);
	}
});

client.on('messageReactionAdd', async (reaction, user) => {
	if (!reaction.message.guild) return;
	const serve = servers.find(s => s.id == reaction.message.guild.id);
	if (reaction.emoji.url != null && reaction.emoji.name != 'tada') return;
	for (var i = 0; i < serve.giveaways.length; i++) {
		if (serve.giveaways[i].msgID == reaction.message.id) {
			if (user.bot) return;
			const embed = new Discord.MessageEmbed();
			embed.setTitle(`${serve.giveaways[i].member.displayName}'s giveaway`);
			embed.setDescription(
				`Hi! It looks like you have entered to the giveaway in ${
					serve.giveaways[i].channel.guild.name
				}! Just telling you that once the giveaway ends, you will be sent a message telling you if you won or not! If you leave the giveaway by removing your reaction, you will not be sent a message and will be removed from the participant list.`,
			);
			embed.setFooter(
				`Giveaway started by ${serve.giveaways[i].author.tag}`,
				serve.giveaways[i].author.displayAvatarURL(),
			);
			embed.setTimestamp();
			embed.setColor('BLUE');
			// Taken from https://media.hearthpwn.com/attachments/96/923/tadapopper.png
			const attach = new Discord.MessageAttachment(
				'https://media.hearthpwn.com/attachments/96/923/tadapopper.png',
				'tada.png',
			);
			embed.setThumbnail(attach.attachment);
			user.send({ embeds: [embed] }).catch(() => console.log('Could not send user message.'));
			serve.giveaways[i].users.push(user.id);
		}
	}
});

client.on('messageReactionRemove', async (reaction, user) => {
	if (!reaction.message.guild) return;
	const serve = servers.find(s => s.id == reaction.message.guild.id);
	if (reaction.emoji.url != null && reaction.emoji.name != 'tada') return;
	for (var i = 0; i < serve.giveaways.length; i++) {
		if (serve.giveaways[i].msgID == reaction.message.id) {
			if (user.bot) return;
			const attach = new Discord.MessageAttachment(
				'https://media.hearthpwn.com/attachments/96/923/tadapopper.png',
				'tada.png',
			);
			const embed = new Discord.MessageEmbed();
			embed.setFooter(
				`Giveaway started by ${serve.giveaways[i].author.tag}`,
				serve.giveaways[i].author.displayAvatarURL(),
			);
			embed.setTimestamp();
			embed.setDescription(
				`Since you left the giveaway in ${
					serve.giveaways[i].channel.guild
				}, you will no longer be receiving messages related to that giveaway and have been removed from the participant list. Of course, you can join back by reacting to it again.`,
			);
			embed.setTitle(`${serve.giveaways[i].member.displayName}'s giveaway`);
			embed.setThumbnail(attach.attachment);
			embed.setColor('BLUE');
			user.send({ embeds: [embed] });
			const index = serve.giveaways[i].users.indexOf(user.id);
			serve.giveaways[i].users.splice(index, 1);
		}
	}
});

client.on('guildMemberRemove', async member => {
	if (!member.guild) return;
	const serve = servers.find(s => s.id === member.guild.id);
	if (!serve) return;
	for (var i = 0; i < serve.giveaways.length; i++) {
		if (
			serve.giveaways[i].users.some(
				a => a.toLowerCase() == member.user.id.toLowerCase(),
			) == true
		) {
			const index = serve.giveaways[i].users.indexOf(member.user.id);
			serve.giveaways[i].users.splice(index, 1);
		}
	}
});

client.on('guildDelete', async guild => {
	const serve = servers.find(s => s.id == guild.id);
	if (!serve) return;
	const index = servers.indexOf(serve);
	servers.splice(index, 1);
});

// eslint-disable-next-line no-unused-vars
let presence = setInterval(() => {
	const Activity = client.user.presence.activities.find(a => a.type == 'LISTENING');
	if (!Activity) {
		const command = client.commands.get('status');
		const BirdyActivity = command.fetchStatus();
		client.user.setActivity(BirdyActivity, {
				type: 'LISTENING',
				name: BirdyActivity,
    }).then(() => console.log('Reset status'));
	}
}, 120000);
