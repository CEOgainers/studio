import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  CheckCircle2,
  Circle,
  Lock,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TasksPage() {
  const tasks = [
    { name: 'Profile Assessment', description: 'Fill out your initial profile and upload required documents.', status: 'completed', xp: 100 },
    { name: 'SOP Drafting - Phase 1', description: 'Write the first draft of your Statement of Purpose.', status: 'completed', xp: 100 },
    { name: 'CV Optimization', description: 'Optimize your CV for the universities you are applying to.', status: 'active', xp: 100 },
    { name: 'LOR Strategy', description: 'Plan and request your Letters of Recommendation.', status: 'locked', xp: 100 },
    { name: 'University Research', description: 'Research and shortlist your target universities.', status: 'locked', xp: 100 },
    { name: 'Final Application Submission', description: 'Submit your completed application through the university portals.', status: 'locked', xp: 200 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case 'active':
        return <Circle className="h-6 w-6 text-primary animate-pulse" />;
      case 'locked':
        return <Lock className="h-6 w-6 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getCardClasses = (status: string) => {
    let classes = "transition-all";
    if (status === 'locked') {
        classes += " bg-muted/50 border-dashed";
    } else if(status === 'active') {
        classes += " border-primary shadow-lg"
    }
    return classes;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium font-headline">Your Scholarship Journey Tasks</h1>
        <p className="text-sm text-muted-foreground">
          Complete tasks to unlock the next steps and earn XP.
        </p>
      </div>
      <div className="grid gap-6">
        {tasks.map((task) => (
          <Card key={task.name} className={getCardClasses(task.status)}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex items-start gap-4">
                 <div className="mt-1">
                    {getStatusIcon(task.status)}
                 </div>
                 <div>
                    <CardTitle className={`font-headline ${task.status === 'locked' && 'text-muted-foreground'}`}>
                        {task.name}
                    </CardTitle>
                    <CardDescription className="mt-1">{task.description}</CardDescription>
                 </div>
              </div>
              <div className="flex items-center gap-2 text-accent font-bold">
                <Star className="h-5 w-5" />
                <span>{task.xp} XP</span>
              </div>
            </CardHeader>
            {task.status === 'active' && (
              <CardContent>
                <div className="bg-primary/5 p-4 rounded-md">
                    <h4 className="font-semibold">Action Required</h4>
                    <p className="text-muted-foreground text-sm mt-1">
                        You need to complete this task to proceed. Click the button to view details and submit your work.
                    </p>
                    <Button className="mt-3" size="sm">View Task</Button>
                </div>
              </CardContent>
            )}
             {task.status === 'completed' && (
              <CardContent>
                <p className="text-sm text-green-600 font-medium">Task completed! Great job.</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
