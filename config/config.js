let localConfig;
try {
  localConfig = require('./local');
} catch (e) {
  localConfig = {};
}

const config = {
  adminRoleId: localConfig.ADMIN_ROLE_ID || process.env.ADMIN_ROLE_ID,
  adminUserId: localConfig.ADMIN_USER_ID || process.env.ADMIN_USER_ID,
  anncChannelId: localConfig.ANNC_CHANNEL_ID || process.env.ANNC_CHANNEL_ID,
  discordToken: localConfig.DISCORD_TOKEN || process.env.DISCORD_TOKEN,
};

module.exports = config;
