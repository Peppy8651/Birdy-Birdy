const globalPrefix = '>';
module.exports = {
	command: `${globalPrefix}changelog`,
	description: 'Gives the changelog of the current Birdy Birdy release from Github. Also gives links to all releases and to the repository.',
	usage1: `\`${globalPrefix}changelog\`
Fetches from Github to get the latest Birdy Birdy release and its information.`,
};