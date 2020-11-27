// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');

module.exports = {
	name: 'ban',
	description: 'banhammer goes brrrr',
	execute(message) {
		if (!message.guild.me.hasPermission('ADMINISTRATOR') && !message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('Sorry, can\'t ban anybody since I don\'t have the permissions to.');
		if (!message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You don\'t have the permissions to use this command!');
		const cmd = '>ban ';
		const findargs = message.content.slice(cmd.length).trim().split(/ +/);
		const member = message.mentions.members.first() || message.guild.members.cache.get(`${findargs[0]}`) || message.guild.members.cache.find(m => m.user.tag == `${findargs[0]}`);
		if (!member) return message.channel.send('You need to find a member for this to work, silly! If you\'re using tags, remember that spaces in the tag will make it invalid.');
		if (member.hasPermission('ADMINISTRATOR')) return message.channel.send('You cannot ban an administrator!');
		if (member.bannable) {
			const command = (`>ban ${findargs[0]} `);
			const args = message.content.slice(command.length).trim().split(/ -/);
			const reason = args.join(' ') || 'none';
			member.ban({ reason: `${reason}` }).catch(() => {
				return message.channel.send('Sorry, I couldn\'t do that.');
			});
			const embed = new Discord.MessageEmbed()
				.setTitle('**Ban**')
				.setColor(0xFF0000)
				.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
				.setDescription(`**${member}** was **banned** by **${message.author}**!`)
				.addFields(
					{ name: 'Reason', value: reason },
				)
				.setTimestamp();
			message.channel.send(embed);
		}
		else {
			const embed = new Discord.MessageEmbed()
				.setTitle('❌Ban Failure❌')
				.setDescription(`I couldn't do that due to my role not having the right position in the hierarchy or another problem related to roles or permissions. If it's related to the hierarchy, try to relocate my role to somewhere near the top.

Here's how it should look:`)
				.setImage('https://cdn.discordapp.com/attachments/615884282476363776/760904548243341392/Screenshot_2020-09-30_113245yes.png')
				.setColor(0xFF0000)
				.setFooter('❌Ban Failure❌')
				.setTimestamp();
			message.channel.send(embed);
		}
	},
};