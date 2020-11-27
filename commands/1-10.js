module.exports = {
	name: '1-10',
	description: '1-10 command',
	async execute(message) {
		const BirdyNumber = Math.floor(Math.random() * 10) + 1;
		// eslint-disable-next-line no-unused-vars
		message.channel.send(`Your number is **${BirdyNumber}**`).catch(e => {
			return message.channel.send('There was a problem doing that.');
		});
	},
};