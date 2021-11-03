const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}preview`,
	description: 'Lets you preview some objects in Birdy\'s code',
	usage1: `\`${globalPrefix}preview (args[0]: thing)\`
Lets you preview a brand new server object, the current server object, the turkeyfight object, or even the first song in a queue.`,
};