// src/contexts/form-context.tsx
'use client'

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface FormData {
  [key: string]: any;
  company: string;
  email: string;
  fullName: string;
  matrixes: { [key: string]: { [key: string]: string } }[];
  phoneNumber: string;
  radios: { [key: string]: string }[];
}

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

const FormContext = createContext<FormContextType | undefined>(undefined)

export function useFormContext(): FormContextType {
  const ctx = useContext(FormContext)
  if (!ctx) throw new Error('useFormContext must be used within FormProvider')
  return ctx
}

interface FormProviderProps {
  children: ReactNode
}

export function FormProvider({ children }: FormProviderProps) {
  const [formData, setFormData] = useState<FormData>({
    company: '',
    email: '',
    fullName: '',
    matrixes: [],
    phoneNumber: '',
    radios: [],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const totalSteps = 13;

  // log form data
  useEffect(() => {
    console.log('Form Data:', formData);
  }, [formData]);

  const updateFormData = (stepData: Partial<FormData>) => {
    setFormData((prev) => {
      const newState = { ...prev };

      if (stepData.radios) {
        stepData.radios.forEach((radio) => {
          const key = Object.keys(radio)[0];
          const existingIndex = newState.radios.findIndex(
            (r) => Object.keys(r)[0] === key
          );
          if (existingIndex > -1) {
            newState.radios[existingIndex] = radio;
          } else {
            newState.radios.push(radio);
          }
        });
        delete stepData.radios;
      }

      if (stepData.matrixes) {
        stepData.matrixes.forEach((matrix) => {
          const key = Object.keys(matrix)[0];
          const existingIndex = newState.matrixes.findIndex(
            (m) => Object.keys(m)[0] === key
          );
          if (existingIndex > -1) {
            newState.matrixes[existingIndex] = matrix;
          } else {
            newState.matrixes.push(matrix);
          }
        });
        delete stepData.matrixes;
      }

      return { ...newState, ...stepData };
    });
  };

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
    });
    setCurrentStep(1);
    setCompletedSteps(new Set());
  };

  const value: FormContextType = {
    completedSteps,
    currentStep,
    formData,
    isStepCompleted,
    markStepCompleted,
    resetForm,
    setCurrentStep,
    totalSteps,
    updateFormData,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}
