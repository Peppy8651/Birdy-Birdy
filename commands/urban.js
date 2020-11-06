const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name:'urban',
	description:'urban dictionary command using node-fetch and urban dictionary api',
	async execute(message) {
		const command = '>urban ';
		const args = message.content.slice(command.length).trim().split(/ -/);
		const query = args.join(' ');
		if (!query) return message.channel.send('You need a search query!');
		// eslint-disable-next-line no-unused-vars
		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?term=${query}`).then(response => response.json()).catch(e => {
			return message.channel.send('Couldn\'t find anything.');
		});
		try {
			if (!list[0].example) {
				const embed = new Discord.MessageEmbed()
					.setAuthor(list[0].author)
					.setTitle(`${list[0].word}`)
					.setColor(0xC0C0C0)
					.setURL(`${list[0].permalink}`)
					.setDescription(`**Definition**
${list[0].definition}`)
					.setFooter(`👍${list[0].thumbs_up} 👎${list[0].thumbs_down}
Command used by ${message.author.tag} • Powered by Urban Dictionary`, message.author.displayAvatarURL())
					.setTimestamp();
				message.channel.send(embed);
			}
			else {
				const embed = new Discord.MessageEmbed()
					.setAuthor(list[0].author)
					.setTitle(`${list[0].word}`)
					.setColor(0xC0C0C0)
					.setURL(`${list[0].permalink}`)
					.setDescription(`**Definition**
${list[0].definition}

**Example**
${list[0].example}`)
					.setFooter(`👍${list[0].thumbs_up} 👎${list[0].thumbs_down}
Command used by ${message.author.tag} • Powered by Urban Dictionary`, message.author.displayAvatarURL())
					.setTimestamp();
				message.channel.send(embed);
			}
		}
		catch (error) {
			message.channel.send('There was a problem doing this. It\'s most likely that you didn\'t put a valid search query.');
		}
	},
};