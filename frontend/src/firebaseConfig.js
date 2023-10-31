import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcrwEPaDeQ2ZDhgllaqXqZRp-KehILBls",
  authDomain: "redditclone-d342a.firebaseapp.com",
  projectId: "redditclone-d342a",
  storageBucket: "redditclone-d342a.appspot.com",
  messagingSenderId: "234280098200",
  appId: "1:234280098200:web:0a8d88348bd3fd2a5fb3ed",
  measurementId: "G-PRD26XQ168",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
