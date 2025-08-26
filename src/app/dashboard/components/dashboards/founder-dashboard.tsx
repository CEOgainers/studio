
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';

export function FounderDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <BarChart className="h-6 w-6 text-primary" />
          Founder Dashboard
        </CardTitle>
        <CardDescription>
          Welcome to the Founder Panel. Here you can view high-level analytics and KPIs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Founder-specific content will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
