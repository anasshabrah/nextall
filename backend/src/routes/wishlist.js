// File: C:\Users\hanos\nextall\backend\src\routes\wishlist.js

const express = require('express');
const router = express.Router();
const wishlistRoutes = require('../controllers/wishlist');
// Import verifyToken function
const verifyToken = require('../config/jwt');
//user routes
router.get('/wishlist', verifyToken, wishlistRoutes.getWishlist);
router.post('/wishlist', verifyToken, wishlistRoutes.createWishlist);

module.exports = router;
