
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import {
  addService,
  deleteService,
  getAllServices,
  Service,
  updateService,
} from '@/lib/services/service-actions';
import { Loader2, PlusCircle, Trash, Edit, Eye, EyeOff, Check } from 'lucide-react';
import { ServiceFormDialog } from './service-form-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

export function ServiceManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const { toast } = useToast();

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const fetchedServices = await getAllServices();
      setServices(fetchedServices);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch services.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSaveService = async (serviceData: Omit<Service, 'id'>, id?: string) => {
    try {
      if (id) {
        await updateService(id, serviceData);
        toast({ title: 'Success', description: 'Service updated successfully.' });
      } else {
        await addService(serviceData);
        toast({ title: 'Success', description: 'Service added successfully.' });
      }
      await fetchServices(); // Refresh list
      return true;
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteService(id);
      toast({ title: 'Success', description: 'Service deleted.' });
      await fetchServices(); // Refresh list
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };
  
  const handleVisibilityToggle = async (service: Service) => {
    try {
      await updateService(service.id, { visible: !service.visible });
      toast({ title: 'Success', description: 'Service visibility updated.' });
      await fetchServices();
    } catch (error: any) {
       toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  }

  const handleAddNew = () => {
    setSelectedService(null);
    setIsFormOpen(true);
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
             <CardTitle>Service Management</CardTitle>
            <CardDescription>
              Add, edit, or remove service packages for the platform.
            </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Service Management</CardTitle>
            <CardDescription>
              Add, edit, or remove service packages for the platform.
            </CardDescription>
          </div>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {services.length === 0 ? (
          <div className="text-center text-muted-foreground py-16 border-2 border-dashed rounded-lg">
            <h3 className="text-lg font-semibold">No services found.</h3>
            <p>Click the button above to add your first service package.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="font-headline">{service.title}</CardTitle>
                     <Badge variant={service.visible ? 'default' : 'secondary'}>
                        {service.visible ? <Eye className="mr-1 h-3 w-3" /> : <EyeOff className="mr-1 h-3 w-3" />}
                        {service.visible ? 'Visible' : 'Hidden'}
                    </Badge>
                </div>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-3xl font-bold font-headline text-primary">
                    {service.price}
                </div>
                 <ul className="mt-4 space-y-2 text-sm">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex-col gap-2 items-stretch">
                <div className="flex items-center space-x-2 p-3 border rounded-md">
                    <Switch
                        id={`visibility-switch-${service.id}`}
                        checked={service.visible}
                        onCheckedChange={() => handleVisibilityToggle(service)}
                    />
                    <Label htmlFor={`visibility-switch-${service.id}`} className="text-sm">
                        Show on landing page
                    </Label>
                </div>
                 <div className="flex items-center gap-2">
                  <Button variant="outline" className="w-full" onClick={() => handleEdit(service)}>
                    <Edit className="h-4 w-4" /> Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        <Trash className="h-4 w-4" /> Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the service.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(service.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        )}
        
      </CardContent>
      {isFormOpen && (
        <ServiceFormDialog
            isOpen={isFormOpen}
            setIsOpen={setIsFormOpen}
            onSave={handleSaveService}
            service={selectedService}
        />
      )}
    </Card>
  );
}
