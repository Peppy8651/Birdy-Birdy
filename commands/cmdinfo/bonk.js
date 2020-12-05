const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}bonk`,
	description: 'Post a picture of you bonking someone else',
	usage1: `\`${globalPrefix}bonk (member: guildMember)\`
Posts a picture of you bonking the pinged member.`,
	usage2: `\`${globalPrefix}bonk (args[0]: guildMember)\`
The same thing as usage (1) but you can use a tag or an ID.`,
};