const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'changelog',
	description: 'birdy changelog',
	async execute(message, client, version) {
		const miniget = require('miniget');
		const ver = version.trim().split(/ +/);
		const v = ver.join('_');
		const changelogurl = `https://api.github.com/repos/Peppy8651/Birdy-Birdy/releases/tags/${v}`;
		let body;
		// eslint-disable-next-line prefer-const
		body = await miniget(changelogurl, { headers: { 'User-Agent': 'a/b' } }).text();
		const res = JSON.parse(body);
		if (!res.body) return message.channel.send('Sorry, couldn\'t fetch the changelog.');
		const pub = new Date(res.published_at);
		const pubday = pub.toLocaleString('en-US', { timeZone: 'UTC' });
		const des = JSON.stringify(res.body);
		const d = des.slice(1, 2044);
		const description = des.length > 2045 ? d : res.body;
		const pre = res.prerelease == true ? 'Yes' : 'No';
		const embed = new MessageEmbed()
			.setTitle(res.name)
			.setURL(res.html_url)
			.setAuthor({ name: res.author.login, iconURL: res.author.avatar_url })
			.setDescription(description)
			.setColor(0x00FF00)
			.setThumbnail(client.user.displayAvatarURL())
			.addFields(
				{ name: 'Branch', value: res.target_commitish, inline: true },
				{ name: 'Respository', value: '[Repo](https://github.com/Peppy8651/Birdy-Birdy)', inline: true },
				{ name: 'Version', value: res.tag_name, inline: true },
				{ name: 'All Releases', value: '[Releases](https://github.com/Peppy8651/Birdy-Birdy/releases)', inline: true },
				{ name: 'Published On', value: `${pubday} UTC`, inline: true },
				{ name: 'Is Prerelease?', value: pre, inline: true },
			)
			.setFooter({ text: `Command used by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
			.setTimestamp();
		message.channel.send({ embeds: [embed] });
	},
};
