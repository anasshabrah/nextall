// File: C:\Users\hanos\nextall\server.js
'use strict';

const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// 1) Load environment variables
dotenv.config();

// 2) Determine if we’re in dev mode
const dev = process.env.NODE_ENV !== 'production';

// 3) Create the Next.js application (frontend is in the "frontend" folder)
const nextApp = next({ dev, dir: './frontend' });

// 4) Create a request handler to let Next.js process unhandled routes
const handle = nextApp.getRequestHandler();

// 5) Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected.'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 6) Prepare the Next.js app, then start the Express server
nextApp.prepare().then(() => {
  const server = express();

  // Enable CORS with credentials for the frontend domain
  server.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  }));
  server.use(bodyParser.json());

  // ------------------------------------------------------------------
  // Import and mount your Express routes
  // ------------------------------------------------------------------
  const homeRoutes = require('./backend/src/routes/home');
  const authRoutes = require('./backend/src/routes/auth');
  const brandRoutes = require('./backend/src/routes/brand');
  const categoryRoutes = require('./backend/src/routes/category');
  const subcategoryRoutes = require('./backend/src/routes/subcategory');
  const newsletterRoutes = require('./backend/src/routes/newsletter');
  const productRoutes = require('./backend/src/routes/product');
  const dashboardRoutes = require('./backend/src/routes/dashboard');
  const searchRoutes = require('./backend/src/routes/search');
  const userRoutes = require('./backend/src/routes/user');
  const cartRoutes = require('./backend/src/routes/cart');
  const couponCodeRoutes = require('./backend/src/routes/coupon-code');
  const productReviewRoutes = require('./backend/src/routes/product-review');
  const reviewRoutes = require('./backend/src/routes/review');
  const wishlistRoutes = require('./backend/src/routes/wishlist');
  const orderRoutes = require('./backend/src/routes/order');
  const paymentRoutes = require('./backend/src/routes/payment-intents');
  const deleteFileRoutes = require('./backend/src/routes/file-delete');
  const shopRoutes = require('./backend/src/routes/shop');
  const payment = require('./backend/src/routes/payment');
  const currency = require('./backend/src/routes/currencies');
  const compaign = require('./backend/src/routes/compaign');
  const uploadRoutes = require('./backend/src/routes/upload');

  // Mount routes at /api
  server.use('/api', homeRoutes);
  server.use('/api', authRoutes);
  server.use('/api', brandRoutes);
  server.use('/api', categoryRoutes);
  server.use('/api', subcategoryRoutes);
  server.use('/api', newsletterRoutes);
  server.use('/api', productRoutes);
  server.use('/api', dashboardRoutes);
  server.use('/api', searchRoutes);
  server.use('/api', userRoutes);
  server.use('/api', cartRoutes);
  server.use('/api', couponCodeRoutes);
  server.use('/api', productReviewRoutes);
  server.use('/api', reviewRoutes);
  server.use('/api', wishlistRoutes);
  server.use('/api', orderRoutes);
  server.use('/api', paymentRoutes);
  server.use('/api', deleteFileRoutes);
  server.use('/api', shopRoutes);
  server.use('/api', payment);
  server.use('/api', currency);
  server.use('/api', compaign);
  server.use('/api/upload', uploadRoutes);

  // Example test route
  server.get('/test', (req, res) => {
    res.send('Merged backend + Next.js custom server is up!');
  });

  // Let Next.js handle all other routes
  server.all('*', (req, res) => handle(req, res));

  // 7) Start the server on the designated port
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Server + Next.js running on http://localhost:${PORT}`);
  });
});
