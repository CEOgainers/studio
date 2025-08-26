
'use client';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, UserRound, CircleDashed } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

const profileFormSchema = z.object({
  subject: z.string().default('electrical and electronics engineering'),
  hscStartDate: z.date().default(new Date('2006-07-01')),
  hscEndDate: z.date().default(new Date('2008-09-10')),
  bachelorUniversity: z.string().default('JAHANGIRNAGAR UNIVERSITY'),
  bachelorSubject: z.string().default('GOVERNMENT AND POLITICS'),
  bachelorStartDate: z.date().default(new Date('2010-01-02')),
  bachelorEndDate: z.date().default(new Date('2015-01-26')),
  mastersUniversity: z.string().default('JAHANGIRNAGAR UNIVERSITY'),
  mastersSubject: z.string().default('GOVERNMENT AND POLITICS'),
  mastersStartDate: z.date().default(new Date('2015-01-27')),
  mastersEndDate: z.date().default(new Date('2016-05-02')),
  phone: z.string().default('01714677778'),
  presentAddress: z
    .string()
    .default('9/A, Amin tower, 7 College road, Mymensingh Sadar, Mymensingh'),
  permanentAddress: z.string().default('Pizahati, Maska, Kendua, Netrokona'),
  spouseName: z.string().default('Fatema Akter Rini'),
  spouseDob: z.date().default(new Date('1994-12-02')),
  spouseEmail: z.string().email().default('fatemarinif@gmail.com'),
  children: z.array(
    z.object({
      name: z.string(),
      dob: z.date(),
      email: z.string().email().optional(),
    })
  ).default([
      { name: 'Mehwish Nurayin Kongka', dob: new Date('2023-04-04'), email: '' },
      { name: 'Minhan Fardain Kousor', dob: new Date('2024-12-25'), email: '' },
  ]),
  emergencyContactName: z.string().default('Farhana Sultana Fariya'),
  emergencyContactRelationship: z.string().default('Sibling'),
  emergencyContactPhone: z.string().default('01575067010'),
  emergencyContactEmail: z.string().email().default('sltnfariya@gmail.com'),
  visaRejection: z.string().default('No'),
  visaRejectionDetails: z.string().optional(),
  travelHistory: z.array(
    z.object({
      country: z.string(),
      startDate: z.date(),
      endDate: z.date(),
    })
  ).default([
      { country: 'India', startDate: new Date('2019-06-08'), endDate: new Date('2019-06-12') },
      { country: 'Thailand', startDate: new Date('2023-03-07'), endDate: new Date('2023-03-21') },
      { country: 'India', startDate: new Date('2024-10-16'), endDate: new Date('2024-10-22') },
  ]),
  previousApplications: z.array(
    z.object({
      university: z.string(),
      semester: z.string(),
      outcome: z.string().optional(),
    })
  ).default([]),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileTask({ isInstructor }: { isInstructor?: boolean }) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: profileFormSchema.parse({}),
  });

  const {
    fields: childrenFields,
    append: appendChild,
    remove: removeChild,
  } = useFieldArray({ control: form.control, name: 'children' });

  const {
    fields: travelFields,
    append: appendTravel,
    remove: removeTravel,
  } = useFieldArray({ control: form.control, name: 'travelHistory' });

  const {
    fields: appFields,
    append: appendApp,
    remove: removeApp,
  } = useFieldArray({ control: form.control, name: 'previousApplications' });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
  }

  return (
    <AccordionItem value="task-3" className="border rounded-lg px-4 bg-card">
      <AccordionTrigger className="font-headline text-lg hover:no-underline">
        <div className="flex items-center gap-4">
          <CircleDashed className="h-7 w-7 text-muted-foreground" />
          <div>
            <h2 className="text-left">
              Task 3: Unique Questions - Academic & Personal Background
            </h2>
            <p className="text-sm font-normal text-muted-foreground">
              Please fill out your profile information.
            </p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="p-6 border rounded-lg bg-background">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><UserRound /> Academic & Personal Background</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="subject" render={({field}) => (
                        <FormItem>
                            <FormLabel>Subject/Major</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                 {/* Education Timeline */}
                <h4 className="font-semibold mt-6 mb-2">📚 Education Timeline</h4>
                 <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                        <h5 className="font-medium mb-2">HSC (Higher Secondary Certificate)</h5>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="hscStartDate" render={({field}) => (
                                <FormItem className="flex flex-col"><FormLabel>Start Date</FormLabel><DatePickerField field={field} /><FormMessage /></FormItem>
                            )}/>
                             <FormField control={form.control} name="hscEndDate" render={({field}) => (
                                <FormItem className="flex flex-col"><FormLabel>End Date</FormLabel><DatePickerField field={field} /><FormMessage /></FormItem>
                            )}/>
                        </div>
                    </div>
                     <div className="p-4 border rounded-md">
                        <h5 className="font-medium mb-2">Bachelor's Degree</h5>
                         <div className="grid grid-cols-2 gap-4">
                           <FormField control={form.control} name="bachelorUniversity" render={({field}) => (
                                <FormItem><FormLabel>University Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                             <FormField control={form.control} name="bachelorSubject" render={({field}) => (
                                <FormItem><FormLabel>Subject</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                           <FormField control={form.control} name="bachelorStartDate" render={({field}) => (
                                <FormItem className="flex flex-col"><FormLabel>Start Date</FormLabel><DatePickerField field={field} /><FormMessage /></FormItem>
                            )}/>
                             <FormField control={form.control} name="bachelorEndDate" render={({field}) => (
                                <FormItem className="flex flex-col"><FormLabel>End Date</FormLabel><DatePickerField field={field} /><FormMessage /></FormItem>
                            )}/>
                        </div>
                    </div>
                     <div className="p-4 border rounded-md">
                        <h5 className="font-medium mb-2">Master’s Degree (If Applicable)</h5>
                         <div className="grid grid-cols-2 gap-4">
                           <FormField control={form.control} name="mastersUniversity" render={({field}) => (
                                <FormItem><FormLabel>University Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                             <FormField control={form.control} name="mastersSubject" render={({field}) => (
                                <FormItem><FormLabel>Subject</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                           <FormField control={form.control} name="mastersStartDate" render={({field}) => (
                                <FormItem className="flex flex-col"><FormLabel>Start Date</FormLabel><DatePickerField field={field} /><FormMessage /></FormItem>
                            )}/>
                             <FormField control={form.control} name="mastersEndDate" render={({field}) => (
                                <FormItem className="flex flex-col"><FormLabel>End Date</FormLabel><DatePickerField field={field} /><FormMessage /></FormItem>
                            )}/>
                        </div>
                    </div>
                 </div>
                 {/* Contact Information */}
                 <h4 className="font-semibold mt-6 mb-2">🏠 Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <FormField control={form.control} name="phone" render={({field}) => (
                        <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                     <FormField control={form.control} name="presentAddress" render={({field}) => (
                        <FormItem><FormLabel>Present Address</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                     <FormField control={form.control} name="permanentAddress" render={({field}) => (
                        <FormItem><FormLabel>Permanent Address</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                 </div>

                 {/* Family Information */}
                <h4 className="font-semibold mt-6 mb-2">👨‍👩‍👧‍👦 Family Information</h4>
                 <div className="space-y-4">
                     <div className="p-4 border rounded-md">
                        <h5 className="font-medium mb-2">Spouse</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             <FormField control={form.control} name="spouseName" render={({field}) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                            <FormField control={form.control} name="spouseDob" render={({field}) => ( <FormItem className="flex flex-col"><FormLabel>Date of Birth</FormLabel><DatePickerField field={field} /><FormMessage /></FormItem>)}/>
                           <FormField control={form.control} name="spouseEmail" render={({field}) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                        </div>
                    </div>
                    <div className="p-4 border rounded-md">
                        <h5 className="font-medium mb-2">Children</h5>
                        {childrenFields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start mb-4">
                                <FormField control={form.control} name={`children.${index}.name`} render={({field}) => (<FormItem><FormLabel>Child {index+1} Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                                 <FormField control={form.control} name={`children.${index}.dob`} render={({field}) => ( <FormItem className="flex flex-col"><FormLabel>Date of Birth</FormLabel><DatePickerField field={field} /><FormMessage /></FormItem>)}/>
                               <FormField control={form.control} name={`children.${index}.email`} render={({field}) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                                <Button type="button" variant="ghost" onClick={() => removeChild(index)} className="mt-6">Remove</Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => appendChild({name: '', dob: new Date(), email: ''})}>Add Child</Button>
                    </div>
                 </div>

                {/* Emergency Contact */}
                <h4 className="font-semibold mt-6 mb-2">📞 Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="emergencyContactName" render={({field}) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="emergencyContactRelationship" render={({field}) => (<FormItem><FormLabel>Relationship</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="emergencyContactPhone" render={({field}) => (<FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="emergencyContactEmail" render={({field}) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                </div>

                {/* Visa History */}
                <h4 className="font-semibold mt-6 mb-2">🛂 Visa History</h4>
                 <FormField control={form.control} name="visaRejection" render={({field}) => (
                    <FormItem>
                         <FormLabel>Have you ever been rejected for a visa (especially J1)?</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent><SelectItem value="No">No</SelectItem><SelectItem value="Yes">Yes</SelectItem></SelectContent>
                         </Select>
                         <FormMessage />
                    </FormItem>
                )}/>
                {form.watch('visaRejection') === 'Yes' && (
                     <FormField control={form.control} name="visaRejectionDetails" render={({field}) => (
                        <FormItem className="mt-4"><FormLabel>If Yes, provide details:</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                )}

                 {/* Travel Experience */}
                <h4 className="font-semibold mt-6 mb-2">🌍 Travel Experience</h4>
                 <div className="space-y-4">
                     {travelFields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-md grid grid-cols-4 gap-4 items-end">
                            <FormField control={form.control} name={`travelHistory.${index}.country`} render={({field}) => (<FormItem><FormLabel>Country Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                            <FormField control={form.control} name={`travelHistory.${index}.startDate`} render={({field}) => ( <FormItem className="flex flex-col"><FormLabel>Start Date</FormLabel><DatePickerField field={field} /><FormMessage /></FormItem>)}/>
                            <FormField control={form.control} name={`travelHistory.${index}.endDate`} render={({field}) => ( <FormItem className="flex flex-col"><FormLabel>End Date</FormLabel><DatePickerField field={field} /><FormMessage /></FormItem>)}/>
                             <Button type="button" variant="ghost" onClick={() => removeTravel(index)}>Remove</Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendTravel({country: '', startDate: new Date(), endDate: new Date()})}>Add Travel Entry</Button>
                </div>

                 {/* Previous Applications */}
                <h4 className="font-semibold mt-6 mb-2">🇺🇸 Previous Applications</h4>
                <div className="space-y-4">
                    {appFields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-md grid grid-cols-4 gap-4 items-end">
                             <FormField control={form.control} name={`previousApplications.${index}.university`} render={({field}) => (<FormItem><FormLabel>University Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                             <FormField control={form.control} name={`previousApplications.${index}.semester`} render={({field}) => (<FormItem><FormLabel>Semester & Year</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                             <FormField control={form.control} name={`previousApplications.${index}.outcome`} render={({field}) => (
                                <FormItem><FormLabel>Outcome</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Select outcome" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="Pending">Pending</SelectItem>
                                            <SelectItem value="Accepted">Accepted</SelectItem>
                                            <SelectItem value="Rejected">Rejected</SelectItem>
                                            <SelectItem value="Withdrew">Withdrew</SelectItem>
                                        </SelectContent>
                                     </Select>
                                <FormMessage /></FormItem>
                            )}/>
                            <Button type="button" variant="ghost" onClick={() => removeApp(index)}>Remove</Button>
                        </div>
                    ))}
                     <Button type="button" variant="outline" size="sm" onClick={() => appendApp({university: '', semester: ''})}>Add Application</Button>
                </div>

            </div>
            <Button type="submit">Save Profile</Button>
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  );
}


function DatePickerField({field}: any) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                <Button
                    variant={"outline"}
                    className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                    )}
                >
                    {field.value ? (
                    format(field.value, "PPP")
                    ) : (
                    <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
