// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');

module.exports = {
	name: 'info',
	description: 'info command',
	async execute(message) {
		const member = message.mentions.members.first();
		if (message.content.toLowerCase().startsWith('>info' + ' server')) {
			const embed1 = new Discord.MessageEmbed()
				.setTitle(`${message.guild.name}`)
				.setColor(message.guild.owner.displayHexColor)
				.setThumbnail(message.guild.iconURL({ dynamic: true }))
				.setDescription(`Here is **${message.guild.name}**'s info;`)
				.addFields(
					{ name: 'Members', value: `${message.guild.memberCount}
Online: ${message.guild.members.cache.filter(members => members.presence.status === 'online').size}` },
					{ name: 'Owner', value: `<@${message.guild.owner.id}>` },
					{ name: 'Channels', value: `Text: ${message.guild.channels.cache.filter(c => c.type === 'text').size}
Voice: ${message.guild.channels.cache.filter(c => c.type === 'voice').size}` },
					{ name: 'Roles', value: message.guild.roles.cache.size },
					{ name: 'Region', value: message.guild.region },
					{ name: 'Guild ID', value: message.guild.id },
				)
				.setFooter(`Command used by ${message.author.tag}`)
				.setImage(message.guild.bannerURL())
				.setTimestamp();
			message.channel.send(embed1);
		}
		else {
			const role = message.mentions.roles.first();
			if (message.content.toLowerCase().startsWith('>info' + ` ${role}`)) {
				const embed = new Discord.MessageEmbed()
					.setTitle(`${role.name}`)
					.setColor(role.hexColor)
					// The image used in the thumbnail in this embed is not by me!
					.setThumbnail('https://www.goodfreephotos.com/albums/vector-images/color-wheel-vector-clipart.png')
					.setDescription(`Here is the role, ${role}'s info;`)
					.addFields(
						{ name: 'Members with this role', value: role.members.size },
						{ name: 'Color', value: role.hexColor },
						{ name: 'Role ID', value: role.id },
					)
					.setTimestamp()
					.setFooter(`Command used by ${message.author.tag}`);
				message.channel.send(embed);
			}
			else if (message.content.toLowerCase().includes(`${member}`)) {
				let activity;
				if (member.presence.activities.filter(a => a.type == 'PLAYING')) activity = `Playing ${member.presence.activities}`;
				if (member.presence.activities.filter(a => a.type == 'LISTENING')) activity = `Listening to ${member.presence.activities}`;
				if (member.presence.activities.filter(a => a.type == 'COMPETING')) activity = `Competing in ${member.presence.activities}`;
				if (member.presence.activities.filter(a => a.type == 'STREAMING')) activity = `Streaming ${member.presence.activities}`;
				if (member.presence.activities.filter(a => a.type == 'WATCHING')) activity = `Watching ${member.presence.activities}`;
				if (member.presence.activities.filter(a => a.type == 'CUSTOM_STATUS')) activity = `${member.presence.activities}`;
				const presence = `${member.presence.status}
${activity}`;
				const embed = new Discord.MessageEmbed()
					.setTitle(`${member.user.tag}`)
					.setColor(member.displayHexColor)
					.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
					.setDescription(`Here is ${member}'s info;`)
					.addFields(
					// eslint-disable-next-line no-shadow
						{ name: `Roles: ${member.roles.cache.size}`, value: member.roles.cache.map(role => `<@&${role.id}>`) },
						{ name: 'User ID', value: member.id },
						{ name: 'Presence', value: presence },
					)
					.setTimestamp()
					.setFooter(`Command used by ${message.author.tag}`);
				message.channel.send(embed);
			}
			else if (message.content == '>info') {
				let activity;
				if (message.member.presence.activities.filter(a => a.type == 'PLAYING')) activity = `Playing ${message.member.presence.activities}`;
				if (message.member.presence.activities.filter(a => a.type == 'LISTENING')) activity = `Listening to ${message.member.presence.activities}`;
				if (message.member.presence.activities.filter(a => a.type == 'COMPETING')) activity = `Competing in ${message.member.presence.activities}`;
				if (message.member.presence.activities.filter(a => a.type == 'STREAMING')) activity = `Streaming ${message.member.presence.activities}`;
				if (message.member.presence.activities.filter(a => a.type == 'WATCHING')) activity = `Watching ${message.member.presence.activities}`;
				if (message.member.presence.activities.filter(a => a.type == 'CUSTOM_STATUS')) activity = `${message.member.presence.activities}`;
				const presence = `${message.member.presence.status}
${activity}`;
				const embed = new Discord.MessageEmbed()
					.setTitle(`${message.author.tag}`)
					.setColor(message.member.displayHexColor)
					.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
					.setDescription(`Here is ${message.author}'s info;`)
					.addFields(
					// eslint-disable-next-line no-shadow
						{ name: `Roles: ${message.member.roles.cache.size}`, value: message.member.roles.cache.map(role => `<@&${role.id}>`) },
						{ name: 'User ID', value: message.member.id },
						{ name: 'Presence', value: presence },
					)
					.setTimestamp()
					.setFooter(`Command used by ${message.author.tag}`);
				message.channel.send(embed);
			}
		}
	},
};