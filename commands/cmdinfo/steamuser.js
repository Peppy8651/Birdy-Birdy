const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}steamuser`,
	description: 'Gives information about a user on the Steam platform.',
	usage1: `\`${globalPrefix}steamuser (args: steamUser)\`
This fetches information about a Steam user. You can use usernames or Steam User IDs.`,
};