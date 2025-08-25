import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary/20 via-background to-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary">
                Unlock Your Future with a Winning Scholarship
              </h1>
              <p className="max-w-[600px] text-foreground/80 md:text-xl">
                Our gamified platform guides you step-by-step through the scholarship application process, from crafting the perfect SOP to acing your interview.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="lg">Join Now</Button>
              </Link>
            </div>
          </div>
          <Image
            src="https://img-c.static-file.com/R29zZ2xl/1d643881-0f04-42b7-86c0-f8f4a13e6140.png"
            width="600"
            height="400"
            alt="Gainers Future Banner"
            data-ai-hint="education banner"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
