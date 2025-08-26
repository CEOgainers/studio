
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
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleDashed } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Separator } from '@/components/ui/separator';

const sopFormSchema = z.object({
  // Phase 1
  purpose: z.string().min(10, 'This field is required.'),
  past: z.string().min(10, 'This field is required.'),
  program: z.string().min(10, 'This field is required.'),
  personality: z.string().min(10, 'This field is required.'),
  // Phase 2
  earlyInfluences: z.string().optional(),
  achievements: z.string().optional(),
  challenges: z.string().optional(),
  coreValues: z.string().optional(),
  passions: z.string().optional(),
  personalGrowth: z.string().optional(),
  traditions: z.string().optional(),
  influentialPeople: z.string().optional(),
  leadership: z.string().optional(),
  volunteering: z.string().optional(),
  intellectualCuriosity: z.string().optional(),
  creativePursuits: z.string().optional(),
  quirks: z.string().optional(),
  hopes: z.string().optional(),
  philosophy: z.string().optional(),
});

type SopFormValues = z.infer<typeof sopFormSchema>;

const phase1Fields = [
    { name: 'purpose', label: 'Purpose', description: 'The program you wish to study and reasons for choosing it. What draws you to the field? Knowledge and skills you want to acquire from the course. Plans after graduation. Long-term and short-term goals.'},
    { name: 'past', label: 'Past', description: 'Earlier academic track record. Work experience, if any. Internships, projects, seminars, conferences, and more. Additional relevant skills.'},
    { name: 'program', label: 'Program', description: 'Reason for choosing a specific university. Any particular curriculum aspect that you appreciate. Any department, field, or topic you are interested in. What will you contribute to the university and the course? What do you expect from the institution and course?'},
    { name: 'personality', label: 'Personality', description: 'Extracurricular activities. Hobbies and personal interests. Soft skills like teamwork, leadership qualities, and communication skills. A unique trait that you wish to inform the admissions committee about.'},
] as const;

const phase2Fields = [
    { name: 'earlyInfluences', label: 'Early Influences and Upbringing', description: 'What aspects of your childhood environment, family dynamics, or cultural background have shaped who you are?'},
    { name: 'achievements', label: 'Significant Achievements or Milestones', description: 'Share a memorable achievement—academic, extracurricular, or personal—and discuss its deeper impact on you.'},
    { name: 'challenges', label: 'Challenges or Obstacles Overcome', description: 'Reflect on a time you faced a significant challenge. How did it change you or alter your perspective?'},
    { name: 'coreValues', label: 'Core Values and Beliefs', description: 'Identify one or two guiding principles in your life. How do they inform the choices you make?'},
    { name: 'passions', label: 'Passions and Hobbies', description: 'Explore a passion or hobby that energizes you. How does it influence other parts of your life?'},
    { name: 'personalGrowth', label: 'Moments of Personal Growth', description: 'Zero in on an experience that triggered self-discovery or forced you to step out of your comfort zone.'},
    { name: 'traditions', label: 'Cultural, Community, or Family Traditions', description: 'Consider how a specific tradition or cultural experience has shaped your identity or worldview.'},
    { name: 'influentialPeople', label: 'Influential People or Role Models', description: 'Write about a mentor or family member who has had a profound influence on you. What qualities do you hope to emulate?'},
    { name: 'leadership', label: 'Leadership and Teamwork Experiences', description: 'Think of a time you took the lead, collaborated with others, or learned about compromise and empathy in a group setting.'},
    { name: 'volunteering', label: 'Volunteering or Community Involvement', description: 'Reflect on service experiences or community projects. How did it affect your perspective on civic responsibility or social justice?'},
    { name: 'intellectualCuriosity', label: 'Intellectual Curiosity and Favorite Academic Subjects', description: 'Explore what subjects spark your curiosity. What questions drive you to learn more?'},
    { name: 'creativePursuits', label: 'Creative Pursuits or Artistic Expressions', description: 'If you’re drawn to art, music, writing, or theater, how do you express yourself creatively?'},
    { name: 'quirks', label: 'Personal Quirks or Lesser-Known Traits', description: 'Consider an uncommon habit, a hidden talent, or a personal trait that might surprise people.'},
    { name: 'hopes', label: 'Hopes for the Future', description: 'Freewrite about your dreams, goals, and aspirations—what do you hope to achieve or contribute?'},
    { name: 'philosophy', label: 'Life Philosophy or Perspective Shifts', description: 'Pinpoint a turning point that changed your outlook on life. How do you see the world differently now?'},
] as const;

