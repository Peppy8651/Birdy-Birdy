/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
const SteamApi = require('steamapi');
const steam = new SteamApi('A43080429EAC92D1B2A7394AE2AE0EFD');

module.exports = {
	name: 'steamgame',
	description: 'steam game command goes brrr',
	execute(message) {
		const command = ('>steamgame ');
		const args = message.content.slice(command.length).trim().split(/ -/);
		if (!args[0]) return message.channel.send('Hop in! We\'re finding out where the arguments are!');
		const appID = parseInt(args[0]);
		if (isNaN(appID)) {
			return message.channel.send(`Unfortunately, for now you have to use the game's app ID in order to search one up using this command! To find an app ID, go to the game's page on Steam, look at the link, and find the number after \`app\`!
\`Example: https://store.steampowered.com/app/213610\` **<-**`);
		}
		else {
			steam.getGameDetails(appID).then(details => {
				let achievementnumber;
				if (!details.achievements) {
					achievementnumber = '0';
				}
				else if (details.achievements) {
					achievementnumber = details.achievements.total;
				}
				const embed = new Discord.MessageEmbed()
					.setTitle(details.name)
					.setColor(0x2a475e)
					.setDescription(details.short_description)
					.setImage(details.header_image)
					.addFields(
						{ name: 'Publisher', value: details.publishers, inline: true },
						{ name: 'Developer', value: details.developers, inline: true },
						{ name: 'Recommendations', value: details.recommendations.total, inline: true },
						{ name: 'Achievements', value: achievementnumber, inline: true },
						{ name: 'Release Date', value: details.release_date.date, inline: true },
						{ name: 'Steam App ID', value: `[${details.steam_appid}](https://store.steampowered.com/app/${details.steam_appid})`, inline: true },
					)
					.setAuthor('Steam')
					.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
					.setTimestamp();
				message.channel.send(embed);
			}).catch(e => {
				message.channel.send('Sorry, looks like you entered the application ID wrong or used an invalid ID.');
			});
		}
	},
};