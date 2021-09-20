const { Client, CommandInteraction } = require("discord.js");
const ms = require('ms');

module.exports = {
  name: 'clean',
  description: '刪除多則訊息',
  userPermissions: ["MANAGE_MESSAGE"],
  options: [
    {
      name: '數量',
      description: '要刪除幾則訊息',
      type: "INTEGER",
      required: true,
    },
  ],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async(client, interaction) => {
    const amount = interaction.options.getInteger('數量');

    if (amount > 100) {
      return interaction.followUp({
        content: "最多只能一次刪除 100 則訊息 OuO",
      });
    };

    const messages = await interaction.channel.messages.fetch({
      limit: amount + 1,
    });

    const filtered = messages.filter(
      (msg) => Date.now() - msg.createdTimestamp < ms('14 days')
    )

    await interaction.channel.bulkDelete(filtered);

    interaction.channel.send({ content: `刪除了 ${filtered.size - 1} 則訊息！`})
      .then((msg) => {
        setTimeout(() => msg.delete(), ms('2 seconds'));
      });
  }
}