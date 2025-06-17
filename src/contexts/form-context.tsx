// src/contexts/form-context.tsx
'use client'

import React, {
  createContext, ReactNode, useContext,
  useState, useEffect, Dispatch, SetStateAction
} from 'react'

import { questionsDataStep1  } from '@/components/steps/step-1'
import { questionsDataStep2  } from '@/components/steps/step-2'
import { questionsDataStep3  } from '@/components/steps/step-3'
import { questionsDataStep4  } from '@/components/steps/step-4'
import { questionsDataStep5  } from '@/components/steps/step-5'
import { questionsDataStep6  } from '@/components/steps/step-6'
import { questionsDataStep7  } from '@/components/steps/step-7'
import { questionsDataStep8  } from '@/components/steps/step-8'
import { questionsDataStep9  } from '@/components/steps/step-9'
import { questionsDataStep10 } from '@/components/steps/step-10'
import { questionsDataStep11 } from '@/components/steps/step-11'
import { questionsDataStep12 } from '@/components/steps/step-12'
import { questionsDataStep13 } from '@/components/steps/step-13'// adjust your barrel import

export type QuestionType = 'text' | 'radio' | 'matrix'

export interface QuestionDefinition {
  id: string|number
  step: number
  text: string
  type: QuestionType
  options: string[]
  rows?: string[]
}

export interface FormData { [key:string]: any }

export interface FormContextType {
  formData: FormData
  updateFormData: (d:Partial<FormData>) => void
  currentStep: number
  setCurrentStep: (s:number) => void
  completedSteps: Set<number>
  isStepCompleted: (s:number)=>boolean
  markStepCompleted: (s:number)=>void
  resetForm: ()=>void
  totalSteps: number

  questions: QuestionDefinition[]
  setQuestions: Dispatch<SetStateAction<QuestionDefinition[]>>
}

const FormContext = createContext<FormContextType|undefined>(undefined)
export function useFormContext(){
  const ctx = useContext(FormContext)
  if(!ctx) throw new Error('useFormContext must be used within FormProvider')
  return ctx
}

interface Props { children: ReactNode }

export function FormProvider({ children }:Props) {
  const [formData, setFormData] = useState<FormData>({})
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const totalSteps = 13

  const updateFormData = (d:Partial<FormData>) =>
    setFormData(prev=>({ ...prev, ...d }))
  const isStepCompleted = (s:number)=>completedSteps.has(s)
  const markStepCompleted = (s:number)=>
    setCompletedSteps(prev=>new Set(prev).add(s))
  const resetForm = ()=>{
    setFormData({})
    setCurrentStep(1)
    setCompletedSteps(new Set())
  }

  // assemble all the step exports into one master list
  const DEFAULT_QUESTIONS:QuestionDefinition[] = [
    ...questionsDataStep1,
    ...questionsDataStep2,
    ...questionsDataStep3,
    ...questionsDataStep4,
    ...questionsDataStep5,
    ...questionsDataStep6,
    ...questionsDataStep7,
    ...questionsDataStep8,
    ...questionsDataStep9,
    ...questionsDataStep10,
    ...questionsDataStep11,
    ...questionsDataStep12,
    ...questionsDataStep13,
  ]

  // smart init: only reuse saved if *all* items have a valid .step
  const [questions, setQuestions] = useState<QuestionDefinition[]>(()=>{
    if(typeof window!=='undefined'){
      const raw = localStorage.getItem('questions')
      if(raw){
        try{
          const parsed = JSON.parse(raw)
          if(
            Array.isArray(parsed) &&
            parsed.every((q:any)=> typeof q.step==='number' && q.step>=1 && q.step<=totalSteps)
          ){
            return parsed as QuestionDefinition[]
          }
        }catch{}
      }
    }
    return DEFAULT_QUESTIONS
  })

  useEffect(()=>{
    localStorage.setItem('questions',JSON.stringify(questions))
  },[questions])

  return (
    <FormContext.Provider value={{
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
    }}>
      {children}
    </FormContext.Provider>
  )
}
