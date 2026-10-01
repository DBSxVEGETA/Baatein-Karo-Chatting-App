const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DATABASE_URL);
  } catch (error) {
    await mongoose.disconnect();
    throw new Error(`Database connection failed: ${error.message}`);
  }
};

module.exports = { connectToDatabase };
