const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}turkeystats`,
	description: 'Gives information and stats about the current Turkey Fight game. A Turkey Fight game needs to be in session, though.',
	usage1: `\`${globalPrefix}turkeystats\`
If two players are turkeyfighting, you can see their health, the players, and who has the turn.`,
};