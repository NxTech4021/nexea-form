// src/components/steps/step-4.tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormNavigation } from '@/components/form-navigation'
import { MatrixAssessment } from '@/components/matrix-assessment'
import { QuestionSidebar } from '@/components/question-sidebar'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { useFormContext } from '@/contexts/form-context'
import { QuestionDefinition } from '@/contexts/form-context'

//
// ——— 1) Static definitions ———
//
const columns = [
  'Least Accurate',
  'Somewhat Accurate',
  'Quite Accurate',
  'Most Accurate',
]

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
  'Systemtically following internal procedures',
  'Cooperating and collaborating across departmental units',
  'Getting the day to day work done',
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
  'Clean up or organize my paper work',
  'Get ahead on the day-to-day work',
  'Develop a new project or explore new opportunities',
  'Develop better relationships with my colleagues, external partners, clients, prospective clients',
]
const matrix10Rows = [
  'Working hard to get things done',
  'Aligning colleagues, dealing with conflicts and fostering a team oriented climate',
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
  'Rules, regulations and standard operating procedures of our business',
  'Nuts and bolts of getting the job done',
  'Future of our industry',
  'Different individuals in our organization and how to get them to work together',
]
const matrix15Rows = [
  'I am able to work without interruption',
  'My new ideas have won acceptance',
  'I have met all my objectives for the day',
  'We start from different viewpoints but in the end come out as an aligned team',
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
  'Clarity of tasks and if I work hard, I am able to succeed',
]

const matrixTitles = [
  { id: 'matrix4',  question: 'In considering a new job, what is most important to me is:',                                                                 shortTitle: 'New Job',                 title: 'New Job',                 rows: matrix4Rows },
  { id: 'matrix5',  question: 'What characterizes me in my day-to-day work as a manager is that I am good at:',                                              shortTitle: 'Manager',                 title: 'Manager',                 rows: matrix5Rows },
  { id: 'matrix6',  question: "Our organization's culture is characterized by:",                                                                                  shortTitle: 'Culture',                 title: 'Culture',                 rows: matrix6Rows },
  { id: 'matrix7',  question: 'The most important thing for our daily operation is:',                                                                             shortTitle: 'Daily Operation',         title: 'Daily Operation',         rows: matrix7Rows },
  { id: 'matrix8',  question: 'I spend most of my time:',                                                                                                        shortTitle: 'Time Spent',              title: 'Time Spent',              rows: matrix8Rows },
  { id: 'matrix9',  question: 'If I had some spare time at work, I would like to:',                                                                              shortTitle: 'Spare Time',              title: 'Spare Time',              rows: matrix9Rows },
  { id: 'matrix10', question: 'My job is characterized by:',                                                                                                     shortTitle: 'Job Characteristics',     title: 'Job Characteristics',     rows: matrix10Rows },
  { id: 'matrix11', question: 'My closest colleagues think I am:',                                                                                              shortTitle: 'Colleague Values',        title: 'Colleague Values',        rows: matrix11Rows },
  { id: 'matrix12', question: 'In a perfect world, my job would permit me to:',                                                                                  shortTitle: 'Perfect World',           title: 'Perfect World',           rows: matrix12Rows },
  { id: 'matrix13', question: 'To complement the style of others in the team, the person holding my position should be:',                                         shortTitle: 'Complement',             title: 'Complement',             rows: matrix13Rows },
  { id: 'matrix14', question: 'My boss expects me to know the:',                                                                                                 shortTitle: 'Boss Expectations',       title: 'Boss Expectations',       rows: matrix14Rows },
  { id: 'matrix15', question: 'A good day for me is when:',                                                                                                      shortTitle: 'Good Day',                title: 'Good Day',                rows: matrix15Rows },
  { id: 'matrix16', question: 'I need to feel that I am:',                                                                                                       shortTitle: 'Feeling',                 title: 'Feeling',                 rows: matrix16Rows },
  { id: 'matrix17', question: 'What I want others to notice about me is my ability to:',                                                                          shortTitle: 'Abilities',               title: 'Abilities',               rows: matrix17Rows },
  { id: 'matrix18', question: 'The kind of new job I would like to apply for is characterized by:',                                                             shortTitle: 'New Job Characteristics', title: 'New Job Characteristics', rows: matrix18Rows },
] as const

