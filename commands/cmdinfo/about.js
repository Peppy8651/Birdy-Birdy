const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}about`,
	description: 'Gives details about Birdy Birdy including version and ways to contact the creator.',
	usage1: `\`>about\`
This is the default and only usage of this command. What it does is explained in the description.`,
};