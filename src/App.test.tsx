import { render } from '@testing-library/react';
import React from 'react';

// Mock Firebase modules before importing App
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
}));

jest.mock('firebase/database', () => ({
  getDatabase: jest.fn(),
}));

jest.mock('./firebase/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
  }),
  AuthProvider: ({ children }) => children,
}));

jest.mock('./components/FirebaseStatus', () => ({
  __esModule: true,
  default: () => <div data-testid="firebase-status">Firebase Status</div>,
}));

jest.mock('./components/AuthStatus', () => ({
  __esModule: true,
  default: () => <div data-testid="auth-status">Auth Status</div>,
}));

// Now import App after all mocks are set up
import App from './App';

describe('App', () => {
  it('renders App component successfully', () => {
    const { getByAltText, getByText } = render(<App />);
    expect(getByAltText(/Vite logo/i)).toBeTruthy();
    expect(getByText(/Card Slam Fantasy Hoops/i)).toBeTruthy();
  });
});