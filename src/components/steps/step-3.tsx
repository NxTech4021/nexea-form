"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { FormNavigation } from "@/components/form-navigation"
import { useFormContext } from "@/contexts/form-context"
import { useState } from "react"
import { QuestionSidebar } from "@/components/question-sidebar"
import { MatrixAssessment } from "@/components/matrix-assessment"
import Image from "next/image"

const formSchema = z.object({
  matrix1: z.record(z.string()),
  matrix2: z.record(z.string()),
  matrix3: z.record(z.string()),
})

export function Step3() {
  const { formData, updateFormData, setCurrentStep, markStepCompleted } = useFormContext()
  const [matrixErrors, setMatrixErrors] = useState<Record<string, string[]>>({});
  const [touchedMatrices, setTouchedMatrices] = useState<Record<string, boolean>>({});
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      matrix1: formData.matrix1 || {},
      matrix2: formData.matrix2 || {},
      matrix3: formData.matrix3 || {},
    },
  })

  const validationMessages = {
    duplicate: "Please don't select more than one response per column",
    incomplete: "This question requires one response per row",
  };

  const runValidation = (matrixName: string, matrixValue: Record<string, string>, forceTouch = false) => {
    const newErrors: string[] = [];
    const rowCount = 4;
    const isTouched = touchedMatrices[matrixName] || forceTouch;

    if (isTouched && Object.keys(matrixValue).length < rowCount) {
      newErrors.push(validationMessages.incomplete);
    } else {
      const selectedValues = Object.values(matrixValue);
      if (new Set(selectedValues).size < selectedValues.length) {
        newErrors.push(validationMessages.duplicate);
      }
    }
    
    setMatrixErrors(prev => ({ ...prev, [matrixName]: newErrors }));
    return newErrors;
  };

  const handleMatrixChange = (
    matrixName: 'matrix1' | 'matrix2' | 'matrix3',
    formOnChange: (value: Record<string, string>) => void,
    newValue: Record<string, string>
  ) => {
    formOnChange(newValue);
    if (!touchedMatrices[matrixName]) {
      setTouchedMatrices(prev => ({ ...prev, [matrixName]: true }));
    }
    runValidation(matrixName, newValue, true);
  };

  const scrollToMatrix = (matrixId: string) => {
    const targetElement = document.getElementById(`${matrixId}-section`)
    if (targetElement) {
      const elementRect = targetElement.getBoundingClientRect()
      const absoluteElementTop = elementRect.top + window.pageYOffset
      const targetPosition = Math.max(0, absoluteElementTop - 120)
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
    setCurrentStep(3);
  }
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    let firstErrorMatrix: string | null = null;
    const newTouchedState: Record<string, boolean> = {};

    const matricesToValidate: ('matrix1' | 'matrix2' | 'matrix3')[] = ['matrix1', 'matrix2', 'matrix3'];

    matricesToValidate.forEach(matrixName => {
      newTouchedState[matrixName] = true;
      const errors = runValidation(matrixName, values[matrixName], true);
      if (errors.length > 0 && !firstErrorMatrix) {
        firstErrorMatrix = matrixName;
      }
    });

    setTouchedMatrices(newTouchedState);
    
    if (firstErrorMatrix) {
      scrollToMatrix(firstErrorMatrix);
      return;
    }
    
    updateFormData(values);
    markStepCompleted(3);
    setCurrentStep(4);
  }

  const columns = ["Least Accurate", "Somewhat Accurate", "Quite Accurate", "Most Accurate"]
  
  const matrix1Rows = [
    "Get them to cooperate and collaborate",
    "Get the day-by-day work done", 
    "Change things",
    "Work systematically"
  ]
  
  const matrix2Rows = [
    "Work hard",
    "Am accurate",
    "Understand others",
    "Am creative"
  ]
  
  const matrix3Rows = [
    "Maintain a high standard of quality in everything they do",
    "Demonstrate a will and ability to put in extra work", 
    "Bring good new ideas",
    "Work well with others to bring out the best in them"
  ]

  const matrixTitles = [
    { id: "matrix1", title: "Colleague Values", shortTitle: "Values", question: "What my colleagues value most about me is my ability to:" },
    { id: "matrix2", title: "Personal Praise", shortTitle: "Praise", question: "I want to be praised because I:" },
    { id: "matrix3", title: "Organization Heroes", shortTitle: "Heroes", question: "Heroes (those we admire) in our organization are those that:" }
  ]

  return (
    <div className="min-h-screen bg-background">
      <QuestionSidebar titles={matrixTitles} onTitleClick={scrollToMatrix} />

      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Persistent Form Title */}
          <div className="bg-card border rounded-lg p-4 sm:p-6 shadow-sm">
            <div className="text-left space-y-2 sm:space-y-3">
              <div className="flex items-center gap-4">
                <Image
                  src="/nexealogo.png"
                  alt="NEXEA Logo"
                  width={40}
                  height={40}
                />
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Entrepreneurs Behaviour Assessment
                </h1>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
              {/* Matrix 1 - Separate Box */}
              <div id="matrix1-section">
                <FormField
                  control={form.control}
                  name="matrix1"
                  render={({ field }) => (
                    <FormItem>
                      <MatrixAssessment
                        question="What my colleagues value most about me is my ability to:"
                        rows={matrix1Rows}
                        columns={columns}
                        value={field.value}
                        onChange={(newValue) => handleMatrixChange('matrix1', field.onChange, newValue)}
                        errors={matrixErrors.matrix1}
                        matrixId="matrix1"
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
                        question="I want to be praised because I:"
                        rows={matrix2Rows}
                        columns={columns}
                        value={field.value}
                        onChange={(newValue) => handleMatrixChange('matrix2', field.onChange, newValue)}
                        errors={matrixErrors.matrix2}
                        matrixId="matrix2"
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
                        question="Heroes (those we admire) in our organization are those that:"
                        rows={matrix3Rows}
                        columns={columns}
                        value={field.value}
                        onChange={(newValue) => handleMatrixChange('matrix3', field.onChange, newValue)}
                        errors={matrixErrors.matrix3}
                        matrixId="matrix3"
                      />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>

          {/* Navigation */}
          <FormNavigation 
            onNext={() => form.handleSubmit(onSubmit)()}
          />
        </div>
      </div>
    </div>
  )
} 