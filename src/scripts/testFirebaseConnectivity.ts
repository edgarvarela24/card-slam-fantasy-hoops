// Firebase Connectivity Test Script
// This script manually tests each Firebase service

import { 
  getFirebaseApp, 
  getFirebaseAuth, 
  getRealtimeDatabase,
  getFirestore,
  signInAnonymously,
  signOut,
  writeData,
  readData,
  removeData,
  addDocument,
  getDocument,
  deleteDocument
} from '../firebase'
import { ref, get, set } from 'firebase/database'
import { collection, addDoc, getDocs, query, limit, doc, getDoc, deleteDoc } from 'firebase/firestore'
// Removed unused import: import { getAuth } from 'firebase/auth'
import { firebaseConfig } from '../firebase/config'

// Helper to print results
const printResult = (test: string, success: boolean, message: string) => {
  console.log(`${success ? '✅' : '❌'} ${test}: ${message}`)
}

// Helper to print section headers
const printSection = (title: string) => {
  console.log('\n')
  console.log('='.repeat(title.length + 10))
  console.log(`===== ${title} =====`)
  console.log('='.repeat(title.length + 10))
}

const testFirebaseConfig = () => {
  printSection('Firebase Configuration')

  try {
    // Check if all required config values are present
    const requiredKeys = [
      'apiKey', 'authDomain', 'projectId', 
      'storageBucket', 'messagingSenderId', 'appId'
    ]
    
    const missingKeys = requiredKeys.filter(key => !firebaseConfig[key])
    
    if (missingKeys.length > 0) {
      printResult('Configuration', false, `Missing required keys: ${missingKeys.join(', ')}`)
      return false
    }
    
    // Initialize Firebase
    getFirebaseApp()
    printResult('Configuration', true, 'Firebase configuration is valid')
    printResult('Initialization', true, 'Firebase app initialized successfully')
    
    return true
  } catch (error) {
    printResult('Configuration', false, `Error: ${error instanceof Error ? error.message : String(error)}`)
    return false
  }
}

const testAuthentication = async () => {
  printSection('Firebase Authentication')
  
  try {
    const auth = getFirebaseAuth()
    printResult('Auth Instance', true, 'Firebase Auth initialized successfully')
    
    // Sign in anonymously
    await signInAnonymously(auth)
    const user = auth.currentUser
    
    if (user) {
      printResult('Anonymous Auth', true, `Signed in anonymously with UID: ${user.uid.substring(0, 8)}...`)
      
      // Sign out
      await signOut(auth)
      printResult('Sign Out', true, 'Signed out successfully')
    } else {
      printResult('Anonymous Auth', false, 'Failed to sign in anonymously')
    }
    
    return true
  } catch (error) {
    printResult('Authentication', false, `Error: ${error instanceof Error ? error.message : String(error)}`)
    return false
  }
}

const testRealtimeDatabase = async () => {
  printSection('Firebase Realtime Database')
  
  try {
    const db = getRealtimeDatabase()
    printResult('Database Instance', true, 'Realtime Database initialized successfully')
    
    // Test writing data
    const testPath = 'connectivity_test/realtime_db'
    const testData = { timestamp: new Date().toISOString(), message: 'Test successful' }
    
    await writeData(testPath, testData)
    printResult('Write Operation', true, `Data written to ${testPath}`)
    
    // Test reading data
    const readResult = await readData(testPath)
    
    if (readResult && readResult.timestamp === testData.timestamp) {
      printResult('Read Operation', true, 'Data read successfully')
    } else {
      printResult('Read Operation', false, 'Data read does not match written data')
    }
    
    // Test using raw Firebase methods
    const rawRef = ref(db, 'connectivity_test/raw_test')
    await set(rawRef, { method: 'raw', timestamp: new Date().toISOString() })
    const rawSnapshot = await get(rawRef)
    
    if (rawSnapshot.exists()) {
      printResult('Raw Operations', true, 'Raw Firebase methods working correctly')
    } else {
      printResult('Raw Operations', false, 'Raw Firebase methods failed')
    }
    
    // Clean up
    await removeData('connectivity_test')
    printResult('Delete Operation', true, 'Test data cleaned up')
    
    return true
  } catch (error) {
    printResult('Realtime Database', false, `Error: ${error instanceof Error ? error.message : String(error)}`)
    return false
  }
}

