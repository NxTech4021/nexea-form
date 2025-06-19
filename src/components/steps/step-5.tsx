'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormNavigation } from '@/components/form-navigation';
import { MatrixAssessment } from '@/components/matrix-assessment';
import { QuestionSidebar } from '@/components/question-sidebar';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { useFormContext } from '@/contexts/form-context';

const formSchema = z.object({
  matrix19: z.record(z.string()),
  matrix20: z.record(z.string()),
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
  matrix31: z.record(z.string()),
  matrix32: z.record(z.string()),
  matrix33: z.record(z.string()),
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
    'matrix19',
    'matrix20',
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
    'matrix31',
    'matrix32',
    'matrix33',
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
    let firstErrorMatrix: null | string = null;
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

  const columns = [
    'Least Accurate',
    'Somewhat Accurate',
    'Quite Accurate',
    'Most Accurate',
  ];

  const matrix19Rows = [
    'Takes me away from important day-to-day work',
    'Is undesirable if it requires too many changes to our policies',
    'Creates opportunities for creative thinking',
    'Creates too much change and conflict/disharmony',
  ];
  const matrix20Rows = [
    'Establishing procedures which ensure efficient use of our resources',
    'Getting the day-to-day work done',
    'Ensuring my organization remains on the cutting edge',
    'Motivating my colleagues in their work',
  ];
  const matrix21Rows = [
    'Finding new ways to accomplish my work',
    'Ensuring that things are done correctly',
    'Getting results',
    'Maintaining a collaborative working environment',
  ];
  const matrix22Rows = [
    'Getting results fast',
    'Minimizing risk',
    'Finding a solution that is acceptable to everyone',
    'Finding new and innovative solutions',
  ];
  const matrix23Rows = [
    'Who is well-liked',
    'They can approach for accurate information',
    'Who can find new solutions',
    'Who can get the job done',
  ];
  const matrix24Rows = [
    'Require cooperation with colleagues',
    'Give me the opportunity to think out side of the box',
    'Are clearly defined and allow me to work systematically and within a structure',
    'Allow me to see the results quickly',
  ];
  const matrix25Rows = [
    'Systematize',
    'Achieve goals',
    'Change and be flexible',
    'Work well with others',
  ];
  const matrix26Rows = [
    'Opportunities to be creative',
    'Stability and job security',
    'Demands on the individual to perform',
    'An environment where teamwork is valued',
  ];
  const matrix27Rows = [
    'Big idea person',
    'Hard worker',
    'Team player',
    'Precise and accurate worker',
  ];
  const matrix28Rows = [
    'Work quickly and in an orderly way',
    'Inspire the commitment of my colleagues',
    'Find new methods of working',
    'Work carefully and systematically',
  ];
  const matrix29Rows = [
    'Meet my performance objectives',
    'Foresee and plan for future developments',
    'Work with others in a collaborative environment',
    'See that the rules and regulations are followed',
  ];
  const matrix30Rows = [
    'Work hard',
    'Foresee future trends and opportunities',
    'Attend to details and minimize mistakes',
    'Get others to view things from a different perspective',
  ];
  const matrix31Rows = [
    'Getting results',
    'Working closely with others',
    'Being in a secure and stable working environment',
    'Risks and excitement',
  ];
  const matrix32Rows = [
    'Developing people',
    'Assuring the day-to-day work is achieved',
    'Developing new products/services/systems',
    'Making sure that rules and systems are clearly defined and adhered to',
  ];
  const matrix33Rows = [
    'Do not have enough information',
    "Am not sure of other people's opinion",
    'Have too much to do',
    'See multiple solutions to the problem',
  ];

  const matrixTitles = [
    {
      id: 'matrix19',
      question: 'My attitude toward development work is that it:',
      shortTitle: 'Development Work',
      title: 'Development Work',
    },
    {
      id: 'matrix20',
      question: 'The most important aspect of my job is:',
      shortTitle: 'Job Importance',
      title: 'Job Importance',
    },
    {
      id: 'matrix21',
      question: 'In my job I am good at:',
      shortTitle: 'Job Abilities',
      title: 'Job Abilities',
    },
    {
      id: 'matrix22',
      question: 'What I consider most important when making a decision is:',
      shortTitle: 'Good Day',
      title: 'Good Day',
    },
    {
      id: 'matrix23',
      question: 'Deep down, I would like my colleagues to see me as someone:',
      shortTitle: 'Colleague Values',
      title: 'Colleague Values',
    },
    {
      id: 'matrix24',
      question: 'The kinds of tasks I like are those that:',
      shortTitle: 'Tasks',
      title: 'Tasks',
    },
    {
      id: 'matrix25',
      question: 'My most important quality in my current job is my ability to:',
      shortTitle: 'Quality',
      title: 'Quality',
    },
    {
      id: 'matrix26',
      question: 'The type of work where I perform well is work which requires:',
      shortTitle: 'Work Performance',
      title: 'Work Performance',
    },
    {
      id: 'matrix27',
      question: 'I want to be thought of as a:',
      shortTitle: 'Thought of as',
      title: 'Thought of as',
    },
    {
      id: 'matrix28',
      question: 'My job requires me to:',
      shortTitle: 'Job Requirements',
      title: 'Job Requirements',
    },
    {
      id: 'matrix29',
      question: 'What pleases me most in my current job is when I am able to:',
      shortTitle: 'Job',
      title: 'Job',
    },
    {
      id: 'matrix30',
      question:
        'Managers in our organization are praised for their ability to:',
      shortTitle: 'Manager',
      title: 'Manager',
    },
    {
      id: 'matrix31',
      question: 'The person taking over from me should be motivated by:',
      shortTitle: 'Motivation',
      title: 'Motivation',
    },
    {
      id: 'matrix32',
      question: 'The most important areas of responsibility in my job are:',
      shortTitle: 'Boss Expectations',
      title: 'Boss Expectations',
    },
    {
      id: 'matrix33',
      question:
        'The primary reason that I wait to make an important decision is that I:',
      shortTitle: 'Culture',
      title: 'Culture',
    },
  ];

  const matrixData: { name: MatrixName; question: string; rows: string[] }[] = [
    {
      name: 'matrix19',
      question: 'My attitude toward development work is that it:',
      rows: matrix19Rows,
    },
    {
      name: 'matrix20',
      question: 'The most important aspect of my job is:',
      rows: matrix20Rows,
    },
    {
      name: 'matrix21',
      question: 'In my job I am good at:',
      rows: matrix21Rows,
    },
    {
      name: 'matrix22',
      question: 'What I consider most important when making a decision is:',
      rows: matrix22Rows,
    },
    {
      name: 'matrix23',
      question: 'Deep down, I would like my colleagues to see me as someone:',
      rows: matrix23Rows,
    },
    {
      name: 'matrix24',
      question: 'The kinds of tasks I like are those that:',
      rows: matrix24Rows,
    },
    {
      name: 'matrix25',
      question: 'My most important quality in my current job is my ability to:',
      rows: matrix25Rows,
    },
    {
      name: 'matrix26',
      question: 'The type of work where I perform well is work which requires:',
      rows: matrix26Rows,
    },
    {
      name: 'matrix27',
      question: 'I want to be thought of as a:',
      rows: matrix27Rows,
    },
    {
      name: 'matrix28',
      question: 'My job requires me to:',
      rows: matrix28Rows,
    },
    {
      name: 'matrix29',
      question: 'What pleases me most in my current job is when I am able to:',
      rows: matrix29Rows,
    },
    {
      name: 'matrix30',
      question:
        'Managers in our organization are praised for their ability to:',
      rows: matrix30Rows,
    },
    {
      name: 'matrix31',
      question: 'The person taking over from me should be motivated by:',
      rows: matrix31Rows,
    },
    {
      name: 'matrix32',
      question: 'The most important areas of responsibility in my job are:',
      rows: matrix32Rows,
    },
    {
      name: 'matrix33',
      question:
        'The primary reason that I wait to make an important decision is that I:',
      rows: matrix33Rows,
    },
  ];

  return (
    <div>
      <QuestionSidebar onTitleClick={scrollToMatrix} titles={matrixTitles} />

      <div className='space-y-4 sm:space-y-6'>
        <Form {...form}>
          <form
            className='space-y-3 sm:space-y-4'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {matrixData.map(({ name, question, rows }) => (
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
