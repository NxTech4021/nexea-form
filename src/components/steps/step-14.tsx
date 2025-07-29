// src/components/steps/step-14.tsx
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
  radio75: z.string().optional(),
  radio76: z.string().optional(),
  radio77: z.string().optional(),
  radio78: z.string().optional(),
  radio79: z.string().optional(),
  radio80: z.string().optional(),
  radio81: z.string().optional(),
  radio82: z.string().optional(),
  radio83: z.string().optional(),
  radio84: z.string().optional(),
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
  { id: 'radio75', title: 'Unhappy' },
  { id: 'radio76', title: 'Ignore Rules' },
  { id: 'radio77', title: 'Order and Stability' },
  { id: 'radio78', title: 'Ignore Regulations' },
  { id: 'radio79', title: 'Strictly Enforced Rules' },
  { id: 'radio80', title: 'Nonsense Rules' },
  { id: 'radio81', title: 'Overperform' },
  { id: 'radio82', title: 'Volunteer' },
  { id: 'radio83', title: 'New Responsibilities' },
  { id: 'radio84', title: 'Take Initiative' },
];

type Question = {
  id: keyof FormSchemaType;
  question: string;
};

const questionsData: Question[] = [
  {
    id: 'radio75',
    question: 'No one has ever been unhappy with me in any way',
  },
  {
    id: 'radio76',
    question:
      'I am prepared to ignore the rules and regulations when it is necessary',
  },
  { id: 'radio77', question: 'I like to have order and stability' },
  { id: 'radio78', question: 'I sometimes ignore regulations at work' },
  {
    id: 'radio79',
    question: 'I believe that rules should be strictly enforced',
  },
  {
    id: 'radio80',
    question: 'I sometimes ignore rules that do not make any sense',
  },
  { id: 'radio81', question: 'I do more than what is expected of me' },
  {
    id: 'radio82',
    question: 'I volunteer to do things that are not in my job description',
  },
  { id: 'radio83', question: 'I enjoy taking on new responsibilities' },
  { id: 'radio84', question: 'I often take the initiative' },
];

export const questionsDataStep14 = questionsData.map(q => ({
  id: q.id,
  options: radioOptions,
  step: 14,
  text: q.question,
  type: 'radio' as const,
}));

export function Step14() {
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
    setCurrentStep(14);
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
    markStepCompleted(14);
    setCurrentStep(15);
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