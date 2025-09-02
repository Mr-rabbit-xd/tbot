bot.catch((err, ctx) => {
  console.error("Bot Error:", err);
  ctx.reply("⚠️ Something went wrong.");
});

// Launch bot
bot.launch();
console.log("✅ Bot is running...");

// Graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
