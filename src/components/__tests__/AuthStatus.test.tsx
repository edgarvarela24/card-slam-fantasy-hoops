import { describe, test, jest, beforeEach } from '@jest/globals'
import { render } from '@testing-library/react'
import AuthStatus from '../AuthStatus'
import { useAuth } from '../../firebase/auth-context'

// Mock the AuthContext
jest.mock('../../firebase/auth-context', () => ({
  useAuth: jest.fn()
}))

describe('AuthStatus Component', () => {
  const mockSignIn = jest.fn()
  const mockSignUp = jest.fn()
  const mockLogout = jest.fn()
  const mockResetPassword = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Default mock implementation
    ;(useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
      signIn: mockSignIn,
      signUp: mockSignUp,
      logout: mockLogout,
      resetPassword: mockResetPassword
    })
  })
  
  test('renders the auth status component', () => {
    const { getByTestId } = render(<AuthStatus />)
    expect(getByTestId('auth-status')).toBeTruthy()
  })
  
  test('sets up mock correctly', () => {
    expect(mockSignIn).toBeDefined()
    expect(mockSignUp).toBeDefined()
    expect(mockLogout).toBeDefined()
  })
})