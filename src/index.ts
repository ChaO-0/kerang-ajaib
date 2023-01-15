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
      if (text.includes('gustu') && text.includes('ganteng')) {
        await reply('Dan keren', event.replyToken);
      }

      if (text.includes('apakah')) {
        await reply('Ya', event.replyToken);
      }
    }
  });

  // if (req.body.events[0].type === 'message') {
  //   await axios.post(
  //     'https://api.line.me/v2/bot/message/reply',
  //     {
  //       replyToken: req.body.events[0].replyToken,
  //       messages: [
  //         {
  //           type: 'text',
  //           text: 'Yana dan gek esa',
  //         },
  //         {
  //           type: 'text',
  //           text: 'YANA GEK ESA',
  //         },
  //       ],
  //     },
  //     {
  //       headers: {
  //         Authorization:
  //           'Bearer BNEwKTIQ2oA5UHrdir7mQV9GOwDVFG6LX0ReYTPDaqKx7M3IiE8WYq/c64yw2S8WRffv9/orAuEV9H3TkMEfOlMV3aHJA2yhTqzkZpoYPl6pJz9hTezYXQ2jUyMvDMak9z6xwgJm9LCVFENDFvy8+AdB04t89/1O/w1cDnyilFU=',
  //       },
  //     }
  //   );
  // }

  return res.send('Post request to webhook');
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
