const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}cat`,
	description: 'Gives a random cat picture.',
	usage1: `\`${globalPrefix}cat\`
This sends a random cat picture from **[this website](https://aws.random.cat/meow)**.`,
};