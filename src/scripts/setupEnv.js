#!/usr/bin/env node

/**
 * This script helps set up the .env file with Firebase credentials.
 * It prompts the user for each required value and creates the .env file.
 */

import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define the required environment variables
const envVars = [
  {
    name: 'VITE_FIREBASE_API_KEY',
    description: 'Firebase API Key',
    example: 'AIzaSyC_UK1234567890abcdefg'
  },
  {
    name: 'VITE_FIREBASE_AUTH_DOMAIN',
    description: 'Firebase Auth Domain',
    example: 'your-project-id.firebaseapp.com'
  },
  {
    name: 'VITE_FIREBASE_PROJECT_ID',
    description: 'Firebase Project ID',
    example: 'your-project-id'
  },
  {
    name: 'VITE_FIREBASE_STORAGE_BUCKET',
    description: 'Firebase Storage Bucket',
    example: 'your-project-id.appspot.com'
  },
  {
    name: 'VITE_FIREBASE_MESSAGING_SENDER_ID',
    description: 'Firebase Messaging Sender ID',
    example: '123456789012'
  },
  {
    name: 'VITE_FIREBASE_APP_ID',
    description: 'Firebase App ID',
    example: '1:123456789012:web:abc123def456'
  },
  {
    name: 'VITE_FIREBASE_MEASUREMENT_ID',
    description: 'Firebase Measurement ID (optional)',
    example: 'G-ABC123DEF'
  }
];

// Path to .env file in project root
const envFilePath = path.resolve(__dirname, '../../.env');

// Prompt for each environment variable
async function promptForEnvVars() {
  const values = {};

  console.log('\n🔥 Firebase Environment Setup 🔥');
  console.log('===============================');
  console.log('This script will help you set up your Firebase configuration.');
  console.log('You can find these values in your Firebase project settings.');
  console.log('Leave a value blank to skip it (not recommended except for Measurement ID).\n');

  for (const variable of envVars) {
    const value = await new Promise(resolve => {
      rl.question(`${variable.name} (${variable.description}) [example: ${variable.example}]: `, answer => {
        resolve(answer.trim());
      });
    });
    
    values[variable.name] = value;
  }

  return values;
}

// Write the .env file
function writeEnvFile(values) {
  const envFileContent = Object.entries(values)
    .filter(([, value]) => value !== '') // Skip empty values
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  fs.writeFileSync(envFilePath, envFileContent);
  
  console.log('\n✅ .env file has been created successfully at:', envFilePath);
  console.log('\nTo test your configuration:');
  console.log('1. Run the application with: yarn dev');
  console.log('2. Check the Firebase Status panel in the app');
  console.log('3. If there are issues, verify your Firebase project settings and try again.');
}

// Main function
async function main() {
  try {
    // Check if .env already exists
    if (fs.existsSync(envFilePath)) {
      const overwrite = await new Promise(resolve => {
        rl.question('.env file already exists. Overwrite? (y/n): ', answer => {
          resolve(answer.toLowerCase() === 'y');
        });
      });
      
      if (!overwrite) {
        console.log('Setup cancelled. Existing .env file was not modified.');
        rl.close();
        return;
      }
    }
    
    const values = await promptForEnvVars();
    writeEnvFile(values);
    
    console.log('\nFor more information on setting up Firebase, see docs/FIREBASE_SETUP_GUIDE.md');
  } catch (error) {
    console.error('Error setting up environment variables:', error);
  } finally {
    rl.close();
  }
}

// Run the script
main();