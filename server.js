const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


// This is my data (one day it will come from database)
// let emails = [
//     {id: 8,title: 'Mastering SCSS', price: 78, description: 'bla bla'},
//     {id: 9,title: 'Mastering $', price: 8, description: 'jq bla bla'}
// ];

 let emails = [
        {id: 1, subject: 'work', body: 'work work work', isRead: false },
        {id: 2, subject: 'advertisment', body: 'New Year Sale!', isRead: false },
        {id: 3, subject: 'fun', body: 'fun fun fun!', isRead: false },
        {id: 4, subject: 'get the new Vue.js Today!', body: 'Take a look', isRead: false },
        {id: 5, subject: 'Puki Support center', body: 'yep yep yep', isRead: false },
        {id: 6, subject: 'Muki shop', body: 'fun fun fun!', isRead: false },
            ];

// *** REST API ***




// LIST
app.get('/emails', (req, res) => {
//   setTimeout(()=>res.json(emails), 2000);
    res.json(emails);
})


// READ
app.get('/emails/:id', (req, res) => {
  const id = +req.params.id;
  const email = emails.find(currItem => currItem.id === id);
  res.json(email)
})

// DELETE
app.delete('/emails/:id', (req, res) => {
  const id = +req.params.id;
  emails = emails.filter(currItem => currItem.id !== id);
  res.json({msg: 'Deleted'});
})

// CREATE
app.post('/emails', (req, res) => {
  const email =  req.body;
  email.id = findNextId();
  emails.push(email);
  res.json({msg: 'email was added!'});
})

// TODO: UPDATE
app.put('/emails', (req, res) => {
  const email =  req.body; 
  email = emails.map(currItem => (currItem.id === item.id)? item: currItem);
  res.json({msg: 'email was updates!'});
})

app.listen(3003, () => {
  console.log('REST API listening on port 3003!')
})

function findNextId() {
    var maxId = 0;
    emails.forEach(email => {
        if (email.id > maxId) maxId = email.id;
    });
    return maxId + 1;
}