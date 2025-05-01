import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC3kUKHrJhKoqUDWev-Hl-IqgTX42nh0co",
  authDomain: "xibit-3a67e.firebaseapp.com",
  projectId: "xibit-3a67e",
  storageBucket: "xibit-3a67e.firebasestorage.app",
  messagingSenderId: "831224907576",
  appId: "1:831224907576:web:3a1a82e41c128f75d623cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 