const {Client, RichEmbed} = require('discord.js');
const client = new Client();

const config = require('./config/config');

const ANNC_CMD = '-annc';
const EMBED_CMD = '-embed';

function log(msg, action, error) {
  const log = {
    timestamp: new Date(),
    action,
    user: msg.member.user.tag,
    content: msg.content,
  };

  if (error) {
    log.error = error.message;
  }

  console.log(log);
}

function pingCmd(msg) {
  log(msg, '-ping');
  return msg.reply('pong');
}

function anncCmd(msg) {
  const message = msg.content.replace(ANNC_CMD, '');
  const anncChan = client.channels.get(config.anncChannelId);

  log(msg, ANNC_CMD);
  return anncChan.send(message);
}

function embedCmd(msg) {
  const message = msg.content.replace(EMBED_CMD, '');

  try {
    const embed = JSON.parse(message);

    log(msg, EMBED_CMD);
    return msg.channel.send('', embed);
  } catch (e) {
    log(msg, EMBED_CMD, e);
    return msg.channel.send(`Beep-boop, Invalid JSON (\`${e.message}\`)`);
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  try {
    if (!msg.content.startsWith('-')) {
      return;
    }

    if (msg.member.id === client.user.id) {
      // Don't process bot's own messages
      return;
    }

    if (
      msg.member.id !== config.adminUserId &&
      !msg.member.roles.has(config.adminRoleId)
    ) {
      // Only admin roles can interact with bot
      log(msg, 'auth', {message: 'Unauthorized'});
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
    log(msg, 'unexpected', e);
    msg.channel.send(`Uh oh, I'm confused (\`${e.message}\`)`);
  }
});

client.login(config.discordToken);
