
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/**
 * FIREBASE CONFIGURATION:
 * Connected to project: fortumars-mart
 */
const firebaseConfig = {
  apiKey: "AIzaSyD4-fjKZThqh-bG11jJKci5WQR079al958",
  authDomain: "fortumars-mart.firebaseapp.com",
  projectId: "fortumars-mart",
  storageBucket: "fortumars-mart.firebasestorage.app",
  messagingSenderId: "352014974242",
  appId: "1:352014974242:web:56de3febc189bc7be0f97b",
  measurementId: "G-5VKB2TVHJX"
};

// Check if the user has updated the configuration from defaults
export const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey && 
         firebaseConfig.apiKey !== "YOUR_ACTUAL_API_KEY_HERE" && 
         firebaseConfig.projectId === "fortumars-mart";
};

// Singleton pattern for Firebase initialization
let app;
let dbInstance;

if (isFirebaseConfigured()) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    dbInstance = getFirestore(app);
    console.log("Firebase (fortumars-mart) initialized successfully.");
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
}

export const db = dbInstance;
