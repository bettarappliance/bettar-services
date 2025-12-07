import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { collection, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firestore
export const db: Firestore = getFirestore(app);

// Function to get all appliances from Firestore
export async function getAppliances(): Promise<DocumentData[]> {
  try {
    const appliancesCollection = collection(db, 'bettarAppliances');
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(appliancesCollection);
    
    const appliances: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      appliances.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    
    return appliances;
  } catch (error) {
    console.error('Error fetching appliances from Firestore:', error);
    throw error;
  }
}

export default app;

