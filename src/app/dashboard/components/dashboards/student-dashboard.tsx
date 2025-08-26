
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home, Star, BookUser, MessageSquare, Briefcase } from 'lucide-react';
import TasksView from '../tasks-view';
  
export function StudentDashboard() {
  
    return (
        <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview"><Home className="w-4 h-4 mr-2" /> Overview</TabsTrigger>
                <TabsTrigger value="applications"><Briefcase className="w-4 h-4 mr-2" /> Applications</TabsTrigger>
                <TabsTrigger value="tasks"><Star className="w-4 h-4 mr-2" /> Tasks</TabsTrigger>
                <TabsTrigger value="documents"><BookUser className="w-4 h-4 mr-2" /> Documents</TabsTrigger>
                <TabsTrigger value="meetings"><MessageSquare className="w-4 h-4 mr-2" /> Meetings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
                 <Card>
                    <CardHeader>
                        <CardTitle>Student Overview</CardTitle>
                        <CardDescription>Welcome to your dashboard. Track your progress here.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>A summary of your overall progress, XP, and current application status will be here.</p>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="applications">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>My Applications</CardTitle>
                            <CardDescription>View your applications and their status.</CardDescription>
                        </div>
                        <Link href="/dashboard/upgrade">
                            <Button>New Application</Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Service</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Instructor</TableHead>
                                <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">Full Application Assistance</TableCell>
                                    <TableCell><Badge>In Progress</Badge></TableCell>
                                    <TableCell>Dr. Emily Carter</TableCell>
                                    <TableCell>2024-08-15</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Review Service</TableCell>
                                    <TableCell><Badge variant="secondary">Completed</Badge></TableCell>
                                    <TableCell>Dr. John Doe</TableCell>
                                    <TableCell>2024-05-20</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="tasks">
                <TasksView />
            </TabsContent>

            <TabsContent value="documents">
                <Card>
                    <CardHeader>
                        <CardTitle>My Documents</CardTitle>
                        <CardDescription>Manage your application documents.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Coming Soon: A section to upload, download, and manage your SOP, LOR, and CV will be here.</p>
                    </CardContent>
                </Card>
            </TabsContent>
            
            <TabsContent value="meetings">
                <Card>
                    <CardHeader>
                        <CardTitle>Meetings</CardTitle>
                        <CardDescription>Schedule and view meetings with your instructor.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Coming Soon: A meeting scheduler and a list of upcoming meetings will be here.</p>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
