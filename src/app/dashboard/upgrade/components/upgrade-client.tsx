'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Gem, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PaymentDialog } from './payment-dialog';
import { getServices, Service } from '@/lib/services/service-actions';

export function UpgradeClient() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const fetchedServices = await getServices();
        setServices(fetchedServices);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleEnroll = (service: Service) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="mx-auto grid max-w-5xl items-start gap-6 lg:grid-cols-3 lg:gap-12">
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
                <Button className="w-full" onClick={() => handleEnroll(service)}>
                  <Gem className="mr-2 h-4 w-4" />
                  Choose Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      {selectedService && (
        <PaymentDialog
          service={selectedService}
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
        />
      )}
    </>
  );
}
