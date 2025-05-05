import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  User,
  UserCredential,
  NextOrObserver,
  Unsubscribe
} from 'firebase/auth'
import { getFirebaseAuth } from './firebase'

/**
 * Signs in a user with email and password
 * 
 * @param email User's email
 * @param password User's password
 * @returns Promise resolving to UserCredential
 */
export const signIn = (email: string, password: string): Promise<UserCredential> => {
  const auth = getFirebaseAuth()
  return signInWithEmailAndPassword(auth, email, password)
}

/**
 * Creates a new user with email and password
 * 
 * @param email User's email
 * @param password User's password
 * @returns Promise resolving to UserCredential
 */
export const signUp = (email: string, password: string): Promise<UserCredential> => {
  const auth = getFirebaseAuth()
  return createUserWithEmailAndPassword(auth, email, password)
}

/**
 * Signs out the current user
 * 
 * @returns Promise resolving when sign-out is complete
 */
export const logout = (): Promise<void> => {
  const auth = getFirebaseAuth()
  return firebaseSignOut(auth)
}

/**
 * Sends a password reset email
 * 
 * @param email User's email
 * @returns Promise resolving when the email is sent
 */
export const resetPassword = (email: string): Promise<void> => {
  const auth = getFirebaseAuth()
  return firebaseSendPasswordResetEmail(auth, email)
}

/**
 * Gets the current user
 * 
 * @returns The current user or null if not signed in
 */
export const getCurrentUser = (): User | null => {
  const auth = getFirebaseAuth()
  return auth.currentUser
}

/**
 * Sets up a listener for authentication state changes
 * 
 * @param callback Function to call when auth state changes
 * @returns Unsubscribe function
 */
export const onAuthChange = (callback: NextOrObserver<User>): Unsubscribe => {
  const auth = getFirebaseAuth()
  return firebaseOnAuthStateChanged(auth, callback)
}