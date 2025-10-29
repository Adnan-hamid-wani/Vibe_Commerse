/**
 * Simple Express server for Vibe-Commerce backend
 */

require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// root
app.get('/', (req, res) => res.send('Vibe-Commerce API running'));

// Start
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/vibe-commerce')
  .then(() => {
    app.listen(PORT, () => console.log('Server running on port', PORT));
  })
  .catch(err => {
    console.error('Failed to connect DB', err);
  });
