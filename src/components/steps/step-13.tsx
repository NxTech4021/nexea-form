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
  radio103: z.string().optional(),
  radio104: z.string().optional(),
  radio105: z.string().optional(),
  radio106: z.string().optional(),
  radio107: z.string().optional(),
  radio108: z.string().optional(),
  radio109: z.string().optional(),
  radio110: z.string().optional(),
  radio111: z.string().optional(),
  radio112: z.string().optional(),
  radio113: z.string().optional(),
  radio114: z.string().optional(),
  radio115: z.string().optional(),
  radio116: z.string().optional(),
  radio117: z.string().optional(),
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
  { id: 'radio103', title: 'One Task at a Time' },
  { id: 'radio104', title: 'Full of Energy' },
  { id: 'radio105', title: 'One Thing at a Time' },
  { id: 'radio106', title: 'One Task at a Time' },
  { id: 'radio107', title: 'Complete One Task' },
  { id: 'radio108', title: 'Group Success' },
  { id: 'radio109', title: 'Work Best' },
  { id: 'radio110', title: 'Take Charge' },
  { id: 'radio111', title: 'Enjoy Being in Charge' },
  { id: 'radio112', title: 'Decision Making' },
  { id: 'radio113', title: 'Dislike Decision Making' },
  { id: 'radio114', title: 'Sales' },
  { id: 'radio115', title: 'Selling' },
  { id: 'radio116', title: 'Bargaining' },
  { id: 'radio117', title: 'Selling Easy' },
];

type Question = {
  id: keyof FormSchemaType;
  question: string;
};

const questionsData: Question[] = [
  {
    id: 'radio103',
    question:
      'I believe it is best to complete one task before beginning another',
  },
  { id: 'radio104', question: 'People describe me as being full of energy' },
  { id: 'radio105', question: 'I prefer to do one thing at a time' },
  {
    id: 'radio106',
    question: 'When I work by myself I usually work on one task at a time',
  },
  {
    id: 'radio107',
    question:
      'I believe it is best to complete one task before beginning another',
  },
  {
    id: 'radio108',
    question: "I put the group's success before my own success",
  },
  {
    id: 'radio109',
    question:
      'I work best when I can complete one task before beginning another',
  },
  { id: 'radio110', question: 'I take charge in most situations' },
  { id: 'radio111', question: 'I enjoy being in charge' },
  {
    id: 'radio112',
    question: 'I enjoy taking responsibility for making decisions',
  },
  {
    id: 'radio113',
    question: 'I dislike having the responsibility for making decisions',
  },
  { id: 'radio114', question: 'I enjoy making a sale' },
  { id: 'radio115', question: 'I like to get involved in selling' },
  { id: 'radio116', question: 'I have a natural ability for bargaining' },
  { id: 'radio117', question: 'I find selling easy' },
];

export function Step13() {
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
    setCurrentStep(13);
  };

  async function onSubmit(values: FormSchemaType) {
    let firstErrorId: null | string = null;
    const newTouchedState: Record<string, boolean> = {};

    questionsData.forEach((q) => {
      newTouchedState[q.id] = true;
      const value = values[q.id];
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

    try {
      await fetch('/api/sheet/', {
        body: JSON.stringify(formData),
        method: 'POST',
      });
    } catch (error) {
      console.log(error);
    }

    markStepCompleted(13);
    setCurrentStep(14); // defaults to assessment complete
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
        <FormNavigation
          nextLabel='Submit'
          onNext={() => form.handleSubmit(onSubmit)()}
        />
      </div>
    </>
  );
}
