const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}skip`,
	description: 'Skips songs in the queue.',
	usage1: `\`${globalPrefix}skip\`
This just skips one song in the queue.`,
	usage2: `\`${globalPrefix}skip (args: Number)\`
Skips the selected amount of songs in the queue. If it is less than 0 or there is not enough songs in the queue, it will throw an error at you.`,
};