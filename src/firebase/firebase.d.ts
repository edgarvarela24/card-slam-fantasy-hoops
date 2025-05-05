import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { Database } from 'firebase/database';

export declare function getFirebaseApp(): FirebaseApp;
export declare function getFirebaseAuth(): Auth;
export declare function getFirestore(): Firestore;
export declare function getRealtimeDatabase(): Database;