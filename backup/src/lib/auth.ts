import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export const authService = {
  register: async ({ email, password, name }: RegisterData): Promise<User> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile with name
    await updateProfile(userCredential.user, {
      displayName: name
    });

    // Create user document in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      name,
      createdAt: new Date().toISOString()
    });

    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: name
    };
  },

  login: async (email: string, password: string): Promise<User> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName
    };
  },

  logout: async (): Promise<void> => {
    await signOut(auth);
  },

  getCurrentUser: (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user: FirebaseUser | null) => {
          unsubscribe();
          if (user) {
            resolve({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName
            });
          } else {
            resolve(null);
          }
        },
        reject
      );
    });
  },

  onAuthStateChanged: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        callback({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        });
      } else {
        callback(null);
      }
    });
  }
};

export { auth }