'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface FormData {
  // Additional steps will be added here as we build them
  // This allows for easy extension to 13 steps
  [key: string]: any;
  company: string;
  email: string;
  // Step 1: Contact Information
  fullName: string;

  phoneNumber: string;
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
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const totalSteps = 13;

  const updateFormData = (stepData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
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
