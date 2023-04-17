const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.get('/', (req, res) => res.send('Navigate to /index or /notes'));

app.get('/index', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/notes.html'))
);
  
app.get('/api/db', (req, res) => {
    res.status(200).json(body);
    res.json(`${req.method} request received to get saved notes`);
    console.info(`${req.method} request received to get saved notes`);
});

// POST request to add a note
app.post('/api/db', (req, res) => {
    console.info(`${req.method} request received to save a note`);

    const { title, body } = req.body;
    
    if (title && body) {
      const newNote = {
        title,
        body,
      };

      const noteString = JSON.stringify(newNote);

      fs.writeFile(`./db/db.json`, noteString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `New note: ${newNote.title} has been written to JSON file`
          )
    );
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting note');
    }
});



app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
