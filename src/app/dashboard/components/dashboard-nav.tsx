
'use client';
import Link from 'next/link';
import {
  Home,
  FileCheck2,
  Trophy,
  Star,
  BookUser,
  Settings,
  Gem,
  Users,
  Briefcase,
  BarChart,
  CreditCard,
  MessageSquare,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth/auth-provider';

const allNavItems = {
    student: [
        { href: '/dashboard', icon: Home, label: 'Dashboard' },
        { href: '/dashboard/applications', icon: Briefcase, label: 'My Applications' },
        { href: '/dashboard/tasks', icon: Star, label: 'My Tasks' },
        { href: '/dashboard/documents', icon: BookUser, label: 'My Documents' },
        { href: '/dashboard/meetings', icon: MessageSquare, label: 'Meetings' },
        { href: '/dashboard/leaderboard', icon: Trophy, label: 'Leaderboard' },
        { href: '/dashboard/originality-checker', icon: FileCheck2, label: 'Originality Checker' },
        { href: '/dashboard/upgrade', icon: Gem, label: 'Upgrade Plan' },
    ],
    instructor: [
        { href: '/dashboard', icon: Home, label: 'Dashboard' },
        { href: '/dashboard/students', icon: Users, label: 'My Students' },
        { href: '/dashboard/tasks', icon: Star, label: 'Tasks Review' },
        { href: '/dashboard/documents', icon: BookUser, label: 'Student Documents' },
        { href: '/dashboard/meetings', icon: MessageSquare, label: 'Meetings' },
    ],
    admin: [
        { href: '/dashboard', icon: Home, label: 'Overview' },
        { href: '/dashboard/users', icon: Users, label: 'User Management' },
        { href: '/dashboard/applications', icon: Briefcase, label: 'Applications' },
        { href: '/dashboard/payments', icon: CreditCard, label: 'Payments' },
        { href: '/dashboard/services', icon: Gem, label: 'Services' },
    ],
    founder: [
        { href: '/dashboard', icon: Home, label: 'Overview' },
        { href: '/dashboard/analytics', icon: BarChart, label: 'Analytics' },
        { href: '/dashboard/revenue', icon: CreditCard, label: 'Revenue' },
        { href: '/dashboard/users', icon: Users, label: 'Staff Management' },
    ],
};


export default function DashboardNav({ isMobile = false }: { isMobile?: boolean }) {
    const pathname = usePathname();
    const { userRole } = useAuth();

    const navItems = allNavItems[userRole?.toLowerCase() as keyof typeof allNavItems] || allNavItems.student;
    
    return (
        <>
            {navItems.map(({ href, icon: Icon, label }) => {
                const isActive = pathname === href;
                return (
                    <Link
                        key={href}
                        href={href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            isActive && "bg-muted text-primary",
                            isMobile && "text-lg"
                        )}
                    >
                        <Icon className="h-4 w-4" />
                        {label}
                    </Link>
                )
            })}
             <Link
                href="/dashboard/settings"
                className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mt-auto",
                    pathname === "/dashboard/settings" && "bg-muted text-primary",
                    isMobile && "text-lg"
                )}
            >
                <Settings className="h-4 w-4" />
                Settings
            </Link>
        </>
    )
}
