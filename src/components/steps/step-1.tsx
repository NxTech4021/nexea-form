'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormNavigation } from '@/components/form-navigation';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from '@/contexts/form-context';

const formSchema = z.object({
  company: z.string().min(2, {
    message: 'Please enter your company name.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  fullName: z.string().min(2, {
    message: 'Please enter your full name.',
  }),
  phoneNumber: z
    .string()
    .min(10, {
      message: 'Phone number must be at least 10 digits.',
    })
    .regex(/^\+?\d+$/, {
      message: 'Please enter a valid phone number.',
    }),
});

export function Step1() {
  const { formData, markStepCompleted, setCurrentStep, updateFormData } =
    useFormContext();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      company: formData.company || '',
      email: formData.email || '',
      fullName: formData.fullName || '',
      phoneNumber: formData.phoneNumber || '',
    },
    resolver: zodResolver(formSchema),
  });

  // only for autofill
  useEffect(() => {
    form.reset({
      company: formData.company || '',
      email: formData.email || '',
      fullName: formData.fullName || '',
      phoneNumber: formData.phoneNumber || '',
    });
  }, [formData, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Update the global form context
    updateFormData(values);
    markStepCompleted(1);

    // Move to next step
    setCurrentStep(2);
  }

  return (
    <div>
      {/* <div className='max-w-2xl mx-auto p-4 sm:p-6'> */}
      <div className='space-y-4 sm:space-y-6'>
        {/* Header Section - Separate Box */}
        {/* <div className='bg-card border rounded-lg p-4 sm:p-6 shadow-sm'>
            <div className='text-left space-y-2 sm:space-y-3'>
              <div className='flex items-center gap-4'>
                <Image
                  alt='NEXEA Logo'
                  height={40}
                  src='/nexealogo.png'
                  width={40}
                />
                <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>
                  Entrepreneurs Behaviour Assessment
                </h1>
              </div>
              <div className='space-y-2 text-xs sm:text-sm text-muted-foreground'>
                <p>
                  When answering these questions, think of them in the context
                  of your work environment. Please answer more spontaneously
                  rather than thinking too long on each question.
                </p>
                <p>
                  There is no right or wrong answer in this assessment and there
                  is no score comparison against other candidates.
                </p>
                <p>
                  We use this assessment to understand your working style and if
                  it fits with the rest of the team.
                </p>
                <p className='font-medium text-foreground'>
                  This assessment should roughly take 25 minutes
                </p>
              </div>
            </div>
          </div> */}

        {/* Form Section */}
        <div className='bg-card border rounded-lg p-4 sm:p-6 shadow-sm'>
          <div className='space-y-4 sm:space-y-6'>
            <div className='space-y-1'>
              <h2 className='text-lg sm:text-xl font-semibold'>
                Contact Information
              </h2>
              <p className='text-xs sm:text-sm text-muted-foreground'>
                Please provide your contact details to get started.
              </p>
            </div>

            <Form {...form}>
              <form
                className='space-y-5'
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name='fullName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className='h-10'
                          placeholder='Enter your full name'
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription className="text-xs text-slate-500">
                          Please enter your first and last name.
                        </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>
                  <FormField
                    control={form.control}
                    name='phoneNumber'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm font-medium'>
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            className='h-10'
                            placeholder='+60123456789'
                            type='tel'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className='text-xs text-slate-500'>
                          Include country code if international.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='company'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm font-medium'>
                          Company
                        </FormLabel>
                        <FormControl>
                          <Input
                            className='h-10'
                            placeholder='Enter your company name'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className='text-xs text-slate-500'>
                          Your current organization or company.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          className='h-10'
                          placeholder='Enter your email address'
                          type='email'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className='text-xs text-slate-500'>
                        We&apos;ll use this email to send you the result of the
                        assessment.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>

        {/* <Button
            onClick={async () => {
              try {
                await fetch('/api/sheet/', {
                  body: JSON.stringify({ username: 'Afiq' }),
                  method: 'POST',
                });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            DSAD
          </Button> */}

        {/* Navigation */}
        <FormNavigation
          // onNext={() => form.handleSubmit(onSubmit)()}
          nextLabel='Start Assessment'
          onNext={() => form.handleSubmit(onSubmit)()}
        />
      </div>
      {/* </div> */}
    </div>
  );
}
