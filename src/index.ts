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

app.post('/webhook', async (req, res) => {
  console.log(JSON.stringify(req.body));

  if (req.body.events[0].type === 'message') {
    await axios.post(
      'https://api.line.me/v2/bot/message/reply',
      {
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            type: 'text',
            text: 'Yana dan gek esa',
          },
          {
            type: 'text',
            text: 'YANA GEK ESA',
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

  return res.send('Post request to webhook');
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
