
'use client';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CircleDashed, Users } from 'lucide-react';

const professorList = [
    {
        name: 'Dr. Geoffrey Hinton',
        university: 'University of Toronto',
        department: 'Computer Science',
        interests: 'Neural Networks, Deep Learning',
        link: '#'
    },
    {
        name: 'Dr. Fei-Fei Li',
        university: 'Stanford University',
        department: 'Computer Science',
        interests: 'Computer Vision, AI',
        link: '#'
    },
    {
        name: 'Dr. Daniel Cremers',
        university: 'Technical University of Munich',
        department: 'Informatics',
        interests: 'Computer Vision, Machine Learning',
        link: '#'
    }
]

export function ProfessorListTask({ isInstructor }: { isInstructor?: boolean }) {
  return (
    <AccordionItem value="task-6" className="border rounded-lg px-4 bg-card">
      <AccordionTrigger className="font-headline text-lg hover:no-underline">
        <div className="flex items-center gap-4">
          <CircleDashed className="h-7 w-7 text-muted-foreground" />
          <div>
            <h2 className="text-left">Task 6: Your Professor List</h2>
            <p className="text-sm font-normal text-muted-foreground">
              Review professors relevant to your research interests.
            </p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 pt-0">
        <div className="p-6 border rounded-lg bg-background">
           <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users /> Potential Supervisors
              </h3>
              <p className="text-sm text-muted-foreground">
                Your counselor has identified these professors based on your subject domain.
              </p>
            </div>
            {isInstructor && <Button>Edit List</Button>}
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Professor Name</TableHead>
                <TableHead>University</TableHead>
                <TableHead>Research Interests</TableHead>
                <TableHead>Profile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {professorList.map((prof, index) => (
                 <TableRow key={index}>
                    <TableCell className="font-medium">{prof.name}</TableCell>
                    <TableCell>{prof.university}</TableCell>
                    <TableCell className="text-muted-foreground">{prof.interests}</TableCell>
                    <TableCell>
                        <Link href={prof.link} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">View</Button>
                        </Link>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
