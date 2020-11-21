const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}timer`,
	description: 'Makes a timer that lasts for up to 23 hours as long as the bot stays online during the selected time.',
	usage1: `\`${globalPrefix}timer\`
This creates a little embed interface that lets you create a timer by choosing a time type and a number of that time.`,
};