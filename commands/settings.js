const { SETTINGS, ADMIN_ID } = require("../config");

let currentSettings = SETTINGS();

module.exports = (bot) => {
  bot.hears("⚙️ Settings", async (ctx) => {
    const s = currentSettings;
    await ctx.reply(
      `⚙️ Current System Settings:\n\n` +
      `💵 Key Price:\n  • 7 Day = ₹${s.prices["7day"]}\n  • 15 Day = ₹${s.prices["15day"]}\n  • 30 Day = ₹${s.prices["30day"]}\n\n` +
      `🎁 Offer: Buy ${s.offer.count} Keys → Get ${s.offer.free} Free\n\n` +
      `👥 Referral Bonus = ₹${s.referralBonus}\n` +
      `💳 Minimum Withdraw = ₹${s.minWithdraw}`
    );
  });

  bot.command("update", async (ctx) => {
    if (String(ctx.from.id) !== String(ADMIN_ID)) {
      return ctx.reply("❌ You are not authorized to update settings.");
    }
    currentSettings = SETTINGS();
    await ctx.reply("✅ Settings reloaded from ENV successfully.");
  });
};
