const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}1-10`,
	description: 'Gives a random number from 1 to 10.',
	usage1: `\`${globalPrefix}1-10\`
Very simple. It gets a random number from 1 to 10 and then sends it in the channel.`,
};