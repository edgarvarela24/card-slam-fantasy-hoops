import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore as getFirestoreInstance, Firestore } from 'firebase/firestore';
import { getDatabase, Database } from 'firebase/database';
import { firebaseConfig } from './config';

// Initialize Firebase only once
let firebaseApp: FirebaseApp | undefined;

/**
 * Returns the Firebase app instance, initializing it if necessary
 */
export const getFirebaseApp = (): FirebaseApp => {
  if (firebaseApp) {
    return firebaseApp;
  }

  if (getApps().length === 0) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApps()[0];
  }

  return firebaseApp;
};

/**
 * Returns Firebase Auth instance
 */
export const getFirebaseAuth = (): Auth => getAuth(getFirebaseApp());

/**
 * Returns Firestore instance
 */
export const getFirestore = (): Firestore => getFirestoreInstance(getFirebaseApp());

/**
 * Returns Realtime Database instance
 */
export const getRealtimeDatabase = (): Database => getDatabase(getFirebaseApp());
