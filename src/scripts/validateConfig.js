#!/usr/bin/env node

/**
 * This script validates Firebase configuration in the .env file
 * It's a simplified version that doesn't directly initialize Firebase
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const validateConfig = () => {
  console.log('Starting Firebase configuration validation...');

  // Define required environment variables
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
  ];

  const optionalVars = ['VITE_FIREBASE_MEASUREMENT_ID', 'VITE_FIREBASE_DATABASE_URL'];

  // Check required variables
  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error('\nPlease run "yarn setup:firebase" to configure these variables.');
    return false;
  }

  console.log('✅ All required environment variables are present.');

  // Check optional variables
  const missingOptionalVars = optionalVars.filter(varName => !process.env[varName]);

  if (missingOptionalVars.length > 0) {
    console.log('\n⚠️ Some optional environment variables are missing:');
    missingOptionalVars.forEach(varName => {
      console.log(`   - ${varName}`);
    });

    if (missingOptionalVars.includes('VITE_FIREBASE_DATABASE_URL')) {
      console.log('\n   Note: VITE_FIREBASE_DATABASE_URL is required for Realtime Database.');
      console.log('   If you plan to use this feature, please add it to your .env file.');
    }
  } else {
    console.log('✅ All optional environment variables are also present.');
  }

  // Display partial configuration values (for security, only show first few chars)
  console.log('\nConfiguration preview (first few characters only):');
  [...requiredVars, ...optionalVars].forEach(varName => {
    const value = process.env[varName];
    if (value) {
      const maskedValue = value.substring(0, 5) + '...';
      console.log(`   - ${varName}: ${maskedValue}`);
    }
  });

  console.log('\n✅ Configuration validation complete.');

  return true;
};

validateConfig();
