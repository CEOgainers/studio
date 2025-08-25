
'use client';
import Link from 'next/link';
import {
  Home,
  FileCheck2,
  Trophy,
  Star,
  BookUser,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/dashboard/originality-checker', icon: FileCheck2, label: 'Originality Checker' },
    { href: '/dashboard/tasks', icon: Star, label: 'Tasks' },
    { href: '/dashboard/documents', icon: BookUser, label: 'Documents' },
    { href: '/dashboard/leaderboard', icon: Trophy, label: 'Leaderboard' },
]

export default function DashboardNav({ isMobile = false }: { isMobile?: boolean }) {
    const pathname = usePathname();
    
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
        </>
    )
}
