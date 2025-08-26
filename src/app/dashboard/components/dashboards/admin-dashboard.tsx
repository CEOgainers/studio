
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, CreditCard, Home, Users, Gem } from 'lucide-react';
import { ServiceManagement } from '../service-management';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const pendingPayments = [
  { id: 1, email: 'student1@example.com', service: 'Full Application Assistance', trxId: 'BK123XYZ', method: 'bKash', date: '2024-08-14' },
  { id: 2, email: 'student2@example.com', service: 'Review Service', trxId: 'NG456ABC', method: 'Nagad', date: '2024-08-13' },
];

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
                    <CardDescription>Review and approve pending payments to grant students dashboard access.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student Email</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pendingPayments.map((payment) => (
                                <TableRow key={payment.id}>
                                    <TableCell>{payment.email}</TableCell>
                                    <TableCell className="font-medium">{payment.service}</TableCell>
                                    <TableCell><Badge variant="outline">{payment.method}</Badge></TableCell>
                                    <TableCell>{payment.trxId}</TableCell>
                                    <TableCell>{payment.date}</TableCell>
                                    <TableCell><Button size="sm">Approve</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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
                    <p>A table of all users (students, instructors) with progress tracking and instructor allocation will be here.</p>
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
