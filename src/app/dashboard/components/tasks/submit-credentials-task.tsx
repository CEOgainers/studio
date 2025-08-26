
'use client';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleDashed } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const credentialsFormSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
  recoveryEmail: z.string().email().optional().or(z.literal('')),
  recoveryPhone: z.string().optional(),
});

type CredentialsFormValues = z.infer<typeof credentialsFormSchema>;

export function SubmitCredentialsTask({ isInstructor }: { isInstructor?: boolean }) {
  const { toast } = useToast();
  const form = useForm<CredentialsFormValues>({
    resolver: zodResolver(credentialsFormSchema),
    defaultValues: {
        email: '',
        password: '',
        recoveryEmail: '',
        recoveryPhone: '',
    }
  });

  function onSubmit(data: CredentialsFormValues) {
    console.log(data);
    toast({
        title: "Credentials Submitted",
        description: "Your email credentials have been securely stored.",
    })
  }

  return (
    <AccordionItem value="task-2" className="border rounded-lg px-4 bg-card">
      <AccordionTrigger className="font-headline text-lg hover:no-underline">
        <div className="flex items-center gap-4">
            <CircleDashed className="h-7 w-7 text-muted-foreground" />
            <div>
                 <h2 className="text-left">Task 2: Submit Email Credentials</h2>
                <p className="text-sm font-normal text-muted-foreground">Provide an email account for applications.</p>
            </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 pt-0">
        <div className="p-6 border rounded-lg bg-background">
          <h3 className="text-lg font-semibold">
            Create/Provide an Email Account for Applications
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Please create a new, professional email address (e.g.,
            firstname.lastname.masters@email.com) to be used exclusively for
            your university applications. This helps keep all communication
            organized. Provide the credentials below so our team can assist with
            monitoring and correspondence if needed, as per our service
            agreement.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <FormField control={form.control} name="email" render={({field}) => (
                    <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl><Input type="email" placeholder="professional.email@example.com" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                 <FormField control={form.control} name="password" render={({field}) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl><Input type="password" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <div className="grid grid-cols-2 gap-4">
                     <FormField control={form.control} name="recoveryEmail" render={({field}) => (
                        <FormItem>
                            <FormLabel>Recovery Email (Optional)</FormLabel>
                            <FormControl><Input type="email" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                     <FormField control={form.control} name="recoveryPhone" render={({field}) => (
                        <FormItem>
                            <FormLabel>Recovery Phone (Optional)</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </div>
                <Button type="submit">Submit Credentials</Button>
            </form>
          </Form>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
