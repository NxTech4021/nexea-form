"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FormNavigation } from "@/components/form-navigation"
import { useFormContext } from "@/contexts/form-context"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { AlertCircle } from "lucide-react"
import { QuestionSidebar } from "@/components/question-sidebar"

// Matrix Assessment Component
interface MatrixAssessmentProps {
  question: string
  rows: string[]
  columns: string[]
  value: Record<string, string>
  onChange: (value: Record<string, string>) => void
  errors?: string[]
  matrixId: string
}

function MatrixAssessment({ 
  question, 
  rows, 
  columns, 
  value, 
  onChange, 
  errors = [],
  matrixId 
}: MatrixAssessmentProps) {
  const handleRowChange = (rowIndex: number, columnValue: string) => {
    const newValue = { ...value }
    newValue[`row_${rowIndex}`] = columnValue
    onChange(newValue)
  }

  return (
    <div className={cn(
      "bg-card border rounded-lg p-3 sm:p-5 shadow-sm transition-colors",
      errors.length > 0 && "border-red-500 border-1"
    )}>
      <div className="space-y-2 sm:space-y-3">
        <div>
          <h3 id={`${matrixId}-title`} className="text-base sm:text-lg font-semibold mb-2">{question}</h3>
          <Separator className="mb-2 sm:mb-3" />
        </div>
      
      {/* Column Headers */}
      <div className="pb-1 sm:pb-2">
        <div className="grid grid-cols-5 gap-1 sm:gap-2 text-xs sm:text-sm font-semibold text-foreground items-end">
          <div></div> {/* Empty cell for row labels */}
          {columns.map((column, index) => (
            <div key={index} className="text-center px-1">
              {column}
            </div>
          ))}
        </div>
      </div>
      
      {/* Matrix Grid */}
      <div className="space-y-1 sm:space-y-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="bg-muted/30 rounded-lg p-2 sm:p-3 border border-muted/50 hover:bg-muted/40 transition-colors">
            <div className="grid grid-cols-5 gap-1 sm:gap-2 items-center">
              <div className="text-xs sm:text-sm font-medium text-foreground pr-1 sm:pr-2">
                {row}
              </div>
              
              <RadioGroup
                value={value[`row_${rowIndex}`] || ""}
                onValueChange={(columnValue) => handleRowChange(rowIndex, columnValue)}
                className="contents"
              >
                {columns.map((column, columnIndex) => {
                  const columnValue = `col_${columnIndex}`
                  return (
                    <div key={columnIndex} className="flex justify-center">
                      <Label
                        htmlFor={`${matrixId}-${rowIndex}-${columnIndex}`}
                        className="p-2 rounded-full hover:bg-muted/80 transition-colors cursor-pointer flex items-center justify-center"
                      >
                        <RadioGroupItem
                          value={columnValue}
                          id={`${matrixId}-${rowIndex}-${columnIndex}`}
                          className="w-4 h-4 cursor-pointer"
                        />
                      </Label>
                    </div>
                  )
                })}
              </RadioGroup>
            </div>
          </div>
        ))}
      </div>
      
      {errors.length > 0 && (
        <div className="pt-2 flex items-center gap-x-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span>{errors[0]}</span>
        </div>
      )}
      </div>
    </div>
  )
}

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
    setCurrentStep(4);
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
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Entrepreneurs Behaviour Assessment
              </h1>
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
            isNextDisabled={!form.formState.isValid}
          />
        </div>
      </div>
    </div>
  )
} 