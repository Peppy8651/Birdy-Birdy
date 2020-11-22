const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'changelog',
	description: 'birdy changelog',
	async execute(message, client, version) {
		const miniget = require('miniget');
		const ver = version.trim().split(/ +/);
		const v = ver.join('_');
		const changelogurl = `https://api.github.com/repos/Peppy8651/Birdy-Birdy/releases/tags/${v}`;
		const body = await miniget(changelogurl, { headers: { 'User-Agent': 'a/b' } }).text();
		const res = JSON.parse(body);
		const published = JSON.stringify(res.published_at);
		const pub = published.slice(1);
		const p = pub.slice(0, 10);
		const des = JSON.stringify(res.body);
		const d = des.slice(1, 2044);
		const description = des.length > 2045 ? d : res.body;
		const pre = res.prerelease == true ? 'Yes' : 'No';
		const embed = new MessageEmbed()
			.setTitle(res.name)
			.setURL(res.html_url)
			.setAuthor(res.author.login, res.author.avatar_url)
			.setDescription(description)
			.setColor(0x00FF00)
			.setThumbnail(client.user.displayAvatarURL())
			.addFields(
				{ name: 'Branch', value: res.target_commitish, inline: true },
				{ name: 'Respository', value: '[Repo](https://github.com/Peppy8651/Birdy-Birdy)', inline: true },
				{ name: 'Version', value: res.tag_name, inline: true },
				{ name: 'All Releases', value: '[Releases](https://github.com/Peppy8651/Birdy-Birdy/releases)', inline: true },
				{ name: 'Published At', value: p, inline: true },
				{ name: 'Is Prerelease?', value: pre, inline: true },
			)
			.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed);
	},
};
