#!/usr/bin/env node

/**
 * This script tests Firebase connectivity without using vite-node
 * It prints information about your Firebase configuration and checks API keys
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import * as https from 'https';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const printHeader = title => {
  console.log('\n' + colors.blue + '='.repeat(title.length + 10) + colors.reset);
  console.log(colors.blue + `===== ${title} =====` + colors.reset);
  console.log(colors.blue + '='.repeat(title.length + 10) + colors.reset + '\n');
};

const printSuccess = message => {
  console.log(colors.green + '✅ ' + colors.reset + message);
};

const printError = message => {
  console.log(colors.red + '❌ ' + colors.reset + message);
};

const printWarning = message => {
  console.log(colors.yellow + '⚠️ ' + colors.reset + message);
};

const printInfo = message => {
  console.log(colors.cyan + 'ℹ️ ' + colors.reset + message);
};

// Get Firebase configuration from environment variables
const getFirebaseConfig = () => {
  return {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
    databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
  };
};

// Test if the Firebase project exists by making a request to Firebase Auth API
const testFirebaseAuth = apiKey => {
  return new Promise(resolve => {
    if (!apiKey) {
      printError('No API Key provided');
      resolve(false);
      return;
    }

    const url = `https://identitytoolkit.googleapis.com/v1/projects/_/accounts:createAuthUri?key=${apiKey}`;
    const data = JSON.stringify({
      continueUri: 'http://localhost',
      providerId: 'google.com',
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    };

    const req = https.request(url, options, res => {
      let responseData = '';

      res.on('data', chunk => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const json = JSON.parse(responseData);

          if (
            res.statusCode === 400 &&
            json.error &&
            json.error.message === 'INVALID_CONTINUE_URI'
          ) {
            // This is actually a "good" error - it means the API key is valid but the continueUri is invalid
            printSuccess('Firebase API Key is valid');
            resolve(true);
          } else if (
            json.error &&
            json.error.message === 'API key not valid. Please pass a valid API key.'
          ) {
            printError('Firebase API Key is invalid');
            resolve(false);
          } else {
            printError(`Unexpected response: ${JSON.stringify(json)}`);
            resolve(false);
          }
        } catch (e) {
          printError(`Failed to parse response: ${e.message}`);
          resolve(false);
        }
      });
    });

    req.on('error', error => {
      printError(`Request error: ${error.message}`);
      resolve(false);
    });

    req.write(data);
    req.end();
  });
};

// Test if the Firestore database exists
const testFirestore = projectId => {
  return new Promise(resolve => {
    if (!projectId) {
      printError('No Project ID provided');
      resolve(false);
      return;
    }

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)`;

    const req = https.request(url, res => {
      let responseData = '';

      res.on('data', chunk => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          printSuccess('Firestore database exists');
          resolve(true);
        } else if (res.statusCode === 404) {
          printWarning('Firestore database does not exist yet - it will be created on first use');
          resolve(false);
        } else if (res.statusCode === 403) {
          printWarning('Could not verify Firestore database (permission denied)');
          printInfo(
            "This is normal if you're using the Firebase emulator or haven't enabled Firestore yet"
          );
          resolve(false);
        } else {
          try {
            const json = JSON.parse(responseData);
            printError(`Firestore error: ${JSON.stringify(json)}`);
          } catch (e) {
            printError(`Firestore error (Status ${res.statusCode}): ${responseData}`);
          }
          resolve(false);
        }
      });
    });

    req.on('error', error => {
      printError(`Request error: ${error.message}`);
      resolve(false);
    });

    req.end();
  });
};

const testRealtimeDatabase = databaseURL => {
  return new Promise(resolve => {
    if (!databaseURL) {
      printWarning('No Database URL provided - Realtime Database might not be configured');
      resolve(false);
      return;
    }

    // Make sure the URL ends with .json for REST API access
    const url = databaseURL.endsWith('/') ? `${databaseURL}.json` : `${databaseURL}/.json`;

    const req = https.request(url, res => {
      let responseData = '';

      res.on('data', chunk => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          printSuccess('Realtime Database exists and is accessible');
          resolve(true);
        } else if (res.statusCode === 401 || res.statusCode === 403) {
          printWarning('Realtime Database exists but requires authentication');
          printInfo('This is normal if you have security rules in place');
          resolve(true);
        } else if (res.statusCode === 404) {
          printError('Realtime Database URL is invalid or database does not exist');
          resolve(false);
        } else {
          try {
            const json = JSON.parse(responseData);
            printError(`Realtime Database error: ${JSON.stringify(json)}`);
          } catch (e) {
            printError(`Realtime Database error (Status ${res.statusCode}): ${responseData}`);
          }
          resolve(false);
        }
      });
    });

    req.on('error', error => {
      printError(`Request error: ${error.message}`);
      resolve(false);
    });

    req.end();
  });
};

const main = async () => {
  printHeader('FIREBASE CONNECTIVITY TEST');

  // Get configuration
  const config = getFirebaseConfig();

  printHeader('Configuration Check');

  // Check required configuration values
  const requiredKeys = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId',
  ];

  const missingKeys = requiredKeys.filter(key => !config[key]);

  if (missingKeys.length > 0) {
    printError(`Missing required configuration: ${missingKeys.join(', ')}`);
    printInfo('Please run "yarn setup:firebase" to configure these variables');
    return;
  }

  printSuccess('All required configuration values are present');

  // Check optional configuration values
  const optionalKeys = ['measurementId', 'databaseURL'];
  const missingOptional = optionalKeys.filter(key => !config[key]);

  if (missingOptional.includes('databaseURL')) {
    printWarning('No databaseURL provided - Realtime Database features might not work');
    printInfo(
      'Add VITE_FIREBASE_DATABASE_URL to your .env file if you plan to use Realtime Database'
    );
  }

  // Display configuration (first 5 chars only)
  console.log('\nConfiguration preview (first few characters only):');
  Object.entries(config).forEach(([key, value]) => {
    if (value) {
      console.log(`  - ${key}: ${value.substring(0, 5)}...`);
    }
  });

  // Test API key
  printHeader('Firebase Authentication');
  const authValid = await testFirebaseAuth(config.apiKey);

  // Test Firestore
  printHeader('Firebase Firestore');
  const firestoreValid = await testFirestore(config.projectId);

  // Test Realtime Database
  printHeader('Firebase Realtime Database');
  const rtdbValid = await testRealtimeDatabase(config.databaseURL);

  // Summary
  printHeader('Connectivity Summary');

  if (authValid) {
    printSuccess('Firebase API Key is valid');
  } else {
    printError('Firebase API Key validation failed');
  }

  if (firestoreValid) {
    printSuccess('Firestore database is configured');
  } else {
    printWarning('Firestore database might need to be set up');
  }

  if (rtdbValid) {
    printSuccess('Realtime Database is accessible');
  } else if (!config.databaseURL) {
    printWarning('Realtime Database URL not provided');
  } else {
    printError('Realtime Database connectivity failed');
  }

  if (authValid) {
    console.log(
      '\n' + colors.green + '✅ Firebase project appears to be properly configured!' + colors.reset
    );
    console.log('\nNext steps:');
    console.log('1. Run "yarn dev" to start the application');
    console.log('2. Check the Firebase connection status in the app');
    console.log('3. Create a test user or try signing in with an existing account');
  } else {
    console.log('\n' + colors.red + '❌ Firebase project has configuration issues.' + colors.reset);
    console.log('\nTroubleshooting steps:');
    console.log('1. Double-check all values in your .env file');
    console.log(
      "2. Ensure you've created a Firebase project at https://console.firebase.google.com"
    );
    console.log("3. Make sure you've registered a web app in your Firebase project");
    console.log('4. Run "yarn setup:firebase" to reconfigure your Firebase settings');
  }
};

main();
