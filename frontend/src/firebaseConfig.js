import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import "firebase/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optionalsdfdsf
const firebaseConfig = {
  apiKey: "AIzaSyB97WdkkmTsYuqrrvrhAHamJVqAiQV0hz8",
  authDomain: "redditclone-a94ad.firebaseapp.com",
  projectId: "redditclone-a94ad",
  storageBucket: "redditclone-a94ad.appspot.com",
  messagingSenderId: "397922658355",
  appId: "1:397922658355:web:731f779697c474447c1b46",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
