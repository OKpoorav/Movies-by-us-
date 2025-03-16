import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app); // Keep analytics initialized but silence ESLint warning
const db = getFirestore(app); // Initialize Firestore

// Function to verify Firestore connection
export const testFirestoreConnection = async () => {
  try {
    // Try to access the 'movies' collection
    const moviesRef = collection(db, 'movies');
    const snapshot = await getDocs(moviesRef);
    console.log(`Firebase connection successful! Found ${snapshot.docs.length} movies in database.`);
    return true;
  } catch (error) {
    console.error('Firebase connection error:', error);
    return false;
  }
};

// Run the test on initialization to verify connection
testFirestoreConnection()
  .then(isConnected => {
    if (isConnected) {
      console.log('✅ Firestore database is ready to store movies.');
    } else {
      console.error('❌ Firestore database connection failed. Movies may not be saved properly.');
    }
  });

// Export Firebase functions and objects
export { 
  db, 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc
};