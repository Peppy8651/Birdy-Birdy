module.exports = {
	name: 'poggers',
	description: 'poggers command',
	async execute(message) {
		const command = '>poggers ';
		const args = message.content.slice(command.length).trim().split(/ -/);
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.tag == args[0]);
		if (!member) return message.channel.send(`${message.member.displayName} didn't add a member. Poggers!`);
		if (member.user.id == message.author.id) return message.channel.send(`${message.member.displayName} added themselves as their member. Poggers!`);
		const events = ['left their homework at home', 'died while grabbing their chair', 'fell off a cliff', 'was desintegrated', 'lost their job', 'went to sleep', 'failed their test', 'became sick', 'grew a plant', 'got destroyed by someone in Rocket League', 'forgot they had a meeting today', 'breathed once', 'went to sleep', 'did a random thing', 'punched someone else', 'went on Reddit and insulted everyone who had an opinion', 'went on Twitter and stood up to a misandrist', 'cried after being rejected by their crush', 'hid in a closet', 'tickled the cheese', 'went to a restaurant', 'caused a war between two Discord servers', 'joined the Reddit hivemind', 'read a book', 'sat in their backyard', 'listened to music', 'kicked a tree'];
		const event = events[Math.floor(Math.random() * events.length)];
		const pogs = ['Pog', 'Poggers'];
		const pog = pogs[Math.floor(Math.random() * pogs.length)];
		message.channel.send(`${member.displayName} ${event}. In response, ${message.member.displayName} said "${pog}!"`);
	},
};