'use server';

import {
  checkDocumentOriginality as checkDocumentOriginalityFlow,
  CheckDocumentOriginalityInput,
  CheckDocumentOriginalityOutput,
} from '@/ai/flows/check-document-originality';

export async function checkDocumentOriginality(
  input: CheckDocumentOriginalityInput
): Promise<CheckDocumentOriginalityOutput> {
  try {
    const result = await checkDocumentOriginalityFlow(input);
    return result;
  } catch (error) {
    console.error('Error checking document originality:', error);
    throw new Error('Failed to check document originality. Please try again.');
  }
}
