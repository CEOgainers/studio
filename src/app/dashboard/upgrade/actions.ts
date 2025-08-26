'use server';

import { auth, db } from '@/lib/auth/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

interface SubmitPaymentInput {
  serviceTitle: string;
  price: string;
  transactionId: string;
  paymentMethod: string;
}

export async function submitPayment(
  input: SubmitPaymentInput
): Promise<{ success: boolean }> {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('You must be logged in to submit a payment.');
  }

  if (!db) {
    throw new Error('Firebase is not configured.');
  }

  try {
    await addDoc(collection(db, 'payments'), {
      userId: currentUser.uid,
      userEmail: currentUser.email,
      ...input,
      status: 'pending',
      createdAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error submitting payment to Firestore:', error);
    throw new Error('Failed to record payment submission.');
  }
}
