const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}meme`,
	description: 'Posts a meme from a random meme subreddit to the channel. A 2.5 second cooldown applies to this command.',
	usage1: `\`${globalPrefix}meme\`
Fetches from a subreddit using a node package that can get information from the internet and uses that information to make an embed that has a meme in it.`,
	usage2: `\`${globalPrefix}meme (args[0]: subreddit)\`
Fetches from the added subreddit. If the subreddit is not dank, dankmemes, or memes, it will default to the first usage. The only available subreddits at this time are r/memes and r/dankmemes. (dank or dankmemes is r/dankmemes and memes is r/memes)`,
};