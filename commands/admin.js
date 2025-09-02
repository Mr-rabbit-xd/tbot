const { ADMIN_ID } = require("../config");
const firebase = require("../lib/firebase");
const { getDb } = require("../lib/mongo");

module.exports = (bot) => {
  bot.command("approve", async (ctx) => {
    if (String(ctx.from.id) !== String(ADMIN_ID)) {
      return ctx.reply("❌ You are not authorized to approve keys.");
    }

    const args = ctx.message.text.split(" ");
    if (args.length < 3) {
      return ctx.reply("⚠️ Usage: /approve <user_id> <key>");
    }

    const userId = args[1];
    const keyValue = args[2];

    try {
      // Firebase save
      const dbRef = firebase.database().ref(`keys/${userId}`);
      await dbRef.push({
        key: keyValue,
        created_at: new Date().toISOString(),
        active: true,
      });

      // Mongo save
      const db = await getDb();
      const users = db.collection("users");
      await users.updateOne(
        { telegram_id: userId },
        { $push: { key_history: { key: keyValue, date: new Date(), active: true } } },
        { upsert: true }
      );

      // Notify user
      await ctx.telegram.sendMessage(
        userId,
        `✅ Your key has been approved!\n\n🔑 Key: ${keyValue}\nEnjoy your access!`
      );

      await ctx.reply(`✅ Key approved and sent to user ${userId}`);
    } catch (err) {
      console.error(err);
      await ctx.reply("❌ Error approving key. Check logs.");
    }
  });
};
