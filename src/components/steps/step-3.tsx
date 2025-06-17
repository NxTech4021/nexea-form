// src/components/steps/step-3.tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormNavigation } from '@/components/form-navigation'
import { MatrixAssessment } from '@/components/matrix-assessment'
import { QuestionSidebar } from '@/components/question-sidebar'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { useFormContext } from '@/contexts/form-context'
import { QuestionDefinition } from '@/contexts/form-context'  // ← import the shared type

// ——— 1) Move these out of the component ———
const columns: string[] = [
  'Least Accurate',
  'Somewhat Accurate',
  'Quite Accurate',
  'Most Accurate',
]

const matrix1Rows: string[] = [
  'Get them to cooperate and collaborate',
  'Get the day-by-day work done',
  'Change things',
  'Work systematically',
]

const matrix2Rows: string[] = [
  'Work hard',
  'Am accurate',
  'Understand others',
  'Am creative',
]

const matrix3Rows: string[] = [
  'Maintain a high standard of quality in everything they do',
  'Demonstrate a will and ability to put in extra work',
  'Bring good new ideas',
  'Work well with others to bring out the best in them',
]

const matrixTitles: {
  id: 'matrix1' | 'matrix2' | 'matrix3'
  question: string
  shortTitle: string
  title: string
  rows: string[]
}[] = [
  {
    id: 'matrix1',
    question:
      'What my colleagues value most about me is my ability to:',
    shortTitle: 'Values',
    title: 'Colleague Values',
    rows: matrix1Rows,
  },
  {
    id: 'matrix2',
    question: 'I want to be praised because I:',
    shortTitle: 'Praise',
    title: 'Personal Praise',
    rows: matrix2Rows,
  },
  {
    id: 'matrix3',
    question:
      'Heroes (those we admire) in our organization are those that:',
    shortTitle: 'Heroes',
    title: 'Organization Heroes',
    rows: matrix3Rows,
  },
]

// ——— 2) Export for Admin/FormContext at top level ———
export const questionsDataStep3: QuestionDefinition[] = matrixTitles.map(
  (m): QuestionDefinition => ({
    id:      m.id,
    step:    3,
    text:    m.question,
    type:    'matrix',
    options: columns,
    rows:    m.rows,
  })
)

// ——— 3) The Step3 component itself ———
const formSchema = z.object({
  matrix1: z.record(z.string()),
  matrix2: z.record(z.string()),
  matrix3: z.record(z.string()),
})

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
      matrix1: formData.matrix1 || {},
      matrix2: formData.matrix2 || {},
      matrix3: formData.matrix3 || {},
    },
    resolver: zodResolver(formSchema),
  })

  const validationMessages = {
    duplicate: "Please don't select more than one response per column",
    incomplete: 'This question requires one response per row',
  }

  const runValidation = (
    matrixName: string,
    matrixValue: Record<string, string>,
    forceTouch = false
  ) => {
    const newErrors: string[] = []
    const rowCount = 4
    const isTouched = touchedMatrices[matrixName] || forceTouch

    if (isTouched && Object.keys(matrixValue).length < rowCount) {
      newErrors.push(validationMessages.incomplete)
    } else {
      const selectedValues = Object.values(matrixValue)
      if (new Set(selectedValues).size < selectedValues.length) {
        newErrors.push(validationMessages.duplicate)
      }
    }

    setMatrixErrors((prev) => ({
      ...prev,
      [matrixName]: newErrors,
    }))
    return newErrors
  }

  const handleMatrixChange = (
    matrixName: 'matrix1' | 'matrix2' | 'matrix3',
    formOnChange: (value: Record<string, string>) => void,
    newValue: Record<string, string>
  ) => {
    formOnChange(newValue)
    if (!touchedMatrices[matrixName]) {
      setTouchedMatrices((prev) => ({
        ...prev,
        [matrixName]: true,
      }))
    }
    runValidation(matrixName, newValue, true)
  }

  const scrollToMatrix = (matrixId: string) => {
    const target = document.getElementById(`${matrixId}-section`)
    if (target) {
      const rect = target.getBoundingClientRect()
      const top = rect.top + window.pageYOffset - 120
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
      if (errs.length > 0 && !firstError) firstError = name
    })

    setTouchedMatrices(newTouched)
    if (firstError) {
      scrollToMatrix(firstError)
      return
    }

    updateFormData(values)
    markStepCompleted(3)
    setCurrentStep(4)
  }

  return (
    <div className="min-h-screen">
      <QuestionSidebar
        onTitleClick={scrollToMatrix}
        titles={matrixTitles}
      />

      <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-4">
        <div className="bg-card border rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <Image
              alt="NEXEA Logo"
              height={40}
              src="/nexealogo.png"
              width={40}
            />
            <h1 className="text-2xl sm:text-3xl font-bold">
              Entrepreneurs Behaviour Assessment
            </h1>
          </div>
        </div>

        <Form {...form}>
          <form
            className="space-y-3 sm:space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Matrix 1 */}
            <div id="matrix1-section">
              <FormField
                control={form.control}
                name="matrix1"
                render={({ field }) => (
                  <FormItem>
                    <MatrixAssessment
                      columns={columns}
                      errors={matrixErrors.matrix1}
                      matrixId="matrix1"
                      onChange={(nv) =>
                        handleMatrixChange(
                          'matrix1',
                          field.onChange,
                          nv
                        )
                      }
                      question={
                        matrixTitles[0].question
                      }
                      rows={matrix1Rows}
                      value={field.value}
                    />
                  </FormItem>
                )}
              />
            </div>

            {/* Matrix 2 */}
            <div id="matrix2-section">
              <FormField
                control={form.control}
                name="matrix2"
                render={({ field }) => (
                  <FormItem>
                    <MatrixAssessment
                      columns={columns}
                      errors={matrixErrors.matrix2}
                      matrixId="matrix2"
                      onChange={(nv) =>
                        handleMatrixChange(
                          'matrix2',
                          field.onChange,
                          nv
                        )
                      }
                      question={
                        matrixTitles[1].question
                      }
                      rows={matrix2Rows}
                      value={field.value}
                    />
                  </FormItem>
                )}
              />
            </div>

            {/* Matrix 3 */}
            <div id="matrix3-section">
              <FormField
                control={form.control}
                name="matrix3"
                render={({ field }) => (
                  <FormItem>
                    <MatrixAssessment
                      columns={columns}
                      errors={matrixErrors.matrix3}
                      matrixId="matrix3"
                      onChange={(nv) =>
                        handleMatrixChange(
                          'matrix3',
                          field.onChange,
                          nv
                        )
                      }
                      question={
                        matrixTitles[2].question
                      }
                      rows={matrix3Rows}
                      value={field.value}
                    />
                  </FormItem>
                )}
              />
            </div>
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
