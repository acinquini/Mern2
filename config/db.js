const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoDB_URI');

async function connectDB() {
  try {
    // console.log(db);
    mongoose.connect(`${db}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
