
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, CreditCard, Home, Users, Gem } from 'lucide-react';
import { ServiceManagement } from '../service-management';

export function AdminDashboard() {
  return (
    <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview"><Home className="w-4 h-4 mr-2" /> Overview</TabsTrigger>
            <TabsTrigger value="payments"><CreditCard className="w-4 h-4 mr-2" /> Payments</TabsTrigger>
            <TabsTrigger value="users"><Users className="w-4 h-4 mr-2" /> Users</TabsTrigger>
            <TabsTrigger value="applications"><Briefcase className="w-4 h-4 mr-2" /> Applications</TabsTrigger>
            <TabsTrigger value="services"><Gem className="w-4 h-4 mr-2" /> Services</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
            <Card>
                <CardHeader>
                    <CardTitle>Admin Overview</CardTitle>
                    <CardDescription>Platform-wide management and statistics.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>High-level statistics and quick actions will be here.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="payments">
             <Card>
                <CardHeader>
                    <CardTitle>Payment Approval</CardTitle>
                    <CardDescription>Review and approve pending payments.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>A table of pending payments with approval buttons will be here.</p>
                </CardContent>
            </Card>
        </TabsContent>
         <TabsContent value="users">
             <Card>
                <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>View, edit, and manage all users.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>A table of all users (students, instructors) will be here.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="applications">
             <Card>
                <CardHeader>
                    <CardTitle>Application Management</CardTitle>
                    <CardDescription>View and manage all student applications.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>A table of all applications will be here.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="services">
             <ServiceManagement />
        </TabsContent>
    </Tabs>
  );
}
