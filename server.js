const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

const app = express();
const PORT = 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.get('/', (req, res) => res.send('Navigate to /index or /notes'));

// GET route for home page
app.get('/index', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// GET route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/notes.html'))
);

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// GET route for notes db
app.get('/api/db', (req, res) => {
  console.info(`${req.method} request received to get saved notes`);
  readFromFile('db/notes.json').then((data) => res.json(JSON.parse(data)));  
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

      fs.appendFile(`./db/notes.json`, noteString, (err) =>
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
