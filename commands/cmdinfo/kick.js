const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}kick`,
	description: 'Kicks a member. You need to have the Administrator or KICK MEMBERS permission to use this command.',
	usage1: `\`${globalPrefix}kick\`
This is the default command. You need a guildMember for this usage.`,
};