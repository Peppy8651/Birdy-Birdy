const globalPrefix = '>';

module.exports = {
	command: `${globalPrefix}urban`,
	description: 'Gives information from the Urban Dictionary related to the search query.',
	usage1: `\`${globalPrefix}urban (query: searchQuery)\`
Fetches from the Urban Dictionary API and sends the first entry as an embed.`,
};