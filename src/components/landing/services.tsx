
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { getVisibleServices } from '@/lib/services/service-actions';
import Link from 'next/link';

export async function Services() {
  const services = await getVisibleServices();

  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
              Our Services
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
              Tailored to Your Success
            </h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the package that best fits your needs. Each service is designed to
              maximize your chances of securing a scholarship.
            </p>
          </div>
        </div>
        
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            {services.map((service) => (
              <Card
                key={service.id}
                className="flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader>
                  <CardTitle className="font-headline">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="text-4xl font-bold font-headline text-primary">
                    {service.price}
                  </div>
                  <ul className="mt-4 space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                    <Link href={`/services/${service.id}`} className="w-full">
                        <Button variant="outline" className="w-full">View Details</Button>
                    </Link>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
