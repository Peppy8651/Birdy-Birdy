const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}np`,
	description: 'Shows what is currently playing in the server queue.',
	usage1: `\`${globalPrefix}np\`
Shows the current playing song in the queue and if it's looping or not.`,
};