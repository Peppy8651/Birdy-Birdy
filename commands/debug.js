module.exports = {
	name: 'debug',
	description: 'debug',
	async execute(message) {
      const command = '>debug ';
      const args = message.content.slice(command.length).trim().split();
		  const query = args.join(' ');
      if (!query) return message.channel.send('Too lazy');
      if (query == 'msg') {
        console.log('\nMessage Debug \n');
        console.log('Read: Success');
        const msg = await message.channel.send('Send: Success');
        if (msg) {
          console.log('Send: Success');
          console.log(`Message ID: ${msg.id}`);
          console.log(`Message URL: ${msg.url}`);
        }
        else {
          console.log('Send: Failure');
        }
    }
	},
};