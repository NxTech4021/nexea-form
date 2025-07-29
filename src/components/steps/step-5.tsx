// src/components/steps/step-5.tsx
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
import { QuestionDefinition } from '@/contexts/form-context';

const columns = [
  'Least Accurate',
  'Somewhat Accurate',
  'Quite Accurate',
  'Most Accurate',
];

const matrix21Rows = [
  'Establishing procedures which ensure efficient use of our resources',
  'Getting the day-to-day work done',
  'Ensuring my organization remains on the cutting edge',
  'Motivating my colleagues in their work',
];
const matrix22Rows = [
  'Finding new ways to accomplish my work',
  'Ensuring that things are done correctly',
  'Getting results',
  'Maintaining a collaborative working environment',
];
const matrix23Rows = [
  'Takes me away from important day-to-day work',
  'Is undesirable if it requires too many changes to our policies',
  'Creates opportunities for creative thinking',
  'Creates too much change and conflict/disharmony',
];
const matrix24Rows = [
  'Do not have enough information',
  'Am not sure of other people’s opinion',
  'Have too much to do',
  'See multiple solutions to the problem',
];
const matrix25Rows = [
  'Work quickly and in an orderly way',
  'Inspire the commitment of my colleagues',
  'Find new methods of working',
  'Work carefully and systematically',
];
const matrix26Rows = [
  'Require cooperation with colleagues',
  'Give me the opportunity to think out side of the box',
  'Are clearly defined and allow me to work systematically and within a structure',
  'Allow me to see the results quickly',
];
const matrix27Rows = [
  'Systematize',
  'Achieve goals',
  'Change and be flexible',
  'Work well with others',
];
const matrix28Rows = [
  'Getting results',
  'Working closely with others',
  'Being in a secure and stable working environment',
  'Risks and excitement',
];
const matrix29Rows = [
  'Who is well-liked',
  'They can approach for accurate information',
  'Who can find new solutions',
  'Who can get the job done',
];
const matrix30Rows = [
  'Meet my performance objectives',
  'Foresee and plan for future developments',
  'Work with others in a collaborative environment',
  'See that the rules and regulations are followed',
];

const formSchema = z.object({
  matrix21: z.record(z.string()),
  matrix22: z.record(z.string()),
  matrix23: z.record(z.string()),
  matrix24: z.record(z.string()),
  matrix25: z.record(z.string()),
  matrix26: z.record(z.string()),
  matrix27: z.record(z.string()),
  matrix28: z.record(z.string()),
  matrix29: z.record(z.string()),
  matrix30: z.record(z.string()),
});

type MatrixName = keyof z.infer<typeof formSchema>;

