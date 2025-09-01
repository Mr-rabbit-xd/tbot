module.exports = {
  name: 'start',
  description: '👋 Start the bot and see welcome message',
  execute(bot, msg, args, config) {
    const welcomeMessage = `
╭━━━〔 🤖 MR RABBIT XMD BOT 〕━━━╮
│   🌟 Welcome, ${msg.from.first_name}!
│
│ I am your multifunctional Telegram bot with:
│ • 🎵 Download commands (YouTube, Facebook, TikTok, Instagram)
│ • 😂 Fun & Entertainment
│ • 🤖 AI-powered commands
│ • 🛠️ Useful Tools
│ • 👑 Owner & Support info
│
│ Type /menu to see all commands.
│ You can also type commands without slash.
╰━━━━━━━━━━━━━━━━━━━━━━━╯
✨ Enjoy and have fun! 🚀
    `;

    bot.sendMessage(msg.chat.id, welcomeMessage);
  }
};
