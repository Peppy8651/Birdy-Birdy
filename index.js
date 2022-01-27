const Discord = require('discord.js');
const { Intents } = require('discord.js');
const int = [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES];
const client = new Discord.Client({ intents: int });

client.login(`${process.env.TOKEN}`);

client.on('ready', async () => {
  console.log('Ready!');
});