const { Markup } = require("telegraf");
const { SETTINGS, ADMIN_ID } = require("../config");

module.exports = (bot) => {
  bot.hears("🔑 Buy Key", async (ctx) => {
    const s = SETTINGS();
    await ctx.reply(
      "📅 Choose Key Duration:",
      Markup.inlineKeyboard([
        [{ text: `7 Days (₹${s.prices["7day"]})`, callback_data: "buy:7day" }],
        [{ text: `15 Days (₹${s.prices["15day"]})`, callback_data: "buy:15day" }],
        [{ text: `30 Days (₹${s.prices["30day"]})`, callback_data: "buy:30day" }],
      ])
    );
  });

  bot.action(/buy:(.+)/, async (ctx) => {
    const duration = ctx.match[1];
    ctx.session = ctx.session || {};
    ctx.session.buy = { duration };

    await ctx.reply(
      "📱 Select Number of Devices:",
      Markup.inlineKeyboard([
        [{ text: "1 Device", callback_data: "device:1" }],
        [{ text: "2 Devices", callback_data: "device:2" }],
        [{ text: "3 Devices", callback_data: "device:3" }],
      ])
    );
  });

  bot.action(/device:(\d+)/, async (ctx) => {
    const devices = Number(ctx.match[1]);
    ctx.session.buy.devices = devices;

    const s = SETTINGS();
    const duration = ctx.session.buy.duration;
    const price = s.prices[duration] * devices;

    await ctx.replyWithPhoto(
      { url: process.env.QR_IMAGE_URL },
      {
        caption:
          `🧾 *Order Summary*\n\n` +
          `🕒 Duration: *${duration}*\n📱 Devices: *${devices}*\n💵 Price: *₹${price}*\n\n` +
          `📌 Pay to UPI: \`${process.env.UPI_ID}\`\n\n` +
          `✅ After payment, send Transaction ID using /tx <your_id>`,
        parse_mode: "Markdown",
      }
    );
  });

  bot.command("tx", async (ctx) => {
    const txId = ctx.message.text.split(" ")[1];
    if (!txId) return ctx.reply("⚠️ Please provide transaction id.\nExample: `/tx 1234567890`", { parse_mode: "Markdown" });

    const order = ctx.session?.buy;
    if (!order) return ctx.reply("❌ No active order. Please start again with 🔑 Buy Key.");

    // Notify admin
    await ctx.telegram.sendMessage(
      ADMIN_ID,
      `📢 *New Payment Received*\n\n👤 User: ${ctx.from.first_name} (${ctx.from.id})\n🕒 Duration: ${order.duration}\n📱 Devices: ${order.devices}\n💳 TxID: ${txId}`,
      { parse_mode: "Markdown" }
    );

    await ctx.reply("✅ Transaction ID submitted. Admin will verify and provide your key within 6 hours.");
  });
};
