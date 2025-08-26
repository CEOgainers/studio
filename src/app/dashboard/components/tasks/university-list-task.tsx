
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CircleDashed, List } from 'lucide-react';

const universityList = [
  {
    name: 'University of Toronto',
    program: 'M.Sc. in Computer Science',
    country: 'Canada',
    link: '#',
    notes: 'Strong AI/ML department. High ranking.',
  },
  {
    name: 'ETH Zurich',
    program: 'M.Sc. in Robotics, Systems and Control',
    country: 'Switzerland',
    link: '#',
    notes: 'Excellent for robotics. Highly competitive.',
  },
  {
    name: 'Technical University of Munich',
    program: 'M.Sc. in Data Engineering and Analytics',
    country: 'Germany',
    link: '#',
    notes: 'No tuition fees. Great industry connections.',
  },
   {
    name: 'University of California, Berkeley',
    program: 'Master of Information and Data Science (MIDS)',
    country: 'USA',
    link: '#',
    notes: 'Top-tier program, but high tuition costs.',
  },
];

export function UniversityListTask({ isInstructor }: { isInstructor?: boolean }) {
  return (
    <AccordionItem value="task-5" className="border rounded-lg px-4 bg-card">
      <AccordionTrigger className="font-headline text-lg hover:no-underline">
        <div className="flex items-center gap-4">
          <CircleDashed className="h-7 w-7 text-muted-foreground" />
          <div>
            <h2 className="text-left">Task 5: Your University List</h2>
            <p className="text-sm font-normal text-muted-foreground">
              Review the universities shortlisted by your counselor.
            </p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 pt-0">
        <div className="p-6 border rounded-lg bg-background">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <List /> University Shortlist
              </h3>
              <p className="text-sm text-muted-foreground">
                This list has been curated based on your profile and preferences.
              </p>
            </div>
            {isInstructor && <Button>Edit List</Button>}
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>University Name</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Counselor Notes</TableHead>
                <TableHead>Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {universityList.map((uni, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{uni.name}</TableCell>
                  <TableCell>{uni.program}</TableCell>
                  <TableCell>{uni.country}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {uni.notes}
                  </TableCell>
                  <TableCell>
                    <Link href={uni.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
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
