const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}turkeyfight`,
	description: 'Engages you in a turkey fight with the pinged member. You can punch, slam, shove, or concede. Game ends when you concede or when a player has less than 0 health.',
	usage1: `\`${globalPrefix}turkeyfight (member: guildMember)\`
You turkeyfight the pinged member and you win if they concede or die.`,
};