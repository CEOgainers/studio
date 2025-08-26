
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
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const assignedStudents = [
    { id: 1, name: 'Aarav Sharma', email: 'aarav.sharma@example.com', service: 'Full Application Assistance', progress: 75, lastUpdate: '2024-08-15' },
    { id: 4, name: 'Rohan Mehta', email: 'rohan.mehta@example.com', service: 'Review Service', progress: 95, lastUpdate: '2024-08-14' },
];


export function InstructorDashboard() {
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>My Students</CardTitle>
                <CardDescription>View and manage your assigned students and their application progress.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student Name</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Progress</TableHead>
                            <TableHead>Last Update</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {assignedStudents.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell className="font-medium">{student.name}</TableCell>
                                <TableCell>{student.service}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Progress value={student.progress} className="w-32" />
                                        <span>{student.progress}%</span>
                                    </div>
                                </TableCell>
                                 <TableCell>{student.lastUpdate}</TableCell>
                                <TableCell>
                                    <Link href={`/dashboard/tasks?studentId=${student.id}`}>
                                        <Button variant="outline" size="sm">View Tasks</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
