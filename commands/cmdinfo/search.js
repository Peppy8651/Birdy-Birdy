const globalPrefix = '>';

module.exports = {
	command: `${globalPrefix}search`,
	description: 'Searches for top 5 results of a search query on Youtube. It\'s slow tho.',
	usage1: `\`${globalPrefix}search (query: searchQuery)\`
However, this command gets 5 links from a search query, displays them, and you choose which one to play. Loading them takes a bit tho.`,
};