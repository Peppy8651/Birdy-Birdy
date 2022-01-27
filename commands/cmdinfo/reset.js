const globalPrefix = '>';

module.exports = {
	command: `${globalPrefix}reset`,
	description: 'Resets the saved data for this server settings, the queue, etc.',
	usage1: `\`${globalPrefix}reset\`
This is the default usage and the only usage at this time. It basically removes the server data and creates new server data. Only administrators can use this command.`,
};