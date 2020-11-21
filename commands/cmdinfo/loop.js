const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}loop`,
	description: 'Loops audio from an already playing video.',
	usage1: `\`${globalPrefix}loop\`
If the queue is not looping, it makes it loop. If it is looping, it stops looping.`,
	usage2: `\`${globalPrefix}loop (args[0]: boolean)\`
Makes the queue loop depending if the args is true or false.`,
};