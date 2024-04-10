require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TG_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async msg => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    await bot.sendMessage(chatId, 'tap to see web app', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'order',
              web_app: { url: webAppUrl },
            },
          ],
        ],
      },
    });
  }
});