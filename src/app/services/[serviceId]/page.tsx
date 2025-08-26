
import { getServiceById } from '@/lib/services/service-actions';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, CircleDashed } from 'lucide-react';

const roadmapTasks = [
    { title: "Application Tracker Setup", status: "Counselor Task", icon: <Check className="h-5 w-5 text-green-500" /> },
    { title: "Submit Email Credentials", status: "Client Task", icon: <CircleDashed className="h-5 w-5 text-muted-foreground" /> },
    { title: "Complete Academic & Personal Profile", status: "Client Task", icon: <CircleDashed className="h-5 w-5 text-muted-foreground" /> },
    { title: "Set Country & Subject Preferences", status: "Client Task", icon: <CircleDashed className="h-5 w-5 text-muted-foreground" /> },
    { title: "Review University Shortlist", status: "Counselor Task", icon: <Check className="h-5 w-5 text-green-500" /> },
    { title: "Review Professor Shortlist", status: "Counselor Task", icon: <Check className="h-5 w-5 text-green-500" /> },
    { title: "Complete SOP Written Task", status: "Client Task", icon: <CircleDashed className="h-5 w-5 text-muted-foreground" /> },
    { title: "Provide LOR Recommender Details", status: "Client Task", icon: <CircleDashed className="h-5 w-5 text-muted-foreground" /> },
    { title: "Document Review & Finalization", status: "Counselor Task", icon: <Check className="h-5 w-5 text-green-500" /> },
    { title: "Application Submission", status: "Counselor Task", icon: <Check className="h-5 w-5 text-green-500" /> },
];

export default async function ServiceDetailPage({ params }: { params: { serviceId: string } }) {
  const service = await getServiceById(params.serviceId);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Service Details & Action */}
          <div>
            <Badge variant="secondary" className="mb-2">Service Details</Badge>
            <h1 className="text-4xl font-bold font-headline text-primary mb-2">{service.title}</h1>
            <p className="text-5xl font-bold text-foreground mb-4">{service.price}</p>
            <p className="text-muted-foreground mb-6">{service.description}</p>
            
            <ul className="space-y-3 mb-8">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground/90">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link href="/signup">
                <Button size="lg" className="w-full font-semibold text-lg">I Want to Proceed</Button>
            </Link>
          </div>

          {/* Right Column: Roadmap */}
          <Card className="bg-card/50 border">
              <CardHeader>
                  <CardTitle className="font-headline text-2xl">Your Journey Roadmap</CardTitle>
                  <CardDescription>Follow these steps to build a winning application with our expert guidance.</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="relative pl-6">
                      {/* Vertical line */}
                      <div className="absolute left-[34px] top-2 h-full w-0.5 bg-border -translate-x-1/2"></div>
                      
                      {roadmapTasks.map((task, index) => (
                           <div key={index} className="relative flex items-start gap-4 mb-6">
                               <div className="absolute left-[34px] top-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 border-4 border-background"></div>
                               <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                                   {task.icon}
                               </div>
                               <div className="mt-1">
                                   <p className="font-semibold">{task.title}</p>
                                   <p className="text-sm text-muted-foreground">{task.status}</p>
                               </div>
                           </div>
                      ))}
                  </div>
              </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
