// File: C:\Users\hanos\nextall\backend\src\config\uploader.js

const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

// Configure S3 client for Cloudflare R2 using AWS SDK v3
const s3Client = new S3Client({
  region: 'auto', // or specify a region if required
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

// Function to upload a file to R2
const uploadOnR2 = async (filePath) => {
  const fileStream = fs.createReadStream(filePath);
  const fileName = path.basename(filePath);
  const params = {
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileName,
    Body: fileStream,
    ACL: 'public-read', // Adjust if needed
  };
  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  // Construct the file URL based on your R2 endpoint and bucket name
  const fileUrl = `${process.env.R2_ENDPOINT.replace(/\/$/, '')}/${process.env.R2_BUCKET_NAME}/${fileName}`;
  return {
    Key: fileName,
    Location: fileUrl,
  };
};

// Function to delete a file from R2
const deleteFromR2 = async (fileKey) => {
  const params = {
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileKey,
  };
  const command = new DeleteObjectCommand(params);
  return s3Client.send(command);
};

exports.multiFileUploader = async (images) => {
  const imageUrlList = [];
  for (let i = 0; i < images.length; i++) {
    const localFilePath = images[i];
    const result = await uploadOnR2(localFilePath);
    imageUrlList.push({
      _id: result.Key,
      url: result.Location,
    });
  }
  return imageUrlList;
};

exports.singleFileUploader = async (image) => {
  const result = await uploadOnR2(image);
  return {
    _id: result.Key,
    url: result.Location,
  };
};

exports.singleFileDelete = async (fileKey) => {
  return await deleteFromR2(fileKey);
};

exports.multiFilesDelete = async (images) => {
  const results = [];
  for (let i = 0; i < images.length; i++) {
    const result = await deleteFromR2(images[i]._id);
    results.push(result);
  }
  return results;
};
