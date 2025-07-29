'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
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
  radio35: z.string().optional(),
  radio36: z.string().optional(),
  radio37: z.string().optional(),
  radio38: z.string().optional(),
  radio39: z.string().optional(),
  radio40: z.string().optional(),
  radio41: z.string().optional(),
  radio42: z.string().optional(),
  radio43: z.string().optional(),
  radio44: z.string().optional(),
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
  { id: 'radio35', title: 'Annoyance' },
  { id: 'radio36', title: 'Temper' },
  { id: 'radio37', title: 'Things Go Wrong' },
  { id: 'radio38', title: 'Irritation' },
  { id: 'radio39', title: 'Anger Control' },
  { id: 'radio40', title: 'Impatience' },
  { id: 'radio41', title: 'Stressful Situations' },
  { id: 'radio42', title: 'Stressed Easily' },
  { id: 'radio43', title: 'Tense' },
  { id: 'radio44', title: 'Workload' },
];

type Question = {
  id: keyof FormSchemaType;
  question: string;
};

const questionsData: Question[] = [
  { id: 'radio35', question: 'I am easily annoyed' },
  { id: 'radio36', question: 'I hardly ever lose my temper' },
  { id: 'radio37', question: 'I get upset when things go wrong' },
  { id: 'radio38', question: 'I have never become irritated with a coworker' },
  {
    id: 'radio39',
    question: 'I cannot always control my anger in front of others',
  },
  { id: 'radio40', question: 'I am sometimes impatient with people' },
  {
    id: 'radio41',
    question: 'I generally remain calm and composed in stressful situations',
  },
  { id: 'radio42', question: 'I get stressed easily' },
  {
    id: 'radio43',
    question: 'I become tense when too many things happen at once',
  },
  { id: 'radio44', question: 'I enjoy working less when there is lots to do' },
];

export const questionsDataStep10 = questionsData.map(q => ({
  id: q.id,
  options: radioOptions,
  step: 10,
  text: q.question,
  type: 'radio' as const,
}));

export function Step10() {
  const { formData, markStepCompleted, setCurrentStep, updateFormData } =
    useFormContext();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const form = useForm<FormSchemaType>({
    defaultValues: radioKeys.reduce((acc, key) => {
      acc[key] = formData.radios?.find((r) => r[key])?.[key] || '';
      return acc;
    }, {} as FormSchemaType),
    resolver: zodResolver(formSchema),
  });

  const validationMessages = {
    radio_incomplete: 'This question requires a response',
  };

  const runValidation = (fieldName: string, value: any, forceTouch = false) => {
    const newErrors: string[] = [];
    const isTouched = touched[fieldName] || forceTouch;

    if (isTouched) {
      if (!value) {
        newErrors.push(validationMessages.radio_incomplete);
      }
    }

    setErrors((prev) => ({ ...prev, [fieldName]: newErrors }));
    return newErrors;
  };

  const handleRadioChange = (
    fieldName: keyof FormSchemaType,
    formOnChange: (value: string) => void,
    newValue: string
  ) => {
    formOnChange(newValue);
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
    setCurrentStep(10);
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
    markStepCompleted(10);
    setCurrentStep(11);
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
            onSubmit={() => form.handleSubmit(onSubmit)()}
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
