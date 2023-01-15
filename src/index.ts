import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
