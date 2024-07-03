if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const express = require('express');
const { chats } = require('./data/data');
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send('Hello');
})

app.get('/api/chats', (req, res) => {
    res.send(chats);
})

app.get('/api/chats/:id', (req, res) => {
    const chatId = req.params.id;
    const singleChat = chats.find((c) => c._id === chatId);
    res.send(singleChat);
});



app.listen(PORT, () => {
    console.log(`Server started at port ${PORT} `)
});