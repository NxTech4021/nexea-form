// src/components/steps/step-3.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormNavigation } from '@/components/form-navigation';
import { MatrixAssessment } from '@/components/matrix-assessment';
import { QuestionSidebar } from '@/components/question-sidebar';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { useFormContext } from '@/contexts/form-context';

// Types
interface QuestionDefinition {
  id: string;
  step: number;
  text: string;
  type: 'matrix';
  options: string[];
  rows: string[];
}

// Static definitions
const columns = [
  'Least Accurate',
  'Somewhat Accurate',
  'Quite Accurate',
  'Most Accurate',
];

const matrixTitles = [
  {
    id: 'matrix1',
    question: 'What my colleagues value most about me is my ability to:',
    rows: [
      'Get them to cooperate and collaborate',
      'Get the day-by-day work done',
      'Change things',
      'Work systematically',
    ],
    shortTitle: 'Values',
    title: 'Colleague Values',
  },
  {
    id: 'matrix2',
    question: 'I want to be praised because I:',
    rows: ['Work hard', 'Am accurate', 'Understand others', 'Am creative'],
    shortTitle: 'Praise',
    title: 'Personal Praise',
  },
  {
    id: 'matrix3',
    question: 'Heroes (those we admire) in our organization are those that:',
    rows: [
      'Maintain a high standard of quality in everything they do',
      'Demonstrate a will and ability to put in extra work',
      'Bring good new ideas',
      'Work well with others to bring out the best in them',
    ],
    shortTitle: 'Heroes',
    title: 'Organization Heroes',
  },
  {
    id: 'matrix4',
    question: 'In considering a new job, what is most important to me is:',
    rows: [
      'Opportunities to be creative',
      'Stability and job security',
      'Demands on the individual to perform',
      'An environment where teamwork is valued',
    ],
    shortTitle: 'New Job',
    title: 'New Job',
  },
  {
    id: 'matrix5',
    question: 'What characterizes me in my day-to-day work as a manager is that I am good at:',
    rows: [
      'Completing my tasks',
      'Planning and structuring my work day',
      'Spotting new opportunities',
      'Listening to others',
    ],
    shortTitle: 'Manager',
    title: 'Manager',
  },
  {
    id: 'matrix6',
    question: "Our organization's culture is characterized by:",
    rows: [
      'Systematically following internal procedures',
      'Cooperating and collaborating across departmental units',
      'Getting the day-to-day work done',
      "Thinking of new ways to face tomorrow's challenges",
    ],
    shortTitle: 'Culture',
    title: 'Culture',
  },
  {
    id: 'matrix7',
    question: 'The most important thing for our daily operation is:',
    rows: [
      'Inter-departmental teamwork',
      'Being at the cutting edge of our profession',
      'Having procedures and systems that work',
      'Getting things done',
    ],
    shortTitle: 'Daily Operation',
    title: 'Daily Operation',
  },
  {
    id: 'matrix8',
    question: 'I spend most of my time:',
    rows: [
      'Looking for innovative ways to get things done',
      'Ensuring compliance of decisions made',
      'Getting results from projects/tasks',
      'Ensuring acceptance of decisions/solutions by the parties concerned',
    ],
    shortTitle: 'Time Spent',
    title: 'Time Spent',
  },
  {
    id: 'matrix9',
    question: 'If I had some spare time at work, I would like to:',
    rows: [
      'Clean up or organize my paperwork',
      'Get ahead on the day-to-day work',
      'Develop a new project or explore new opportunities',
      'Develop better relationships with my colleagues, external partners, clients, prospective clients',
    ],
    shortTitle: 'Spare Time',
    title: 'Spare Time',
  },
  {
    id: 'matrix10',
    question: 'My job is characterized by:',
    rows: [
      'Working hard to get things done',
      'Aligning colleagues, dealing with conflicts and fostering a team oriented climate',
      'Ensuring we have the right rules and that they are followed',
      'My job changes too often to be characterized',
    ],
    shortTitle: 'Job Characteristics',
    title: 'Job Characteristics',
  },
];

// Context registration for admin UI
export const questionsDataStep3: QuestionDefinition[] = matrixTitles.map((m) => ({
  id: m.id,
  step: 3,
  text: m.question,
  type: 'matrix',
  options: columns,
  rows: m.rows,
}));

