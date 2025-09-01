// worker.js
require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const admin = require("./lib/firebase");
const { getDb } = require("./lib/mongo");

const bot = new Telegraf(process.env.BOT_TOKEN);

// Firestore reference
const dbFS = admin.firestore();

// 🏁 Start command
bot.start(async (ctx) => {
  const name = ctx.from.first_name || "User";
  await ctx.reply(
    `👋 Welcome ${name}!\n\nThis is 𝐌𝐫 𝐑𝐚𝐛𝐛𝐢𝐭 𝐊𝐞𝐲 Bot.\nChoose an option below:`,
    Markup.keyboard([
      ["🔑 Buy Key", "📦 My Keys"],
      ["👥 Referral", "💰 Wallet"],
      ["⚙️ Help"]
    ])
      .resize()
  );
});

// Example menu buttons
bot.hears("🔑 Buy Key", async (ctx) => {
  await ctx.reply("🛒 Key buying system coming soon...");
});

bot.hears("📦 My Keys", async (ctx) => {
  await ctx.reply("🔍 Your key history will show here.");
});

bot.hears("👥 Referral", async (ctx) => {
  await ctx.reply("👥 Referral system coming soon...");
});

bot.hears("💰 Wallet", async (ctx) => {
  await ctx.reply("💳 Wallet system coming soon...");
});

bot.hears("⚙️ Help", async (ctx) => {
  await ctx.reply("ℹ️ Use the menu buttons to navigate.");
});

// Launch
bot.launch();
console.log("🤖 Bot worker started");

// Graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
