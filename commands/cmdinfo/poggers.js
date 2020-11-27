const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}poggers`,
	description: 'Gives a random event and a reaction by the message author.',
	usage1: `\`${globalPrefix}poggers (member: guildMember)\`
An event has happened to the pinged member and the message author reacts to it by saying "Poggers!". This is the default command. You need to ping a member for this usage.`,
	usage2: `\`${globalPrefix}poggers (member: args[0])\`
Does the same thing as the above usage. However, you can add an ID or a tag to use this. If you do not add any of these two, it defaults to the first usage.`,
};