const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const noteData = JSON.parse(data);
      res.json(noteData);
    }
  });
})

app.post('/api/notes', (req, res) => {
  try {
    let addNote = req.body;
    addNote.id =uuid.v4;
    const noteData = fs.readFileSync('./db/db.json', 'utf8');
    const notes = JSON.parse(noteData);
    notes.push(addNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(noteData, null));
    res.json(addNote);
  } catch (err) {
    console.log(err);
  }
  
  // fs.readFile('./db/db.json', 'utf8', (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     const noteData = JSON.parse(data);
  //     noteData.push(addNote);
  //     fs.writeFile('./db/db.json', JSON.stringify(noteData, null), (err) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         res.json(addNote);
  //       }
  //     });
  //   }
  // })
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);