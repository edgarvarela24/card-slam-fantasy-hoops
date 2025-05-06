// Firebase Configuration Validation Script
// Run this script to check if your Firebase configuration is valid

import { initializeApp } from 'firebase/app'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { getDatabase, ref, set, get, remove } from 'firebase/database'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

// Load environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

const validateConfig = async () => {
  console.log('Starting Firebase configuration validation...')
  
  try {
    // Check if all required environment variables are defined
    const requiredKeys = [
      'apiKey', 'authDomain', 'projectId', 
      'storageBucket', 'messagingSenderId', 'appId'
    ]
    
    const missingKeys = requiredKeys.filter(key => !(key in firebaseConfig) || !firebaseConfig[key as keyof typeof firebaseConfig])
    
    if (missingKeys.length > 0) {
      console.error('❌ Missing required Firebase configuration keys:', missingKeys)
      console.error('Please check your .env file and make sure all required keys are set.')
      return false
    }
    
    console.log('✅ All required configuration keys are present')
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig)
    console.log('✅ Firebase app initialized successfully')
    
    // Test Authentication
    try {
      const auth = getAuth(app)
      await signInAnonymously(auth)
      console.log('✅ Firebase Authentication is working')
    } catch (error) {
      console.error('❌ Firebase Authentication test failed:', error)
      return false
    }
    
    // Test Realtime Database
    try {
      const db = getDatabase(app)
      const testRef = ref(db, 'test/validation')
      
      // Write test data
      await set(testRef, { 
        timestamp: new Date().toISOString(),
        message: 'Validation test' 
      })
      
      // Read test data
      const snapshot = await get(testRef)
      
      if (snapshot.exists()) {
        console.log('✅ Firebase Realtime Database is working')
        // Clean up test data
        await remove(testRef)
      } else {
        throw new Error('Failed to read test data')
      }
    } catch (error) {
      console.error('❌ Firebase Realtime Database test failed:', error)
      return false
    }
    
    // Test Firestore
    try {
      const firestore = getFirestore(app)
      const testCollection = collection(firestore, 'test')
      await getDocs(testCollection)
      console.log('✅ Firebase Firestore is working')
    } catch (error) {
      console.error('❌ Firebase Firestore test failed:', error)
      return false
    }
    
    console.log('🎉 All Firebase services are working correctly!')
    return true
    
  } catch (error) {
    console.error('❌ Firebase validation failed with error:', error)
    return false
  }
}

// Execute validation and provide a summary
validateConfig()
  .then(success => {
    if (success) {
      console.log('\n===================================')
      console.log('✅ FIREBASE CONFIGURATION IS VALID')
      console.log('===================================\n')
    } else {
      console.log('\n===================================')
      console.log('❌ FIREBASE CONFIGURATION HAS ISSUES')
      console.log('Please check the errors above and fix your configuration')
      console.log('===================================\n')
    }
  })
  .catch(error => {
    console.error('Validation script error:', error)
  })