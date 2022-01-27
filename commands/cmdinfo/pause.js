const globalPrefix = '>';

module.exports = {
	command: `${globalPrefix}pause`,
	description: 'if audio is being played in a voice channel, this command will pause that audio until it is eventually resumed or the bot leaves the voice channel. If the audio is paused, this command will unpause the audio.',
	usage1: `\`${globalPrefix}pause\`
If the queue is playing, it pauses. If it's paused, it unpauses. You need to be in a voice channel for this.`,
};