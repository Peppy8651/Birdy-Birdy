/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports = {
	name: 'reload',
	description: 'Reloads a command in the commands folder',
	async execute(message, client, args) {
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