/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const PEPPY_ID = '490548233601417223';

module.exports = {
	name: 'reload',
	description: 'Reloads a command in the commands folder',
	async execute(message, client) {
		if (message.author.id != PEPPY_ID) return message.channel.send('You do not have permission to use this.');
		const c = '>reload ';
		const args = message.content.slice(c.length).trim().split(/ +/);
		if (!args[0]) return message.channel.send('You didn\'t pass any command to reload!');
		const commandName = args[0].toLowerCase();
		const command = client.commands.get(commandName)
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`.`);
		delete require.cache[require.resolve(`../commands/${command.name}.js`)];
		try {
			const newCommand = require(`../commands/${command.name}.js`);
			client.commands.set(newCommand.name, newCommand);
			if (command.name != 'status') message.channel.send(`Command \`${command.name}\` was reloaded!`);
			if (command.name == 'status') {
				const BirdyActivity = client.commands.get('status').fetchStatus();
				if (client.user.presence.activities[0].name == BirdyActivity) return message.channel.send('This activity is already being used.');
				client.user.setActivity(BirdyActivity, {
					type: 'LISTENING',
					name: BirdyActivity,
				});
				message.channel.send('Reloaded status!');
			}
		}
		catch (error) {
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};