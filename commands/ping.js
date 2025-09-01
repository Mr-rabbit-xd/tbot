module.exports = {
  name: 'ping',
  description: 'Check bot status',
  execute(bot, msg) {
    bot.sendMessage(msg.chat.id, 'Pong! 🏓');
  }
};
