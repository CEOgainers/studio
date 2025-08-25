import Link from 'next/link';
import {
  Bell,
  Home,
  FileCheck2,
  Trophy,
  Star,
  BookUser,
  GraduationCap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserNav } from './components/user-nav';
import { AuthProvider } from '@/lib/auth/auth-provider';
import { auth } from '@/lib/auth/firebase';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This is a server component, so we can check for auth here.
  // The layout is wrapped in an AuthProvider on the client side
  // to provide the auth context to client components.
  const user = await new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });

  if (!user) {
    return redirect('/login');
  }

  return (
    <AuthProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-sidebar md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <GraduationCap className="h-6 w-6 text-sidebar-primary" />
                <span className="font-headline text-sidebar-foreground">Scholar Journey</span>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-sidebar-primary hover:bg-sidebar-accent"
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/originality-checker"
                  className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2 text-sidebar-primary transition-all hover:text-sidebar-primary"
                >
                  <FileCheck2 className="h-4 w-4" />
                  Originality Checker
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-sidebar-primary hover:bg-sidebar-accent"
                >
                  <Star className="h-4 w-4" />
                  Tasks
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-sidebar-primary hover:bg-sidebar-accent"
                >
                  <BookUser className="h-4 w-4" />
                  Documents
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-sidebar-primary hover:bg-sidebar-accent"
                >
                  <Trophy className="h-4 w-4" />
                  Leaderboard
                </Link>
              </nav>
            </div>
            <div className="mt-auto p-4">
              <Card>
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle className="font-headline">Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our support
                    team.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button size="sm" className="w-full">
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
             <div className="w-full flex-1">
               {/* Can be used for search or breadcrumbs */}
             </div>
            <UserNav />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
