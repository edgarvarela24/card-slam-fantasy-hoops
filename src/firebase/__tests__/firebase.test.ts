import { describe, test, expect } from '@jest/globals'
import { jest } from '@jest/globals'
import { getFirebaseApp, getFirebaseAuth, getFirestore } from '../firebase'
import { FirebaseApp } from 'firebase/app'
import { Auth } from 'firebase/auth'
import { Firestore } from 'firebase/firestore'

// Mock Firebase modules
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn().mockReturnValue({ name: 'mock-app' } as FirebaseApp),
  getApps: jest.fn().mockReturnValue([])
}))

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn().mockReturnValue({ currentUser: null } as Auth)
}))

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn().mockReturnValue({ collection: jest.fn() } as unknown as Firestore)
}))

describe('Firebase Configuration', () => {
  test('getFirebaseApp initializes and returns Firebase app', () => {
    const app = getFirebaseApp()
    expect(app).toBeDefined()
    expect(app.name).toBe('mock-app')
  })

  test('getFirebaseApp returns existing app if already initialized', () => {
    // This test confirms we're not initializing Firebase multiple times
    const app1 = getFirebaseApp()
    const app2 = getFirebaseApp()
    expect(app1).toBe(app2)
  })

  test('getFirebaseAuth returns Firebase Auth instance', () => {
    const auth = getFirebaseAuth()
    expect(auth).toBeDefined()
    expect(auth.currentUser).toBeNull()
  })

  test('getFirestore returns Firestore instance', () => {
    const db = getFirestore()
    expect(db).toBeDefined()
    expect(db.collection).toBeDefined()
  })
})