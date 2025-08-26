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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { submitPayment } from '../actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';

export interface Service {
  title: string;
  price: string;
  description: string;
  features: string[];
}

interface PaymentDialogProps {
  service: Service;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const FormSchema = z.object({
  transactionId: z.string().min(5, 'A valid transaction ID is required.'),
  paymentMethod: z.string(),
});

type FormValues = z.infer<typeof FormSchema>;

export function PaymentDialog({
  service,
  isOpen,
  setIsOpen,
}: PaymentDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('bkash');

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      transactionId: '',
      paymentMethod: 'bkash',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      await submitPayment({
        serviceTitle: service.title,
        price: service.price,
        transactionId: data.transactionId,
        paymentMethod: data.paymentMethod,
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Payment submission error:', error);
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description:
          'Could not submit your payment for verification. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    form.setValue('paymentMethod', value);
  }

  const handleClose = () => {
    setIsOpen(false);
    // Reset state after a delay to allow dialog to close
    setTimeout(() => {
        setIsSubmitted(false);
        form.reset();
    }, 300);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        {isSubmitted ? (
            <div className="flex flex-col items-center justify-center text-center p-8">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold font-headline mb-2">Submission Received!</h2>
                <p className="text-muted-foreground mb-6">
                    Thank you! Your payment is now being verified. Our team will review it and activate your service within 24 hours.
                </p>
                <Button onClick={handleClose} className="w-full">
                    Close
                </Button>
            </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-headline">
                Complete Your Payment
              </DialogTitle>
              <DialogDescription>
                You are enrolling in the{' '}
                <span className="font-semibold text-primary">{service.title}</span>{' '}
                plan for {service.price}.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="bkash">bKash</TabsTrigger>
                  <TabsTrigger value="nagad">Nagad</TabsTrigger>
                  <TabsTrigger value="rocket">Rocket</TabsTrigger>
                </TabsList>
                <div className="flex flex-col items-center p-4 border rounded-md mt-4">
                  <p className="text-sm font-medium mb-2">
                    Scan to pay with {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </p>
                  <Image
                    src="https://placehold.co/200x200.png"
                    alt={`${activeTab} QR Code`}
                    width={200}
                    height={200}
                    data-ai-hint="qr code"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Or send money to: 01234567890
                  </p>
                </div>
              </Tabs>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 mt-6"
                >
                  <FormField
                    control={form.control}
                    name="transactionId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transaction ID (TrxID)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the TrxID from your payment"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Submit for Verification
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
