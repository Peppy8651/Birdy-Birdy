const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}function`,
	description: 'Turns a certain Birdy function(yes, communism) on or off.',
	usage1: `\`${globalPrefix}function (args[0]: function) (args[1]: boolean)\`
Turns the added function on or off depending on if the boolean is true or false. Functions currently are yes and communism.`,
};