const {Client, RichEmbed} = require('discord.js');
const client = new Client();

const config = require('./config/config');

const ANNC_CMD = '-annc';
const EMBED_CMD = '-embed';

function pingCmd(msg) {
  console.log('Ping command');
  return msg.reply('pong');
}

function anncCmd(msg) {
  const message = msg.content.replace(ANNC_CMD, '');
  const anncChan = client.channels.get(config.anncChannelId);

  console.log('Annc command');
  return anncChan.send(message);
}

function embedCmd(msg) {
  const message = msg.content.replace(EMBED_CMD, '');

  try {
    const embed = JSON.parse(message);

    console.log('Embed command');
    return msg.channel.send('', embed);
  } catch (e) {
    console.error('Embed command failed::', e.message);
    return msg.channel.send('Invalid JSON');
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  try {
    if (msg.member.id === client.user.id) {
      // Don't process bot's own messages
      return;
    }

    if (!msg.member.roles.has(config.adminRoleId)) {
      // Only admin roles can interact with bot
      return;
    }

    if (msg.content === '-ping') {
      await pingCmd(msg);
    }

    if (msg.content.includes(ANNC_CMD)) {
      await anncCmd(msg);
    }

    if (msg.content.includes(EMBED_CMD)) {
      await embedCmd(msg);
    }
  } catch (e) {
    console.log('Command Error', e.message);
    msg.channel.send(`Uh oh, I'm confused (\`${e.message}\`)`);
  }
});

client.login(config.discordToken);
