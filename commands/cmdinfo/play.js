const globalPrefix = '>';

module.exports = {
	command: `${globalPrefix}play`,
	description: 'Plays the audio from the selected Youtube video in a voice channel. If something is already being played, it is added to the server\'s queue.',
	usage1: `\`${globalPrefix}play (query: searchQuery)\`
It uses a package that gets a link from the search query and plays from that link.`,
	usage2: `\`${globalPrefix}play (url: video)\`
Plays the video from the link directly. This is the fastest way to play audio since it directly uses the link instead of finding it from a query or a playlist.`,
	usage3: `\`${globalPrefix}play (url: playlist)\`
Fetches the URLs from the playlist link, puts them into the queue, and plays the first song. This is currently unsupported but will be fixed in the future.`,
};