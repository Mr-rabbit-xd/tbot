const { Markup } = require("telegraf");

module.exports = (bot) => {
  bot.start(async (ctx) => {
    await ctx.reply(
      `👋 Welcome ${ctx.from.first_name}!\n\nThis is your Key Management Bot.`,
      Markup.keyboard([
        ["🔑 Buy Key", "📦 My Keys"],
        ["💰 Wallet", "👥 Referral"],
        ["⚙️ Settings"]
      ]).resize()
    );
  });
};
