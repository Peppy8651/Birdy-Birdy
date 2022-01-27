/* eslint-disable indent */
const globalPrefix = '>';
module.exports = {
    command: `${globalPrefix}help`,
    description: 'Gives a list of commands.',
    usage1: `\`${globalPrefix}help\`
This is the default command. This gives the list of all current commands.`,
    usage2: `\`${globalPrefix}help define <command>\`
This defines a command from the search query. You can get information and usage from this.`,
};