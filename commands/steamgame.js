/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
	name: 'steamgame',
	description: 'steam game command goes brrr',
	async execute(message, steam) {
		const command = ('>steamgame ');
		const args = message.content.slice(command.length).trim().split(/ +/);
		const query = args.join(' ');
		if (!query) return message.channel.send('Hop in! We\'re finding out where the arguments are!');
		writeSteam(steam);
		const SteamApps = require('../SteamApps.json');
		const appID = parseInt(query);
		let app;
		if (isNaN(appID)) {
			app = SteamApps.apps.find(a => a.name == query);
			if (!app) return message.channel.send('Couldn\'t find an app!');
			app = app.appid;
		}
		else {
			app = appID;
		}
		const details = await steam.getGameDetails(app).catch(() => {
			message.channel.send('Sorry, looks like you entered the application ID wrong or used an invalid ID. Steam could be down too, but idk.');
		});
		if (!details) return;
		// eslint-disable-next-line prefer-const
		let achievementnumber = details.achievements == undefined ? '0' : details.achievements.total;
		const recommend = details.recommendations == undefined ? 'Unavailable or none' : details.recommendations.total;
		let publishers;
		if (!details.publishers[0] || details.publishers[0] == '' || details.publishers[0] == ' ') publishers = 'None';
		if (details.publishers[0]) publishers = details.publishers[0];
		const embed = new Discord.MessageEmbed()
			.setTitle(details.name)
			.setColor(0x2a475e)
			.setDescription(details.short_description)
			.setImage(details.header_image)
			.addFields(
				{ name: 'Publisher', value: publishers, inline: true },
				{ name: 'Developer', value: details.developers[0], inline: true },
				{ name: 'Recommendations', value: `${recommend}`, inline: true },
				{ name: 'Achievements', value: `${achievementnumber}`, inline: true },
				{ name: 'Release Date', value: details.release_date.date, inline: true },
				{ name: 'Steam App ID', value: `[${details.steam_appid}](https://store.steampowered.com/app/${details.steam_appid})`, inline: true },
			)
			.setAuthor('Steam')
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL()).setTimestamp();
		message.channel.send({ embeds: [embed] });
	},
};

async function writeSteam(steam) {
	const SteamChecker = require('../SteamChecker.json');
	const date = new Date();
	const hour = date.getHours();
	const day = date.getDate();
	if (SteamChecker.hour == hour && SteamChecker.day == day) return;
	const apps = await steam.getAppList();
	const JSONApps = {
		apps: apps,
	};
	const SteamCheckerNew = {
		hour: hour,
		day: day,
	};
	fs.writeFile('./SteamApps.json', JSON.stringify(JSONApps), function(err) {
		if (err) throw err;
		delete require.cache[require.resolve('../SteamApps.json')];
	});
	fs.writeFile('./SteamChecker.json', JSON.stringify(SteamCheckerNew), function(err) {
		if (err) throw err;
		delete require.cache[require.resolve('../SteamChecker.json')];
	});
}