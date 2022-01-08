module.exports = {
	name: '1-10',
	description: '1-10 command',
	execute(message) {
		// eslint-disable-next-line no-unused-vars
		const BirdyNumber = Math.floor(Math.random() * 10) + 1;
		const number = BirdyNumber > 10 ? BirdyNumber - 1 : BirdyNumber;
		message.channel.send(`Your number is **${number}**`).catch(() => {
			return message.channel.send('There was a problem doing that.');
		});
	},
};