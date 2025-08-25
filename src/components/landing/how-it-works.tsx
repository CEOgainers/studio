import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserPlus, FileText, MessageSquare, Award } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus className="h-10 w-10 text-primary" />,
    title: 'Enroll & Onboard',
    description: 'Sign up and create your profile to start your journey. Get matched with an expert instructor.',
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: 'Complete Tasks',
    description: 'Follow our gamified, step-by-step tasks to build your application, from SOP to CV.',
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: 'Get Expert Feedback',
    description: 'Receive personalized feedback and document reviews from your dedicated instructor.',
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: 'Apply & Succeed',
    description: 'Submit a winning application with confidence and track your success.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">How It Works</h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our streamlined, 4-step process makes your scholarship application journey simple and effective.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 sm:grid-cols-2 md:grid-cols-4 lg:gap-12">
          {steps.map((step, index) => (
            <Card key={index} className="text-center bg-card/50">
              <CardHeader>
                <div className="flex justify-center mb-4">{step.icon}</div>
                <CardTitle className="font-headline">{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
