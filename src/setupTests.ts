// Import jest and expect
import { jest, expect } from '@jest/globals';

// Define types for global extensions
declare global {
  let expect: typeof expect;
  let jest: typeof jest;
}

// Explicitly add expect to global
global.expect = expect;
global.jest = jest;

// Define types for globalThis extensions
declare global {
  interface GlobalThis {
    import?: {
      meta: {
        env: Record<string, string>;
      };
    };
  }
}

// Mock the import.meta.env before other imports
if (typeof globalThis.import === 'undefined' && typeof process !== 'undefined') {
  // Import.meta not available in Jest
  globalThis.import = {
    meta: {
      env: {
        VITE_FIREBASE_API_KEY: 'mock-api-key',
        VITE_FIREBASE_AUTH_DOMAIN: 'mock-project.firebaseapp.com',
        VITE_FIREBASE_PROJECT_ID: 'mock-project',
        VITE_FIREBASE_STORAGE_BUCKET: 'mock-project.appspot.com',
        VITE_FIREBASE_MESSAGING_SENDER_ID: '123456789',
        VITE_FIREBASE_APP_ID: '1:123456789:web:abcdef123456',
        VITE_FIREBASE_MEASUREMENT_ID: 'G-ABCDEF123',
      }
    }
  }
}

// Define window.matchMedia type
interface MediaQueryList {
  matches: boolean;
  media: string;
  onchange: ((this: MediaQueryList, ev: MediaQueryListEvent) => unknown) | null;
  addListener: (listener: (ev: MediaQueryListEvent) => void) => void;
  removeListener: (listener: (ev: MediaQueryListEvent) => void) => void;
  addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void;
  removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void;
  dispatchEvent: (event: Event) => boolean;
}

// Add window.matchMedia mock
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

