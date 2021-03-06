const client = require('../index');

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return interaction.followUp({ content: '泥的指令發生了未知的錯誤Σ(°ロ°)' });

    const args = [];
    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
          if (option.name) args.push(option.name);
          option.options?.forEach((x) => {
              if (x.value) args.push(x.value);
          });
      } else if (option.value) args.push(option.value);
  }

    cmd.run(client, interaction, args);
  }
});