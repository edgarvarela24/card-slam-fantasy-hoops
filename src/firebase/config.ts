// Firebase configuration
// This file loads Firebase configuration from environment variables

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  // Add database URL if it exists; if not, construct from project ID
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 
    (import.meta.env.VITE_FIREBASE_PROJECT_ID ? 
      `https://${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseio.com` : undefined)
}