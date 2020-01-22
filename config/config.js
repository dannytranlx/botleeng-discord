let localConfig;
try {
  localConfig = require('./local');
} catch (e) {
  localConfig = {};
}

const config = {
  anncChannelId: localConfig.ANNC_CHANNEL_ID || process.env.ANNC_CHANNEL_ID,
  discordToken: localConfig.DISCORD_TOKEN || process.env.DISCORD_TOKEN,
};

module.exports = config;
