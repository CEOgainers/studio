
'use client';

import { useAuth } from '@/lib/auth/auth-provider';
import { z } from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/auth/firebase';

const FormSchema = z.object({
    fullName: z.string().min(2, { message: 'Full name is required.' }),
    email: z.string().email(),
});

type FormValues = z.infer<typeof FormSchema>;

export function SettingsClient() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: user?.displayName ?? '',
      email: user?.email ?? '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!user || !auth.currentUser || !db) return;

    setIsLoading(true);
    try {
        // Update profile display name
        await updateProfile(auth.currentUser, {
            displayName: data.fullName,
        });

        // Update display name in firestore
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
            displayName: data.fullName,
        });

        toast({
            title: 'Success',
            description: 'Your profile has been updated.',
        });

    } catch (error) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to update profile. Please try again.',
        });
        console.error("Error updating profile:", error);
    } finally {
        setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
        </Button>
      </form>
    </Form>
  );
}
