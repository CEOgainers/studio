
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleDashed, PlusCircle, UserPlus } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Separator } from '@/components/ui/separator';

const recommenderSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    relationship: z.string().min(1, 'Relationship is required'),
    mobile: z.string().min(1, 'Mobile number is required'),
    designation: z.string().min(1, 'Designation is required'),
    department: z.string().min(1, 'Department is required'),
    email: z.string().email(),
    organization: z.string().min(1, 'University/Organization is required'),
});

const lorFormSchema = z.object({
  recommenders: z.array(recommenderSchema).min(1).max(3),
});

type LorFormValues = z.infer<typeof lorFormSchema>;

export function LorDetailsTask({ isInstructor }: { isInstructor?: boolean }) {
  const { toast } = useToast();
  const form = useForm<LorFormValues>({
    resolver: zodResolver(lorFormSchema),
    defaultValues: {
      recommenders: [{
        name: '', relationship: '', mobile: '', designation: '', department: '', email: '', organization: ''
      }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'recommenders',
  });

  function onSubmit(data: LorFormValues) {
    console.log(data);
    toast({
      title: 'Recommender Details Saved',
      description: 'Your recommender information has been submitted.',
    });
  }

  return (
    <AccordionItem value="task-8" className="border rounded-lg px-4 bg-card">
      <AccordionTrigger className="font-headline text-lg hover:no-underline">
        <div className="flex items-center gap-4">
          <CircleDashed className="h-7 w-7 text-muted-foreground" />
          <div>
            <h2 className="text-left">Task 8: Letter of Recommendation (LOR) Details</h2>
            <p className="text-sm font-normal text-muted-foreground">
              Provide details for each of your recommenders.
            </p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="p-6 border rounded-lg bg-background space-y-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <UserPlus /> Recommender Details
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                    Please provide details for each of your recommenders. We will use this information to guide you on obtaining strong LORs.
                </p>
              </div>

              {fields.map((field, index) => (
                <div key={field.id}>
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold">Recommender {index + 1}</h4>
                        {fields.length > 1 && (
                            <Button variant="ghost" size="sm" onClick={() => remove(index)}>Remove</Button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name={`recommenders.${index}.name`} render={({ field }) => (<FormItem><FormLabel>Recommender Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`recommenders.${index}.relationship`} render={({ field }) => (<FormItem><FormLabel>Relationship to Applicant</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`recommenders.${index}.mobile`} render={({ field }) => (<FormItem><FormLabel>Mobile Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`recommenders.${index}.designation`} render={({ field }) => (<FormItem><FormLabel>Designation</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`recommenders.${index}.department`} render={({ field }) => (<FormItem><FormLabel>Department</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`recommenders.${index}.email`} render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`recommenders.${index}.organization`} render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>University/Organization Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                     {index < fields.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}

              {fields.length < 3 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ name: '', relationship: '', mobile: '', designation: '', department: '', email: '', organization: '' })}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Another Recommender
                </Button>
              )}
            </div>

            <Button type="submit">Submit Recommender Details</Button>
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  );
}
