// src/components/steps/step-4.tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormNavigation } from '@/components/form-navigation';
import { MatrixAssessment } from '@/components/matrix-assessment';
import { QuestionSidebar } from '@/components/question-sidebar';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { useFormContext } from '@/contexts/form-context';
import { QuestionDefinition } from '@/contexts/form-context'

const columns = [
  'Least Accurate',
  'Somewhat Accurate',
  'Quite Accurate',
  'Most Accurate',
];

const matrix11Rows = [
  'Pleasant and easy to work with',
  'Focused and organized',
  'Creative and forward thinking',
  'Good at getting things done',
];
const matrix12Rows = [
  'Be with people I like',
  'Be creative and develop my own ideas',
  'Concentrate on getting results',
  'Structure my work',
];
const matrix13Rows = [
  'Efficient and systematic',
  'A good judge of character and a mediator',
  'Creative and progressive',
  'Motivated by results',
];
const matrix14Rows = [
  'Rules, regulations and standard operating procedures of our business',
  'Nuts and bolts of getting the job done',
  'Future of our industry',
  'Different individuals in our organization and how to get them to work together',
];
const matrix15Rows = [
  'I am able to work without interruption',
  'My new ideas have won acceptance',
  'I have met all my objectives for the day',
  'We start from different viewpoints but in the end come out as an aligned team',
];
const matrix16Rows = [
  'Well liked',
  'In control of situations',
  'Using my creativity',
  'Making progress and getting things done',
];
const matrix17Rows = [
  'Work and get results',
  'Work well with others',
  'Work systematically',
  'Think creatively',
];
const matrix18Rows = [
  'Constantly changing tasks and challenges',
  'Orderly and secure working conditions',
  'Good working and social environment',
  'Clarity of tasks and if I work hard, I am able to succeed',
];
const matrix19Rows = [
  'Developing people',
  'Assuring the day-to-day work is achieved',
  'Developing new products/services/systems',
  'Making sure that rules and systems are clearly defined and adhered to',
];
const matrix20Rows = [
  'Getting results fast',
  'Minimizing risk',
  'Finding a solution that is acceptable to everyone',
  'Finding new and innovative solutions',
];

const matrixTitles = [
  {
    id: 'matrix11' as const,
    question: 'My closest colleagues think I am:',
    rows: matrix11Rows,
    title: 'Colleague Values',
  },
  {
    id: 'matrix12' as const,
    question: 'In a perfect world, my job would permit me to:',
    rows: matrix12Rows,
    title: 'Perfect World',
  },
  {
    id: 'matrix13' as const,
    question:
      'To complement the style of others in the team, the person holding my position should be:',
    rows: matrix13Rows,
    title: 'Complement',
  },
  {
    id: 'matrix14' as const,
    question: 'My boss expects me to know the:',
    rows: matrix14Rows,
    title: 'Boss Expectations',
  },
  {
    id: 'matrix15' as const,
    question: 'A good day for me is when:',
    rows: matrix15Rows,
    title: 'Good Day',
  },
  {
    id: 'matrix16' as const,
    question: 'I need to feel that I am:',
    rows: matrix16Rows,
    title: 'Feeling',
  },
  {
    id: 'matrix17' as const,
    question: 'What I want others to notice about me is my ability to:',
    rows: matrix17Rows,
    title: 'Abilities',
  },
  {
    id: 'matrix18' as const,
    question:
      'The kind of new job I would like to apply for is characterized by:',
    rows: matrix18Rows,
    title: 'Job Characteristics II',
  },
  {
    id: 'matrix19' as const,
    question: 'The most important areas of responsibility in my job are:',
    rows: matrix19Rows,
    title: 'Job Responsibility',
  },
  {
    id: 'matrix20' as const,
    question: 'What I consider most important when making a decision is:',
    rows: matrix20Rows,
    title: 'Decision Making',
  },
] as const;

//
// ——— 2) Export for Admin/FormContext ———
//
export const questionsDataStep4: QuestionDefinition[] = matrixTitles.map(
  (m) => ({
    id: m.id,
    options: columns,
    rows: m.rows,
    step: 4,
    text: m.question,
    type: 'matrix',
  })
);

//
// ——— 3) Zod schema & MatrixName ———
//
const formSchema = z.object(
  matrixTitles.reduce((acc, { id }) => {
    acc[id] = z.record(z.string());
    return acc;
  }, {} as Record<string, any>)
);
type MatrixName = keyof z.infer<typeof formSchema>;

//
// ——— 4) Step4 component ———
//
export function Step4() {
  const { formData, markStepCompleted, setCurrentStep, updateFormData } =
    useFormContext();

  const [matrixErrors, setMatrixErrors] = useState<
    Record<string, string[]>
  >({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // build initial values from context.matrixes
  const defaultValues = matrixTitles.reduce((acc, { id }) => {
    const saved = formData.matrixes?.find((m) => m[id])?.[id] || {};
    acc[id] = saved;
    return acc;
  }, {} as Record<MatrixName, Record<string, string>>);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  // reset if user goes back/edits previous steps
  useEffect(() => {
    form.reset(defaultValues);
  }, [formData, form]);

  const validationMessages = {
    duplicate: "Please don't select more than one response per column",
    incomplete: 'This question requires one response per row',
  };

  function runValidation(
    name: MatrixName,
    val: Record<string, string>,
    force = false
  ) {
    const errs: string[] = [];
    const isTouched = touched[name] || force;

    if (isTouched && Object.keys(val).length < 4) {
      errs.push(validationMessages.incomplete);
    } else {
      const selectedValues = Object.values(val);
      if (new Set(selectedValues).size < selectedValues.length) {
        errs.push(validationMessages.duplicate);
      }
    }

    setMatrixErrors((prev) => ({ ...prev, [name]: errs }));
    return errs;
  }

  function handleMatrixChange(
    name: MatrixName,
    onChange: (v: Record<string, string>) => void,
    newVal: Record<string, string>
  ) {
    onChange(newVal);
    if (!touched[name]) setTouched((p) => ({ ...p, [name]: true }));
    runValidation(name, newVal, true);
  }

  function scrollToMatrix(id: string) {
    const el = document.getElementById(`${id}-section`);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ behavior: 'smooth', top });
    }
    setCurrentStep(4);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    let firstError: MatrixName | null = null;
    const newTouched: Record<string, boolean> = {};

    ;(matrixTitles as readonly { id: MatrixName }[]).forEach(({ id }) => {
      newTouched[id] = true;
      const errs = runValidation(id, values[id], true);
      if (!firstError && errs.length) firstError = id;
    });

    setTouched(newTouched);
    if (firstError) {
      scrollToMatrix(firstError);
      return;
    }

    updateFormData({
      matrixes: matrixTitles.map(({ id }) => ({
        [id]: values[id],
      })),
    });
    markStepCompleted(4);
    setCurrentStep(5);
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
        <FormNavigation
          isNextDisabled={!form.formState.isValid}
          onNext={() => form.handleSubmit(onSubmit)()}
        />
      </div>
    </>
  );
}
