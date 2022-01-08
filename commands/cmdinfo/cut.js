const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}cut`,
	description: 'Cuts out a certain URL in a queue and keeps it from being played if it is not already being played.',
	usage1: `\`${globalPrefix}cut (args: Number)\`
This cuts out a video with the selected number from the queue.`,
};