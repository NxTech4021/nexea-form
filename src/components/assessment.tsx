'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

import { Step1 } from '@/components/steps/step-1';
import { Step10 } from '@/components/steps/step-10';
import { Step11 } from '@/components/steps/step-11';
import { Step12 } from '@/components/steps/step-12';
import { Step13 } from '@/components/steps/step-13';
import { Step14 } from '@/components/steps/step-14';
import { Step15 } from '@/components/steps/step-15';
import { Step16 } from '@/components/steps/step-16';
import { Step17 } from '@/components/steps/step-17';
import { Step18 } from '@/components/steps/step-18';
import { Step2 } from '@/components/steps/step-2';
import { Step3 } from '@/components/steps/step-3';
import { Step4 } from '@/components/steps/step-4';
import { Step5 } from '@/components/steps/step-5';
import { Step6 } from '@/components/steps/step-6';
import { Step7 } from '@/components/steps/step-7';
import { Step8 } from '@/components/steps/step-8';
import { Step9 } from '@/components/steps/step-9';
import { Button } from '@/components/ui/button';
import { useFormContext } from '@/contexts/form-context';
import { getAutofillData } from '@/lib/autofill';

export function Assessment() {
  const { currentStep, resetForm, updateFormData } = useFormContext();
  const [isVisible, setIsVisible] = useState(true);
  const [displayStep, setDisplayStep] = useState(currentStep);
  const router = useRouter();

  // Fade out and in the step
  useEffect(() => {
    if (currentStep !== displayStep) {
      setIsVisible(false);

      const timer = setTimeout(() => {
        setDisplayStep(currentStep);
        setIsVisible(true);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [currentStep, displayStep]);

  const handleAutofill = () => {
    const data = getAutofillData();
    updateFormData(data);
    alert('Form has been auto-filled with test data!');
  };

  const renderStep = () => {
    switch (displayStep) {
      case 1:
        return <Step1 />;
      case 10:
        return <Step10 />;
      case 11:
        return <Step11 />;
      case 12:
        return <Step12 />;
      case 13:
        return <Step13 />;
      case 14:
        return <Step14 />;
      case 15:
        return <Step15 />;
      case 16:
        return <Step16 />;
      case 17:
        return <Step17 />;
      case 18:
        return <Step18 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Step5 />;
      case 6:
        return <Step6 />;
      case 7:
        return <Step7 />;
      case 8:
        return <Step8 />;
      case 9:
        return <Step9 />;
      default:
        return (
          <>
            <Confetti numberOfPieces={500} recycle={false} />
            <div className='bg-card border rounded-lg p-4 sm:p-6 shadow-sm'>
              <div className='text-center space-y-4 sm:space-y-6 py-8 sm:py-12'>
                <h2 className='text-xl sm:text-2xl lg:text-3xl font-semibold'>
                  Assessment Complete
                </h2>
                <p className='text-sm sm:text-base text-muted-foreground'>
                  Thank you for completing the assessment!
                </p>
                <Button
                  className='cursor-pointer w-full sm:w-auto px-6 py-2 text-sm sm:text-base'
                  onClick={() => router.push('/')}
                >
                  Done
                </Button>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <div className='max-w-2xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6'>
        <div className='bg-card border rounded-lg p-4 sm:p-6 shadow-sm'>
          <div className='text-left space-y-2 sm:space-y-3'>
            <div className='flex items-center gap-4'>
              <Image
                alt='NEXEA Logo'
                height={40}
                src='/nexealogo.png'
                width={40}
              />
              <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight'>
                Entrepreneurs Behaviour Assessment
              </h1>
            </div>
            {displayStep === 1 && (
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
            )}
          </div>
        </div>

        {/* <div className='fixed bottom-4 right-4 z-50'>
          <Button onClick={handleAutofill} size='sm' variant='outline'>
            Auto-fill Form
          </Button>
        </div> */}

        <div
          className={`transition-opacity duration-300 ease-in-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {renderStep()}
        </div>
      </div>
    </>
  );
}
