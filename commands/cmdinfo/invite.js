/* eslint-disable indent */
const { globalPrefix } = require('../../config.json');

module.exports = {
    command: `${globalPrefix}invite`,
    description: 'Sends a server invite.',
    usage1: `\`${globalPrefix}invite\`
Sends the server invite in the server the message was sent in.`,
    usage2: `\`${globalPrefix}invite (user: User)\`
Sends the server invite to the selected user.`,
};