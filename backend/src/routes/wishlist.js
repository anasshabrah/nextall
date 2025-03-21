// File: C:\Users\hanos\nextall\backend\src\routes\wishlist.js

const express = require('express');
const router = express.Router();
const wishlistRoutes = require('../controllers/wishlist');
const verifyToken = require('../config/jwt');
router.get('/wishlist', verifyToken, wishlistRoutes.getWishlist);
router.post('/wishlist', verifyToken, wishlistRoutes.createWishlist);

module.exports = router;
