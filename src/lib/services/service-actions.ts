
'use server';

import { db } from '@/lib/auth/firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  deleteDoc,
  DocumentData,
  where,
  getDoc,
} from 'firebase/firestore';

export interface Service extends DocumentData {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  order: number;
  visible: boolean;
}

// Fetch all services for the admin panel
export async function getAllServices(): Promise<Service[]> {
  if (!db) throw new Error('Firebase is not configured.');
  try {
    const servicesCol = collection(db, 'services');
    const q = query(servicesCol, orderBy('order', 'asc'));
    const serviceSnapshot = await getDocs(q);
    const serviceList = serviceSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Service[];
    return serviceList;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

// Fetch only visible services for public pages
export async function getVisibleServices(): Promise<Service[]> {
  if (!db) throw new Error('Firebase is not configured.');
  try {
    const servicesCol = collection(db, 'services');
    // Query by order first, then filter by visibility in the code.
    // This avoids needing a composite index in Firestore.
    const q = query(servicesCol, orderBy('order', 'asc'));
    const serviceSnapshot = await getDocs(q);
    const serviceList = serviceSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }) as Service)
        .filter((service) => service.visible);
    return serviceList;
  } catch (error) {
    console.error('Error fetching visible services:', error);
    // Rethrow the error to be handled by the caller, which can show an error to the user.
    // In this case, the Next.js boundary will catch it.
    throw error;
  }
}

// Fetch a single service by its ID
export async function getServiceById(id: string): Promise<Service | null> {
    if (!db) throw new Error("Firebase is not configured.");
    try {
        const serviceDocRef = doc(db, "services", id);
        const serviceSnapshot = await getDoc(serviceDocRef);
        if (serviceSnapshot.exists()) {
            return { id: serviceSnapshot.id, ...serviceSnapshot.data() } as Service;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching service by ID:", error);
        return null;
    }
}


// Add a new service
export async function addService(service: Omit<Service, 'id'>): Promise<{ success: boolean }> {
  if (!db) throw new Error('Firebase is not configured.');
  try {
    await addDoc(collection(db, 'services'), service);
    return { success: true };
  } catch (error: any) {
    console.error('Error adding service:', error);
    throw new Error(error.message || 'Failed to add service.');
  }
}

// Update an existing service
export async function updateService(
  id: string,
  service: Partial<Omit<Service, 'id'>>
): Promise<{ success: boolean }> {
  if (!db) throw new Error('Firebase is not configured.');
  try {
    const serviceDoc = doc(db, 'services', id);
    await updateDoc(serviceDoc, service);
    return { success: true };
  } catch (error: any) {
    console.error('Error updating service:', error);
    throw new Error(error.message || 'Failed to update service.');
  }
}

// Delete a service
export async function deleteService(id: string): Promise<{ success: boolean }> {
    if (!db) throw new Error("Firebase is not configured.");
    try {
        await deleteDoc(doc(db, "services", id));
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting service:", error);
        throw new Error(error.message || 'Failed to delete service.');
    }
}
