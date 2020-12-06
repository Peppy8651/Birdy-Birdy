/* eslint-disable no-unused-vars */
// module "server.js"
/* eslint-disable indent */
/**
 * Creates a new class with data for guilds that only Birdy can use at this time.
 * @param {string} guildID
 * @param {Client} client
 */
class ClientServer {
    constructor(guildID, client) {
        if (!guildID || guildID === undefined) throw new Error('This guild is not defined!');
        this.id = guildID;
        this.id = String(this.id);
        const guild = client.guilds.cache.get(this.id);
        if (!guild && this.id != '615884282040287242') throw new Error('Guild ID is invalid. Please add a valid ID of a guild that exists and is in the client\'s cache.');
        this.yes = false;
        this.communism = false;
        this.queue = [];
        this.loopvalue = false;
        this.loopcount = 0;
        this.errorcount = 0;
        this.loopqueue = false;
        this.snipe = [];
        this.editsnipe = [];
        this.turkeyfight = {
            players: [],
            playersconstant: [],
            playing: false,
            turn: null,
        };
        this.giveaways = [];
    }
    resetToDefault() {
        this.yes = false;
        this.communism = false;
        this.queue = [];
        this.loopvalue = false;
        this.loopcount = 0;
        this.errorcount = 0;
        this.loopqueue = false;
        this.snipe = [];
        this.editsnipe = [];
        this.turkeyfight = {
            players: [],
            playersconstant: [],
            playing: false,
            turn: null,
        };
        this.giveaways = [];
        return true;
    }
}

module.exports.ClientServer = ClientServer;