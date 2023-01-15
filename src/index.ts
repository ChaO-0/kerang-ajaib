import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const reply = async (message: string, replyToken: string) => {
  await axios.post(
    'https://api.line.me/v2/bot/message/reply',
    {
      replyToken: replyToken,
      messages: [
        {
          type: 'text',
          text: message,
        },
      ],
    },
    {
      headers: {
        Authorization:
          'Bearer BNEwKTIQ2oA5UHrdir7mQV9GOwDVFG6LX0ReYTPDaqKx7M3IiE8WYq/c64yw2S8WRffv9/orAuEV9H3TkMEfOlMV3aHJA2yhTqzkZpoYPl6pJz9hTezYXQ2jUyMvDMak9z6xwgJm9LCVFENDFvy8+AdB04t89/1O/w1cDnyilFU=',
      },
    }
  );
};

app.post('/webhook', async (req, res) => {
  console.log(JSON.stringify(req.body));

  const events = req.body.events;
  const randomAnswer = [
    'Ya',
    'Tidak',
    'Tentu Iya',
    'Tentu Tidak',
    'Bisa Jadi',
    'Mungkin',
    'Coba Tanya Lagi',
  ];
  const randomNumber = Math.floor(Math.random() * randomAnswer.length);

  events.map(async (event: any) => {
    if (event.type === 'join') {
      await axios.post(
        'https://api.line.me/v2/bot/message/reply',
        {
          replyToken: event.replyToken,
          messages: [
            {
              type: 'text',
              text: 'Terima kasih kepada admin grup Yana Sugosha sudah membiarkan saya join ke grup ini',
            },
            {
              type: 'text',
              text: 'Semoga kelak bisa bersatu dengan gek esa,',
            },
            {
              type: 'text',
              text: 'Mari kita doakan teman teman, AMIN',
            },
          ],
        },
        {
          headers: {
            Authorization:
              'Bearer BNEwKTIQ2oA5UHrdir7mQV9GOwDVFG6LX0ReYTPDaqKx7M3IiE8WYq/c64yw2S8WRffv9/orAuEV9H3TkMEfOlMV3aHJA2yhTqzkZpoYPl6pJz9hTezYXQ2jUyMvDMak9z6xwgJm9LCVFENDFvy8+AdB04t89/1O/w1cDnyilFU=',
          },
        }
      );
    }

    if (event.type === 'message') {
      const text = event.message.text.toLowerCase();
      if (text === 'apakah') {
        await reply('Apakah apaan anjing, tanya yg bener', event.replyToken);
      }

      if (text.includes('gustu') && text.includes('ganteng')) {
        await reply('Dan keren', event.replyToken);
      }

      if (text.includes('yana') && text.includes('gek esa')) {
        await reply(
          'Yana dan Gek Esa sudah dipastikan untuk bersama di masa depan',
          event.replyToken
        );
      }

      if (text.includes('apakah')) {
        await reply(randomAnswer[randomNumber], event.replyToken);
      }
    }
  });

  return res.send('Post request to webhook');
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
