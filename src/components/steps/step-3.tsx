'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormNavigation } from '@/components/form-navigation';
import { QuestionSidebar } from '@/components/question-sidebar';
import Question from '@/components/question/question';
import { Form } from '@/components/ui/form';
import { useFormContext } from '@/contexts/form-context';

const formSchema = z.object({
  matrix1: z.record(z.string()),
  matrix2: z.record(z.string()),
  matrix3: z.record(z.string()),
});

export function Step3() {
  const { formData, markStepCompleted, setCurrentStep, updateFormData } =
    useFormContext();
  const [matrixErrors, setMatrixErrors] = useState<Record<string, string[]>>(
    {}
  );
  const [touchedMatrices, setTouchedMatrices] = useState<
    Record<string, boolean>
  >({});

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      matrix1: formData.matrixes?.find((m) => m.matrix1)?.matrix1 || {},
      matrix2: formData.matrixes?.find((m) => m.matrix2)?.matrix2 || {},
      matrix3: formData.matrixes?.find((m) => m.matrix3)?.matrix3 || {},
    },
    resolver: zodResolver(formSchema),
  });

  // only for autofill
  useEffect(() => {
    form.reset({
      matrix1: formData.matrixes?.find((m) => m.matrix1)?.matrix1 || {},
      matrix2: formData.matrixes?.find((m) => m.matrix2)?.matrix2 || {},
      matrix3: formData.matrixes?.find((m) => m.matrix3)?.matrix3 || {},
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
    matrixName: 'matrix1' | 'matrix2' | 'matrix3',
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    let firstErrorMatrix: null | string = null;
    const newTouchedState: Record<string, boolean> = {};

    const matricesToValidate: ('matrix1' | 'matrix2' | 'matrix3')[] = [
      'matrix1',
      'matrix2',
      'matrix3',
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
      ],
    });
    markStepCompleted(3);
    setCurrentStep(4);
  }

  const columns = [
    'Least Accurate',
    'Somewhat Accurate',
    'Quite Accurate',
    'Most Accurate',
  ];

  // const matrix1Rows = [
  //   'Get them to cooperate and collaborate',
  //   'Get the day-by-day work done',
  //   'Change things',
  //   'Work systematically',
  // ];

  // const matrix2Rows = [
  //   'Work hard',
  //   'Am accurate',
  //   'Understand others',
  //   'Am creative',
  // ];

  // const matrix3Rows = [
  //   'Maintain a high standard of quality in everything they do',
  //   'Demonstrate a will and ability to put in extra work',
  //   'Bring good new ideas',
  //   'Work well with others to bring out the best in them',
  // ];

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
  ];

  return (
    <div>
      <QuestionSidebar onTitleClick={scrollToMatrix} titles={matrixTitles} />

      <div className='space-y-4 sm:space-y-6'>
        {/* Persistent Form Title */}
        {/* <div className='bg-card border rounded-lg p-4 sm:p-6 shadow-sm'>
            <div className='text-left space-y-2 sm:space-y-3'>
              <div className='flex items-center gap-4'>
                <Image
                  alt='NEXEA Logo'
                  height={40}
                  src='/nexealogo.png'
                  width={40}
                />
                <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>
                  Entrepreneurs Behaviour Assessment
                </h1>
              </div>
            </div>
          </div> */}

        <Form {...form}>
          <form
            className='space-y-3 sm:space-y-4'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {matrixTitles.map((data) => (
              <Question
                columns={columns}
                data={data}
                errors={matrixErrors[data.id]}
                form={form}
                handleChange={handleMatrixChange}
                key={data.id}
              />
            ))}

            {/* Matrix 1 - Separate Box */}
            {/* <div id='matrix1-section'>
                <FormField
                  control={form.control}
                  name='matrix1'
                  render={({ field }) => (
                    <FormItem>
                      <MatrixAssessment
                        columns={columns}
                        errors={matrixErrors.matrix1}
                        matrixId='matrix1'
                        onChange={(newValue) =>
                          handleMatrixChange(
                            'matrix1',
                            field.onChange,
                            newValue
                          )
                        }
                        question='What my colleagues value most about me is my ability to:'
                        rows={matrix1Rows}
                        value={field.value}
                      />
                    </FormItem>
                  )}
                />
              </div> */}

            {/* Matrix 2 */}
            {/* <div id='matrix2-section'>
                <FormField
                  control={form.control}
                  name='matrix2'
                  render={({ field }) => (
                    <FormItem>
                      <MatrixAssessment
                        columns={columns}
                        errors={matrixErrors.matrix2}
                        matrixId='matrix2'
                        onChange={(newValue) =>
                          handleMatrixChange(
                            'matrix2',
                            field.onChange,
                            newValue
                          )
                        }
                        question='I want to be praised because I:'
                        rows={matrix2Rows}
                        value={field.value}
                      />
                    </FormItem>
                  )}
                />
              </div> */}

            {/* Matrix 3 */}
            {/* <div id='matrix3-section'>
                <FormField
                  control={form.control}
                  name='matrix3'
                  render={({ field }) => (
                    <FormItem>
                      <MatrixAssessment
                        columns={columns}
                        errors={matrixErrors.matrix3}
                        matrixId='matrix3'
                        onChange={(newValue) =>
                          handleMatrixChange(
                            'matrix3',
                            field.onChange,
                            newValue
                          )
                        }
                        question='Heroes (those we admire) in our organization are those that:'
                        rows={matrix3Rows}
                        value={field.value}
                      />
                    </FormItem>
                  )}
                />
              </div> */}
          </form>
        </Form>

        {/* Navigation */}
        <FormNavigation
          isNextDisabled={!form.formState.isValid}
          onNext={() => form.handleSubmit(onSubmit)()}
        />
      </div>
    </div>
  );
}
