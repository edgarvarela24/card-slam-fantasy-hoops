import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  QueryConstraint,
  WhereFilterOp,
  OrderByDirection,
  QuerySnapshot,
} from 'firebase/firestore';
import { getFirestore } from './firebase';

/**
 * Adds a document to a collection
 *
 * @param collectionName The name of the collection
 * @param data The data to add
 * @returns Promise resolving to the document reference
 */
export const addDocument = async (collectionName: string, data: DocumentData) => {
  const db = getFirestore();
  const collectionRef = collection(db, collectionName);
  return addDoc(collectionRef, data);
};

/**
 * Gets a document by ID
 *
 * @param collectionName The name of the collection
 * @param docId The document ID
 * @returns Promise resolving to the document data or null if not found
 */
export const getDocument = async (collectionName: string, docId: string) => {
  const db = getFirestore();
  const docRef = doc(collection(db, collectionName), docId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
};

/**
 * Updates a document
 *
 * @param collectionName The name of the collection
 * @param docId The document ID
 * @param data The data to update
 * @returns Promise resolving when update is complete
 */
export const updateDocument = async (collectionName: string, docId: string, data: DocumentData) => {
  const db = getFirestore();
  const docRef = doc(collection(db, collectionName), docId);
  return updateDoc(docRef, data);
};

/**
 * Deletes a document
 *
 * @param collectionName The name of the collection
 * @param docId The document ID
 * @returns Promise resolving when delete is complete
 */
export const deleteDocument = async (collectionName: string, docId: string) => {
  const db = getFirestore();
  const docRef = doc(collection(db, collectionName), docId);
  return deleteDoc(docRef);
};

/**
 * Gets all documents in a collection
 *
 * @param collectionName The name of the collection
 * @returns Promise resolving to an array of document data
 */
export const getCollection = async (collectionName: string) => {
  const db = getFirestore();
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);

  return mapQuerySnapshot(snapshot);
};

/**
 * Interface for filter constraints
 */
export interface Filter {
  field: string;
  operator: WhereFilterOp;
  value: unknown;
}

/**
 * Interface for sort constraint
 */
export interface Sort {
  field: string;
  direction: OrderByDirection;
}

/**
 * Queries documents in a collection with filters, sort, and limit
 *
 * @param collectionName The name of the collection
 * @param filters Array of filter constraints
 * @param sort Sort constraint
 * @param limitCount Maximum number of documents to return
 * @returns Promise resolving to an array of document data
 */
export const queryCollection = async (
  collectionName: string,
  filters?: Filter[],
  sort?: Sort,
  limitCount?: number
) => {
  const db = getFirestore();
  const collectionRef = collection(db, collectionName);

  const constraints: QueryConstraint[] = [];

  // Add filters
  if (filters && filters.length > 0) {
    filters.forEach(filter => {
      constraints.push(where(filter.field, filter.operator, filter.value));
    });
  }

  // Add sort
  if (sort) {
    constraints.push(orderBy(sort.field, sort.direction));
  }

  // Add limit
  if (limitCount) {
    constraints.push(limit(limitCount));
  }

  const q = query(collectionRef, ...constraints);
  const snapshot = await getDocs(q);

  return mapQuerySnapshot(snapshot);
};

/**
 * Helper function to map a query snapshot to an array of document data
 */
const mapQuerySnapshot = (snapshot: QuerySnapshot<DocumentData>) =>
  snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
