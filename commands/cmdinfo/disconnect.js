const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}disconnect`,
	description: 'Makes Birdy disconnect from a voice channel.',
	usage1: `\`${globalPrefix}disconnect\`
Birdy disconnects from the voice channel, clears the queue, and sets it to not playing.`,
};