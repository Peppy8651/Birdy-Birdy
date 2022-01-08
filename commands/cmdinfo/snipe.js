const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}snipe`,
	description: 'Gets a deleted but cached message from the server and posts information about it. If there isn\'t any deleted and cached messages you can\'t snipe anything.',
	usage1: `\`${globalPrefix}snipe\`
Gets the latest deleted and cached message and posts information about it in a message embed.`,
};