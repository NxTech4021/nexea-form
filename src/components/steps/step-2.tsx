'use client';

import Image from 'next/image';

import { FormNavigation } from '@/components/form-navigation';
import { useFormContext } from '@/contexts/form-context';

export function Step2() {
  const { setCurrentStep } = useFormContext();

  return (
    <div className='space-y-4 sm:space-y-6'>
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
            </div>
          </div> */}

      <div className='bg-card border rounded-lg p-4 sm:p-6 shadow-sm'>
        <div className='space-y-4'>
          <div className='space-y-1'>
            <h2 className='text-lg font-semibold text-foreground'>
              Important Instructions
            </h2>
          </div>

          <div className='space-y-1.5 rounded-lg border bg-muted/30 p-3.5'>
            <p className='font-medium text-foreground'>
              You must choose one answer for each column.
            </p>
            <p className='text-sm text-muted-foreground'>
              This instruction applies to all questions in the assessment.
            </p>
          </div>

          <div className='flex justify-center'>
            <Image
              alt='Form Example'
              className='rounded-md shadow-sm'
              height={816}
              src='/formexample.png'
              width={1039}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <FormNavigation
        onNext={() => setCurrentStep(3)}
        onPrevious={() => setCurrentStep(1)}
      />
    </div>
  );
}
export const questionsDataStep2: never[] = []