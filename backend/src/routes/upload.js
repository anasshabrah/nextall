// C:\Users\hanos\DamaX\backend\src\routes\upload.js
'use strict';

const express = require('express');
const multer = require('multer');
const { singleFileUploader } = require('../config/uploader');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
  console.log('POST /api/upload received');
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const uploadedFile = await singleFileUploader(req.file.path);
    res.json({ filename: uploadedFile._id, url: uploadedFile.url, blurDataURL: uploadedFile.blurDataURL });
  } catch (err) {
    console.error("Error uploading file to Cloudflare R2:", err);
    res.status(500).json({ message: 'Error uploading file to R2', error: err.message });
  }
});

module.exports = router;
