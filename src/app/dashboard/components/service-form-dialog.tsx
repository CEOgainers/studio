
'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { Service } from '@/lib/services/service-actions';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface ServiceFormDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSave: (serviceData: Omit<Service, 'id'>, id?: string) => Promise<boolean>;
  service: Service | null;
}

const FormSchema = z.object({
  title: z.string().min(3, 'Title is required.'),
  description: z.string().min(10, 'Description is required.'),
  price: z.string().min(1, 'Price is required.'),
  features: z.string().min(1, 'At least one feature is required.'),
  order: z.number().min(0),
  visible: z.boolean(),
});

type FormValues = z.infer<typeof FormSchema>;

export function ServiceFormDialog({
  isOpen,
  setIsOpen,
  onSave,
  service,
}: ServiceFormDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: service?.title ?? '',
      description: service?.description ?? '',
      price: service?.price ?? '',
      features: service?.features.join(', ') ?? '',
      order: service?.order ?? 0,
      visible: service?.visible ?? true,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    const serviceData = {
      ...data,
      features: data.features.split(',').map((f) => f.trim()),
    };

    const success = await onSave(serviceData, service?.id);

    if (success) {
      setIsOpen(false);
      form.reset();
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">
            {service ? 'Edit Service' : 'Add New Service'}
          </DialogTitle>
          <DialogDescription>
            Fill in the details for the service package.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Full Application Assistance" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the service..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., BDT 25,000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="Feature 1, Feature 2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Order</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="visible"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Visible</FormLabel>
                     <p className="text-sm text-muted-foreground">
                        Show this service on the landing page.
                      </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={handleClose}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Service
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
