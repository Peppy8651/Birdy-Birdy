const { globalPrefix } = require('../../config.json');
module.exports = {
	command: `${globalPrefix}clear`,
	description: 'Clears the queue.',
	usage1: `\`${globalPrefix}clear\`
Clears the whole server queue unless there is less than 2 songs. You need to be in a voice channel to use this.`,
};