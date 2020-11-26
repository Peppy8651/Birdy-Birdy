const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}dog`,
	description: 'Sends a random dog picture.',
	usage1: `\`${globalPrefix}dog\`
Sends a random dog picture from **[this website](https://random.dog/woof.json)**.`,
};