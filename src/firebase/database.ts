import {
  ref,
  set,
  get,
  push,
  update,
  remove,
  query,
  orderByChild,
  equalTo,
  limitToLast,
  DatabaseReference,
} from 'firebase/database';
// Import directly from the firebase.ts file to avoid circular dependencies
import { getDatabase } from 'firebase/database';
import { getFirebaseApp } from './firebase';

// Define our own function to get the Realtime Database
const getRealtimeDatabase = () => getDatabase(getFirebaseApp());

/**
 * Gets the Firebase Realtime Database instance
 * @returns Firebase Realtime Database instance
 */
export const getRealtimeDb = () => getRealtimeDatabase();

/**
 * Creates a reference to a database location
 * @param path Path to the database location
 * @returns Database reference
 */
export const getDatabaseRef = (path: string): DatabaseReference => {
  const db = getRealtimeDb();
  return ref(db, path);
};

/**
 * Writes data to a database location
 * @param path Path to the database location
 * @param data Data to write
 * @returns Promise that resolves when the write is complete
 */
export const writeData = (path: string, data: unknown) => {
  const dbRef = getDatabaseRef(path);
  return set(dbRef, data);
};

/**
 * Reads data from a database location
 * @param path Path to the database location
 * @returns Promise that resolves with the data at the location
 */
export const readData = async (path: string) => {
  const dbRef = getDatabaseRef(path);
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    return snapshot.val();
  }

  return null;
};

/**
 * Generates a new unique key and writes data to that location
 * @param path Path to the database location
 * @param data Data to write
 * @returns Promise that resolves with the reference to the new data
 */
export const pushData = (path: string, data: unknown) => {
  const db = getRealtimeDb();
  const newRef = push(ref(db, path));

  return set(newRef, data).then(() => newRef);
};

/**
 * Updates specific fields at a database location
 * @param path Path to the database location
 * @param updates Object containing the fields to update
 * @returns Promise that resolves when the update is complete
 */
export const updateData = (path: string, updates: Record<string, unknown>) => {
  const dbRef = getDatabaseRef(path);
  return update(dbRef, updates);
};

/**
 * Removes data at a database location
 * @param path Path to the database location
 * @returns Promise that resolves when the delete is complete
 */
export const removeData = (path: string) => {
  const dbRef = getDatabaseRef(path);
  return remove(dbRef);
};

/**
 * Queries data by a specific field value
 * @param path Path to the database location
 * @param field Field to query by
 * @param value Value to match
 * @param limit Maximum number of results
 * @returns Promise that resolves with the matching data
 */
export const queryByField = async (
  path: string,
  field: string,
  value: string | number | boolean,
  limit = 100
) => {
  const db = getRealtimeDb();
  const dbRef = ref(db, path);

  const queryRef = query(dbRef, orderByChild(field), equalTo(value), limitToLast(limit));

  const snapshot = await get(queryRef);

  if (snapshot.exists()) {
    return snapshot.val();
  }

  return null;
};
