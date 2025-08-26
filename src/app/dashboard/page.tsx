
'use client';

import { useAuth } from '@/lib/auth/auth-provider';
import { StudentDashboard } from './components/dashboards/student-dashboard';
import { InstructorDashboard } from './components/dashboards/instructor-dashboard';
import { AdminDashboard } from './components/dashboards/admin-dashboard';
import { FounderDashboard } from './components/dashboards/founder-dashboard';
import { Skeleton } from '@/components/ui/skeleton';

function DashboardClient() {
  const { userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
        </div>
      </div>
    )
  }

  switch (userRole) {
    case 'Student':
      return <StudentDashboard />;
    case 'Instructor':
      return <InstructorDashboard />;
    case 'Admin':
      return <AdminDashboard />;
    case 'Founder':
      return <FounderDashboard />;
    default:
      // Fallback for when role is not yet available or not recognized
      return <StudentDashboard />;
  }
}

export default function DashboardPage() {
  return <DashboardClient />;
}
