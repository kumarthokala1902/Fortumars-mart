import { 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  orderBy, 
  doc, 
  setDoc,
  getDoc,
  writeBatch
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { Product, User } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

const USER_KEY = 'fortumarsmart_user';

export const storageService = {
  /**
   * Fetches products from Firestore with a 5s safety timeout.
   * If collection is empty, automatically seeds it.
   */
  getProducts: async (): Promise<Product[]> => {
    if (!isFirebaseConfigured() || !db) {
      console.warn("Firebase not configured or invalid credentials. Using local catalog.");
      return INITIAL_PRODUCTS;
    }

    try {
      const productsCol = collection(db, 'products');
      const q = query(productsCol, orderBy('name', 'asc'));
      
      const timeoutPromise = new Promise<null>((_, reject) => 
        setTimeout(() => reject(new Error("Firebase request timed out. Check your Security Rules or Internet connection.")), 5000)
      );

      const productSnapshot = await Promise.race([
        getDocs(q),
        timeoutPromise
      ]) as any;

      if (!productSnapshot) throw new Error("No data returned from Firestore");
      
      let productList = productSnapshot.docs.map((d: any) => ({
        ...d.data(),
        id: d.id 
      })) as Product[];

      // If cloud is empty, seed it for the user
      if (productList.length === 0) {
        console.log("Cloud collection 'products' is empty. Seeding INITIAL_PRODUCTS...");
        const batch = writeBatch(db);
        
        INITIAL_PRODUCTS.forEach(product => {
          const newDocRef = doc(productsCol);
          batch.set(newDocRef, { ...product, id: newDocRef.id });
        });
        
        await batch.commit();
        console.log("Seeding successful.");
        
        // Return initial products directly to avoid a second fetch immediately
        return INITIAL_PRODUCTS;
      }

      return productList;
    } catch (error: any) {
      console.error("Firebase Storage Error:", error.message);
      return INITIAL_PRODUCTS;
    }
  },

  /**
   * Adds a new product to Firestore.
   */
  addProduct: async (product: Product): Promise<void> => {
    if (!isFirebaseConfigured() || !db) {
      console.error("Cannot add product: Firebase not configured.");
      return;
    }
    try {
      const productsCol = collection(db, 'products');
      const { id, ...productData } = product;
      const docRef = await addDoc(productsCol, productData);
      // Update with generated ID
      await setDoc(doc(db, 'products', docRef.id), { ...productData, id: docRef.id }, { merge: true });
    } catch (error) {
      console.error("Cloud Write Error:", error);
      throw error;
    }
  },

  /**
   * Fetches user profile from Firestore by email.
   * Ensures users can persist their bio, location, and avatar in the cloud.
   */
  syncUserWithCloud: async (user: User): Promise<User> => {
    if (!isFirebaseConfigured() || !db) return user;

    try {
      // Use email as doc ID for easy lookup
      const userRef = doc(db, 'users', user.email.toLowerCase());
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        console.log(`Cloud profile for ${user.email} found, syncing...`);
        return userSnap.data() as User;
      } else {
        console.log(`No cloud profile for ${user.email}, creating new entry.`);
        await setDoc(userRef, user);
        return user;
      }
    } catch (error) {
      console.error("User Cloud Sync Error:", error);
      return user;
    }
  },

  /**
   * Updates user profile in Firestore.
   */
  updateUserProfile: async (user: User): Promise<void> => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    if (!isFirebaseConfigured() || !db) return;

    try {
      const userRef = doc(db, 'users', user.email.toLowerCase());
      await setDoc(userRef, user, { merge: true });
      console.log("Cloud profile updated successfully.");
    } catch (error) {
      console.error("Failed to update cloud profile:", error);
    }
  },

  getUser: (): User | null => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  setUser: (user: User | null): void => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }
};