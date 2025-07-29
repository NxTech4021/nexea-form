// src/components/steps/step-15.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormNavigation } from '@/components/form-navigation';
import { QuestionSidebar } from '@/components/question-sidebar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useFormContext } from '@/contexts/form-context';
import { cn } from '@/lib/utils';

// Radio Button Question Component
interface RadioQuestionProps {
  error?: string;
  onChange: (value: string) => void;
  options: string[];
  question: string;
  questionId: string;
  value: string;
}

function RadioQuestion({
  error,
  onChange,
  options,
  question,
  questionId,
  value,
}: RadioQuestionProps) {
  return (
    <div
      className={cn(
        'bg-card border rounded-lg p-4 sm:p-6 shadow-sm transition-colors',
        error && 'border-red-500 border-1'
      )}
    >
      <div className='space-y-3'>
        <h3 className='text-base sm:text-lg font-semibold mb-6'>{question}</h3>
        <RadioGroup
          className='space-y-2 pb-2'
          onValueChange={onChange}
          value={value}
        >
          {options.map((option, index) => (
            <FormItem
              className='flex items-center space-x-3 space-y-0 px-2'
              key={index}
            >
              <FormControl>
                <RadioGroupItem
                  className='cursor-pointer'
                  id={`${questionId}-${index}`}
                  value={option}
                />
              </FormControl>
              <FormLabel
                className='font-normal cursor-pointer'
                htmlFor={`${questionId}-${index}`}
              >
                {option}
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
        {error && (
          <div className='pt-1 flex items-center gap-x-2 text-sm text-red-600'>
            <AlertCircle className='h-4 w-4' />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}

const formSchema = z.object({
  radio85: z.string().optional(),
  radio86: z.string().optional(),
  radio87: z.string().optional(),
  radio88: z.string().optional(),
  radio89: z.string().optional(),
  radio90: z.string().optional(),
  radio91: z.string().optional(),
  radio92: z.string().optional(),
  radio93: z.string().optional(),
  radio94: z.string().optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const radioKeys = Object.keys(formSchema.shape) as (keyof FormSchemaType)[];

const radioOptions = [
  'Strongly Agree',
  'Agree',
  'Neutral',
  'Disagree',
  'Strongly Disagree',
];

const questionTitles = [
  { id: 'radio85', title: 'Work Alone' },
  { id: 'radio86', title: 'Work with Others' },
  { id: 'radio87', title: 'Work with Lots of People' },
  { id: 'radio88', title: 'Team' },
  { id: 'radio89', title: 'Working with Others' },
  { id: 'radio90', title: 'Team Effectiveness' },
  { id: 'radio91', title: 'Deadlines' },
  { id: 'radio92', title: 'Punctuality' },
  { id: 'radio93', title: 'Task Completion' },
  { id: 'radio94', title: 'Things Unfinished' },
];

type Question = {
  id: keyof FormSchemaType;
  question: string;
};

const questionsData: Question[] = [
  { id: 'radio85', question: 'I would rather work by myself than with others' },
  { id: 'radio86', question: 'I prefer to work with others rather than alone' },
  { id: 'radio87', question: 'I prefer to work with lots of people' },
  { id: 'radio88', question: 'Working on a team slows me down' },
  { id: 'radio89', question: 'I enjoy working with others' },
  { id: 'radio90', question: 'Working on a team increases my effectiveness' },
  { id: 'radio91', question: 'I sometimes miss a deadline' },
  { id: 'radio92', question: 'I have never been late for work' },
  { id: 'radio93', question: 'I have never failed to complete a task at work' },
  { id: 'radio94', question: 'I sometimes leave things unfinished' },
];

export const questionsDataStep15 = questionsData.map(q => ({
  id: q.id,
  options: radioOptions,
  step: 15,
  text: q.question,
  type: 'radio' as const,
}));

export function Step15() {
  const { formData, markStepCompleted, setCurrentStep, updateFormData } =
    useFormContext();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const form = useForm<FormSchemaType>({
    defaultValues: radioKeys.reduce((acc, key) => {
      acc[key] = formData.radios?.find((r) => r[key])?.[key] || '';
      return acc;
    }, {} as FormSchemaType),
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
  });

  const validationMessages = {
    radio_incomplete: 'This question requires a response',
  };

  const runValidation = (fieldName: string, value: string, forceTouch = false) => {
    const newErrors: string[] = [];
    const isTouched = touched[fieldName] || forceTouch;

    if (isTouched && !value) {
      newErrors.push(validationMessages.radio_incomplete);
    }

    setErrors((prev) => ({ ...prev, [fieldName]: newErrors }));
    return newErrors;
  };

  const handleRadioChange = (
    fieldName: string,
    onChange: (value: string) => void,
    newValue: string
  ) => {
    onChange(newValue);
    if (!touched[fieldName]) {
      setTouched((prev) => ({ ...prev, [fieldName]: true }));
    }
    runValidation(fieldName, newValue, true);
  };

  const scrollToQuestion = (questionId: string) => {
    const targetElement = document.getElementById(`${questionId}-section`);
    if (targetElement) {
      const elementRect = targetElement.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const targetPosition = Math.max(0, absoluteElementTop - 120);
      window.scrollTo({
        behavior: 'smooth',
        top: targetPosition,
      });
    }
    setCurrentStep(15);
  };

  function onSubmit(values: FormSchemaType) {
    let firstErrorId: null | string = null;
    const newTouchedState: Record<string, boolean> = {};

    questionsData.forEach((q) => {
      newTouchedState[q.id] = true;
      const value = values[q.id] || '';
      const validationErrors = runValidation(q.id, value, true);
      if (validationErrors.length > 0 && !firstErrorId) {
        firstErrorId = q.id;
      }
    });

    setTouched(newTouchedState);

    if (firstErrorId) {
      scrollToQuestion(firstErrorId);
      return;
    }

    updateFormData({
      radios: radioKeys.map((key) => ({ [key]: values[key] as string })),
    });
    markStepCompleted(15);
    setCurrentStep(16);
  }

  return (
    <>
      <QuestionSidebar
        onTitleClick={scrollToQuestion}
        titles={questionTitles}
      />

      <div className='space-y-4 sm:space-y-6'>
        <Form {...form}>
          <form
            className='space-y-3 sm:space-y-4'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {questionsData.map((q) => (
              <div id={`${q.id}-section`} key={q.id}>
                <FormField
                  control={form.control}
                  name={q.id}
                  render={({ field }) => (
                    <FormItem>
                      <RadioQuestion
                        error={errors[q.id]?.[0]}
                        onChange={(newValue) =>
                          handleRadioChange(q.id, field.onChange, newValue)
                        }
                        options={radioOptions}
                        question={q.question}
                        questionId={q.id}
                        value={field.value as string}
                      />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </form>
        </Form>

        {/* Navigation */}
        <FormNavigation onNext={() => form.handleSubmit(onSubmit)()} />
      </div>
    </>
  );
} 