const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}cursed`,
	description: 'Gives a cursed image from a random subreddit. Why is this in the fun section? A 5 second cooldown applies to this command.',
	usage1: `\`${globalPrefix}cursed\`
Fetches a cursed image and related information and sends it as a message embed.`,
};