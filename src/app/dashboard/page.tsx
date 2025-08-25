import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, Lock, Star, Trophy } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function DashboardPage() {
  const tasks = [
    { name: 'Profile Assessment', status: 'completed', xp: 100 },
    { name: 'SOP Drafting - Phase 1', status: 'completed', xp: 100 },
    { name: 'CV Optimization', status: 'active', xp: 0 },
    { name: 'LOR Strategy', status: 'locked', xp: 0 },
    { name: 'University Research', status: 'locked', xp: 0 },
  ];

  const leaderboard = [
    { rank: 1, name: 'John Doe', xp: 2250, avatar: 'https://placehold.co/40x40.png' },
    { rank: 2, name: 'Jane Smith', xp: 2100, avatar: 'https://placehold.co/40x40.png' },
    { rank: 3, name: 'You', xp: 200, avatar: 'https://placehold.co/40x40.png' },
    { rank: 4, name: 'Emily Jones', xp: 1800, avatar: 'https://placehold.co/40x40.png' },
  ];

  const totalTasks = 15;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const progress = (completedTasks / totalTasks) * 100;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Level</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Level 2</div>
            <p className="text-xs text-muted-foreground">200/1000 XP to next level</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total XP</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">200 XP</div>
            <p className="text-xs text-muted-foreground">Earned from 2 tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#3</div>
            <p className="text-xs text-muted-foreground">Top 10% of students</p>
          </CardContent>
        </Card>
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-muted-foreground mt-2">
              {completedTasks} of {totalTasks} tasks completed
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Your Scholarship Journey</CardTitle>
            <CardDescription>
              Complete tasks to unlock the next steps and earn XP.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>XP Gained</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.name}>
                    <TableCell className="font-medium flex items-center gap-2">
                      {task.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                      {task.status === 'active' && <Circle className="h-4 w-4 text-accent" />}
                      {task.status === 'locked' && <Lock className="h-4 w-4 text-muted-foreground" />}
                      {task.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant={task.status === 'completed' ? 'secondary' : task.status === 'active' ? 'default' : 'outline'} className="capitalize">
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{task.xp > 0 ? `${task.xp} XP` : '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Leaderboard</CardTitle>
            <CardDescription>See how you rank among other scholars.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
              {leaderboard.map((player) => (
                <div key={player.rank} className={`flex items-center gap-4 p-2 rounded-lg ${player.name === 'You' ? 'bg-primary/10' : ''}`}>
                  <div className="font-bold w-6 text-center">{player.rank}</div>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={player.avatar} alt={player.name} data-ai-hint="person avatar" />
                    <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 font-medium">{player.name}</div>
                  <div className="text-right text-accent font-bold">{player.xp} XP</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
