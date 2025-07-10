'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Spinner } from '@/components/ui/spinner';
import { useFormContext } from '@/contexts/form-context';
import { cn } from '@/lib/utils';

interface FormNavigationProps {
  isLastStep?: boolean;
  isLoading?: boolean;
  isNextDisabled?: boolean;
  nextLabel?: string;
  onNext?: () => void;
  onPrevious?: () => void;
  preventScrollToTop?: boolean;
}

export function FormNavigation({
  isLastStep = false,
  isLoading = false,
  isNextDisabled = false,
  nextLabel,
  onNext,
  onPrevious,
  preventScrollToTop = false,
}: FormNavigationProps) {
  const { currentStep, setCurrentStep, totalSteps } = useFormContext();
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
    if (!preventScrollToTop) {
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
    if (!preventScrollToTop) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className='bg-card border rounded-lg p-6 shadow-sm'>
      <div className='sm:flex items-center justify-between gap-6 hidden'>
        {/* Previous Button */}
        {currentStep > 1 && (
          <Button
            className='flex items-center gap-2 h-10 px-4 transition-all duration-200 flex-shrink-0 cursor-pointer'
            disabled={isLoading}
            onClick={handlePrevious}
            type='button'
            variant='outline'
          >
            <ChevronLeft className='h-4 w-4' />
            Previous
          </Button>
        )}

        {/* Progress Bar in the Middle */}
        <div className='flex-1 max-w-md space-y-2'>
          <div
            className={`flex justify-between items-center text-sm flex-wrap`}
          >
            <span className='font-medium text-foreground'>
              Step {currentStep} of {totalSteps}
            </span>
            <span className='text-muted-foreground'>
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className='relative'>
            <Progress className='h-2 bg-muted/50' value={progressPercentage} />
            <div
              className='absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ease-out'
              style={{
                background: 'linear-gradient(to right, #1340FF, #1340FF80)',
                width: `${progressPercentage}%`,
              }}
            />
          </div>
        </div>

        {/* Next Button */}
        <Button
          className={cn(
            'flex items-center gap-2 h-10 px-6 transition-all duration-200 flex-shrink-0 cursor-pointer',
            isLastStep && 'bg-green-600 hover:bg-green-700',
            (isNextDisabled || isLoading) && 'opacity-50 cursor-not-allowed'
          )}
          disabled={isNextDisabled || isLoading}
          onClick={handleNext}
          type='submit'
        >
          {isLoading ? (
            <Spinner size="md" />
          ) : (
            <>
              {nextLabel || (isLastStep ? 'Complete Assessment' : 'Next')}
              {!isLastStep && <ChevronRight className='h-4 w-4' />}
            </>
          )}
        </Button>
      </div>
      <div className='sm:hidden items-center justify-between gap-6 block'>
        <div className='flex flex-col space-y-4'>
          <div className='flex-1 max-w-md space-y-2'>
            <div
              className={`flex justify-between items-center text-sm flex-wrap`}
            >
              <span className='font-medium text-foreground'>
                Step {currentStep} of {totalSteps}
              </span>
              <span className='text-muted-foreground'>
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <div className='relative'>
              <Progress
                className='h-2 bg-muted/50'
                value={progressPercentage}
              />
              <div
                className='absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ease-out'
                style={{
                  background: 'linear-gradient(to right, #1340FF, #1340FF80)',
                  width: `${progressPercentage}%`,
                }}
              />
            </div>
          </div>
          <div className='flex justify-end space-x-1.5'>
            {currentStep > 1 && (
              <Button
                className='flex items-center gap-2 h-10 px-4 transition-all duration-200 flex-shrink-0 cursor-pointer'
                disabled={isLoading}
                onClick={handlePrevious}
                type='button'
                variant='outline'
              >
                <ChevronLeft className='h-4 w-4' />
                Previous
              </Button>
            )}

            {/* Next Button */}
            <Button
              className={cn(
                'flex items-center gap-2 h-10 px-6 transition-all duration-200 flex-shrink-0 cursor-pointer',
                isLastStep && 'bg-green-600 hover:bg-green-700',
                (isNextDisabled || isLoading) && 'opacity-50 cursor-not-allowed'
              )}
              disabled={isNextDisabled || isLoading}
              onClick={handleNext}
              type='submit'
            >
              {isLoading ? (
                <Spinner size="md" />
              ) : (
                <>
                  {nextLabel || (isLastStep ? 'Complete Assessment' : 'Next')}
                  {!isLastStep && <ChevronRight className='h-4 w-4' />}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Previous Button */}
        {/* {currentStep > 1 && (
          <Button
            className='flex items-center gap-2 h-10 px-4 transition-all duration-200 flex-shrink-0 cursor-pointer'
            onClick={handlePrevious}
            type='button'
            variant='outline'
          >
            <ChevronLeft className='h-4 w-4' />
            Previous
          </Button>
        )} */}

        {/* Next Button */}
        {/* <Button
          className={cn(
            'flex items-center gap-2 h-10 px-6 transition-all duration-200 flex-shrink-0 cursor-pointer',
            isLastStep && 'bg-green-600 hover:bg-green-700',
            isNextDisabled && 'opacity-50 cursor-not-allowed'
          )}
          disabled={isNextDisabled}
          onClick={handleNext}
          type='submit'
        >
          {nextLabel || (isLastStep ? 'Complete Assessment' : 'Next')}
          {!isLastStep && <ChevronRight className='h-4 w-4' />}
        </Button> */}
      </div>
    </div>
  );
}
