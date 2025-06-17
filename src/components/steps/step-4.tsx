// src/components/steps/step-4.tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormNavigation } from '@/components/form-navigation'
import { MatrixAssessment } from '@/components/matrix-assessment'
import { QuestionSidebar } from '@/components/question-sidebar'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { useFormContext } from '@/contexts/form-context'
import { QuestionDefinition } from '@/contexts/form-context'

// ——— 0) Zod schema and MatrixName type ———
const formSchema = z.object({
  matrix4:  z.record(z.string()),
  matrix5:  z.record(z.string()),
  matrix6:  z.record(z.string()),
  matrix7:  z.record(z.string()),
  matrix8:  z.record(z.string()),
  matrix9:  z.record(z.string()),
  matrix10: z.record(z.string()),
  matrix11: z.record(z.string()),
  matrix12: z.record(z.string()),
  matrix13: z.record(z.string()),
  matrix14: z.record(z.string()),
  matrix15: z.record(z.string()),
  matrix16: z.record(z.string()),
  matrix17: z.record(z.string()),
  matrix18: z.record(z.string()),
})
type MatrixName = keyof z.infer<typeof formSchema>

// ——— 1) Module-level constants ———
const columns = [
  'Least Accurate',
  'Somewhat Accurate',
  'Quite Accurate',
  'Most Accurate',
]

const matrix4Rows = [
  'Work and get results',
  'Work well with others',
  'Work systematically',
  'Think creatively',
];
const matrix5Rows = [
  'Well liked',
  'In control of situations',
  'Using my creativity',
  'Making progress and getting things done',
];
const matrix6Rows = [
  'Pleasant and easy to work with',
  'Focused and organized',
  'Creative and forward thinking',
  'Good at getting things done',
];
const matrix7Rows = [
  'I am able to work without interruption',
  'My new ideas have won acceptance',
  'I have met all my objectives for the day',
  'We start from different viewpoints but in the end come out as an aligned team',
];
const matrix8Rows = [
  'Efficient and systematic',
  'A good judge of character and a mediator',
  'Creative and progressive',
  'Motivated by results',
];
const matrix9Rows = [
  'Clean up or organize my paper work',
  'Get ahead on the day-to-day work',
  'Develop a new project or explore new opportunities',
  'Develop better relationships with my colleagues, external partners, clients, prospective clients',
];
const matrix10Rows = [
  'Working hard to get things done',
  'Aligning colleagues, dealing with conflicts and fostering a team oriented climate',
  'Ensuring we have the right rules and that they are followed',
  'My job changes too often to be characterized',
];
const matrix11Rows = [
  'Opportunities to be creative',
  'Stability and job security',
  'Demands on the individual to perform',
  'An environment where teamwork is valued',
];
const matrix12Rows = [
  'Completing my tasks',
  'Planning and structuring my work day',
  'Spotting new opportunities',
  'Listening to others',
];
const matrix13Rows = [
  'Looking for innovative ways to get things done',
  'Ensuring compliance of decisions made',
  'Getting results from projects/tasks',
  'Ensuring acceptance of decisions/solutions by the parties concerned',
];
const matrix14Rows = [
  'A job that is challenging and offers opportunities to be creative',
  'A job that is stable and offers job security',
  'A job that is demanding and offers opportunities to perform',
  'A job that is team-oriented and offers opportunities to work with others',
];
const matrix15Rows = [
  'Inter-departmental teamwork',
  'Being at the cutting edge of our profession',
  'Having procedures and systems that work',
  'Getting things done',
];
const matrix16Rows = [
  'Be with people I like',
  'Be creative and develop my own ideas',
  'Concentrate on getting results',
  'Structure my work',
];
const matrix17Rows = [
  'Rules, regulations and standard operating procedures of our business',
  'Nuts and bolts of getting the job done',
  'Future of our industry',
  'Different individuals in our organization and how to get them to work together',
];
const matrix18Rows = [
  'Systemtically following internal procedures',
  'Cooperating and collaborating across departmental units',
  'Getting the day to day work done',
  "Thinking of new ways to face tomorrow's challenges",
];


