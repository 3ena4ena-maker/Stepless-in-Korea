import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getFirestore, 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager,
  Firestore 
} from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

// Try loading firebase configuration
let firebaseConfig: any = null;

try {
  // @ts-ignore - optional configuration file injected by Firebase setup
  import config from '../../firebase-applet-config.json';
  firebaseConfig = config;
} catch {
  // Check process or import.meta environment fallback
  if (import.meta.env?.VITE_FIREBASE_API_KEY) {
    firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || '(default)'
    };
  }
}

export function isFirebaseConfigured(): boolean {
  return !!firebaseConfig && !!firebaseConfig.projectId;
}

export function getFirebaseApp(): FirebaseApp | null {
  if (!isFirebaseConfigured()) return null;
  if (!app) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  }
  return app;
}

export function getDb(): Firestore | null {
  if (!isFirebaseConfigured()) return null;
  if (!db) {
    const currentApp = getFirebaseApp();
    if (currentApp) {
      try {
        // Initialize Firestore with Persistent Multi-Tab Local Cache to minimize Read Units across sessions/tabs
        db = initializeFirestore(currentApp, {
          localCache: persistentLocalCache({
            tabManager: persistentMultipleTabManager()
          })
        }, firebaseConfig?.firestoreDatabaseId);
      } catch (e) {
        // Fallback to standard getFirestore if persistent cache is already initialized
        db = getFirestore(currentApp, firebaseConfig?.firestoreDatabaseId);
      }
    }
  }
  return db;
}

export function getFirebaseAuth(): Auth | null {
  if (!isFirebaseConfigured()) return null;
  if (!auth) {
    const currentApp = getFirebaseApp();
    if (currentApp) {
      auth = getAuth(currentApp);
    }
  }
  return auth;
}
