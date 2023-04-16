const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.get('/', (req, res) => res.send('Navigate to /index or /notes'));

app.get('/index', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/notes.html'))
);

app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
