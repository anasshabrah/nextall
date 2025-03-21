// File: src/utils/storage.js
let storage;

if (typeof window !== 'undefined') {
  // We're in the browser: use redux-persist's local storage.
  storage = require('redux-persist/lib/storage').default;
} else {
  // On the server, provide a dummy storage to avoid errors.
  storage = {
    getItem: (_key) => Promise.resolve(null),
    setItem: (_key, _value) => Promise.resolve(),
    removeItem: (_key) => Promise.resolve()
  };
}

export default storage;
