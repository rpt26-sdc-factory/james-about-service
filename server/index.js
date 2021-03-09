const express = require('express');

const app = express();
const PORT = 3002;

app.use(express.static('./public'));

app.get('/api/about/:id', async (req, res) => {
  const data = await db.get(req.params.id);
  res.send(data).status(200);
});

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
