const { CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'test',
    description: 'this is a testing command',

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, args) => {
        interaction.followUp({ content: "Hello World" });
    },
}