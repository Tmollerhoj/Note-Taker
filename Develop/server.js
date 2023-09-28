const express = require('express');
const path = require('path');
const fs = require('fs');
const dataBase = require('./db/db.json');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        const noteData = JSON.parse(data);
        res.json(noteData);
    });   
})

app.post('/api/notes', (req, res) => {
    const addNote = req.body;
    dataBase.push(addNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    res.json(data);
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);