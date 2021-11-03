const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}info`,
	description: 'Gives information about something or someone.',
	usage1: `\`${globalPrefix}info\`
Gives information about the message author. This is the default usage.`,
	usage2: `\`${globalPrefix}info (member: guildMember)\`
Gives information about the pinged member.`,
	usage3: `\`${globalPrefix}info (role: Role)\`
Gives information about the pinged role.`,
	usage4: `\`${globalPrefix}info server\`
Gives information about the server the command was sent in.`,
};