const matrixData: { name: MatrixName; question: string; rows: string[] }[] = [
  { name: 'matrix4',  question: 'What I want others to notice about me is my ability to:', rows: matrix4Rows },
  { name: 'matrix5',  question: 'I need to feel that I am:',                         rows: matrix5Rows },
  { name: 'matrix6',  question: 'My closest colleagues think I am:',                 rows: matrix6Rows },
  { name: 'matrix7',  question: 'A good day for me is when:',                        rows: matrix7Rows },
  { name: 'matrix8',  question: 'To complement the style of others in the team, the person holding my position should be:', rows: matrix8Rows },
  { name: 'matrix9',  question: 'If I had some spare time at work, I would like to:', rows: matrix9Rows },
  { name: 'matrix10', question: 'My job is characterized by:',                       rows: matrix10Rows },
  { name: 'matrix11', question: 'In considering a new job, what is most important to me is:', rows: matrix11Rows },
  { name: 'matrix12', question: 'What characterizes me in my day-to-day work as a manager is that I am good at:', rows: matrix12Rows },
  { name: 'matrix13', question: 'I spend most of my time:',                         rows: matrix13Rows },
  { name: 'matrix14', question: 'The kind of new job I would like to apply for is characterized by:', rows: matrix14Rows },
  { name: 'matrix15', question: 'The most important thing for our daily operation is:', rows: matrix15Rows },
  { name: 'matrix16', question: 'In a perfect world, my job would permit me to:',    rows: matrix16Rows },
  { name: 'matrix17', question: 'My boss expects me to know the:',                   rows: matrix17Rows },
  { name: 'matrix18', question: "Our organization's culture is characterized by:",   rows: matrix18Rows },
]

// ——— 2) Export for Admin/FormContext ———
export const questionsDataStep4: QuestionDefinition[] = matrixData.map(m => ({
  id:      m.name,
  step:    4,
  text:    m.question,
  type:    'matrix',
  options: columns,
  rows:    m.rows,
}))

// ——— 3) The Step4 component ———
export function Step4() {
  const { formData, markStepCompleted, setCurrentStep, updateFormData } =
    useFormContext()

  const [matrixErrors, setMatrixErrors] = useState<Record<string,string[]>>({})
  const [touched, setTouched]     = useState<Record<string,boolean>>({})

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: matrixData.reduce((acc, {name}) => {
      acc[name] = (formData as any)[name] || {}
      return acc
    }, {} as any),
    resolver: zodResolver(formSchema),
  })

  const validationMessages = {
    duplicate: "Don't select more than one per column",
    incomplete:"Requires one response per row",
  }

  const runValidation = (name: MatrixName, val: Record<string,string>, force=false) => {
    const errs: string[] = []
    const isTouched = touched[name] || force
    if (isTouched && Object.keys(val).length < 4)
      errs.push(validationMessages.incomplete)
    else if (new Set(Object.values(val)).size < Object.values(val).length)
      errs.push(validationMessages.duplicate)

    setMatrixErrors(prev=>({ ...prev, [name]:errs }))
    return errs
  }

  const handleChange = (name:MatrixName, onChange:Function, val:Record<string,string>) => {
    onChange(val)
    if (!touched[name]) setTouched(prev=>({...prev,[name]:true}))
    runValidation(name,val,true)
  }

  const scrollToSection = (id:string) => {
    if (id.match(/^matrix\d+$/)) {
      document.getElementById(`${id}-section`)?.scrollIntoView({behavior:'smooth',block:'start'})
      setCurrentStep(4)
    }
  }

  const onSubmit = (vals: z.infer<typeof formSchema>) => {
    let firstErr:MatrixName|null = null
    const newTouched: Record<string,boolean> = {}
    ;(Object.keys(vals) as MatrixName[]).forEach(name=>{
      newTouched[name]=true
      if (!firstErr && runValidation(name, vals[name], true).length) {
        firstErr = name
      }
    })
    setTouched(newTouched)
    if (firstErr) return scrollToSection(firstErr)
    updateFormData(vals)
    markStepCompleted(4)
    setCurrentStep(5)
  }

  return (
    <div className="min-h-screen">
      <QuestionSidebar
        titles={matrixData.map(m=>({
          id:m.name,
          question:m.question,
          shortTitle:m.name,
          title:m.question,
        }))}
        onTitleClick={scrollToSection}
      />

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <div className="bg-card border rounded-lg p-4 shadow-sm flex items-center gap-4">
          <Image src="/nexealogo.png" alt="Logo" width={40} height={40}/>
          <h1 className="text-2xl font-bold">Entrepreneurs Behaviour Assessment</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {matrixData.map(({name,question,rows}) => (
              <div key={name} id={`${name}-section`}>
                <FormField
                  control={form.control}
                  name={name}
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <MatrixAssessment
                        matrixId={name}
                        columns={columns}
                        rows={rows}
                        question={question}
                        value={field.value}
                        errors={matrixErrors[name]||[]}
                        onChange={(val) => handleChange(name, field.onChange, val)}
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
