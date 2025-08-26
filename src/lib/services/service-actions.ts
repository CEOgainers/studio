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
} from 'firebase/firestore';

export interface Service extends DocumentData {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  order: number;
}

// Fetch all services
export async function getServices(): Promise<Service[]> {
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

// Add a new service
export async function addService(service: Omit<Service, 'id'>): Promise<{ success: boolean }> {
  if (!db) throw new Error('Firebase is not configured.');
  try {
    await addDoc(collection(db, 'services'), service);
    return { success: true };
  } catch (error) {
    console.error('Error adding service:', error);
    throw new Error('Failed to add service.');
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
  } catch (error) {
    console.error('Error updating service:', error);
    throw new Error('Failed to update service.');
  }
}

// Delete a service
export async function deleteService(id: string): Promise<{ success: boolean }> {
    if (!db) throw new Error("Firebase is not configured.");
    try {
        await deleteDoc(doc(db, "services", id));
        return { success: true };
    } catch (error) {
        console.error("Error deleting service:", error);
        throw new Error("Failed to delete service.");
    }
}
