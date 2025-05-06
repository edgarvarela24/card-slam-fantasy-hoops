import { describe, test, jest, beforeEach } from '@jest/globals'
import { render } from '@testing-library/react'
import { 
  AuthProvider,
  useAuth 
} from '../auth-context'

// Mock the auth module
jest.mock('../auth', () => ({
  getCurrentUser: jest.fn(),
  onAuthChange: jest.fn(),
  signIn: jest.fn(),
  signUp: jest.fn(),
  logout: jest.fn(),
  resetPassword: jest.fn()
}))

// Get the mocked module
const mockedAuth = jest.requireMock('../auth')

// Simple test component
const TestComponent = () => {
  const { user, loading } = useAuth()
  return (
    <div>
      <div data-testid="auth-context">Auth Context</div>
      <div data-testid="loading">{loading ? 'true' : 'false'}</div>
      <div data-testid="user">{user ? user.email : 'no user'}</div>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedAuth.getCurrentUser.mockReturnValue(null)
    mockedAuth.onAuthChange.mockImplementation(() => jest.fn())
  })
  
  test('AuthProvider renders without crashing', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    expect(getByTestId('auth-context')).toBeTruthy()
  })
  
  test('mocks are properly set up', () => {
    expect(mockedAuth.signIn).toBeDefined()
    expect(mockedAuth.onAuthChange).toBeDefined()
  })
})