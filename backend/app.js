if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const express = require('express');
const { chats } = require('./data/data');
const app = express();
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 3000;

app.use('/api/user', userRoutes);
app.use(express.json()); // to accept json data


app.get('/', (req, res) => {
    res.send('Hello');
})


module.exports = app;