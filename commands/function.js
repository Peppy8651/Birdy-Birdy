// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');

module.exports = {
	name: 'function',
	description: 'function command',
	async execute(message, server) {
		// eslint-disable-next-line no-inner-declarations
		async function yestoggle() {
			if (server.yes === true) {
				server.yes = false;
				console.log(`Yes function set to ${server.yes}`);
			}
			else if(server.yes === false) {
				server.yes = true;
				console.log(`Yes function set to ${server.yes}`);
			}
		}
		// eslint-disable-next-line no-inner-declarations
		async function communismtoggle() {
			if(server.communism === false) {
				server.communism = true;
				console.log(`Communism function set to ${server.communism}`);
			}
			else if(server.communism === true) {
				server.communism = false;
				console.log(`Communism function set to ${server.communism}`);
			}
		}
		if (message.content.toLowerCase().includes('yes')) {
			if (message.content.toLowerCase().includes('true')) {
				server.yes = true;
				message.channel.send(`Set yes function to \`\`${server.yes}\`\``);
				console.log(`Yes function set to ${server.yes}`);
			}
			else if (message.content.toLowerCase().includes('false')) {
				server.yes = false;
				message.channel.send(`Set yes function to \`\`${server.yes}\`\``);
				console.log(`Yes function set to ${server.yes}`);
			}
			else {
				yestoggle();
				message.channel.send(`Set yes function to \`\`${server.yes}\`\``);
			}
		}
		else if(message.content.toLowerCase().includes('communism')) {
			if (message.content.toLowerCase().includes('true')) {
				server.communism = true;
				message.channel.send(`Set communism function to \`\`${server.communism}\`\``);
				console.log(`Communism function set to ${server.communism}`);
			}
			else if (message.content.toLowerCase().includes('false')) {
				server.communism = false;
				message.channel.send(`Set communism function to \`\`${server.communism}\`\``);
				console.log(`Communism function set to ${server.communism}`);
			}
			else {
				communismtoggle();
				message.channel.send(`Set communism function to \`\`${server.communism}\`\``);
			}
		}
	},
};