const Discord = require('discord.js');

module.exports = {
	name: 'invite',
	description: 'invite command',
	async execute(message, client) {
		const command = '>invite ';
		const args = message.content.slice(command.length).trim().split(/ +/);
		const invite = await message.channel.createInvite({
			maxAge: 0,
			maxUses: 0,
		});
		const user = message.mentions.users.first() || client.users.cache.get(`${args[0]}`) || client.users.cache.find(u => u.tag == `${args[0]}`);
		const Invite = new Discord.Invite(client, invite);
		const embed = new Discord.MessageEmbed()
			.setAuthor('You have been invited to join a server')
			.setTitle(`${message.guild.name}`)
			.setDescription(`${message.guild.members.cache.filter(m => m.presence.status == 'online').size} Online, ${message.guild.memberCount} Members, **[Click here to join](${Invite.url})**`)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setImage(message.guild.bannerURL({ dynamic: true }))
			.setFooter(`Invite sent by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		if (!user && !args[0]) message.channel.send(embed);
		if (!user && args[0]) message.channel.send('Sorry, but I couldn\'t find anyone based on your arguments. However, I will still give you a link for you to use or for you to send to that person.', embed);
		if (user && user.bot) return message.channel.send('Sorry, but I can\'t send invites to bots.');
		if (user) {
			user.send(`Hi! ${message.author} sent you an invite! If you want to, go ahead and click the blue text to join! If you think this was a mistake or unintended, just ignore it.`, embed).then(() => message.channel.send(`Sent invite to **${user.tag}**`)).catch(() => message.channel.send('Sorry, couldn\'t send the invite to them. Make sure that they allow all messages in their DMs.'));
		}
	},
};