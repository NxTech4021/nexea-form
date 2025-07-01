// src/components/steps/step-4.tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormNavigation } from '@/components/form-navigation';
import { MatrixAssessment } from '@/components/matrix-assessment';
import { QuestionSidebar } from '@/components/question-sidebar';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { useFormContext } from '@/contexts/form-context';
import { QuestionDefinition } from '@/contexts/form-context'


const formSchema = z.object({
  matrix10: z.record(z.string()),
  matrix11: z.record(z.string()),
  matrix12: z.record(z.string()),
  matrix13: z.record(z.string()),
  matrix14: z.record(z.string()),
  matrix15: z.record(z.string()),
  matrix16: z.record(z.string()),
  matrix17: z.record(z.string()),
  matrix18: z.record(z.string()),
  matrix4: z.record(z.string()),
  matrix5: z.record(z.string()),
  matrix6: z.record(z.string()),
  matrix7: z.record(z.string()),
  matrix8: z.record(z.string()),
  matrix9: z.record(z.string()),
});

type MatrixName = keyof z.infer<typeof formSchema>;

export function Step4() {
  const { formData, markStepCompleted, setCurrentStep, updateFormData } =
    useFormContext();
  const [matrixErrors, setMatrixErrors] = useState<Record<string, string[]>>(
    {}
  );
  const [touchedMatrices, setTouchedMatrices] = useState<
    Record<string, boolean>
  >({});

  const matricesToValidate: MatrixName[] = [
    'matrix4',
    'matrix5',
    'matrix6',
    'matrix7',
    'matrix8',
    'matrix9',
    'matrix10',
    'matrix11',
    'matrix12',
    'matrix13',
    'matrix14',
    'matrix15',
    'matrix16',
    'matrix17',
    'matrix18',
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: matricesToValidate.reduce(
      (acc, matrixName) => {
        acc[matrixName] =
          formData.matrixes?.find((m) => m[matrixName])?.[matrixName] || {};
        return acc;
      },
      {} as { [key in MatrixName]: Record<string, string> }
    ),

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
    setCurrentStep(4);
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
    markStepCompleted(4);
    setCurrentStep(5);
  }

  const columns = [
    'Least Accurate',
    'Somewhat Accurate',
    'Quite Accurate',
    'Most Accurate',
  ];

const matrix4Rows = [
  'Opportunities to be creative',
  'Stability and job security',
  'Demands on the individual to perform',
  'An environment where teamwork is valued',
]
const matrix5Rows = [
  'Completing my tasks',
  'Planning and structuring my work day',
  'Spotting new opportunities',
  'Listening to others',
]
const matrix6Rows = [
  'Systematically following internal procedures',
  'Cooperating and collaborating across departmental units',
  'Getting the day-to-day work done',
  "Thinking of new ways to face tomorrow's challenges",
]
const matrix7Rows = [
  'Inter-departmental teamwork',
  'Being at the cutting edge of our profession',
  'Having procedures and systems that work',
  'Getting things done',
]
const matrix8Rows = [
  'Looking for innovative ways to get things done',
  'Ensuring compliance of decisions made',
  'Getting results from projects/tasks',
  'Ensuring acceptance of decisions/solutions by the parties concerned',
]
const matrix9Rows = [
  'Clean up or organize my paperwork',
  'Get ahead on the day-to-day work',
  'Develop a new project or explore new opportunities',
  'Develop better relationships with colleagues and partners',
]
const matrix10Rows = [
  'Working hard to get things done',
  'Aligning colleagues, dealing with conflicts and fostering teamwork',
  'Ensuring we have the right rules and that they are followed',
  'My job changes too often to be characterized',
]
const matrix11Rows = [
  'Pleasant and easy to work with',
  'Focused and organized',
  'Creative and forward thinking',
  'Good at getting things done',
]
const matrix12Rows = [
  'Be with people I like',
  'Be creative and develop my own ideas',
  'Concentrate on getting results',
  'Structure my work',
]
const matrix13Rows = [
  'Efficient and systematic',
  'A good judge of character and a mediator',
  'Creative and progressive',
  'Motivated by results',
]
const matrix14Rows = [
  'Rules, regulations and SOPs of our business',
  'Nuts and bolts of getting the job done',
  'Future of our industry',
  'Different individuals in our organization and how to get them to work together',
]
const matrix15Rows = [
  'I am able to work without interruption',
  'My new ideas have won acceptance',
  'I have met all my objectives for the day',
  'We start from different viewpoints but in the end come out aligned',
]
const matrix16Rows = [
  'Well liked',
  'In control of situations',
  'Using my creativity',
  'Making progress and getting things done',
]
const matrix17Rows = [
  'Work and get results',
  'Work well with others',
  'Work systematically',
  'Think creatively',
]
const matrix18Rows = [
  'Constantly changing tasks and challenges',
  'Orderly and secure working conditions',
  'Good working and social environment',
  'Clarity of tasks and success when I work hard',
]

const matrixTitles = [
  {
    id: 'matrix4' as const,
    question: 'In considering a new job, what is most important to me is:',
    title: 'New Job',
    rows: matrix4Rows,
  },
  {
    id: 'matrix5' as const,
    question: 'What characterizes me in my day-to-day work as a manager is that I am good at:',
    title: 'Manager',
    rows: matrix5Rows,
  },
  {
    id: 'matrix6' as const,
    question: "Our organization's culture is characterized by:",
    title: 'Culture',
    rows: matrix6Rows,
  },
  {
    id: 'matrix7' as const,
    question: 'The most important thing for our daily operation is:',
    title: 'Daily Operation',
    rows: matrix7Rows,
  },
  {
    id: 'matrix8' as const,
    question: 'I spend most of my time:',
    title: 'Time Spent',
    rows: matrix8Rows,
  },
  {
    id: 'matrix9' as const,
    question: 'If I had some spare time at work, I would like to:',
    title: 'Spare Time',
    rows: matrix9Rows,
  },
  {
    id: 'matrix10' as const,
    question: 'My job is characterized by:',
    title: 'Job Characteristics',
    rows: matrix10Rows,
  },
  {
    id: 'matrix11' as const,
    question: 'My closest colleagues think I am:',
    title: 'Colleague Values',
    rows: matrix11Rows,
  },
  {
    id: 'matrix12' as const,
    question: 'In a perfect world, my job would permit me to:',
    title: 'Perfect World',
    rows: matrix12Rows,
  },
  {
    id: 'matrix13' as const,
    question:
      'To complement the style of others in the team, the person holding my position should be:',
    title: 'Complement',
    rows: matrix13Rows,
  },
  {
    id: 'matrix14' as const,
    question: 'My boss expects me to know the:',
    title: 'Boss Expectations',
    rows: matrix14Rows,
  },
  {
    id: 'matrix15' as const,
    question: 'A good day for me is when:',
    title: 'Good Day',
    rows: matrix15Rows,
  },
  {
    id: 'matrix16' as const,
    question: 'I need to feel that I am:',
    title: 'Feeling',
    rows: matrix16Rows,
  },
  {
    id: 'matrix17' as const,
    question: 'What I want others to notice about me is my ability to:',
    title: 'Abilities',
    rows: matrix17Rows,
  },
  {
    id: 'matrix18' as const,
    question:
      'The kind of new job I would like to apply for is characterized by:',
    title: 'Job Characteristics II',
    rows: matrix18Rows,
  },
] as const

//
// ——— 2) Export for Admin/FormContext ———
//
export const questionsDataStep4: QuestionDefinition[] = matrixTitles.map(
  (m) => ({
    id: m.id,
    step: 4,
    text: m.question,
    type: 'matrix',
    options: columns,
    rows: m.rows,
  })
)

//
// ——— 3) Zod schema & MatrixName ———
//
const formSchema = z.object(
  matrixTitles.reduce((acc, { id }) => {
    acc[id] = z.record(z.string())
    return acc
  }, {} as Record<string, any>)
)
type MatrixName = keyof z.infer<typeof formSchema>

//
// ——— 4) Step4 component ———
//
export function Step4() {
  const { formData, updateFormData, markStepCompleted, setCurrentStep } =
    useFormContext()

  const [matrixErrors, setMatrixErrors] = useState<
    Record<string, string[]>
  >({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // build initial values from context.matrixes
  const defaultValues = matrixTitles.reduce((acc, { id }) => {
    const saved = formData.matrixes?.find((m) => m[id])?.[id] || {}
    acc[id] = saved
    return acc
  }, {} as Record<MatrixName, Record<string, string>>)

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues,
    resolver: zodResolver(formSchema),
  })

  // reset if user goes back/edits previous steps
  useEffect(() => {
    form.reset(defaultValues)
  }, [formData, form])

  const validationMessages = {
    duplicate: "Please don't select more than one response per column",
    incomplete: 'This question requires one response per row',
  }

  function runValidation(
    name: MatrixName,
    val: Record<string, string>,
    force = false
  ) {
    const errs: string[] = []
    const isTouched = touched[name] || force

    if (isTouched && Object.keys(val).length < columns.length) {
      errs.push(validationMessages.incomplete)
    } else if (
      new Set(Object.values(val)).size < Object.values(val).length
    ) {
      errs.push(validationMessages.duplicate)
    }

    setMatrixErrors((prev) => ({ ...prev, [name]: errs }))
    return errs
  }

  function handleMatrixChange(
    name: MatrixName,
    onChange: (v: Record<string, string>) => void,
    newVal: Record<string, string>
  ) {
    onChange(newVal)
    if (!touched[name]) setTouched((p) => ({ ...p, [name]: true }))
    runValidation(name, newVal, true)
  }

  function scrollToMatrix(id: string) {
    const el = document.getElementById(`${id}-section`)
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 120
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setCurrentStep(4)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    let firstError: MatrixName | null = null
    const newTouched: Record<string, boolean> = {}

    ;(matrixTitles as readonly { id: MatrixName }[]).forEach(({ id }) => {
      newTouched[id] = true
      const errs = runValidation(id, values[id], true)
      if (!firstError && errs.length) firstError = id
    })

    setTouched(newTouched)
    if (firstError) {
      scrollToMatrix(firstError)
      return
    }

    updateFormData({
      matrixes: matrixTitles.map(({ id }) => ({
        [id]: values[id],
      })),
    })
    markStepCompleted(4)
    setCurrentStep(5)
  }

  return (
    <>
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
        <FormNavigation
          isNextDisabled={!form.formState.isValid}
          onNext={() => form.handleSubmit(onSubmit)()}
        />
      </div>
    </>
  );
}
