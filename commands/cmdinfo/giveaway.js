const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}giveaway`,
	description: 'Creates a giveaway in the server.',
	usage1: `\`${globalPrefix}giveaway\`
This creates a giveaway in the server in which members in that server can join. You can choose prizes, the time, and the channel where it is hosted at. Eventually once the time is up, it will select a winner and that winner should receive that prize. If the bot goes down during the time that the giveaway is being hosted, the giveaways will be stopped.`,
};