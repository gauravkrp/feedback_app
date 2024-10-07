'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  feedback: z.string().min(10, {
    message: 'Feedback must be at least 10 characters.',
  }),
});

export default function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Here you would typically send the feedback to your backend
      // For this example, we'll just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Feedback Submitted',
        description: 'Thank you for your feedback!',
      });
      form.reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was a problem submitting your feedback. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Feedback</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your thoughts anonymously..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your feedback is anonymous and helps us improve our services.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </form>
    </Form>
  );
}