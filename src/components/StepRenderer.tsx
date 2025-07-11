'use client'

import { useForm } from 'react-hook-form'
import { z, ZodRawShape, ZodTypeAny } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useFormContext } from '@/contexts/form-context'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { FormNavigation } from '@/components/form-navigation'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { MatrixAssessment } from '@/components/matrix-assessment'
import { QuestionSidebar } from '@/components/question-sidebar'
import { QuestionDefinition } from '@/contexts/form-context'

export function StepRenderer() {
  const {
    questions,
    formData,
    updateFormData,
    markStepCompleted,
    setCurrentStep,
    currentStep,
    totalSteps,
  } = useFormContext()

  // 1️⃣ only this step’s questions
  const stepQs = questions.filter(q => q.step === currentStep)

  // 2️⃣ build a Zod schema
  const shape: ZodRawShape = {}
  stepQs.forEach(q => {
    const key = String(q.id)
    if (q.type === 'text') {
      shape[key] = z.string().min(1, { message: 'Required' })
    } else if (q.type === 'radio') {
      shape[key] = z.string().min(1, { message: 'Please select one' })
    } else {
      shape[key] = z
        .record(z.string())
        .refine(
          rec => Object.keys(rec).length === (q.rows?.length ?? 0),
          { message: 'One response per row' }
        )
    }
  })
  const schema = z.object(shape as Record<string, ZodTypeAny>)

  // 3️⃣ hook up react-hook-form
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: stepQs.reduce<Record<string, any>>((acc, q) => {
      acc[String(q.id)] =
        (formData as any)[q.id] ?? (q.type === 'matrix' ? {} : '')
      return acc
    }, {}),
  })

  const onSubmit = (values: z.infer<typeof schema>) => {
    updateFormData(values)
    markStepCompleted(currentStep)
    setCurrentStep(
      currentStep < totalSteps ? currentStep + 1 : currentStep
    )
  }

  return (
    <div className="min-h-screen">
      <QuestionSidebar
        titles={stepQs.map(q => ({
          id: String(q.id),
          title: q.text,
          shortTitle:
            q.type === 'matrix' ? q.text.slice(0, 12) + '…' : q.text,
        }))}
        onTitleClick={id => {
          const el = document.getElementById(`${id}-section`)
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }}
      />

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {stepQs.map(q => {
              const key = String(q.id)
              return (
                <div id={`${key}-section`} key={key}>
                  <FormField
                    control={form.control}
                    name={key as any}
                    render={({ field, fieldState }) => {
                      if (q.type === 'text') {
                        return (
                          <FormItem>
                            <label className="block mb-1">
                              {q.text}
                            </label>
                            <Input {...field} />
                            {fieldState.error && (
                              <p className="text-red-600">
                                {fieldState.error.message}
                              </p>
                            )}
                          </FormItem>
                        )
                      }
                      if (q.type === 'radio') {
                        return (
                          <FormItem>
                            <label className="block mb-1">
                              {q.text}
                            </label>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="space-y-2"
                            >
                              {q.options.map(opt => (
                                <div
                                  key={opt}
                                  className="flex items-center space-x-2"
                                >
                                  <RadioGroupItem
                                    value={opt}
                                    id={`${key}-${opt}`}
                                  />
                                  <label htmlFor={`${key}-${opt}`}>
                                    {opt}
                                  </label>
                                </div>
                              ))}
                            </RadioGroup>
                            {fieldState.error && (
                              <p className="text-red-600">
                                {fieldState.error.message}
                              </p>
                            )}
                          </FormItem>
                        )
                      }
                      // matrix
                      return (
                        <FormItem>
                          <MatrixAssessment
                            matrixId={key}
                            question={q.text}
                            rows={q.rows!}
                            columns={q.options}
                            value={field.value}
                            onChange={field.onChange}
                            errors={
                              fieldState.error
                                ? [fieldState.error.message!]
                                : []
                            }
                          />
                        </FormItem>
                      )
                    }}
                  />
                </div>
              )
            })}

            <FormNavigation onNext={() => form.handleSubmit(onSubmit)()} />
          </form>
        </Form>
      </div>
    </div>
  )
}
