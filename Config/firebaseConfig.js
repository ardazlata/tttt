const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');

const firebaseConfig = {
  apiKey: "AIzaSyD9kId05ci0fTFFJfuxZrqcUijiE-Hr1p0",
    authDomain: "biobeo-4f67b.firebaseapp.com",
    projectId: "biobeo-4f67b",
    storageBucket: "biobeo-4f67b.appspot.com",
    messagingSenderId: "137762296517",
    appId: "1:137762296517:web:4d9dceff5873e4a04b16ac",
    measurementId: "G-869N9ZEPF4"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = { storage, app };