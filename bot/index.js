require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const token = process.env.TG_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;
const PORT = process.env.PORT || 5000;

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());

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

app.post('/web-data', async (req, res) => {
  const { queryId, products, totalPrice } = req.body;
  try {
    await bot.answerWebAppQuery(queryId, {
      type: 'article',
      id: queryId,
      title: 'successful purchase',
      input_message_content: {
        message_text: `thank you for buying, total worth:  + ${totalPrice}, 
        ${products.map(product => product.title).join(', ')}
        `,
      },
    });
    return res.status(200).json({});
  } catch (error) {
    console.log(error);

    await bot.answerWebAppQuery(queryId, {
      type: 'article',
      id: queryId,
      title: 'purchase failed',
      input_message_content: { message_text: 'purchase failed' },
    });
    return res.status(500).json({});
  }
});

app.listen(PORT, () => console.log('server started on PORT: ' + PORT));
