const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}fortune`,
	description: 'Gives you a random fortune.',
	usage1: `\`${globalPrefix}fortune\`
Sends a random fortune in a message embed.`,
};