// Zod schema
const formSchema = z.object({
  matrix1: z.record(z.string()),
  matrix2: z.record(z.string()),
  matrix3: z.record(z.string()),
  matrix4: z.record(z.string()),
  matrix5: z.record(z.string()),
  matrix6: z.record(z.string()),
  matrix7: z.record(z.string()),
  matrix8: z.record(z.string()),
  matrix9: z.record(z.string()),
  matrix10: z.record(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

export function Step3() {
  const { formData, markStepCompleted, setCurrentStep, updateFormData } =
    useFormContext();

  const [matrixErrors, setMatrixErrors] = useState<Record<string, string[]>>({});
  const [touchedMatrices, setTouchedMatrices] = useState<Record<string, boolean>>(
    {}
  );

  const form = useForm<FormValues>({
    defaultValues: {
      matrix1: formData.matrixes?.find((m) => m.matrix1)?.matrix1 || {},
      matrix2: formData.matrixes?.find((m) => m.matrix2)?.matrix2 || {},
      matrix3: formData.matrixes?.find((m) => m.matrix3)?.matrix3 || {},
      matrix4: formData.matrixes?.find((m) => m.matrix4)?.matrix4 || {},
      matrix5: formData.matrixes?.find((m) => m.matrix5)?.matrix5 || {},
      matrix6: formData.matrixes?.find((m) => m.matrix6)?.matrix6 || {},
      matrix7: formData.matrixes?.find((m) => m.matrix7)?.matrix7 || {},
      matrix8: formData.matrixes?.find((m) => m.matrix8)?.matrix8 || {},
      matrix9: formData.matrixes?.find((m) => m.matrix9)?.matrix9 || {},
      matrix10: formData.matrixes?.find((m) => m.matrix10)?.matrix10 || {},
    },
    resolver: zodResolver(formSchema),
  });

  // Autofill effect
  useEffect(() => {
    form.reset({
      matrix1: formData.matrixes?.find((m) => m.matrix1)?.matrix1 || {},
      matrix2: formData.matrixes?.find((m) => m.matrix2)?.matrix2 || {},
      matrix3: formData.matrixes?.find((m) => m.matrix3)?.matrix3 || {},
      matrix4: formData.matrixes?.find((m) => m.matrix4)?.matrix4 || {},
      matrix5: formData.matrixes?.find((m) => m.matrix5)?.matrix5 || {},
      matrix6: formData.matrixes?.find((m) => m.matrix6)?.matrix6 || {},
      matrix7: formData.matrixes?.find((m) => m.matrix7)?.matrix7 || {},
      matrix8: formData.matrixes?.find((m) => m.matrix8)?.matrix8 || {},
      matrix9: formData.matrixes?.find((m) => m.matrix9)?.matrix9 || {},
      matrix10: formData.matrixes?.find((m) => m.matrix10)?.matrix10 || {},
    });
  }, [formData, form]);

  const validationMessages = {
    duplicate: "Please don't select more than one response per column",
    incomplete: 'This question requires one response per row',
  };

  const runValidation = (
    matrixName: string,
    matrixValue: Record<string, string>,
    forceTouch = false
  ) => {
    const newErrors: string[] = [];
    const rowCount = 4;
    const isTouched = touchedMatrices[matrixName] || forceTouch;

    if (isTouched && Object.keys(matrixValue).length < rowCount) {
      newErrors.push(validationMessages.incomplete);
    } else {
      const selectedValues = Object.values(matrixValue);
      if (new Set(selectedValues).size < selectedValues.length) {
        newErrors.push(validationMessages.duplicate);
      }
    }

    setMatrixErrors((prev) => ({ ...prev, [matrixName]: newErrors }));
    return newErrors;
  };

  const handleMatrixChange = (
    matrixName: keyof FormValues,
    formOnChange: (value: Record<string, string>) => void,
    newValue: Record<string, string>
  ) => {
    formOnChange(newValue);
    if (!touchedMatrices[matrixName]) {
      setTouchedMatrices((prev) => ({ ...prev, [matrixName]: true }));
    }
    runValidation(matrixName, newValue, true);
  };

  const scrollToMatrix = (matrixId: string) => {
    const targetElement = document.getElementById(`${matrixId}-section`);
    if (targetElement) {
      const elementRect = targetElement.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const targetPosition = Math.max(0, absoluteElementTop - 120);
      window.scrollTo({
        behavior: 'smooth',
        top: targetPosition,
      });
    }
    setCurrentStep(3);
  };

  function onSubmit(values: FormValues) {
    let firstErrorMatrix: keyof FormValues | null = null;
    const newTouchedState: Record<string, boolean> = {};
    const matricesToValidate: Array<keyof FormValues> = [
      'matrix1',
      'matrix2',
      'matrix3',
      'matrix4',
      'matrix5',
      'matrix6',
      'matrix7',
      'matrix8',
      'matrix9',
      'matrix10',
    ];

    matricesToValidate.forEach((matrixName) => {
      newTouchedState[matrixName] = true;
      const errors = runValidation(matrixName, values[matrixName], true);
      if (errors.length > 0 && !firstErrorMatrix) {
        firstErrorMatrix = matrixName;
      }
    });

    setTouchedMatrices(newTouchedState);

    if (firstErrorMatrix) {
      scrollToMatrix(firstErrorMatrix);
      return;
    }

    updateFormData({
      matrixes: [
        { matrix1: values.matrix1 },
        { matrix2: values.matrix2 },
        { matrix3: values.matrix3 },
        { matrix4: values.matrix4 },
        { matrix5: values.matrix5 },
        { matrix6: values.matrix6 },
        { matrix7: values.matrix7 },
        { matrix8: values.matrix8 },
        { matrix9: values.matrix9 },
        { matrix10: values.matrix10 },
      ],
    });
    markStepCompleted(3);
    setCurrentStep(4);
  }

  return (
    <>
      <QuestionSidebar 
        onTitleClick={scrollToMatrix} 
        titles={matrixTitles.map(({ id, title }) => ({ id, title }))} 
      />

      <div className='space-y-4 sm:space-y-6'>
        <Form {...form}>
          <form
            className='space-y-3 sm:space-y-4'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {matrixTitles.map((data) => (
              <div id={`${data.id}-section`} key={data.id}>
                <FormField
                  control={form.control}
                  name={data.id as keyof FormValues}
                  render={({ field }) => (
                    <FormItem>
                      <MatrixAssessment
                        columns={columns}
                        errors={matrixErrors[data.id]}
                        matrixId={data.id}
                        onChange={(newValue) =>
                          handleMatrixChange(data.id as keyof FormValues, field.onChange, newValue)
                        }
                        question={data.question}
                        rows={data.rows}
                        value={field.value as Record<string, string>}
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
          isNextDisabled={!form.formState.isValid}
          onNext={() => form.handleSubmit(onSubmit)()}
        />
      </div>
    </>
  );
}
