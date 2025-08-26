
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export function InstructorDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Users className="h-6 w-6 text-primary" />
          Instructor Dashboard
        </CardTitle>
        <CardDescription>
          Welcome to the Instructor Panel. Here you can manage your students and their progress.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Instructor-specific content will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
