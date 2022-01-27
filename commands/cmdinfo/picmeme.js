const globalPrefix = '>';

module.exports = {
	command: `${globalPrefix}picmeme`,
	description: 'Makes a memeish embed using arguments and urls.',
	usage1: `\`${globalPrefix}picmeme (args[0]: description)\`
This is the default command. It makes an embed with your arguments as the description. You need an attachment for this usage.`,
	usage2: `\`${globalPrefix}picmeme (args[0]: description) | (args[1]: url)\`
Makes an embed with your arguments before the | as the description and the arguments after as the image link. This becomes the default usage if you don't have any attachments in your message.`,
};