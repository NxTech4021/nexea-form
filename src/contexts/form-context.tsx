"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface FormData {
  // Step 1: Contact Information
  fullName: string
  phoneNumber: string
  company: string
  email: string
  
  // Additional steps will be added here as we build them
  // This allows for easy extension to 13 steps
  [key: string]: any
}

interface FormContextType {
  formData: FormData
  updateFormData: (stepData: Partial<FormData>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
  isStepCompleted: (step: number) => boolean
  markStepCompleted: (step: number) => void
  completedSteps: Set<number>
}

const FormContext = createContext<FormContextType | undefined>(undefined)

interface FormProviderProps {
  children: ReactNode
}

export function FormProvider({ children }: FormProviderProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    company: '',
    email: '',
  })
  
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const totalSteps = 13

  const updateFormData = (stepData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }))
  }

  const isStepCompleted = (step: number) => {
    return completedSteps.has(step)
  }

  const markStepCompleted = (step: number) => {
    setCompletedSteps(prev => new Set([...prev, step]))
  }

  const value: FormContextType = {
    formData,
    updateFormData,
    currentStep,
    setCurrentStep,
    totalSteps,
    isStepCompleted,
    markStepCompleted,
    completedSteps,
  }

  return (
    <FormContext.Provider value={value}>
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