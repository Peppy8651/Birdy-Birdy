const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}reddit`,
	description: 'Fetches a random post from the selected subreddit from reddit.',
	usage1: `\`${globalPrefix}reddit (query: subreddit)\`
Fetches from this subreddit and then gets a random post and sends it as an embed. If the subreddit or post is NFSW, it will not display.`,
};