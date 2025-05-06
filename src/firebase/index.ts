// Export Firebase modules for easier imports
export * from './firebase';
export * from './auth';
export * from './firestore';
export * from './database';
export * from './functions/functions';
export * from './init';

// Re-export specific functions that TypeScript might not recognize
export { getRealtimeDatabase } from './firebase';

// Note: We don't export the functions/index.ts file as it simulates
// the backend Firebase Functions, not client-side code
