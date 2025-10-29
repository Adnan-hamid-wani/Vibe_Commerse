/**
 * Seed script to create mock products.
 * Run: node seed.js (or npm run seed)
 */
const mongoose = require('mongoose');
const connectDB = require('./db');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  { name: 'Wireless Mouse', price: 999, description: 'Comfortable wireless mouse' },
  { name: 'Mechanical Keyboard', price: 3499, description: 'Tactile mechanical keyboard' },
  { name: 'USB-C Charger', price: 1299, description: 'Fast charging adapter' },
  { name: 'Noise Cancelling Headphones', price: 7499, description: 'Over-ear ANC headphones' },
  { name: 'Webcam 1080p', price: 2599, description: 'Crystal clear webcam' }
];

async function seed(){
  try {
    await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/vibe-commerce');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Seeded products');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
