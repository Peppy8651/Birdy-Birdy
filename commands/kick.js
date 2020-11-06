// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');

module.exports = {
	name: 'kick',
	description: 'kickcommand',
	execute(message) {
		const member = message.mentions.members.first();
		if (!member) return message.channel.send('You need to ping a member for this to work, silly!');
		if (member.hasPermission('ADMINISTRATOR')) return message.channel.send('You cannot kick an administrator!');
		if (member.kickable) {
			const command = (`>kick <@${member.id}> `);
			const args = message.content.slice(command.length).trim().split(/ -/);
			const reason = args.join(' ') || 'none';
			member.kick({ reason: `${reason}` }).catch(() => {
				return message.channel.send('Sorry, I couldn\'t do that.');
			});
			const embed = new Discord.MessageEmbed()
				.setTitle('**Kick**')
				.setColor(0xFF0000)
				.setThumbnail(member.user.displayAvatarURL())
				.setDescription(`**${member}** was **kicked** by **${message.author}**!`)
				.addFields(
					{ name: 'Reason', value: reason },
				)
				.setTimestamp();
			message.channel.send(embed);
		}
		else {
			const embed = new Discord.MessageEmbed()
				.setTitle('❌Kick Failure❌')
				.setDescription(`I couldn't do that due to my role not having the right position in the hierarchy or another problem related to roles or permissions. If it's related to the hierarchy, try to relocate my role to somewhere near the top.
	
Here's how it should look:`)
				.setImage('https://cdn.discordapp.com/attachments/615884282476363776/760904548243341392/Screenshot_2020-09-30_113245yes.png')
				.setColor(0xFF0000)
				.setFooter('❌Kick Failure❌')
				.setTimestamp();
			message.channel.send(embed);
		}
	},
};