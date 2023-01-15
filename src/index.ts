import express from 'express';

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post('/webhook', (req, res) => {
  console.log(req.body);

  return res.send('Post request to webhook');
});

app.listen(3000, () => {
  console.log('Listening at port 3000');
});
