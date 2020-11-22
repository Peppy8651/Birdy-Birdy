const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}loop`,
	description: 'Loops audio from an already playing video.',
	usage1: `\`${globalPrefix}loop\`
If the video is not looping, it makes it loop. If it is looping, it stops looping.`,
	usage2: `\`${globalPrefix}loop (args[0]: boolean)\`
Makes the video loop depending if the args is true or false.`,
	usage3: `\`${globalPrefix}loop queue\`
Loops the queue. If the queue is not looping, it loops. If it is looping, it stops looping.`,
	usage4: `\`${globalPrefix}loop queue (args[1]: boolean)\`
Loops the queue depending on the argument after "queue".`,
};