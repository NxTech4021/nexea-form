'use client';

import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';

export interface FormData {
  [key: string]: any;
  company: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  matrixes: { [key: string]: { [key: string]: string } }[];
  radios: { [key: string]: string }[];
}

interface FormContextType {
  completedSteps: Set<number>;
  currentStep: number;
  formData: FormData;
  isStepCompleted: (step: number) => boolean;
  markStepCompleted: (step: number) => void;
  resetForm: () => void;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
  updateFormData: (stepData: Partial<FormData>) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

export function FormProvider({ children }: FormProviderProps) {
  const [formData, setFormData] = useState<FormData>({
    company: '',
    email: '',
    fullName: '',
    phoneNumber: '',
    matrixes: [],
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

  const isStepCompleted = (step: number) => {
    return completedSteps.has(step);
  };

  const markStepCompleted = (step: number) => {
    setCompletedSteps((prev) => new Set([step, ...prev]));
  };

  const resetForm = () => {
    setFormData({
      company: '',
      email: '',
      fullName: '',
      phoneNumber: '',
      matrixes: [],
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
