
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Progress } from '@/components/ui/progress';

const pendingPayments = [
  { id: 1, email: 'student1@example.com', service: 'Full Application Assistance', trxId: 'BK123XYZ', method: 'bKash', date: '2024-08-14' },
  { id: 2, email: 'student2@example.com', service: 'Review Service', trxId: 'NG456ABC', method: 'Nagad', date: '2024-08-13' },
];

const users = [
    { id: 1, name: 'Aarav Sharma', email: 'aarav.sharma@example.com', role: 'Student', progress: 75, instructor: 'Dr. Emily Carter' },
    { id: 2, name: 'Diya Patel', email: 'diya.patel@example.com', role: 'Student', progress: 40, instructor: 'Not Assigned' },
    { id: 3, name: 'Dr. Emily Carter', email: 'emily.carter@example.com', role: 'Instructor', progress: 0, instructor: '' },
    { id: 4, name: 'Rohan Mehta', email: 'rohan.mehta@example.com', role: 'Student', progress: 95, instructor: 'Dr. John Doe' },
    { id: 5, name: 'Dr. John Doe', email: 'john.doe@example.com', role: 'Instructor', progress: 0, instructor: '' },
];


export function AdminDashboard() {
  return (
    <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,245</div>
                    <p className="text-xs text-muted-foreground">+120 since last month</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">237</div>
                    <p className="text-xs text-muted-foreground">+32 since last week</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{pendingPayments.length}</div>
                    <p className="text-xs text-muted-foreground">Ready for approval</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Instructors</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">+2 new this month</p>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Recent Pending Payments</CardTitle>
                <CardDescription>Review and approve payments to grant students dashboard access.</CardDescription>
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
    </div>
  );
}
