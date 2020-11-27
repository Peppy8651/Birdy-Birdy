const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}ban`,
	description: 'Bans a member. You need the Administrator or BAN MEMBERS permission to do this.',
	usage1: `\`${globalPrefix}ban\`
This is the default command. You need to ping a guildMember for this.`,
};