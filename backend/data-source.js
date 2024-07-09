const mongoose = require('mongoose');


const MONGO_DATABASE_URL = 'mongodb://127.0.0.1:27017/mern-chat-app';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_DATABASE_URL);
    } catch (error) {
        await mongoose.disconnect();
        console.log(`Database connection failed Error:${e.message}`.red.bold)

    }
}


module.exports = { connectToDatabase };