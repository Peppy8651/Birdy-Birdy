const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}delete`,
	description: 'Deletes a certain amount of messages up to 99.',
	usage1: `\`${globalPrefix}delete (amount: Number)\`
Deletes the specified number of messages above the command as long as they are not over 99 and over 14 days old.`,
};