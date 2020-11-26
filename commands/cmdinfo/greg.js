const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}greg`,
	description: 'Sends a picture from Diary of A Wimpy Kid with the someone\'s profile picture in it.',
	usage1: `\`${globalPrefix}greg\`
This makes the picture include the message author's profile picture.`,
	usage2: `\`${globalPrefix}greg (member: guildMember)\`
This makes the picture include the pinged member's profile picture.`,
};