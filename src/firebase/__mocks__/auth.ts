// Mock for firebase/auth.ts
import { jest } from '@jest/globals';

// Create mock functions with implementations that return promises
export const signIn = jest.fn().mockResolvedValue({ user: { email: 'test@example.com' } });
export const signUp = jest.fn().mockResolvedValue({ user: { email: 'test@example.com' } });
export const logout = jest.fn().mockResolvedValue(undefined);
export const resetPassword = jest.fn().mockResolvedValue(undefined);

// Create a mock for auth state change that immediately calls the callback
export const onAuthChange = jest.fn().mockImplementation((callback) => {
  callback({ uid: '123', email: 'test@example.com' });
  return jest.fn(); // Return the unsubscribe function
});

// Get the current user (initially null)
export const getCurrentUser = jest.fn().mockReturnValue(null);