# Backend Implementation - Movie Ratings By Us

## Overview
The backend for "Movie Ratings By Us" will be built using Firebase Firestore as the database to store and sync movie ratings. Firebase Authentication can be added later for multi-device access and user-specific data.

## Steps to Implement Firebase Backend

### 1️⃣ Set Up Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**, name it `MovieRatingsByUs`.
3. **Disable Google Analytics** (optional) → Click **"Continue"**.
4. Once created, go to **"Build" > "Firestore Database"** → Click **"Create database"**.
5. Choose **Start in test mode** (for development) → Select a region → Click **"Enable"**.

### 2️⃣ Install Firebase SDK in Frontend
Run the following command in your project directory:
```sh
npm install firebase
```

### 3️⃣ Configure Firebase in Your Project
Create a new file **`firebase.js`** inside `/src` and add the following:

```js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc };
```

### 4️⃣ Implement CRUD Operations

#### ➤ Add a Movie
```js
import { db, collection, addDoc } from "./firebase";

async function addMovie(movieData) {
  try {
    await addDoc(collection(db, "movies"), movieData);
    console.log("Movie added successfully!");
  } catch (error) {
    console.error("Error adding movie: ", error);
  }
}
```

#### ➤ Fetch Movies
```js
import { db, collection, getDocs } from "./firebase";

async function fetchMovies() {
  const querySnapshot = await getDocs(collection(db, "movies"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
```

#### ➤ Update a Movie
```js
import { db, doc, updateDoc } from "./firebase";

async function updateMovie(movieId, updatedData) {
  try {
    await updateDoc(doc(db, "movies", movieId), updatedData);
    console.log("Movie updated successfully!");
  } catch (error) {
    console.error("Error updating movie: ", error);
  }
}
```

#### ➤ Delete a Movie
```js
import { db, doc, deleteDoc } from "./firebase";

async function deleteMovie(movieId) {
  try {
    await deleteDoc(doc(db, "movies", movieId));
    console.log("Movie deleted successfully!");
  } catch (error) {
    console.error("Error deleting movie: ", error);
  }
}
```

### 5️⃣ Deploy and Sync with Frontend
Since Firebase functions are integrated into your **frontend**, simply commit and push the updated code to trigger a redeployment on Vercel.

```sh
git add .
git commit -m "Integrated Firebase backend"
git push origin main
```

---

## Future Enhancements
1. **Authentication**: Use Firebase Auth to allow user login.
2. **Role-Based Access**: Separate movie collections per user.
3. **Cloud Functions**: Automate notifications or statistics calculations.
4. **API Integration**: Fetch movie details automatically from an external database.

---