export function SopWrittenTask({ isInstructor }: { isInstructor?: boolean }) {
  const { toast } = useToast();
  const form = useForm<SopFormValues>({
    resolver: zodResolver(sopFormSchema),
    defaultValues: {
        purpose: '', past: '', program: '', personality: '',
        earlyInfluences: '', achievements: '', challenges: '', coreValues: '',
        passions: '', personalGrowth: '', traditions: '', influentialPeople: '',
        leadership: '', volunteering: '', intellectualCuriosity: '', creativePursuits: '',
        quirks: '', hopes: '', philosophy: '',
    },
  });

  function onSubmit(data: SopFormValues) {
    console.log(data);
    toast({
      title: 'SOP Information Saved',
      description: 'Your answers have been saved for your counselor to review.',
    });
  }

  return (
    <AccordionItem value="task-7" className="border rounded-lg px-4 bg-card">
      <AccordionTrigger className="font-headline text-lg hover:no-underline">
        <div className="flex items-center gap-4">
          <CircleDashed className="h-7 w-7 text-muted-foreground" />
          <div>
            <h2 className="text-left">Task 7: Statement of Purpose (SOP) - Written Task</h2>
            <p className="text-sm font-normal text-muted-foreground">
              Provide the core content for your SOP draft.
            </p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 pt-0">
        <div className="p-6 border rounded-lg bg-background space-y-4">
          <h3 className="text-lg font-semibold">
            Complete SOP Written Task
          </h3>
          <p className="text-sm text-muted-foreground">
            Develop a compelling Statement of Purpose (SOP) for your Master of Science application that highlights your motivation, academic accomplishments, relevant experiences, and personal attributes. Structure your SOP around four essential elements—Purpose, Program, Past, and Personality—to create a cohesive narrative. Clearly explain your reasons for pursuing this degree, illustrate how the program aligns with your long-term goals, and underscore what makes you an exceptional candidate. Ensure your writing is engaging, well-organized, and reflective of your unique strengths and aspirations.
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
            
            <div className="p-6 border rounded-lg bg-background space-y-8">
                <h3 className="text-xl font-semibold font-headline">Phase 1: Core Elements</h3>
                {phase1Fields.map(item => (
                    <FormField
                        key={item.name}
                        control={form.control}
                        name={item.name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base">{item.label}</FormLabel>
                                <FormDescription>{item.description}</FormDescription>
                                <FormControl>
                                    <Textarea className="min-h-[120px]" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                ))}
            </div>

            <div className="p-6 border rounded-lg bg-background space-y-8">
                 <h3 className="text-xl font-semibold font-headline">Phase 2: Deeper Reflection (Optional)</h3>
                <p className="text-sm text-muted-foreground">These questions are designed to help you and your counselor uncover unique stories and strengths for your application. Answer any that resonate with you.</p>
                 {phase2Fields.map((item, index) => (
                    <React.Fragment key={item.name}>
                        <FormField
                            control={form.control}
                            name={item.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{index + 1}. {item.label}</FormLabel>
                                    <FormDescription>{item.description}</FormDescription>
                                    <FormControl>
                                        <Textarea className="min-h-[100px]" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {index < phase2Fields.length - 1 && <Separator />}
                    </React.Fragment>
                ))}
            </div>

            <Button type="submit">Submit SOP Details</Button>
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  );
}

// Dummy separator to avoid importing it everywhere
// const Separator = () => <div className="border-b" />;

