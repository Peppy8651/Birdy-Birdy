const Discord = require('discord.js');

module.exports = {
	name: 'turkeyfight',
	description: 'turkeyfight command for Birdy',
	async execute(message, server, client) {
		if (server.turkeyfight.playing == true) return message.channel.send('There is already two people turkeyfighting in this server!');
		const member = message.mentions.members.first();
		if (!member) return message.channel.send('You need to ping a member to start turkeyfighting!');
		if (member.user.id == message.author.id) return message.channel.send('Ok you punch yourself and die game over.');
		if (member.user.id == client.user.id) return message.channel.send('I will destroy you immediately. Don\'t challenge a bot.');
		if (member.user.bot) {
			const embed = new Discord.MessageEmbed();
			embed.setTitle('Seriously, why are you fighting bots?');
			embed.setColor('PURPLE');
			embed.setDescription(`Leaked footage of ${message.author} turkeyfighting a bot:`);
			embed.setImage('https://media1.tenor.com/images/7bceb53c8046319b0016443cb1947a94/tenor.gif?itemid=18667615');
			embed.setFooter(`Command used by ${message.author.tag}`, message.author.displayAvatarURL());
			embed.setTimestamp();
			return message.channel.send({ embeds: [embed] });
		}
		const newPlayers = [message.author, member.user];
		const p1 = newPlayers[Math.floor(Math.random() * newPlayers.length)];
		const player1 = {
			player: p1,
			health: 200,
		};
		let player2;
		if (player1.player.id == message.author.id) {
			player2 = {
				player: member.user,
				health: 200,
			};
		}
		else if (player1.player.id == member.user.id) {
			player2 = {
				player: message.author,
				health: 200,
			};
		}
		server.turkeyfight.playersconstant.push(player1);
		server.turkeyfight.playersconstant.push(player2);
		server.turkeyfight.players.push(player1);
		server.turkeyfight.players.push(player2);
		server.turkeyfight.playing = true;
		newPlayers.splice(0, newPlayers.length);
		turkeyfight();
		// eslint-disable-next-line no-inner-declarations
		async function turkeyfight() {
			const answers = ['1', '2', '3', '4', '5', 'punch', 'slam', 'shove', 'taunt', 'concede', 'one', 'two', 'three', 'four', 'five', 'turkey punch', 'turkey slam', 'turkey shove'];
			const users = [`${server.turkeyfight.players[0].player.id}`];
			const filter = response => {
				return answers.some(answer => answer.toLowerCase() === response.content.toLowerCase()) && users.some(a => a.toLowerCase() == response.author.id);
			};
			const embed = new Discord.MessageEmbed()
				.setTitle('Turkey Fight')
				.setThumbnail(server.turkeyfight.players[1].player.displayAvatarURL())
				.setDescription(`${server.turkeyfight.players[0].player}, what do you wanna do?

1. Turkey punch

2. Turkey slam

3. Turkey shove

4. Taunt

5. Concede`)
				.setColor('PURPLE')
				.setFooter(`Fight started by ${message.author.tag}`, message.author.displayAvatarURL())
				.setTimestamp();
			message.channel.send({ embeds: [embed] }).then(() => {
				server.turkeyfight.turn = server.turkeyfight.players[0].player;
				message.channel.awaitMessages({ filter, max: 1, time: 20000, errors: ['time'] })
					.then(collected => {
						if (collected.first().content.toLowerCase() == 'concede' || collected.first().content.toLowerCase() == '5' || collected.first().content.toLowerCase() == 'five') {
							message.channel.send(`Looks like ${server.turkeyfight.players[0].player} conceded. ${server.turkeyfight.players[1].player} wins.`);
							endFight(server);
							return;
						}
						let lefthealth;
						let healthminus;
						let health;
						if (collected.first().content.toLowerCase() != '4' && collected.first().content.toLowerCase() != 'four' && collected.first().content.toLowerCase() != 'taunt') {
							healthminus = Math.floor(Math.random() * 50) + 1;
							health = server.turkeyfight.players[1].health;
							server.turkeyfight.players[1].health = health - healthminus;
							lefthealth = server.turkeyfight.players[1].health;
						}
						const outEmbed = new Discord.MessageEmbed();
						let action;
						const taunts = ['very menacing', 'very scary', 'menacing', 'scary', 'frightening', 'useless', 'funny', 'weird', 'unusual', 'special', 'silly', 'confusing'];
						const taunttype = taunts[Math.floor(Math.random() * taunts.length)];
						if (collected.first().content.toLowerCase() == '1' || collected.first().content.toLowerCase() == 'one' || collected.first().content.toLowerCase() == 'punch' || collected.first().content.toLowerCase() == 'turkey punch') action = `${server.turkeyfight.players[0].player} turkey punched ${server.turkeyfight.players[1].player} and took away ${healthminus} HP. ${server.turkeyfight.players[1].player} now only has ${lefthealth} HP.`;
						if (collected.first().content.toLowerCase() == '2' || collected.first().content.toLowerCase() == 'two' || collected.first().content.toLowerCase() == 'slam' || collected.first().content.toLowerCase() == 'turkey slam') action = `${server.turkeyfight.players[0].player} slammed a turkey onto ${server.turkeyfight.players[1].player}. It was a big turkey too so it took away ${healthminus} HP. ${server.turkeyfight.players[1].player} now only has ${lefthealth} HP.`;
						if (collected.first().content.toLowerCase() == '3' || collected.first().content.toLowerCase() == 'three' || collected.first().content.toLowerCase() == 'shove' || collected.first().content.toLowerCase() == 'turkey shove') action = `${server.turkeyfight.players[0].player} shoved a turkey inside ${server.turkeyfight.players[1].player}'s mouth. I hope they don't choke because if they do I may have to pay fines. This took away ${healthminus} HP and ${server.turkeyfight.players[1].player} only has ${lefthealth} HP.`;
						if (collected.first().content.toLowerCase() == '4' || collected.first().content.toLowerCase() == 'four' || collected.first().content.toLowerCase() == 'taunt') action = `${server.turkeyfight.players[0].player} gave a ${taunttype} taunt to ${server.turkeyfight.players[1].player}. I wonder if the taunt worked or not. I mean, this taunt is ${taunttype} so that probably affected ${server.turkeyfight.players[1].player}'s performance or something.`;
						outEmbed.setTitle('Turkey Fight');
						outEmbed.setThumbnail(server.turkeyfight.players[1].player.displayAvatarURL());
						outEmbed.setDescription(action);
						outEmbed.setFooter(`Fight started by ${message.author.tag}`, message.author.displayAvatarURL());
						outEmbed.setColor('PURPLE');
						outEmbed.setTimestamp();
						message.channel.send({ embeds: [outEmbed] });
						if (collected.first().content.toLowerCase() != '4' && collected.first().content.toLowerCase() != 'four' && collected.first().content.toLowerCase() != 'taunt') {
							if (lefthealth < 1) {
								message.channel.send(`Ok, looks like ${server.turkeyfight.players[1].player} has died. ${server.turkeyfight.players[0].player} wins!`);
								endFight(server);
								return;
							}
						}
						server.turkeyfight.players.push(server.turkeyfight.players.shift());
						setTimeout(async () => {
							turkeyfight();
						}, 5000);
					})
					.catch(() => {
						message.channel.send(`Alright, since you haven't responded, you concede the turkey fight and ${server.turkeyfight.players[1].player} wins.`);
						endFight(server);
						return;
					});
			});
		}
	},
};

async function endFight(server) {
	server.turkeyfight.players.splice(0, server.turkeyfight.players.length);
	server.turkeyfight.playersconstant.splice(0, server.turkeyfight.playersconstant.length);
	server.turkeyfight.player1health = null;
	server.turkeyfight.player2health = null;
	server.turkeyfight.playing = false;
	server.turkeyfight.turn = null;
}