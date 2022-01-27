const globalPrefix = '>';

module.exports = {
	command: `${globalPrefix}reload`,
	description: 'Reloads a command in the commands folder.',
	usage1: `\`${globalPrefix}reload (args[0]: command)\`
Reloads a command if it is in the commands folder. If it is in the main file, it cannot be reloaded. Only the owner of the bot can use this command.`,
};