//
// ——— 2) Export for Admin/FormContext ———
//
export const questionsDataStep4: QuestionDefinition[] = matrixTitles.map(
  ({ id, question, rows }) => ({
    id,
    step: 4,
    text: question,
    type: 'matrix',
    options: columns,
    rows,
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
  const { formData, markStepCompleted, setCurrentStep, updateFormData } =
    useFormContext()

  const [matrixErrors, setMatrixErrors] = useState<Record<string, string[]>>(
    {}
  )
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // build defaultValues from context
  const defaultValues = matrixTitles.reduce((acc, { id }) => {
    acc[id] = (formData as any)[id] || {}
    return acc
  }, {} as Record<MatrixName, Record<string, string>>)

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues,
    resolver: zodResolver(formSchema),
  })

  // reset if user goes back/edits previous step
  useEffect(() => {
    form.reset(defaultValues)
  }, [formData, form])

  const validationMessages = {
    duplicate: "Please don't select more than one response per column",
    incomplete: 'This question requires one response per row',
  }

  const runValidation = (
    name: MatrixName,
    val: Record<string, string>,
    force = false
  ) => {
    const errs: string[] = []
    const isTouched = touched[name] || force

    if (isTouched && Object.keys(val).length < columns.length) {
      errs.push(validationMessages.incomplete)
    } else if (new Set(Object.values(val)).size < Object.values(val).length) {
      errs.push(validationMessages.duplicate)
    }

    setMatrixErrors((prev) => ({ ...prev, [name]: errs }))
    return errs
  }

  const handleMatrixChange = (
    name: MatrixName,
    onChange: (v: Record<string, string>) => void,
    newVal: Record<string, string>
  ) => {
    onChange(newVal)
    if (!touched[name]) setTouched((p) => ({ ...p, [name]: true }))
    runValidation(name, newVal, true)
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`${id}-section`)
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 120
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setCurrentStep(4)
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    let firstErr: MatrixName | null = null
    const newTouched: Record<string, boolean> = {}

    (Object.keys(values) as MatrixName[]).forEach((name) => {
      newTouched[name] = true
      const errs = runValidation(name, values[name], true)
      if (!firstErr && errs.length) firstErr = name
    })

    setTouched(newTouched)
    if (firstErr) {
      scrollToSection(firstErr)
      return
    }

    updateFormData(values)
    markStepCompleted(4)
    setCurrentStep(5)
  }

  return (
    <div className="min-h-screen">
      <QuestionSidebar
        titles={matrixTitles}
        onTitleClick={scrollToSection}
      />

      <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="bg-card border rounded-lg p-4 shadow-sm flex items-center gap-4">
          <Image
            src="/nexealogo.png"
            alt="NEXEA Logo"
            width={40}
            height={40}
          />
          <h1 className="text-2xl sm:text-3xl font-bold">
            Entrepreneurs Behaviour Assessment
          </h1>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {matrixTitles.map(({ id, title, question, rows }) => (
              <div key={id} id={`${id}-section`}>
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <FormField
                  control={form.control}
                  name={id as MatrixName}
                  render={({ field }) => (
                    <FormItem>
                      <MatrixAssessment
                        matrixId={id}
                        columns={columns}
                        rows={rows}
                        question={question}
                        value={field.value}
                        errors={matrixErrors[id] || []}
                        onChange={(nv) =>
                          handleMatrixChange(id as MatrixName, field.onChange, nv)
                        }
                      />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </form>
        </Form>

        <FormNavigation
          isNextDisabled={!form.formState.isValid}
          onNext={() => form.handleSubmit(onSubmit)()}
        />
      </div>
    </div>
  )
}
