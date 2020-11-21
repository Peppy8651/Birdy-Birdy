const { globalPrefix } = require('../../config.json');

module.exports = {
	command: `${globalPrefix}add`,
	description: 'Adds a video or song to the queue if something is currently playing in a server.',
	usage1: `\`${globalPrefix}add (query: searchQuery)\`
Adds to the queue using the link fetched from the search query. You need to be in a voice channel for this and the queue has to be playing.`,
	usage2: `\`${globalPrefix}add (url: video)\`
Adds link the to the queue and gets information from it. You need to be in a voice channel for this.`,
};