// File: C:\Users\hanos\nextall\backend\src\routes\compaign.js

const express = require('express');
const router = express.Router();
const compaign = require('../controllers/compaign');
const verifyToken = require('../config/jwt');

// Admin (protected) routes
router.get('/admin/compaigns', verifyToken, compaign.getAdminCompaigns);
router.get('/admin/compaigns/:slug', verifyToken, compaign.getOneCompaignByAdmin);
router.post('/admin/compaigns', verifyToken, compaign.createCompaign);
router.put('/admin/compaigns/:slug', verifyToken, compaign.updateOneCompaignByAdmin);
router.delete('/admin/compaigns/:cid', verifyToken, compaign.deleteOneCompaignByAdmin);

// Public routes – static endpoints first
router.get('/compaigns-slugs', compaign.getCompaignsSlugs);
router.get('/compaign-title/:slug', compaign.getCompaignNameBySlug);
router.get('/compaigns', compaign.getCompaignsByUser);
router.get('/compaigns/:slug', compaign.getCompaignBySlug);

module.exports = router;
