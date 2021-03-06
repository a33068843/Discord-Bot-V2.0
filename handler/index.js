const config = require("../json/config.json");
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);

module.exports = async (client) => {
  // Events
  const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
  eventFiles.map((value) => require(value));

  // Commands
  const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
  commandFiles.map((value) => {
    const file = require(value);
    const splitted = value.split('/');
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = { directory, ...file };
      client.commands.set(file.name, properties);
    }
  });

  // Slash Commands
  const slashCommands = await globPromise(`${process.cwd()}/SlashCommands/*/*.js`);

  const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
      const file = require(value);
      if (!file?.name) return;
      client.slashCommands.set(file.name, file);

      if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
      arrayOfSlashCommands.push(file);
    });

  client.on('ready', async () => {
    await client.guilds.cache
      .get(config.channelId)
      .commands.set(arrayOfSlashCommands);
  })
}