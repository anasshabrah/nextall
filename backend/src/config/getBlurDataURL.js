// File: backend/src/config/getBlurDataURL.js

const getBlurDataURL = async (url) => {
  if (!url) {
    return null;
  }
  // If you have a transformation API, you could generate a blurred version.
  // For now, simply return the original image URL.
  return url;
};

module.exports = getBlurDataURL;
