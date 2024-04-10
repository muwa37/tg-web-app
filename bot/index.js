require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TG_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async msg => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    await bot.sendMessage(chatId, 'shipping form', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'fill form',
              web_app: { url: webAppUrl + '/form' },
            },
          ],
        ],
      },
    });

    await bot.sendMessage(chatId, 'products list', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'make order',
              web_app: { url: webAppUrl },
            },
          ],
        ],
      },
    });

    if (msg.web_app_data?.data) {
      try {
        const data = json.parse(msg.web_app_data?.data);

        await bot.sendMessage(chatId, 'thanks for your order');
        await bot.sendMessage(chatId, 'your country' + data?.country);
        await bot.sendMessage(chatId, 'your street' + data?.street);

        setTimeout(async () => {
          await bot.sendMessage(chatId, 'your order received');
        }, 500);
      } catch (error) {
        console.log(error);
      }
    }
  }
});
