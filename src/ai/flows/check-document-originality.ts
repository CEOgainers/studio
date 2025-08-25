'use server';

/**
 * @fileOverview An AI-powered document originality checker.
 *
 * - checkDocumentOriginality - A function that checks the originality of a document.
 * - CheckDocumentOriginalityInput - The input type for the checkDocumentOriginality function.
 * - CheckDocumentOriginalityOutput - The return type for the checkDocumentOriginality function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheckDocumentOriginalityInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "The document content, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  documentType: z
    .string()
    .describe('The type of document being checked (e.g., SOP, LOR, CV).'),
});
export type CheckDocumentOriginalityInput = z.infer<
  typeof CheckDocumentOriginalityInputSchema
>;

const CheckDocumentOriginalityOutputSchema = z.object({
  originalityScore: z
    .number()
    .describe(
      'A score between 0 and 1 indicating the originality of the document, where 0 is completely plagiarized and 1 is completely original.'
    ),
  feedback: z
    .string()
    .describe(
      'A detailed explanation of the originality score, including any potential issues and suggestions for improvement.'
    ),
});
export type CheckDocumentOriginalityOutput = z.infer<
  typeof CheckDocumentOriginalityOutputSchema
>;

export async function checkDocumentOriginality(
  input: CheckDocumentOriginalityInput
): Promise<CheckDocumentOriginalityOutput> {
  return checkDocumentOriginalityFlow(input);
}

const checkDocumentOriginalityPrompt = ai.definePrompt({
  name: 'checkDocumentOriginalityPrompt',
  input: {schema: CheckDocumentOriginalityInputSchema},
  output: {schema: CheckDocumentOriginalityOutputSchema},
  prompt: `You are an AI-powered plagiarism detection tool. You are provided a
document and asked to assess its originality.

Analyze the document and provide an originality score between 0 and 1, where 0
is completely plagiarized and 1 is completely original. Also, provide
detailed feedback explaining the score, including any potential issues and
suggestions for improvement.

Document Type: {{{documentType}}}
Document Content: {{{documentDataUri}}}`,
});

const checkDocumentOriginalityFlow = ai.defineFlow(
  {
    name: 'checkDocumentOriginalityFlow',
    inputSchema: CheckDocumentOriginalityInputSchema,
    outputSchema: CheckDocumentOriginalityOutputSchema,
  },
  async input => {
    const {output} = await checkDocumentOriginalityPrompt(input);
    return output!;
  }
);
