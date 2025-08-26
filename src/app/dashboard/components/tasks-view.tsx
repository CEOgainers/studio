'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle2, Circle, Lock, Star, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

type TaskStatus = 'locked' | 'available' | 'in_progress' | 'completed';

interface Task {
  name: string;
  description: string;
  status: TaskStatus;
  xp: number;
}

const initialTasks: Task[] = [
  {
    name: 'Profile Assessment',
    description:
      'Fill out your initial profile and upload required documents.',
    status: 'completed',
    xp: 100,
  },
  {
    name: 'SOP Drafting - Phase 1',
    description: 'Write the first draft of your Statement of Purpose.',
    status: 'completed',
    xp: 100,
  },
  {
    name: 'CV Optimization',
    description: 'Optimize your CV for the universities you are applying to.',
    status: 'in_progress',
    xp: 100,
  },
  {
    name: 'LOR Strategy',
    description: 'Plan and request your Letters of Recommendation.',
    status: 'available',
    xp: 100,
  },
  {
    name: 'University Research',
    description: 'Research and shortlist your target universities.',
    status: 'locked',
    xp: 100,
  },
  {
    name: 'Final Application Submission',
    description:
      'Submit your completed application through the university portals.',
    status: 'locked',
    xp: 200,
  },
];

const getStatusIcon = (status: TaskStatus) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-6 w-6 text-green-500" />;
    case 'in_progress':
      return <Circle className="h-6 w-6 text-primary animate-pulse" />;
    case 'available':
      return <Circle className="h-6 w-6 text-blue-500" />;
    case 'locked':
      return <Lock className="h-6 w-6 text-muted-foreground" />;
    default:
      return null;
  }
};

const getCardClasses = (status: TaskStatus) => {
  let classes = 'transition-all';
  if (status === 'locked') {
    classes += ' bg-muted/50 border-dashed';
  } else if (status === 'in_progress') {
    classes += ' border-primary shadow-lg';
  } else if (status === 'available') {
    classes += ' border-blue-500/50';
  }
  return classes;
};

export default function TasksView({ isInstructor = false }: { isInstructor?: boolean }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleStatusChange = (taskName: string, newStatus: TaskStatus) => {
    if (isInstructor) return; // Instructors can't change status directly for now

    setTasks(currentTasks => {
        const taskIndex = currentTasks.findIndex(t => t.name === taskName);
        if (taskIndex === -1) return currentTasks;

        const newTasks = [...currentTasks];
        newTasks[taskIndex].status = newStatus;
        return newTasks;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium font-headline">
          Scholarship Journey Tasks
        </h1>
        <p className="text-sm text-muted-foreground">
          {isInstructor ? "Review your student's tasks and provide feedback." : "Complete tasks to unlock the next steps and earn XP."}
        </p>
      </div>
      <div className="grid gap-6">
        {tasks.map((task) => (
          <Card key={task.name} className={getCardClasses(task.status)}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="mt-1">{getStatusIcon(task.status)}</div>
                <div>
                  <CardTitle
                    className={`font-headline ${
                      task.status === 'locked' && 'text-muted-foreground'
                    }`}
                  >
                    {task.name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {task.description}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2 text-accent font-bold">
                <Star className="h-5 w-5" />
                <span>{task.xp} XP</span>
              </div>
            </CardHeader>
            <CardContent>
                {task.status === 'in_progress' && !isInstructor && (
                    <div className="bg-primary/5 p-4 rounded-md">
                        <h4 className="font-semibold">Action Required</h4>
                        <p className="text-muted-foreground text-sm mt-1">
                            You are currently working on this task. Submit your work for review when ready.
                        </p>
                        <Button className="mt-3" size="sm">Submit for Review</Button>
                    </div>
                )}
                {task.status === 'available' && !isInstructor && (
                    <div className="bg-blue-500/5 p-4 rounded-md">
                        <h4 className="font-semibold text-blue-600">Ready to Start?</h4>
                        <p className="text-muted-foreground text-sm mt-1">
                           This task is unlocked. Click below to begin your work.
                        </p>
                        <Button className="mt-3" size="sm" variant="outline" onClick={() => handleStatusChange(task.name, 'in_progress')}>Start Task</Button>
                    </div>
                )}
                 {task.status === 'completed' && (
                    <p className="text-sm text-green-600 font-medium">Task completed! Great job.</p>
                )}
            </CardContent>
             {isInstructor && task.status !== 'locked' && (
                  <CardFooter className="flex-col items-start gap-4">
                     <div className="w-full">
                        <h4 className="font-semibold flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Feedback</h4>
                        <Textarea placeholder={`Provide feedback for ${task.name}...`} className="mt-2" />
                     </div>
                    <Button>Save Feedback</Button>
                  </CardFooter>
                )}
          </Card>
        ))}
      </div>
    </div>
  );
}
