
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Gem, Star, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
  
export function StudentDashboard() {
  
    return (
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <Card>
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="font-headline">Welcome Back!</CardTitle>
                        <Link href="/dashboard/upgrade">
                            <Button size="sm" variant="outline">
                                <Gem className="mr-2 h-4 w-4" /> Upgrade Plan
                            </Button>
                        </Link>
                    </div>
                    <CardDescription>
                        Here's a snapshot of your scholarship journey. Keep up the great work!
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-1">
                            <p className="text-sm font-medium">Overall Progress</p>
                            <p className="text-sm font-medium">75%</p>
                        </div>
                        <Progress value={75} />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                        <Card className="sm:col-span-2">
                            <CardHeader className="pb-2">
                                <CardDescription>Next Task</CardDescription>
                                <CardTitle className="text-xl font-headline flex items-center gap-2">
                                    <Star className="text-yellow-500" />
                                    Submit LOR Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Provide the contact information for your recommenders.
                                </CardDescription>
                            </CardContent>
                            <CardFooter>
                                 <Link href="/dashboard/tasks">
                                    <Button>Go to Task</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>Experience Points</CardDescription>
                                <CardTitle className="text-xl font-bold">1250 XP</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground">
                                    +200 XP from last task
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>Leaderboard Rank</CardDescription>
                                <CardTitle className="text-xl font-bold flex items-center gap-2">
                                    <Trophy className="text-amber-500" /> #12
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                               <div className="text-xs text-muted-foreground">
                                    Top 10% this week
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
