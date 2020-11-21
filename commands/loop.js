// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');

module.exports = {
	name: 'loop',
	description: 'loop command',
	async execute(message, server, args, value) {
		// eslint-disable-next-line no-inner-declarations
		async function loop(loopparam) {
			if (loopparam == undefined) {
				if (server.loopvalue == true) {
					server.loopvalue = false;
					console.log(`Loop set to ${server.loopvalue}`);
				}
				else if(server.loopvalue == false) {
					server.loopvalue = true;
					console.log(`Loop set to ${server.loopvalue}`);
				}
			}
			else if (loopparam == true) {
				server.loopvalue = true;
				console.log(`Loop set to ${server.loopvalue}`);
			}
			else if (loopparam == false) {
				server.loopvalue = false;
				console.log(`Loop set to ${server.loopvalue}`);
			}
		}
		if (!value) {
			loop();
			if (server.loopvalue == true) message.channel.send('🔂 Looping... 🔂');
			if (server.loopvalue == false) message.channel.send('↪️ No longer looping. ↪️');
			return;
		}
		else if (value.toLowerCase() == 'true') {
			loop(true);
			message.channel.send('🔂 Looping... 🔂');
		}
		else if (value.toLowerCase() == 'false') {
			loop(false);
			message.channel.send('↪️ No longer looping. ↪️');
		}
		else if (value.toLowerCase() == 'queue') {
			const v = args[1];
			if (!v) {
				loopqueue();
				if (server.loopqueue == true) message.channel.send('🔁 Looping queue... 🔁');
				if (server.loopqueue == false) message.channel.send('↩️ No longer looping queue. ↩️');
			}
			else if (v.toLowerCase() == 'true') {
				loopqueue(true);
				message.channel.send('🔁 Looping queue... 🔁');
			}
			else if (v.toLowerCase() == 'false') {
				loopqueue(false);
				message.channel.send('↩️ No longer looping queue. ↩️');
			}
			else {
				loopqueue();
				if (server.loopqueue == true) message.channel.send('🔁 Looping queue... 🔁');
				if (server.loopqueue == false) message.channel.send('↩️ No longer looping queue. ↩️');
			}
		}
		else {
			loop();
			if (server.loopvalue == true) message.channel.send('🔂 Looping... 🔂');
			if (server.loopvalue == false) message.channel.send('↪️ No longer looping. ↪️');
		}
		// eslint-disable-next-line no-inner-declarations
		async function loopqueue(loopparam) {
			if (loopparam == undefined) {
				if (server.loopqueue == true) {
					server.loopqueue = false;
					console.log(`Loopqueue set to ${server.loopqueue}`);
				}
				else if(server.loopqueue == false) {
					server.loopqueue = true;
					console.log(`Loopqueue set to ${server.loopqueue}`);
				}
			}
			else if (loopparam == true) {
				server.loopqueue = true;
				console.log(`Loopqueue set to ${server.loopqueue}`);
			}
			else if (loopparam == false) {
				server.loopqueue = false;
				console.log(`Loopqueue set to ${server.loopvalue}`);
			}
		}
	},
};