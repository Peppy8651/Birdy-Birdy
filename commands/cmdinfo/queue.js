const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}queue`,
	description: 'Gives the current queue.',
	usage1: `\`${globalPrefix}queue\`
Shows an embed with the numbered queue along with hyperlinks and their durations.`,
};