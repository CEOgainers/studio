'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { checkDocumentOriginality } from '../actions';
import type { CheckDocumentOriginalityOutput } from '@/ai/flows/check-document-originality';
import { AlertCircle, FileCheck2, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const FormSchema = z.object({
  documentType: z.string({ required_error: 'Please select a document type.' }),
  document: z
    .any()
    .refine((files) => files?.length === 1, 'Document is required.')
    .refine((files) => files?.[0]?.size <= 5000000, `Max file size is 5MB.`),
});

type FormValues = z.infer<typeof FormSchema>;

function ResultCard({ result }: { result: CheckDocumentOriginalityOutput }) {
  const scorePercentage = Math.round(result.originalityScore * 100);

  const getProgressColor = () => {
    if (scorePercentage < 40) return 'bg-red-500';
    if (scorePercentage < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <FileCheck2 className="h-6 w-6 text-primary" />
          Originality Report
        </CardTitle>
        <CardDescription>
          Here is the AI-generated report for your document.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Originality Score</span>
            <span className={`text-lg font-bold ${getProgressColor().replace('bg-', 'text-')}`}>{scorePercentage}%</span>
          </div>
          <Progress value={scorePercentage} indicatorClassName={getProgressColor()} />
        </div>
        <div>
          <h3 className="font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            AI Feedback
          </h3>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap mt-1 border p-4 rounded-md bg-secondary/30">
            {result.feedback}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}


export function OriginalityCheckerClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CheckDocumentOriginalityOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setResult(null);

    const file = data.document[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const dataUri = e.target?.result as string;
      if (!dataUri) {
        toast({
            variant: 'destructive',
            title: 'Error reading file',
            description: 'Could not read the selected file. Please try again.',
        });
        setIsLoading(false);
        return;
      }

      try {
        const response = await checkDocumentOriginality({
          documentDataUri: dataUri,
          documentType: data.documentType,
        });
        setResult(response);
      } catch (error) {
         toast({
            variant: 'destructive',
            title: 'Analysis Failed',
            description: 'The AI failed to analyze the document. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    reader.onerror = () => {
        toast({
            variant: 'destructive',
            title: 'File Read Error',
            description: 'An error occurred while reading the file.',
        });
        setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Submit Your Document</CardTitle>
          <CardDescription>
            Select the document type and upload your file for analysis.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="documentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a document type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="SOP">
                          Statement of Purpose (SOP)
                        </SelectItem>
                        <SelectItem value="LOR">
                          Letter of Recommendation (LOR)
                        </SelectItem>
                        <SelectItem value="CV">Curriculum Vitae (CV)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        disabled={isLoading}
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Check Originality'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="flex items-center justify-center">
        {isLoading && (
            <div className="text-center text-muted-foreground">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="mt-4">AI is analyzing your document...</p>
                <p className="text-sm">This may take a moment.</p>
            </div>
        )}
        {!isLoading && result && <ResultCard result={result} />}
        {!isLoading && !result && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-headline">Awaiting Submission</AlertTitle>
            <AlertDescription>
              Your originality report will appear here once you submit a document.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