const testFirestore = async () => {
  printSection('Firebase Firestore')
  
  try {
    const db = getFirestore()
    printResult('Firestore Instance', true, 'Firestore initialized successfully')
    
    // Test collection exists
    const collectionName = 'connectivity_test'
    collection(db, collectionName) // Access collection to verify it works
    printResult('Collection Access', true, `Collection ${collectionName} accessible`)
    
    // Test adding a document
    const testDoc = { 
      test: true, 
      timestamp: new Date().toISOString(), 
      source: 'connectivity test' 
    }
    
    // Using our wrapper
    const docRef = await addDocument(collectionName, testDoc)
    printResult('Add Document', true, `Document added with ID: ${docRef.id}`)
    
    // Test getting a document
    const retrievedDoc = await getDocument(collectionName, docRef.id)
    
    if (retrievedDoc && retrievedDoc.timestamp === testDoc.timestamp) {
      printResult('Get Document', true, 'Document retrieved successfully')
    } else {
      printResult('Get Document', false, 'Document retrieval failed or data mismatch')
    }
    
    // Test using raw Firebase methods
    const rawDocRef = await addDoc(collection(db, collectionName), { 
      method: 'raw', 
      timestamp: new Date().toISOString() 
    })
    
    const rawDocSnapshot = await getDoc(doc(db, collectionName, rawDocRef.id))
    
    if (rawDocSnapshot.exists() && rawDocSnapshot.data().method === 'raw') {
      printResult('Raw Operations', true, 'Raw Firestore methods working correctly')
    } else {
      printResult('Raw Operations', false, 'Raw Firestore methods failed')
    }
    
    // Test querying
    const querySnapshot = await getDocs(
      query(collection(db, collectionName), limit(10))
    )
    
    if (!querySnapshot.empty) {
      printResult('Query Operation', true, `Retrieved ${querySnapshot.size} documents`)
    } else {
      printResult('Query Operation', false, 'No documents found in query')
    }
    
    // Clean up - delete documents
    await deleteDocument(collectionName, docRef.id)
    await deleteDoc(rawDocRef)
    printResult('Delete Operation', true, 'Test documents cleaned up')
    
    return true
  } catch (error) {
    printResult('Firestore', false, `Error: ${error instanceof Error ? error.message : String(error)}`)
    return false
  }
}

const runTests = async () => {
  try {
    console.log('\n🔥 FIREBASE CONNECTIVITY TEST 🔥')
    console.log('===============================')
    console.log('Testing Firebase services...\n')
    
    const configValid = testFirebaseConfig()
    if (!configValid) {
      console.log('\n❌ Firebase configuration is invalid. Please check your .env file.')
      console.log('Run yarn setup:firebase to configure your Firebase project.')
      return
    }
    
    const results = {
      auth: await testAuthentication(),
      realtimeDb: await testRealtimeDatabase(),
      firestore: await testFirestore()
    }
    
    printSection('Test Summary')
    
    Object.entries(results).forEach(([test, success]) => {
      printResult(test, success, success ? 'Passed' : 'Failed')
    })
    
    const allPassed = Object.values(results).every(result => result === true)
    
    if (allPassed) {
      console.log('\n✅ All Firebase services are working correctly!')
      console.log('Your Firebase configuration is valid and ready for use.')
    } else {
      console.log('\n❌ Some Firebase services have issues.')
      console.log('Check the logs above for details on what failed.')
    }
    
  } catch (error) {
    console.error('Test execution error:', error)
  }
}

// Run all tests
runTests()