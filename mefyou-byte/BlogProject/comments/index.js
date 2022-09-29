const express = require('express'); 
const app = express(); 
const {randomBytes} = require('crypto'); 
const bodyparser = require('body-parser'); 


app.use(bodyparser.json()); 


const commentsbypostsID = {}
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsbypostsID[req.params.id] || []);   
}); 



app.post('/posts/:id/comments', (req, res) => {
    const id = randomBytes(4).toString('hex'); 
    const {content} = req.body; 

    const comments = commentsbypostsID[req.params.id] || []; 
    comments.push({
        id: id, 
        content
    }); 

    commentsbypostsID[req.params.id] = comments;
    res.status(201).send(comments); 
}); 

app.listen(4001, () => {
    console.log('Listeneing on Port 4001') 
})