
'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CheckCircle2, CircleDashed } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CounselorUpdateProps {
    title: string;
    description: string;
    completed: boolean;
}

function CounselorTask({ title, description, completed }: CounselorUpdateProps) {
  return (
    <div className="flex items-start gap-4 p-4 border-l-2 border-primary/20 bg-secondary/30 rounded-r-lg">
        {completed ? (
             <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
        ) : (
            <CircleDashed className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
        )}
      
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}


function CounselorTaskGroup({ title, children, isCompleted }: {title: string, children: React.ReactNode, isCompleted?: boolean}) {
    return (
        <div className="p-4 rounded-lg bg-card border">
            <div className="flex justify-between items-center mb-3">
                 <h3 className="font-semibold text-primary">{title}</h3>
                 {isCompleted && <Badge variant="secondary">Completed</Badge>}
            </div>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    )
}

export function ApplicationTrackerTask({ isInstructor }: { isInstructor?: boolean }) {
  return (
    <AccordionItem value="task-1" className="border rounded-lg px-4 bg-card">
      <AccordionTrigger className="font-headline text-lg hover:no-underline">
        <div className="flex items-center gap-4">
            <CheckCircle2 className="h-7 w-7 text-green-500" />
            <div>
                <h2 className="text-left">Task 1: Application Tracker</h2>
                <p className="text-sm font-normal text-muted-foreground">Counselor will provide updates here.</p>
            </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 space-y-6">
        <CounselorTaskGroup title="University Search" isCompleted>
            <CounselorTask title="University Search" description="Research Tasks: Shortlist universities based on your academic profile and career goals." completed={true} />
            <CounselorTask title="Analysis Tasks" description="Review program requirements, acceptance rates, and deadlines." completed={true} />
            <CounselorTask title="Final List Creation" description="Deliver a curated list of universities tailored to your interests." completed={true} />
        </CounselorTaskGroup>

         <CounselorTaskGroup title="Professor List Preparation" isCompleted>
            <CounselorTask title="Search Tasks" description="Identify professors relevant to your research domain and subject area." completed={true}/>
            <CounselorTask title="Detail Compilation" description="Provide contact details, research interests, and recent publications." completed={true}/>
            <CounselorTask title="Email Templates" description="Supply professional email templates for outreach." completed={true}/>
        </CounselorTaskGroup>
        
         <CounselorTaskGroup title="SOP Preparation (Iterative Process)">
            <CounselorTask title="SOP Preparation-1" description="Drafting Assistance: Guide you in creating SOPs, LORs, and LOMs that highlight your strengths." completed={true}/>
            <CounselorTask title="SOP Preparation-2" description="Review Tasks: Provide feedback to refine and improve your drafts." completed={false}/>
             <CounselorTask title="SOP Preparation-3" description="Final Crafting: Deliver polished and impactful documents ready for submission." completed={false}/>
        </CounselorTaskGroup>

        {isInstructor && <Button>Update Status</Button>}

      </AccordionContent>
    </AccordionItem>
  );
}

