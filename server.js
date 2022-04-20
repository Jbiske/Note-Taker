// dependices 
const express = require('express');
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const db = require('./Develop/db/db.json');
const { v4: uuidv4 } = require('uuid');
const { response, application } = require('express');



const app = express();

// middleware

app.use(express.static('./Develop/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/api/notes', (res, req) => {
    //READ 'db.json' file
    let data = JSON.parse(fs.readFileSync('./Develop/db/db.json', 'utf8'));
    console.log(JSON.stringify(data));
    req.json(data)


})


//api post
app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    console.log(JSON.stringify(newNote));

    // assigns a id
    newNote.id = uuidv4();

    // reads data from db.json save note
    let data = JSON.parse(fs.readFileSync('./Develop/db/db.json', 'utf8'));
    data.push(newNote);

    fs.writeFileSync('./Develop/db/db.json', JSON.stringify(data));

    res.json(data);
});



// Delete requests if i can figure it out
// 
// app.delete();


// routes 

// creat routes 
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'))
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
})