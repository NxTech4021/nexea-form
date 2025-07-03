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
  createQuestion: (question: Omit<QuestionDefinition, 'id'>) => Promise<void>
  updateQuestion: (question: QuestionDefinition) => Promise<void>
  deleteQuestion: (id: string) => Promise<void>
  isLoading: boolean
  error: string | null
}

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
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const totalSteps = 13

  // admin UI state
  const [questions, setQuestions] = useState<QuestionDefinition[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch questions on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/admin/questions')
        if (!res.ok) throw new Error('Failed to fetch questions')
        const data = await res.json()
        
        // Transform database format to QuestionDefinition format
        const transformedQuestions = data.map((q: any) => ({
          id: q.id,
          step: q.step,
          text: q.text,
          type: q.type.toLowerCase(),
          options: q.options.map((o: any) => o.value),
          rows: q.matrixRows.map((r: any) => r.label)
        }))
        
        setQuestions(transformedQuestions)
      } catch (err: any) {
        setError(err.message)
        console.error('Error fetching questions:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  // Create a new question
  const createQuestion = async (question: Omit<QuestionDefinition, 'id'>) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...question,
          id: Date.now().toString(),
          type: question.type.toUpperCase()
        })
      })
      
      if (!res.ok) throw new Error('Failed to create question')
      
      const data = await res.json()
      setQuestions(prev => [...prev, {
        ...question,
        id: data.id
      }])
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Update a question
  const updateQuestion = async (question: QuestionDefinition) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/questions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...question,
          type: question.type.toUpperCase()
        })
      })
      
      if (!res.ok) throw new Error('Failed to update question')
      
      setQuestions(prev => 
        prev.map(q => q.id === question.id ? question : q)
      )
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Delete a question
  const deleteQuestion = async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/questions?id=${id}`, {
        method: 'DELETE'
      })
      
      if (!res.ok) throw new Error('Failed to delete question')
      
      setQuestions(prev => prev.filter(q => q.id !== id))
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

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

  const markStepCompleted = (step: number) => {
    setCompletedSteps((prev) => new Set(prev).add(step))
  }

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

  return (
    <FormContext.Provider
      value={{
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
        createQuestion,
        updateQuestion,
        deleteQuestion,
        isLoading,
        error
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}
