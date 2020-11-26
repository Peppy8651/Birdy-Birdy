const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}singlememe`,
	description: 'Makes a memeish embed using an argument. You could also make normal embeds with it I dunno.',
	usage1: `\`${globalPrefix}singlememe (args: text)\`
This is the default command. It basically sends an embed with your arguments as its description.`,
};