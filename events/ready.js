const client = require('../index');

client.on('ready', () => {
  console.log(`${client.user.username} 準備好了！`);
})