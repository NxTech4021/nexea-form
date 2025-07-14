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
  const totalSteps = 18

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
    setIsLoading(true);
    setError(null);
    try {
      // Use a more stable ID format that won't cause hydration issues
      // Create a deterministic ID based on the step and text to avoid duplicates
      const sanitizedText = question.text
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 20);
      const newId = `q_${question.step}_${sanitizedText}`;
      
      console.log(`Creating question with ID: ${newId}`);
      
      const res = await fetch('/api/admin/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...question,
          id: newId,
          type: question.type.toUpperCase()
        })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Server error creating question:', errorData);
        throw new Error(errorData.error || 'Failed to create question');
      }
      
      const data = await res.json();
      console.log(`Successfully created question with ID: ${data.id}`);
      
      // Add the new question to the state
      setQuestions(prev => [...prev, {
        ...question,
        id: data.id
      }]);
      
      return data;
    } catch (err: any) {
      setError(err.message);
      console.error('Create question error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  // Update a question
  const updateQuestion = async (question: QuestionDefinition) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(`Updating question with ID: ${question.id}`);
      
      const res = await fetch('/api/admin/questions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...question,
          type: question.type.toUpperCase()
        })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error(`Server error updating question ${question.id}:`, errorData);
        throw new Error(errorData.error || 'Failed to update question');
      }
      
      // Update the question in the state
      setQuestions(prev => 
        prev.map(q => q.id === question.id ? question : q)
      );
      
      console.log(`Successfully updated question with ID: ${question.id}`);
      
      return await res.json();
    } catch (err: any) {
      setError(err.message);
      console.error('Update question error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  // Delete a question
  const deleteQuestion = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(`Attempting to delete question with ID: ${id}`);
      
      const res = await fetch(`/api/admin/questions?id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error(`Server error deleting question ${id}:`, errorData);
        throw new Error(errorData.error || 'Failed to delete question');
      }
      
      // Remove the question from the state
      setQuestions(prev => prev.filter(q => q.id !== id));
      console.log(`Successfully deleted question ${id}`);
      
      return await res.json();
    } catch (err: any) {
      setError(err.message);
      console.error('Delete question error:', err);
      throw err;
    } finally {
      setIsLoading(false);
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
        completedSteps,
        createQuestion,
        currentStep,
        deleteQuestion,
        error,
        formData,
        isLoading,
        isStepCompleted,
        markStepCompleted,
        questions,
        resetForm,
        setCurrentStep,
        setQuestions,
        totalSteps,
        updateFormData,
        updateQuestion,
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
