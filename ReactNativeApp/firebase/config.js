// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, browserSessionPersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA0dNlQyLOQda0DnegrjbUMpHGgEOS-FHY",
  authDomain: "reactnative-50293.firebaseapp.com",
  projectId: "reactnative-50293",
  storageBucket: "reactnative-50293.appspot.com",
  messagingSenderId: "194085058741",
  appId: "1:194085058741:web:a66369b54af9b276f1a6fc",
  measurementId: "G-TNSVSGMH56",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: browserSessionPersistence,
  popupRedirectResolver: undefined,
});
export const db = getFirestore(app);
export const storage = getStorage(app);

// const analytics = getAnalytics(app);
