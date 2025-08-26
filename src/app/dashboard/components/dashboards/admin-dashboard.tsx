
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export function AdminDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Settings className="h-6 w-6 text-primary" />
          Admin Dashboard
        </CardTitle>
        <CardDescription>
          Welcome to the Admin Panel. Here you can manage the entire platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Admin-specific content will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
