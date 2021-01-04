module.exports = {
	name: 'delete',
	command: 'delete command',
  cooldown: 5,
	authorcheck: true,
	async execute(message) {
		if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Sorry, I don\'t have the permissions to use this. Check my role and see if it has the permission MANAGE_MESSAGES enabled.');
		if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Oh you wanna be sneaky, huh? Violating your permissions by using a Discord bot? Nice try, Mister!');
		const command = '>delete ';
		const args = message.content.slice(command.length).trim().split(/ -/);
		const amount = (parseInt(args[0]));
		if (!args[0]) {
			return message.channel.send(`Mario says, "You don't have to put arguments you can use commands without them!"
**Luigi says, "Put the arguments what is wrong with you?"**`);
		}
		if (isNaN(amount)) return message.channel.send('This isn\'t a valid number!');
		if(amount > 99 || amount < 1) return message.channel.send('You can\'t delete this number of messages!');
		message.channel.bulkDelete(amount + 1).then(async () => {
			const msg = await message.channel.send(`Deleted ${amount} messages!`);
			setTimeout(() => {
				msg.delete().catch(() => console.log('Sorry, couldn\'t delete message'));
			}, 2500);
		}).catch(err => {
      if (err.message == 'You can only bulk delete messages that are under 14 days old.') return message.channel.send('Sorry, but I cannot delete messages that are over 14 days old.');
			message.channel.send(`There was an error trying to delete messages in this channel! Error: ${err.message}`);
		});
	},
};