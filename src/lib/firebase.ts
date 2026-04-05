
// This file is retained for potential future use with Firebase,
// but the app currently does not use Firebase to function.
// All data is fetched from Hacker News or served from local mock data.

import { initializeApp, getApps, getApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "your-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "your-auth-domain",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "your-storage-bucket",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "your-sender-id",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "your-app-id"
};

// Initialize Firebase (prevent multiple initializations)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firestore is no longer a core dependency, so we don't initialize it here by default.
// If you need firestore, you can import and call getFirestore(app) where needed.

export { app };
