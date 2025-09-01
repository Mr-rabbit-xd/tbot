const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'menu',
  description: 'Show all commands',
  execute(bot, msg) {
    const commandFiles = fs.readdirSync(path.join(__dirname));
    let menuText = '╭━━━〔 🤖 MR RABBIT XMD BOT 〕━━━╮\n│   🌐 OFFICIAL ALL COMMAND MENU 🌐\n│\n';

    commandFiles.forEach(file => {
      if(file.endsWith('.js') && file !== 'menu.js'){
        const cmd = require(`./${file}`);
        menuText += `├─ /${cmd.name} → ${cmd.description || 'Command'}\n`;
      }
    });

    // Always include ping
    if(!commandFiles.includes('ping.js')) menuText += '├─ /ping → Check bot status\n';
    menuText += '╰━━━━━━━━━━━━━━━━━━━━━━━╯\n✨ Type any command & enjoy 🚀';
    bot.sendMessage(msg.chat.id, menuText);
  }
};
