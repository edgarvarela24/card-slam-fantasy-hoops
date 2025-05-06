import { getFirebaseApp, getFirebaseAuth, getFirestore } from './firebase';
import { getRealtimeDb } from './database';

/**
 * Initialize all Firebase services
 * Call this function once when the app starts
 */
export const initializeFirebase = () => {
  // Initialize Firebase app
  const app = getFirebaseApp();
  console.log('Firebase app initialized:', app.name);

  // Initialize auth
  const auth = getFirebaseAuth();
  console.log('Firebase auth initialized');

  // Initialize Firestore
  const firestore = getFirestore();
  console.log('Firestore initialized');

  // Initialize Realtime Database
  const database = getRealtimeDb();
  console.log('Realtime Database initialized');

  return { app, auth, firestore, database };
};
