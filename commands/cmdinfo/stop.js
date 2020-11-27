const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}stop`,
	description: 'If audio is being played in a voice channel, this command ends that session by destroying the dispatcher connection.',
	usage1: `\`${globalPrefix}stop\`
Stops the song, clears the queue, and turns the playing boolean to false.`,
};