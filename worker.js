require("dotenv").config();
const { Telegraf } = require("telegraf");
const { BOT_TOKEN } = require("./config");

// 1️⃣ Bot declare
const bot = new Telegraf(BOT_TOKEN);

// 2️⃣ Load commands
require("./commands/start")(bot);
require("./commands/settings")(bot);
require("./commands/buyKey")(bot);
require("./commands/admin")(bot);

// 3️⃣ Error handling
bot.catch((err, ctx) => {
  console.error("Bot Error:", err);
  if (ctx) ctx.reply("⚠️ Something went wrong.");
});

// 4️⃣ Launch bot
bot.launch()
  .then(() => console.log("✅ Bot is running..."))
  .catch((err) => console.error("❌ Bot failed to launch:", err));

// 5️⃣ Graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
