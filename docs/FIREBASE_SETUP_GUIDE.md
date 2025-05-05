# Firebase Setup Guide

This is a step-by-step guide to set up Firebase for Card Slam Fantasy Hoops.

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter "Card Slam Fantasy Hoops" as the project name
4. Enable Google Analytics (recommended for tracking app usage)
5. Accept the terms and click "Create project"

## 2. Register Your Web App

1. From the Firebase dashboard, click the web icon (</>) 
2. Register app name: "Card Slam Fantasy Hoops Web"
3. No need to set up Firebase Hosting at this point
4. Click "Register app"
5. You'll see your Firebase configuration - keep this page open

## 3. Update Your Environment Variables

1. In your project directory, open the `.env` file
2. Update with the values from your Firebase configuration:

```
VITE_FIREBASE_API_KEY=<value from apiKey>
VITE_FIREBASE_AUTH_DOMAIN=<value from authDomain>
VITE_FIREBASE_PROJECT_ID=<value from projectId>
VITE_FIREBASE_STORAGE_BUCKET=<value from storageBucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<value from messagingSenderId>
VITE_FIREBASE_APP_ID=<value from appId>
VITE_FIREBASE_MEASUREMENT_ID=<value from measurementId>
```

## 4. Enable Authentication

1. In Firebase Console, navigate to "Build" > "Authentication"
2. Click "Get started"
3. Select "Email/Password" provider
4. Enable "Email/Password" and "Email link" (optional)
5. Click "Save"

## 5. Set Up Realtime Database

1. In Firebase Console, go to "Build" > "Realtime Database"
2. Click "Create Database"
3. Choose "Start in test mode" (for development)
4. Select a database location closest to you
5. Click "Enable"

## 6. Set Up Firestore Database

1. In Firebase Console, go to "Build" > "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location closest to you
5. Click "Enable"

## 7. Testing Your Configuration

1. Run your application with `yarn dev`
2. Open browser and check Firebase connection status
3. The FirebaseStatus component should show "Connected successfully!"

## Troubleshooting Common Issues

- **Connection Errors**: Double-check all Firebase configuration values in your `.env` file
- **Auth Errors**: Make sure Email/Password authentication is enabled
- **Database Errors**: Check that Realtime Database is created and rules allow read/write operations
- **App Crashes**: Check browser console for specific Firebase errors

## Optional: Create a Test User

1. In Firebase Console, go to "Build" > "Authentication" > "Users"
2. Click "Add user"
3. Enter an email and password
4. Click "Add user"
5. Use these credentials to test login in your app