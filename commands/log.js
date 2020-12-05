module.exports = {
	name: 'log',
	description: 'log command',
	async execute(message) {
		const command = '>log ';
		const args = message.cleanContent.slice(command.length).trim().split(/ -/);
		const catchinput = args.join(' ');
		const input = !catchinput ? 'You need to add arguments to use this command' : catchinput;
		const colors = ['CSS', 'fix', 'yaml', 'brainfuck', 'ini', 'css', null];
		const color = colors[Math.floor(Math.random() * colors.length)];
		const inp = color == 'ini' ? `[${input}]` : color == 'css' ? `[${input}]` : input;
		const outputcolored = `\`\`\`${color}
${inp} \`\`\``;
		const outputnotcolored = `\`\`\`${inp} \`\`\``;
		const output = color == null ? outputnotcolored : outputcolored;
		message.channel.send(output);
	},
};