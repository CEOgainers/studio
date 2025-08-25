import Link from 'next/link';
import { GraduationCap, Twitter, Facebook, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground p-6 md:py-12 w-full">
      <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
        <div className="grid gap-1">
          <h3 className="font-semibold font-headline">Company</h3>
          <Link href="#" prefetch={false}>About Us</Link>
          <Link href="#" prefetch={false}>Our Team</Link>
          <Link href="#" prefetch={false}>Careers</Link>
          <Link href="#" prefetch={false}>Contact Us</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold font-headline">Services</h3>
          <Link href="#services" prefetch={false}>Full Application</Link>
          <Link href="#services" prefetch={false}>Crafting Service</Link>
          <Link href="#services" prefetch={false}>Review Service</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold font-headline">Resources</h3>
          <Link href="#" prefetch={false}>Blog</Link>
          <Link href="#" prefetch={false}>Guides</Link>
          <Link href="#" prefetch={false}>FAQ</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold font-headline">Legal</h3>
          <Link href="#" prefetch={false}>Terms of Service</Link>
          <Link href="#" prefetch={false}>Privacy Policy</Link>
        </div>
        <div className="flex flex-col items-start gap-4">
            <Link href="#" className="flex items-center gap-2" prefetch={false}>
                <GraduationCap className="h-6 w-6" />
                <span className="text-lg font-bold font-headline">Scholar Journey</span>
            </Link>
            <div className="flex gap-4">
                <Link href="#" aria-label="Twitter" prefetch={false}><Twitter className="h-5 w-5 hover:text-accent" /></Link>
                <Link href="#" aria-label="Facebook" prefetch={false}><Facebook className="h-5 w-5 hover:text-accent" /></Link>
                <Link href="#" aria-label="LinkedIn" prefetch={false}><Linkedin className="h-5 w-5 hover:text-accent" /></Link>
            </div>
        </div>
      </div>
       <div className="container max-w-7xl mt-8 text-center text-xs text-primary-foreground/70">
        © {new Date().getFullYear()} Scholar Journey. All rights reserved.
      </div>
    </footer>
  );
}
