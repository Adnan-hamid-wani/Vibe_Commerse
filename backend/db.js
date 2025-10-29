const mongoose = require('mongoose');

async function connectDB(uri){
  try {
    await mongoose.connect(uri, {
      // use new parser / unified topology by default in mongoose v7+
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
