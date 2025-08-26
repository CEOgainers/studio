
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Users, Star, BookUser, MessageSquare } from 'lucide-react';
import TasksView from '../tasks-view';

export function InstructorDashboard() {
  return (
    <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview"><Home className="w-4 h-4 mr-2" /> Overview</TabsTrigger>
            <TabsTrigger value="students"><Users className="w-4 h-4 mr-2" /> Students</TabsTrigger>
            <TabsTrigger value="tasks"><Star className="w-4 h-4 mr-2" /> Tasks</TabsTrigger>
            <TabsTrigger value="documents"><BookUser className="w-4 h-4 mr-2" /> Documents</TabsTrigger>
            <TabsTrigger value="meetings"><MessageSquare className="w-4 h-4 mr-2" /> Meetings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
            <Card>
                <CardHeader>
                    <CardTitle>Instructor Overview</CardTitle>
                    <CardDescription>Your assigned students and their progress at a glance.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>A summary of your students and pending tasks will be here.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="students">
             <Card>
                <CardHeader>
                    <CardTitle>My Students</CardTitle>
                    <CardDescription>View and manage your assigned students.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>A list of your students will be displayed here.</p>
                </CardContent>
            </Card>
        </TabsContent>
         <TabsContent value="tasks">
            <TasksView isInstructor={true} />
        </TabsContent>
        <TabsContent value="documents">
             <Card>
                <CardHeader>
                    <CardTitle>Student Documents</CardTitle>
                    <CardDescription>Access and review documents uploaded by your students.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Coming Soon: A document management system will be here.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="meetings">
             <Card>
                <CardHeader>
                    <CardTitle>Meetings</CardTitle>
                    <CardDescription>Schedule and manage meetings with your students.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Coming Soon: A meeting scheduler will be here.</p>
                </CardContent>
            </Card>
        </TabsContent>
    </Tabs>
  );
}
