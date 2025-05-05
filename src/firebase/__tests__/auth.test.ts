import { describe, test, expect, jest, beforeEach } from '@jest/globals'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { 
  signIn, 
  signUp, 
  logout, 
  resetPassword,
  getCurrentUser,
  onAuthChange
} from '../auth'

// Mock Firebase auth module
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn().mockReturnValue({ currentUser: null }),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  onAuthStateChanged: jest.fn()
}))

// Mock Firebase app module
jest.mock('../firebase', () => {
  const mockAuth = { currentUser: null };
  return {
    getFirebaseAuth: jest.fn().mockReturnValue(mockAuth)
  };
})

describe('Firebase Authentication', () => {
  const mockEmail = 'test@example.com'
  const mockPassword = 'password123'
  const mockUser = { uid: '123', email: mockEmail } as User
  
  beforeEach(() => {
    jest.clearAllMocks()
  })
  
  test('signIn calls Firebase signInWithEmailAndPassword', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({ user: mockUser })
    
    const result = await signIn(mockEmail, mockPassword)
    
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      mockEmail,
      mockPassword
    )
    expect(result).toEqual({ user: mockUser })
  })
  
  test('signUp calls Firebase createUserWithEmailAndPassword', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({ user: mockUser })
    
    const result = await signUp(mockEmail, mockPassword)
    
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      mockEmail,
      mockPassword
    )
    expect(result).toEqual({ user: mockUser })
  })
  
  test('logout calls Firebase signOut', async () => {
    (signOut as jest.Mock).mockResolvedValueOnce(undefined)
    
    await logout()
    
    expect(signOut).toHaveBeenCalledWith(expect.anything())
  })
  
  test('resetPassword calls Firebase sendPasswordResetEmail', async () => {
    (sendPasswordResetEmail as jest.Mock).mockResolvedValueOnce(undefined)
    
    await resetPassword(mockEmail)
    
    expect(sendPasswordResetEmail).toHaveBeenCalledWith(
      expect.anything(),
      mockEmail
    )
  })

  test('getCurrentUser returns current user from auth', () => {
    // Temporarily modify the mock
    const originalMock = jest.requireMock('../firebase').getFirebaseAuth
    jest.requireMock('../firebase').getFirebaseAuth = jest.fn().mockReturnValue({ currentUser: mockUser })
    
    const result = getCurrentUser()
    
    expect(result).toBe(mockUser)
    
    // Restore original mock
    jest.requireMock('../firebase').getFirebaseAuth = originalMock
  })
  
  test('onAuthChange registers auth state change listener', () => {
    const mockCallback = jest.fn()
    ;(onAuthStateChanged as jest.Mock).mockImplementationOnce(
      (_auth, callback) => {
        callback(mockUser)
        return jest.fn() // Unsubscribe function
      }
    )
    
    const unsubscribe = onAuthChange(mockCallback)
    
    expect(onAuthStateChanged).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(Function)
    )
    expect(mockCallback).toHaveBeenCalledWith(mockUser)
    expect(typeof unsubscribe).toBe('function')
  })
})