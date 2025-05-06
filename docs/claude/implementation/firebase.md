# Firebase Implementation

## Firebase Core Services

The app uses the following Firebase services:

1. **Authentication** - For user account management and sign-in
2. **Firestore** - For structured data storage (player cards, lineups, etc.)
3. **Realtime Database** - For real-time updates and live data
4. **Cloud Functions** - For server-side operations and background tasks
5. **Storage** - For storing assets and user-generated content

## Firebase File Structure
src/firebase/
├── auth.ts             # Authentication methods (signIn, signUp, etc.)
├── database.ts         # Realtime Database operations
├── firebase.ts         # Firebase initialization
├── firestore.ts        # Firestore database operations
├── config.ts           # Firebase configuration (loads from .env)
├── index.ts            # Exports all Firebase modules
├── AuthContext.tsx     # React context for auth state
└── functions/          # Cloud Functions client interfaces
├── functions.ts    # Client-side function calling utilities
└── index.ts        # Example function implementations

## Database Structure
/users/{userId}

- displayName
- email
- avatarUrl
- basketballPoints
- level
- experience
- settings
- lastActive

/cards/{userId}/{cardId}

- playerId
- name
- team
- position
- rarity
- stats
- specialAbility
- variant
- imageUrl
- acquiredAt
- visualTreatment

/lineups/{userId}/{lineupId}

- name
- cards
- createdAt
- updatedAt
- active

/packs

- id
- name
- description
- price
- cardCount
- rarityDistribution
- imageUrl
- available
- releaseDate
- expirationDate

/leaderboards/{leaderboardId}

- name
- description
- startDate
- endDate
- type

/leaderboards/{leaderboardId}/entries/{userId}

- displayName
- avatarUrl
- score
- lineup
- rank
- previousRank
- rankChange
- animationState

/players

- id
- name
- team
- position
- stats (current season averages)
- active

/games

- id
- homeTeam
- awayTeam
- homeScore
- awayScore
- status
- startTime
- playerStats


## Firebase Authentication Implementation

```typescript
// src/firebase/auth.ts
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);

export const signIn = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error };
  }
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
```

## Firestore Operations Example
```typescript
// src/firebase/firestore.ts
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  DocumentData
} from 'firebase/firestore';
import { app } from './firebase';

const db = getFirestore(app);

export const getDocument = async <T = DocumentData>(
  path: string
): Promise<T | null> => {
  try {
    const docRef = doc(db, path);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as unknown as T;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};

export const setDocument = async <T extends object>(
  path: string, 
  data: T
): Promise<void> => {
  try {
    await setDoc(doc(db, path), data);
  } catch (error) {
    console.error('Error setting document:', error);
    throw error;
  }
};

export const updateDocument = async <T extends object>(
  path: string, 
  data: Partial<T>
): Promise<void> => {
  try {
    await updateDoc(doc(db, path), data as DocumentData);
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const queryDocuments = async <T = DocumentData>(
  collectionPath: string,
  conditions: [string, '==' | '>' | '<' | '>=' | '<=', any][]
): Promise<T[]> => {
  try {
    const collectionRef = collection(db, collectionPath);
    
    // Build query with conditions
    let queryRef = query(collectionRef);
    conditions.forEach(([field, operator, value]) => {
      // @ts-ignore - TypeScript doesn't handle this pattern well
      queryRef = query(queryRef, where(field, operator, value));
    });
    
    const querySnapshot = await getDocs(queryRef);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as unknown as T[];
  } catch (error) {
    console.error('Error querying documents:', error);
    throw error;
  }
};
```

## Realtime Database Implementation
```typescript
// src/firebase/database.ts
import { getDatabase, ref, onValue, set, update, remove } from 'firebase/database';
import { app } from './firebase';

const db = getDatabase(app);

export const setData = async (path: string, data: any): Promise<void> => {
  try {
    await set(ref(db, path), data);
  } catch (error) {
    console.error('Error setting data:', error);
    throw error;
  }
};

export const updateData = async (path: string, data: any): Promise<void> => {
  try {
    await update(ref(db, path), data);
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

export const removeData = async (path: string): Promise<void> => {
  try {
    await remove(ref(db, path));
  } catch (error) {
    console.error('Error removing data:', error);
    throw error;
  }
};

export const onDataChange = <T>(
  path: string, 
  callback: (data: T | null) => void
) => {
  const dataRef = ref(db, path);
  
  return onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};
```

### Cloud Functions Integration
```typescript
// src/firebase/functions/functions.ts
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../firebase';

const functions = getFunctions(app);

export const callFunction = async <T = any, R = any>(
  name: string, 
  data?: T
): Promise<R> => {
  try {
    const functionRef = httpsCallable<T, R>(functions, name);
    const result = await functionRef(data as T);
    return result.data;
  } catch (error) {
    console.error(`Error calling function ${name}:`, error);
    throw error;
  }
};

// Example functions
export const openPack = (packId: string) => 
  callFunction<{ packId: string }, { cards: any[] }>('openPack', { packId });

export const createLineup = (lineup: any) =>
  callFunction<{ lineup: any }, { id: string }>('createLineup', { lineup });

export const calculateScore = (lineupId: string) =>
  callFunction<{ lineupId: string }, { score: number }>('calculateScore', { lineupId });
Security Rules Example
// Firestore rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profiles
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Cards
    match /cards/{userId}/{cardId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Lineups
    match /lineups/{userId}/{lineupId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public data
    match /players/{playerId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admin can write
    }
    
    match /packs/{packId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admin can write
    }
    
    // Leaderboards
    match /leaderboards/{leaderboardId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admin can write
      
      match /entries/{userId} {
        allow read: if request.auth != null;
        allow write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

## Performance Optimization for Firebase

- Use .limitToFirst() or .limitToLast() for pagination
- Implement caching for frequently accessed data
- Index fields used in queries
- Use compound queries to reduce the number of reads
- Structure data for efficient access patterns
- Implement offline data persistence with enablePersistence()

