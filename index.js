const {Client, RichEmbed} = require('discord.js');
const client = new Client();

const config = require('./config/config');

const ANNC_CMD = '-annc';
const EMBED_CMD = '-embed';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '-ping') {
    msg.reply('pong');
  }

  if (msg.content.includes(ANNC_CMD)) {
    const message = msg.content.replace(ANNC_CMD, '');
    const anncChan = client.channels.get(config.anncChannelId);
    anncChan.send(message);
  }

  if (msg.content.includes(EMBED_CMD)) {
    const message = msg.content.replace(EMBED_CMD, '');

    try {
      const embed = JSON.parse(message);
      msg.channel.send('', embed);
    } catch (e) {
      msg.channel.send('Invalid JSON');
    }
  }
});

client.login(config.discordToken);
