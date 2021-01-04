const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}steamgame`,
	description: 'Gives information about a game on the Steam platform.',
	usage1: `\`${globalPrefix}steamgame (query: query)\`
Sends information about a game from the query.`,
  usage2: `\`${globalPrefix}steamgame (query: appID)\`
Sends information about a game from the app ID.`,
};