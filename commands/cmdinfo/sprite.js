const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}sprite`,
	description: 'Sends a picture of a profile picture on Lebron James holding a gun in a Sprite Cranberry commercial.',
	usage1: `\`${globalPrefix}sprite\`
Makes the picture include the message author's profile picture.`,
	usage2: `\`${globalPrefix}sprite (member: guildMember)\`
Makes the pinged member's profile picture included in the picture.`,
};