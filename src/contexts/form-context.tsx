// src/contexts/form-context.tsx
'use client'

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'


import { questionsDataStep1 } from '@/components/steps/step-1'
import { questionsDataStep2 } from '@/components/steps/step-2'
import { questionsDataStep3 } from '@/components/steps/step-3'
import { questionsDataStep4 } from '@/components/steps/step-4'
import { questionsDataStep5 } from '@/components/steps/step-5'
import { questionsDataStep6 } from '@/components/steps/step-6'
import { questionsDataStep7 } from '@/components/steps/step-7'
import { questionsDataStep8 } from '@/components/steps/step-8'
import { questionsDataStep9 } from '@/components/steps/step-9'
import { questionsDataStep10 } from '@/components/steps/step-10'
import { questionsDataStep11 } from '@/components/steps/step-11'
import { questionsDataStep12 } from '@/components/steps/step-12'
import { questionsDataStep13 } from '@/components/steps/step-13'


// ——— 1) Your data shapes ———
export interface FormData {
  [key: string]: any
  company: string
  email: string
  fullName: string
  matrixes: { [key: string]: { [key: string]: string } }[]
  phoneNumber: string
  radios: { [key: string]: string }[]
}

export interface QuestionDefinition {
  id: string
  step: number
  text: string
  type: 'text' | 'radio' | 'matrix'
  options: string[]
 rows?: string[]
}


// ——— 2) Context type ———
export interface FormContextType {
  // survey flow
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  completedSteps: Set<number>
  isStepCompleted: (step: number) => boolean
  markStepCompleted: (step: number) => void
  resetForm: () => void
  totalSteps: number

  // admin UI
  questions: QuestionDefinition[]
  setQuestions: Dispatch<SetStateAction<QuestionDefinition[]>>
}

// ——— 3) Create context ———
const FormContext = createContext<FormContextType | undefined>(undefined)

interface FormProviderProps {
  children: ReactNode
}

export function FormProvider({ children }: FormProviderProps) {
  // survey flow state
  const [formData, setFormData] = useState<FormData>({
    company: '',
    email: '',
    fullName: '',
    matrixes: [],
    phoneNumber: '',
    radios: [],
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(
    new Set()
  )
  const totalSteps = 13

  // admin UI state
  const [questions, setQuestions] = useState<QuestionDefinition[]>([
    ...questionsDataStep1,
    ...questionsDataStep2,
    ...questionsDataStep3,
    ...questionsDataStep4,
    ...questionsDataStep5,   // ← ensure this is here
    ...questionsDataStep6,
    ...questionsDataStep7,
    ...questionsDataStep8,
    ...questionsDataStep9,
    ...questionsDataStep10,
    ...questionsDataStep11,
    ...questionsDataStep12,
    ...questionsDataStep13,
  ])

  // debug log
  useEffect(() => {
    console.log('Form Data:', formData)
  }, [formData])

  // merge in radio or matrix updates by key
  const updateFormData = (stepData: Partial<FormData>) => {
    setFormData((prev) => {
      const next = { ...prev }

      if (stepData.radios) {
        stepData.radios.forEach((r) => {
          const key = Object.keys(r)[0]
          const idx = next.radios.findIndex((x) =>
            Object.keys(x)[0] === key
          )
          if (idx >= 0) next.radios[idx] = r
          else next.radios.push(r)
        })
        delete (stepData as any).radios
      }

      if (stepData.matrixes) {
        stepData.matrixes.forEach((m) => {
          const key = Object.keys(m)[0]
          const idx = next.matrixes.findIndex((x) =>
            Object.keys(x)[0] === key
          )
          if (idx >= 0) next.matrixes[idx] = m
          else next.matrixes.push(m)
        })
        delete (stepData as any).matrixes
      }

      return { ...next, ...stepData }
    })
  }

  const isStepCompleted = (step: number) => completedSteps.has(step)
  const markStepCompleted = (step: number) =>
    setCompletedSteps((prev) => new Set(prev).add(step))

  const resetForm = () => {
    setFormData({
      company: '',
      email: '',
      fullName: '',
      matrixes: [],
      phoneNumber: '',
      radios: [],
    })
    setCurrentStep(1)
    setCompletedSteps(new Set())
  }

  const value: FormContextType = {
    formData,
    updateFormData,
    currentStep,
    setCurrentStep,
    completedSteps,
    isStepCompleted,
    markStepCompleted,
    resetForm,
    totalSteps,
    questions,
    setQuestions,
  }

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  )
}

// ——— 4) Single hook to consume ———
export function useFormContext(): FormContextType {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error(
      'useFormContext must be used within a FormProvider'
    )
  }
  return context
}
