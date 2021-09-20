const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./json/token.json');

// const intents = new Discord.Intents(32766);
// const client = new Client({
//     intents: [
//         Intents.FLAGS.GUILDS,
//         Intents.FLAGS.GUILD_MESSAGES
//     ]
// });

const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGES",
    ]
})

client.login(token);

module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();

require("./handler")(client);
