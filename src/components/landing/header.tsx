import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <Link href="#" className="flex items-center justify-center" prefetch={false}>
        <GraduationCap className="h-6 w-6 text-primary" />
        <span className="sr-only">Scholar Journey</span>
        <span className="ml-2 text-xl font-headline font-bold">Scholar Journey</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link href="#services" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Services
        </Link>
        <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          How It Works
        </Link>
        <Link href="/dashboard" prefetch={false}>
          <Button>Dashboard</Button>
        </Link>
      </nav>
    </header>
  );
}
