// Mock for firebase/auth.ts
import { jest } from '@jest/globals';
import { User, UserCredential } from 'firebase/auth';

// We'll use the Firebase User type directly instead of a custom MockUser type

// Create a mock user credential
const mockUserCredential = {
  user: { email: 'test@example.com' },
} as unknown as UserCredential;

// Create mock functions with implementations that return promises
export const signIn = jest
  .fn<(email: string, password: string) => Promise<UserCredential>>()
  .mockImplementation(() => Promise.resolve(mockUserCredential));
export const signUp = jest
  .fn<(email: string, password: string) => Promise<UserCredential>>()
  .mockImplementation(() => Promise.resolve(mockUserCredential));
export const logout = jest.fn<() => Promise<void>>().mockImplementation(() => Promise.resolve());
export const resetPassword = jest
  .fn<(email: string) => Promise<void>>()
  .mockImplementation(() => Promise.resolve());

// Create a mock for auth state change that immediately calls the callback
export const onAuthChange = jest
  .fn<(callback: (user: User) => void) => () => void>()
  .mockImplementation((callback: (user: User) => void) => {
    const mockUser = { uid: '123', email: 'test@example.com' } as unknown as User;
    callback(mockUser);
    return jest.fn(); // Return the unsubscribe function
  });

// Get the current user (initially null)
export const getCurrentUser = jest.fn<() => User | null>().mockReturnValue(null);
