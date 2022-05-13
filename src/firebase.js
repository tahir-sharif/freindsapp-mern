import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyACIPWkjF4GAJUYpoj0OFf9nB3OPFttD9A",
  authDomain: "friends-app-d574f.firebaseapp.com",
  projectId: "friends-app-d574f",
  storageBucket: "friends-app-d574f.appspot.com",
  messagingSenderId: "1056227757165",
  appId: "1:1056227757165:web:3e828bebe69853bd954364",
  measurementId: "G-ZENCNTCRCW",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage();
