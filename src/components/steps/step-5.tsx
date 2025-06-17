// src/components/steps/step-5.tsx
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

// ——— 1) Zod schema & MatrixName type ———
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
})
type MatrixName = keyof z.infer<typeof formSchema>

// ——— 2) Module-scope constants with explicit string[] types ———
const columns: string[] = [
  'Least Accurate',
  'Somewhat Accurate',
  'Quite Accurate',
  'Most Accurate',
]

const matrix19Rows: string[] = [
  'Takes me away from important day-to-day work',
  'Is undesirable if it requires too many changes to our policies',
  'Creates opportunities for creative thinking',
  'Creates too much change and conflict/disharmony',
]
const matrix20Rows: string[] = [
  'Establishing procedures which ensure efficient use of our resources',
  'Getting the day-to-day work done',
  'Ensuring my organization remains on the cutting edge',
  'Motivating my colleagues in their work',
]
const matrix21Rows: string[] = [
  'Finding new ways to accomplish my work',
  'Ensuring that things are done correctly',
  'Getting results',
  'Maintaining a collaborative working environment',
]
const matrix22Rows: string[] = [
  'Getting results fast',
  'Minimizing risk',
  'Finding a solution that is acceptable to everyone',
  'Finding new and innovative solutions',
]
const matrix23Rows: string[] = [
  'Who is well-liked',
  'They can approach for accurate information',
  'Who can find new solutions',
  'Who can get the job done',
]
const matrix24Rows: string[] = [
  'Require cooperation with colleagues',
  'Give me the opportunity to think out side of the box',
  'Are clearly defined and allow me to work systematically and within a structure',
  'Allow me to see the results quickly',
]
const matrix25Rows: string[] = [
  'Systematize',
  'Achieve goals',
  'Change and be flexible',
  'Work well with others',
]
const matrix26Rows: string[] = [
  'Opportunities to be creative',
  'Stability and job security',
  'Demands on the individual to perform',
  'An environment where teamwork is valued',
]
const matrix27Rows: string[] = [
  'Big idea person',
  'Hard worker',
  'Team player',
  'Precise and accurate worker',
]
const matrix28Rows: string[] = [
  'Work quickly and in an orderly way',
  'Inspire the commitment of my colleagues',
  'Find new methods of working',
  'Work carefully and systematically',
]
const matrix29Rows: string[] = [
  'Meet my performance objectives',
  'Foresee and plan for future developments',
  'Work with others in a collaborative environment',
  'See that the rules and regulations are followed',
]
const matrix30Rows: string[] = [
  'Work hard',
  'Foresee future trends and opportunities',
  'Attend to details and minimize mistakes',
  'Get others to view things from a different perspective',
]
const matrix31Rows: string[] = [
  'Getting results',
  'Working closely with others',
  'Being in a secure and stable working environment',
  'Risks and excitement',
]
const matrix32Rows: string[] = [
  'Developing people',
  'Assuring the day-to-day work is achieved',
  'Developing new products/services/systems',
  'Making sure that rules and systems are clearly defined and adhered to',
]
const matrix33Rows: string[] = [
  'Do not have enough information',
  "Am not sure of other people's opinion",
  'Have too much to do',
  'See multiple solutions to the problem',
]

const matrixData: { name: MatrixName; question: string; rows: string[] }[] = [
  { name: 'matrix19', question: 'My attitude toward development work is that it:',      rows: matrix19Rows },
  { name: 'matrix20', question: 'The most important aspect of my job is:',              rows: matrix20Rows },
  { name: 'matrix21', question: 'In my job I am good at:',                              rows: matrix21Rows },
  { name: 'matrix22', question: 'What I consider most important when making a decision is:', rows: matrix22Rows },
  { name: 'matrix23', question: 'Deep down, I would like my colleagues to see me as someone:', rows: matrix23Rows },
  { name: 'matrix24', question: 'The kinds of tasks I like are those that:',             rows: matrix24Rows },
  { name: 'matrix25', question: 'My most important quality in my current job is my ability to:', rows: matrix25Rows },
  { name: 'matrix26', question: 'The type of work where I perform well is work which requires:', rows: matrix26Rows },
  { name: 'matrix27', question: 'I want to be thought of as a:',                         rows: matrix27Rows },
  { name: 'matrix28', question: 'My job requires me to:',                               rows: matrix28Rows },
  { name: 'matrix29', question: 'What pleases me most in my current job is when I am able to:', rows: matrix29Rows },
  { name: 'matrix30', question: 'Managers in our organization are praised for their ability to:', rows: matrix30Rows },
  { name: 'matrix31', question: 'The person taking over from me should be motivated by:', rows: matrix31Rows },
  { name: 'matrix32', question: 'The most important areas of responsibility in my job are:', rows: matrix32Rows },
  { name: 'matrix33', question: 'The primary reason that I wait to make an important decision is that I:', rows: matrix33Rows },
]

// ——— 3) Export for FormContext/Admin ———
export const questionsDataStep5: QuestionDefinition[] = matrixData.map(m => ({
  id:      m.name,
  step:    5,
  text:    m.question,
  type:    'matrix',
  options: columns,
  rows:    m.rows,
}))

// ——— 4) The Step5 component itself ———
export function Step5() {
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
    if (isTouched && Object.keys(val).length < 4) errs.push(validationMessages.incomplete)
    else if (new Set(Object.values(val)).size < Object.values(val).length)
      errs.push(validationMessages.duplicate)
    setMatrixErrors(prev=>({ ...prev, [name]: errs }))
    return errs
  }

  const handleChange = (name:MatrixName, onChange:Function, val:Record<string,string>) => {
    onChange(val)
    if (!touched[name]) setTouched(prev=>({...prev,[name]:true}))
    runValidation(name,val,true)
  }

  const scrollToSection = (id: string) => {
    document.getElementById(`${id}-section`)?.scrollIntoView({behavior:'smooth',block:'start'})
    setCurrentStep(5)
  }

  const onSubmit = (vals: z.infer<typeof formSchema>) => {
    let firstErr:MatrixName|null = null
    const newTouched: Record<string,boolean> = {}
    ;(Object.keys(vals) as MatrixName[]).forEach(name=>{
      newTouched[name]=true
      if (!firstErr && runValidation(name, vals[name], true).length) firstErr = name
    })
    setTouched(newTouched)
    if (firstErr) return scrollToSection(firstErr)
    updateFormData(vals)
    markStepCompleted(5)
    setCurrentStep(6)
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
                        onChange={(val)=>handleChange(name, field.onChange, val)}
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
          onNext={()=>form.handleSubmit(onSubmit)()}
        />
      </div>
    </div>
  )
}
