const globalPrefix = '>';

module.exports = {
	command: `${globalPrefix}ping`,
	description: 'Pings a member multiple times in a single message.',
	usage1: `\`${globalPrefix}ping (member: guildMember)\`
This is the default command. It just pings them multiple times like in the description. You need a guildMember for this.`,
	usage2: `\`${globalPrefix}ping (member: guildMember) true\`
This pings a member multiple times like the default usage but it uses Text To Speech too. You need a guildMember for this.`,
};