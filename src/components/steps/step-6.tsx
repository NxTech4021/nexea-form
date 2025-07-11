'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormNavigation } from '@/components/form-navigation';
import { MatrixAssessment } from '@/components/matrix-assessment';
import { QuestionSidebar } from '@/components/question-sidebar';
import { Form, FormField, FormItem, FormControl, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormData, useFormContext } from '@/contexts/form-context';
import { AlertCircle } from 'lucide-react';
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

const MATRIX_ROWS = 4;
const validationMessages = {
  matrix_duplicate: "Please don't select more than one response per column",
  matrix_incomplete: `This question requires one response per row.`,
  radio_incomplete: 'This question requires a response',
};

const matrixSchema = z
  .record(z.string())
  .refine((val) => Object.keys(val).length === MATRIX_ROWS, {
    message: validationMessages.matrix_incomplete,
  })
  .refine(
    (val) => {
      const selectedValues = Object.values(val);
      return new Set(selectedValues).size === selectedValues.length;
    },
    {
      message: validationMessages.matrix_duplicate,
    }
  );

const formSchema = z.object({
  matrix31: z.record(z.string()),
  matrix32: z.record(z.string()),
  matrix33: z.record(z.string()),
  matrix34: z.record(z.string()),
  matrix35: z.record(z.string()),
  matrix36: z.record(z.string()),
  radio1: z.string().optional(),
  radio2: z.string().optional(),
  radio3: z.string().optional(),
  radio4: z.string().optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const radioKeys = [
  'radio1',
  'radio2',
  'radio3',
  'radio4',
];

const matrixKeys = ['matrix31', 'matrix32', 'matrix33', 'matrix34', 'matrix35', 'matrix36'];

const radioOptions = [
  'Strongly Agree',
  'Agree',
  'Neutral',
  'Disagree',
  'Strongly Disagree',
];
const columns = [
  'Least Accurate',
  'Somewhat Accurate',
  'Quite Accurate',
  'Most Accurate',
];

const questionTitles = [
  { id: 'matrix31', title: 'Work Performance' },
  { id: 'matrix32', title: 'Manager' },
  { id: 'matrix33', title: 'Thought of as' },
  { id: 'matrix34', title: 'Meetings' },
  { id: 'matrix35', title: 'Colleagues Expectations' },
  { id: 'matrix36', title: 'Change' },
  { id: 'radio1', title: 'Long Term Plans' },
  { id: 'radio2', title: 'Planning Future' },
  { id: 'radio3', title: 'Planned Activities' },
  { id: 'radio4', title: 'Detailed Plans' },
];

type Question = {
  id: keyof FormSchemaType;
  question: string;
  rows?: string[];
  type: 'matrix' | 'radio';
};

const questionsData: Question[] = [
  {
    id: 'matrix31',
    question: 'The type of work where I perform well is work which requires:',
    rows: [
      'Systematic planning',
      'Teamwork',
      'Hard work',
      'Creativity and risk taking',
    ],
    type: 'matrix',
  },
  {
    id: 'matrix32',
    question: 'Managers in our organization are praised for their ability to:',
    rows: [
      'Work hard',
      'Foresee future trends and opportunities',
      'Attend to details and minimize mistakes',
      'Get others to view things from a different perspective',
    ],
    type: 'matrix',
  },
  {
    id: 'matrix33',
    question: 'I want to be thought of as a:',
    rows: [
      'Big idea person',
      'Hard worker',
      'Team player',
      'Precise and accurate worker',
    ],
    type: 'matrix',
  },
  {
    id: 'matrix34',
    question: 'For me, meetings are:',
    rows: [
      'A chance to listen to other points of view and understand the politics',
      'A nuisance as they take time away from more important work',
      'A place to see all of the risks associated with a new endevour',
      'An opportunity to provide the big ideas and new solutions',
    ],
    type: 'matrix',
  },
  {
    id: 'matrix35',
    question: 'My colleagues expect me to:',
    rows: [
      'Work quickly',
      'Dare to try new ideas or ways of doing things',
      'Contribute to the maintenance of high quality',
      'Help sort out conflicts',
    ],
    type: 'matrix',
  },
  {
    id: 'matrix36',
    question: 'Of greatest concern to me when things change is that:',
    rows: [
      'There is acceptance by the people involved',
      "We don't lose sight of the big picture",
      'Things are done right and in the proper sequence',
      'Things get done rapidly',
    ],
    type: 'matrix',
  },
  {
    id: 'radio1',
    question: 'I like to make long term plans',
    type: 'radio',
  },
  {
    id: 'radio2',
    question: 'I like planning for the future',
    type: 'radio',
  },
  {
    id: 'radio3',
    question: 'I like to have all my activities planned well in advance',
    type: 'radio',
  },
  { id: 'radio4', question: 'I like to develop detailed plans for the task at hand', type: 'radio' },
];

export const questionsDataStep6 = questionsData.map(q => ({
  id:      q.id,
  step:    6,
  text:    q.question,
  type:    q.type,
  options: q.rows ? columns : radioOptions,
  rows:    q.rows,
}))

export function Step6() {
  const { formData, markStepCompleted, setCurrentStep, updateFormData } =
    useFormContext();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const form = useForm<FormSchemaType>({
    defaultValues: {
      ...radioKeys.reduce((acc, key) => {
        acc[key as keyof typeof acc] =
          formData.radios?.find((r) => r[key])?.[key] || '';
        return acc;
      }, {} as any),
      ...matrixKeys.reduce((acc, key) => {
        acc[key as keyof typeof acc] =
          formData.matrixes?.find((m) => m[key])?.[key] || {};
        return acc;
      }, {} as any),
    },
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
  });

  const validationMessages = {
    matrix_duplicate: "Please don't select more than one response per column",
    matrix_incomplete: `This question requires one response per row.`,
    radio_incomplete: 'This question requires a response',
  };

  const runValidation = (
    fieldName: string,
    value: any,
    isMatrix: boolean,
    forceTouch = false
  ) => {
    const newErrors: string[] = [];
    const isTouched = touched[fieldName] || forceTouch;

    if (isTouched) {
      if (isMatrix) {
        const rowCount = 4;
        if (Object.keys(value).length < rowCount) {
          newErrors.push(validationMessages.matrix_incomplete);
        } else {
          const selectedValues = Object.values(value);
          if (new Set(selectedValues).size < selectedValues.length) {
            newErrors.push(validationMessages.matrix_duplicate);
          }
        }
      } else {
        // isRadio
        if (!value) {
          newErrors.push(validationMessages.radio_incomplete);
        }
      }
    }

    setErrors((prev) => ({ ...prev, [fieldName]: newErrors }));
    return newErrors;
  };

  const handleMatrixChange = (
    fieldName: string,
    onChange: (value: Record<string, string>) => void,
    newValue: Record<string, string>
  ) => {
    onChange(newValue);
    if (!touched[fieldName]) {
      setTouched((prev) => ({ ...prev, [fieldName]: true }));
    }
    runValidation(fieldName, newValue, true, true);
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
    runValidation(fieldName, newValue, false, true);
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
    setCurrentStep(6);
  };

  function onSubmit(values: FormSchemaType) {
    let firstErrorId: null | string = null;
    const newTouchedState: Record<string, boolean> = {};

    questionsData.forEach((q) => {
      newTouchedState[q.id] = true;
      const value = values[q.id];
      const isMatrix = q.type === 'matrix';
      const validationErrors = runValidation(q.id, value, isMatrix, true);
      if (validationErrors.length > 0 && !firstErrorId) {
        firstErrorId = q.id;
      }
    });

    setTouched(newTouchedState);

    if (firstErrorId) {
      scrollToQuestion(firstErrorId);
      return;
    }

    const radioData = radioKeys.map((key) => ({
      [key]: values[key as keyof FormSchemaType],
    }));
    const matrixData = matrixKeys.map((key) => ({
      [key]: values[key as keyof FormSchemaType],
    }));

    updateFormData({
      matrixes: matrixData as FormData['matrixes'],
      radios: radioData as FormData['radios'],
    });
    markStepCompleted(6);
    setCurrentStep(7);
  }

  return (
    <div>
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
                      {q.type === 'matrix' && q.rows && (
                        <MatrixAssessment
                          columns={columns}
                          errors={errors[q.id] || []}
                          matrixId={q.id}
                          onChange={(newValue) =>
                            handleMatrixChange(q.id, field.onChange, newValue)
                          }
                          question={q.question}
                          rows={q.rows}
                          value={field.value as Record<string, string>}
                        />
                      )}
                      {q.type === 'radio' && (
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
                      )}
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
    </div>
  );
}
