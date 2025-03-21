// C:\Users\hanos\nextall\backend\src\config\getBlurDataURL.js

const getBlurDataURL = async (url) => {
  if (!url) {
    return null;
  }
  // Without a transformation API, simply return the original image URL.
  return url;
};

module.exports = getBlurDataURL;
