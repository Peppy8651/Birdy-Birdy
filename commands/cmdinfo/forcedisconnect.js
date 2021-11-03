const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}forcedisconnect`,
	description: 'Makes Birdy forcefully disconnect from a voice channel even if it\'s playing..',
	usage1: `\`${globalPrefix}forcedisconnect\`
Birdy disconnects from the voice channel with less fussing and cleans up. This is best used when the audio player breaks because I'm dumb.`,
	usage2: `\`${globalPrefix}fd\`
Birdy disconnects from the voice channel with less fussing and cleans up. This is best used when the audio player breaks because I'm dumb.`,
};