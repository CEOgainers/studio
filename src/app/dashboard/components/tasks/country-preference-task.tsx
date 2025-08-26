
'use client';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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

const countries = [
    { id: 'usa', label: 'USA' },
    { id: 'canada', label: 'Canada' },
    { id: 'uk', label: 'UK' },
    { id: 'germany', label: 'Germany' },
    { id: 'australia', label: 'Australia' },
] as const;

const preferenceFormSchema = z.object({
  preferredCountries: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one country.',
  }),
  primarySubject: z.string().min(2, 'Primary subject is required.'),
  secondarySubject: z.string().optional(),
});

type PreferenceFormValues = z.infer<typeof preferenceFormSchema>;

export function CountryPreferenceTask({ isInstructor }: { isInstructor?: boolean }) {
  const { toast } = useToast();
  const form = useForm<PreferenceFormValues>({
    resolver: zodResolver(preferenceFormSchema),
    defaultValues: {
      preferredCountries: ['usa', 'canada'],
      primarySubject: '',
      secondarySubject: '',
    },
  });

  function onSubmit(data: PreferenceFormValues) {
    console.log(data);
    toast({
      title: 'Preferences Saved',
      description: 'Your country and subject preferences have been saved.',
    });
  }

  return (
    <AccordionItem value="task-4" className="border rounded-lg px-4 bg-card">
      <AccordionTrigger className="font-headline text-lg hover:no-underline">
        <div className="flex items-center gap-4">
          <CircleDashed className="h-7 w-7 text-muted-foreground" />
          <div>
            <h2 className="text-left">Task 4: Country Preference & Subject Domain</h2>
            <p className="text-sm font-normal text-muted-foreground">
              Help us understand your study goals.
            </p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="p-6 border rounded-lg bg-background space-y-6">
               <FormField
                    control={form.control}
                    name="preferredCountries"
                    render={() => (
                        <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base">Preferred Countries for Master's Study</FormLabel>
                            <FormDescription>
                                Select all countries you are interested in.
                            </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {countries.map((country) => (
                            <FormField
                            key={country.id}
                            control={form.control}
                            name="preferredCountries"
                            render={({ field }) => {
                                return (
                                <FormItem
                                    key={country.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                    <FormControl>
                                    <Checkbox
                                        checked={field.value?.includes(country.id)}
                                        onCheckedChange={(checked) => {
                                        return checked
                                            ? field.onChange([...field.value, country.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                (value) => value !== country.id
                                                )
                                            );
                                        }}
                                    />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        {country.label}
                                    </FormLabel>
                                </FormItem>
                                );
                            }}
                            />
                        ))}
                        </div>
                        <FormMessage />
                        </FormItem>
                    )}
                />
              <FormField
                control={form.control}
                name="primarySubject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Subject Domain/Field of Interest</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondarySubject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Subject Domain/Field of Interest (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Data Analytics" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Save Preferences</Button>
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  );
}
