
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, CreditCard, Home, Settings, Users } from 'lucide-react';


export function FounderDashboard() {
  return (
     <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview"><Home className="w-4 h-4 mr-2" /> Overview</TabsTrigger>
            <TabsTrigger value="analytics"><BarChart className="w-4 h-4 mr-2" /> Analytics</TabsTrigger>
            <TabsTrigger value="users"><Users className="w-4 h-4 mr-2" /> Users</TabsTrigger>
            <TabsTrigger value="revenue"><CreditCard className="w-4 h-4 mr-2" /> Revenue</TabsTrigger>
            <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2" /> Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
            <Card>
                <CardHeader>
                    <CardTitle>Founder Overview</CardTitle>
                    <CardDescription>High-level business intelligence and KPIs.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Key metrics like total revenue, user growth, and application success rates will be displayed here.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="analytics">
            <Card>
                <CardHeader>
                    <CardTitle>Analytics Dashboard</CardTitle>
                    <CardDescription>In-depth platform analytics and user behavior.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Detailed charts and graphs for analytics will be here.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="users">
            <Card>
                <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>View and manage staff roles.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>A table of admins and instructors will be here.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="revenue">
            <Card>
                <CardHeader>
                    <CardTitle>Revenue Reports</CardTitle>
                    <CardDescription>Financial reports and revenue tracking.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Detailed financial reports and charts will be here.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="settings">
            <Card>
                <CardHeader>
                    <CardTitle>Platform Settings</CardTitle>
                    <CardDescription>Manage platform-wide settings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Controls for platform settings will be here.</p>
                </CardContent>
            </Card>
        </TabsContent>
    </Tabs>
  );
}
