const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}resume`,
	description: 'Resumes the player if it is paused.',
	usage1: `\`${globalPrefix}resume\`
If the player is paused, it will resume the player. You need to be in a voice channel to do this and Birdy must be playing music.`,
};