// src/components/steps/step-3.tsx
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

const matrix1Rows = [
  'Get them to cooperate and collaborate',
  'Get the day-by-day work done',
  'Change things',
  'Work systematically',
]

const matrix2Rows = [
  'Work hard',
  'Am accurate',
  'Understand others',
  'Am creative',
]

const matrix3Rows = [
  'Maintain a high standard of quality in everything they do',
  'Demonstrate a will and ability to put in extra work',
  'Bring good new ideas',
  'Work well with others to bring out the best in them',
]

const matrixTitles = [
  {
    id: 'matrix1' as const,
    question: 'What my colleagues value most about me is my ability to:',
    shortTitle: 'Values',
    title: 'Colleague Values',
    rows: matrix1Rows,
  },
  {
    id: 'matrix2' as const,
    question: 'I want to be praised because I:',
    shortTitle: 'Praise',
    title: 'Personal Praise',
    rows: matrix2Rows,
  },
  {
    id: 'matrix3' as const,
    question:
      'Heroes (those we admire) in our organization are those that:',
    shortTitle: 'Heroes',
    title: 'Organization Heroes',
    rows: matrix3Rows,
  },
]

//
// ——— 2) Export for admin UI / context registration ———
//
export const questionsDataStep3: QuestionDefinition[] = matrixTitles.map(
  (m): QuestionDefinition => ({
    id: m.id,
    step: 3,
    text: m.question,
    type: 'matrix',
    options: columns,
    rows: m.rows,
  })
)

//
// ——— 3) Zod schema ———
//
const formSchema = z.object({
  matrix1: z.record(z.string()),
  matrix2: z.record(z.string()),
  matrix3: z.record(z.string()),
})

//
// ——— 4) Step3 component ———
//
export function Step3() {
  const {
    formData,
    markStepCompleted,
    setCurrentStep,
    updateFormData,
  } = useFormContext()

  const [matrixErrors, setMatrixErrors] = useState<
    Record<string, string[]>
  >({})
  const [touchedMatrices, setTouchedMatrices] = useState<
    Record<string, boolean>
  >({})

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      matrix1:
        formData.matrixes?.find((m) => m.matrix1)?.matrix1 || {},
      matrix2:
        formData.matrixes?.find((m) => m.matrix2)?.matrix2 || {},
      matrix3:
        formData.matrixes?.find((m) => m.matrix3)?.matrix3 || {},
    },
    resolver: zodResolver(formSchema),
  })

  // reset on context change (e.g. coming back to this step)
  useEffect(() => {
    form.reset({
      matrix1:
        formData.matrixes?.find((m) => m.matrix1)?.matrix1 || {},
      matrix2:
        formData.matrixes?.find((m) => m.matrix2)?.matrix2 || {},
      matrix3:
        formData.matrixes?.find((m) => m.matrix3)?.matrix3 || {},
    })
  }, [formData, form])

  const validationMessages = {
    duplicate: "Please don't select more than one response per column",
    incomplete: 'This question requires one response per row',
  }

  const runValidation = (
    matrixName: string,
    matrixValue: Record<string, string>,
    forceTouch = false
  ) => {
    const errs: string[] = []
    const rowCount = 4
    const isTouched = touchedMatrices[matrixName] || forceTouch

    if (isTouched && Object.keys(matrixValue).length < rowCount) {
      errs.push(validationMessages.incomplete)
    } else {
      const vals = Object.values(matrixValue)
      if (new Set(vals).size < vals.length) {
        errs.push(validationMessages.duplicate)
      }
    }

    setMatrixErrors((prev) => ({ ...prev, [matrixName]: errs }))
    return errs
  }

  const handleMatrixChange = (
    matrixName: typeof matrixTitles[number]['id'],
    onChange: (v: Record<string, string>) => void,
    newValue: Record<string, string>
  ) => {
    onChange(newValue)
    if (!touchedMatrices[matrixName]) {
      setTouchedMatrices((prev) => ({ ...prev, [matrixName]: true }))
    }
    runValidation(matrixName, newValue, true)
  }

  const scrollToMatrix = (matrixId: string) => {
    const el = document.getElementById(`${matrixId}-section`)
    if (el) {
      const top =
        el.getBoundingClientRect().top + window.pageYOffset - 120
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setCurrentStep(3)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    let firstError: string | null = null
    const newTouched: Record<string, boolean> = {}

    ;(['matrix1', 'matrix2', 'matrix3'] as const).forEach((name) => {
      newTouched[name] = true
      const errs = runValidation(name, values[name], true)
      if (errs.length > 0 && !firstError) {
        firstError = name
      }
    })

    setTouchedMatrices(newTouched)

    if (firstError) {
      scrollToMatrix(firstError)
      return
    }

    updateFormData({
      matrixes: [
        { matrix1: values.matrix1 },
        { matrix2: values.matrix2 },
        { matrix3: values.matrix3 },
      ],
    })
    markStepCompleted(3)
    setCurrentStep(4)
  }

  return (
    <div className="min-h-screen">
      <QuestionSidebar
        onTitleClick={scrollToMatrix}
        titles={matrixTitles}
      />

      <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="bg-card border rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-4">
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
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {matrixTitles.map((m) => (
              <div key={m.id} id={`${m.id}-section`}>
                <h2 className="text-xl font-semibold mb-2">
                  {m.title}
                </h2>
                <FormField
                  control={form.control}
                  name={m.id}
                  render={({ field }) => (
                    <FormItem>
                      <MatrixAssessment
                        matrixId={m.id}
                        columns={columns}
                        rows={m.rows}
                        question={m.question}
                        value={field.value}
                        errors={matrixErrors[m.id] || []}
                        onChange={(nv) =>
                          handleMatrixChange(
                            m.id,
                            field.onChange,
                            nv
                          )
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