export function Step5() {
  const { formData, markStepCompleted, setCurrentStep, updateFormData } =
    useFormContext();
  const [matrixErrors, setMatrixErrors] = useState<Record<string, string[]>>(
    {}
  );
  const [touchedMatrices, setTouchedMatrices] = useState<
    Record<string, boolean>
  >({});

  const matricesToValidate: MatrixName[] = [
    'matrix21',
    'matrix22',
    'matrix23',
    'matrix24',
    'matrix25',
    'matrix26',
    'matrix27',
    'matrix28',
    'matrix29',
    'matrix30',
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: matricesToValidate.reduce((acc, matrixName) => {
      acc[matrixName] =
        formData.matrixes?.find((m) => m[matrixName])?.[matrixName] || {};
      return acc;
    }, {} as { [key in MatrixName]: Record<string, string> }),
    resolver: zodResolver(formSchema),
  });

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
    matrixName: MatrixName,
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
    setCurrentStep(5);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    let firstErrorMatrix: MatrixName | null = null;
    const newTouchedState: Record<string, boolean> = {};

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
      matrixes: matricesToValidate.map((matrixName) => ({
        [matrixName]: values[matrixName],
      })),
    });
    markStepCompleted(5);
    setCurrentStep(6);
  }

  const matrixTitles = [
    {
      id: 'matrix21',
      question: 'The most important aspect of my job is:',
      rows: matrix21Rows,
      shortTitle: 'Job Importance',
      title: 'Job Importance',
    },
    {
      id: 'matrix22',
      question: 'In my job I am good at:',
      rows: matrix22Rows,
      shortTitle: 'Job Abilities',
      title: 'Job Abilities',
    },
    {
      id: 'matrix23',
      question: 'My attitude toward development work is that it:',
      rows: matrix23Rows,
      shortTitle: 'Development Work',
      title: 'Development Work',
    },
    {
      id: 'matrix24',
      question: 'The primary reason that I wait to make an important decision is that I:',
      rows: matrix24Rows,
      shortTitle: 'Decision Delay',
      title: 'Decision Delay',
    },
    {
      id: 'matrix25',
      question: 'My job requires me to:',
      rows: matrix25Rows,
      shortTitle: 'Job Requirements',
      title: 'Job Requirements',
    },
    {
      id: 'matrix26',
      question: 'The kinds of tasks I like are those that:',
      rows: matrix26Rows,
      shortTitle: 'Tasks',
      title: 'Tasks',
    },
    {
      id: 'matrix27',
      question: 'My most important quality in my current job is my ability to:',
      rows: matrix27Rows,
      shortTitle: 'Quality',
      title: 'Quality',
    },
    {
      id: 'matrix28',
      question: 'The person taking over from me should be motivated by:',
      rows: matrix28Rows,
      shortTitle: 'Motivation',
      title: 'Motivation',
    },
    {
      id: 'matrix29',
      question: 'Deep down, I would like my colleagues to see me as someone:',
      rows: matrix29Rows,
      shortTitle: 'Colleague Values',
      title: 'Colleague Values',
    },
    {
      id: 'matrix30',
      question: 'What pleases me most in my current job is when I am able to:',
      rows: matrix30Rows,
      shortTitle: 'Job Pleasure',
      title: 'Job Pleasure',
    },
  ] as const;

  return (
    <div>
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
            {matrixTitles.map(({ id: name, question, rows }) => (
              <div id={`${name}-section`} key={name}>
                <FormField
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <MatrixAssessment
                        columns={columns}
                        errors={matrixErrors[name]}
                        matrixId={name}
                        onChange={(newValue) =>
                          handleMatrixChange(name, field.onChange, newValue)
                        }
                        question={question}
                        rows={rows}
                        value={field.value}
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
    </div>
  );
}

// ** NEW: export question definitions for admin UI **
export const questionsDataStep5: QuestionDefinition[] = [
  {
    id: 'matrix21',
    options: ['Least Accurate','Somewhat Accurate','Quite Accurate','Most Accurate'],
    rows: [
      'Establishing procedures which ensure efficient use of our resources',
      'Getting the day-to-day work done',
      'Ensuring my organization remains on the cutting edge',
      'Motivating my colleagues in their work',
    ],
    step: 5,
    text: 'The most important aspect of my job is:',
    type: 'matrix',
  },
  {
    id: 'matrix22',
    options: ['Least Accurate','Somewhat Accurate','Quite Accurate','Most Accurate'],
    rows: [
      'Finding new ways to accomplish my work',
      'Ensuring that things are done correctly',
      'Getting results',
      'Maintaining a collaborative working environment',
    ],
    step: 5,
    text: 'In my job I am good at:',
    type: 'matrix',
  },
  {
    id: 'matrix23',
    options: ['Least Accurate','Somewhat Accurate','Quite Accurate','Most Accurate'],
    rows: [
      'Takes me away from important day-to-day work',
      'Is undesirable if it requires too many changes to our policies',
      'Creates opportunities for creative thinking',
      'Creates too much change and conflict/disharmony',
    ],
    step: 5,
    text: 'My attitude toward development work is that it:',
    type: 'matrix',
  },
  {
    id: 'matrix24',
    options: ['Least Accurate','Somewhat Accurate','Quite Accurate','Most Accurate'],
    rows: [
      'Do not have enough information',
      'Am not sure of other people’s opinion',
      'Have too much to do',
      'See multiple solutions to the problem',
    ],
    step: 5,
    text: 'The primary reason that I wait to make an important decision is that I:',
    type: 'matrix',
  },
  {
    id: 'matrix25',
    options: ['Least Accurate','Somewhat Accurate','Quite Accurate','Most Accurate'],
    rows: [
      'Work quickly and in an orderly way',
      'Inspire the commitment of my colleagues',
      'Find new methods of working',
      'Work carefully and systematically',
    ],
    step: 5,
    text: 'My job requires me to:',
    type: 'matrix',
  },
  {
    id: 'matrix26',
    options: ['Least Accurate','Somewhat Accurate','Quite Accurate','Most Accurate'],
    rows: [
      'Require cooperation with colleagues',
      'Give me the opportunity to think out side of the box',
      'Are clearly defined and allow me to work systematically and within a structure',
      'Allow me to see the results quickly',
    ],
    step: 5,
    text: 'The kinds of tasks I like are those that:',
    type: 'matrix',
  },
  {
    id: 'matrix27',
    options: ['Least Accurate','Somewhat Accurate','Quite Accurate','Most Accurate'],
    rows: [
      'Systematize',
      'Achieve goals',
      'Change and be flexible',
      'Work well with others',
    ],
    step: 5,
    text: 'My most important quality in my current job is my ability to:',
    type: 'matrix',
  },
  {
    id: 'matrix28',
    options: ['Least Accurate','Somewhat Accurate','Quite Accurate','Most Accurate'],
    rows: [
      'Getting results',
      'Working closely with others',
      'Being in a secure and stable working environment',
      'Risks and excitement',
    ],
    step: 5,
    text: 'The person taking over from me should be motivated by:',
    type: 'matrix',
  },
  {
    id: 'matrix29',
    options: ['Least Accurate','Somewhat Accurate','Quite Accurate','Most Accurate'],
    rows: [
      'Who is well-liked',
      'They can approach for accurate information',
      'Who can find new solutions',
      'Who can get the job done',
    ],
    step: 5,
    text: 'Deep down, I would like my colleagues to see me as someone:',
    type: 'matrix',
  },
  {
    id: 'matrix30',
    options: ['Least Accurate','Somewhat Accurate','Quite Accurate','Most Accurate'],
    rows: [
      'Meet my performance objectives',
      'Foresee and plan for future developments',
      'Work with others in a collaborative environment',
      'See that the rules and regulations are followed',
    ],
    step: 5,
    text: 'What pleases me most in my current job is when I am able to:',
    type: 'matrix',
  },
];
