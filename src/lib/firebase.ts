import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getFirestore,
  type Firestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  doc,
  getDoc,
  limit,
  updateDoc,
  deleteDoc,
  type QuerySnapshot,
  type DocumentData,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const db: Firestore = getFirestore(app);

/**
 * Re-export Firestore helpers from this module only (do not import `collection` / `getDocs`
 * directly from `firebase/firestore` elsewhere). Next/Turbopack can otherwise bundle two
 * copies of the SDK and `collection(db, …)` throws: first argument must be Firestore.
 */
export {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  doc,
  getDoc,
  limit,
  updateDoc,
  deleteDoc,
};

export type { QuerySnapshot, DocumentData };

export async function getAppliances(): Promise<DocumentData[]> {
  try {
    const appliancesCollection = collection(db, "bettarAppliances");
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(appliancesCollection);

    const appliances: DocumentData[] = [];
    querySnapshot.forEach((d) => {
      appliances.push({
        id: d.id,
        ...d.data(),
      });
    });

    return appliances;
  } catch (error) {
    console.error("Error fetching appliances from Firestore:", error);
    throw error;
  }
}

export default app;
