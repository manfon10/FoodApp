const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');
const process = require('dotenv').config();

const firebaseConfig = {
    apiKey: process.parsed.FIREBASE_API_KEY,
    projectId: process.parsed.FIREBASE_PROJECT_ID,
    storageBucket: process.parsed.FIREBASE_STORAGE,
    appId: process.parsed.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

module.exports = { storage };