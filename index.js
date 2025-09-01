const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const db = require('./database/db');

// Create bot instance
const bot = new TelegramBot(config.BOT_TOKEN, { polling: true });

// Load all commands dynamically
const commands = {};
fs.readdirSync(path.join(__dirname, 'commands')).forEach(file => {
  if(file.endsWith('.js')){
    const cmd = require(`./commands/${file}`);
    commands[cmd.name] = cmd;
  }
});

// Helper: send message safely
function send(msg, text) {
  bot.sendMessage(msg.chat.id, text, { parse_mode: 'Markdown' });
}

// Handle incoming messages
bot.on('message', async (msg) => {
  if(!msg.text) return;

  const args = msg.text.trim().split(' ');
  let commandName;

  if(msg.text.startsWith('/')){
    commandName = args[0].substring(1).toLowerCase();
  } else {
    commandName = args[0].toLowerCase();
  }

  const command = commands[commandName];

  if(command){
    try{
      await command.execute(bot, msg, args, config, db);
    }catch(e){
      console.error(e);
      send(msg, '❌ Error executing command!');
    }
  }
});

// Optional: welcome new users
bot.on('new_chat_members', (msg) => {
  msg.new_chat_members.forEach(member => {
    bot.sendMessage(msg.chat.id, `Welcome ${member.first_name}! 🎉`);
  });
});

// Log bot is running
console.log('🤖 MR RABBIT XMD BOT is running...');
