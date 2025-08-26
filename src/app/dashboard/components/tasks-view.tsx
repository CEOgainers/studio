
'use client';

import { Accordion } from '@/components/ui/accordion';
import { ApplicationTrackerTask } from './tasks/application-tracker-task';
import { SubmitCredentialsTask } from './tasks/submit-credentials-task';
import { ProfileTask } from './tasks/profile-task';
import { CountryPreferenceTask } from './tasks/country-preference-task';
import { SopWrittenTask } from './tasks/sop-written-task';
import { UniversityListTask } from './tasks/university-list-task';
import { ProfessorListTask } from './tasks/professor-list-task';
import { LorDetailsTask } from './tasks/lor-details-task';

export default function TasksView({ isInstructor = false }: { isInstructor?: boolean }) {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold font-headline">
          Full Application Assistance
        </h1>
        <p className="text-sm text-muted-foreground">
          Complete the tasks below to move forward with your application.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full space-y-4">
        <ApplicationTrackerTask isInstructor={isInstructor} />
        <SubmitCredentialsTask isInstructor={isInstructor} />
        <ProfileTask isInstructor={isInstructor} />
        <CountryPreferenceTask isInstructor={isInstructor} />
        <UniversityListTask isInstructor={isInstructor} />
        <ProfessorListTask isInstructor={isInstructor} />
        <SopWrittenTask isInstructor={isInstructor} />
        <LorDetailsTask isInstructor={isInstructor} />
      </Accordion>
    </div>
  );
}
