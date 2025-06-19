"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { FormNavigation } from "@/components/form-navigation"
import { QuestionSidebar } from "@/components/question-sidebar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useFormContext } from "@/contexts/form-context"
import { cn } from "@/lib/utils"

// Radio Button Question Component
interface RadioQuestionProps {
  error?: string
  onChange: (value: string) => void
  options: string[]
  question: string
  questionId: string
  value: string
}

function RadioQuestion({ error, onChange, options, question, questionId, value }: RadioQuestionProps) {
  return (
    <div className={cn(
      "bg-card border rounded-lg p-4 sm:p-6 shadow-sm transition-colors",
      error && "border-red-500 border-1"
    )}>
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-semibold mb-6">{question}</h3>
        <RadioGroup
          className="space-y-2 pb-2"
          onValueChange={onChange}
          value={value}
        >
          {options.map((option, index) => (
            <FormItem className="flex items-center space-x-3 space-y-0 px-2" key={index}>
              <FormControl>
                <RadioGroupItem className="cursor-pointer" id={`${questionId}-${index}`} value={option} />
              </FormControl>
              <FormLabel className="font-normal cursor-pointer" htmlFor={`${questionId}-${index}`}>
                {option}
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
        {error && (
          <div className="pt-1 flex items-center gap-x-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  )
}

const formSchema = z.object({
  radio13: z.string().optional(),
  radio14: z.string().optional(),
  radio15: z.string().optional(),
  radio16: z.string().optional(),
  radio17: z.string().optional(),
  radio18: z.string().optional(),
  radio19: z.string().optional(),
  radio20: z.string().optional(),
  radio21: z.string().optional(),
  radio22: z.string().optional(),
  radio23: z.string().optional(),
  radio24: z.string().optional(),
  radio25: z.string().optional(),
  radio26: z.string().optional(),
  radio27: z.string().optional(),
})

type FormSchemaType = z.infer<typeof formSchema>

const radioKeys = Object.keys(formSchema.shape) as (keyof FormSchemaType)[];

const radioOptions = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree']

const questionTitles = [
    { id: 'radio13', title: 'Proactivity' },
    { id: 'radio14', title: 'Workload' },
    { id: 'radio15', title: 'Way of Working' },
    { id: 'radio16', title: 'New Ideas' },
    { id: 'radio17', title: 'New Ways' },
    { id: 'radio18', title: 'Risk Neutral' },
    { id: 'radio19', title: 'Consultation' },
    { id: 'radio20', title: 'Boss' },
    { id: 'radio21', title: 'Insecurity' },
    { id: 'radio22', title: 'Supervision' },
    { id: 'radio23', title: 'Advice' },
    { id: 'radio24', title: 'Decision Making' },
    { id: 'radio25', title: 'Difficulty' },
    { id: 'radio26', title: 'Persistence' },
    { id: 'radio27', title: 'Tasks' },
]

type Question = {
  id: keyof FormSchemaType;
  question: string;
};

const questionsData: Question[] = [
  { id: 'radio13', question: 'I am proactive' },
  { id: 'radio14', question: 'I dislike having new responsibilities added to my workload' },
  { id: 'radio15', question: 'I prefer established ways of working'},
  { id: 'radio16', question: 'I find it easy to come up with new ideas' },
  { id: 'radio17', question: 'I love to think up new ways of doings things' },
  { id: 'radio18', question: 'I like to do things the way they have always been done'},
  { id: 'radio19', question: 'I consult others when making a decision' },
  { id: 'radio20', question: 'I always completely agree with every decision my boss makes' },
  { id: 'radio21', question: 'I feel insecure when I do not have the support of others' },
  { id: 'radio22', question: 'I look to others for supervision and guidance' },
  { id: 'radio23', question: 'I seldom look for advice when making a decision' },
  { id: 'radio24', question: 'I rarely make a decision without consulting others' },
  { id: 'radio25', question: 'I find it difficult to make decisions on my own' },
  { id: 'radio26', question: 'No matter how difficult a job is, see it through to the end' },
  { id: 'radio27', question: 'I sometimes do not complete my tasks' },
 ]

 export const questionsDataStep7 = questionsData.map(q => ({
  id:   q.id,
  step:    7,
  text: q.question,
  type: 'radio' as const,
  options: radioOptions,
}))


export function Step7() {
  const { formData, markStepCompleted, setCurrentStep, updateFormData } = useFormContext()
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const form = useForm<FormSchemaType>({
    defaultValues: radioKeys.reduce((acc, key) => {
      acc[key] = formData.radios?.find((r) => r[key])?.[key] || ''
      return acc
    }, {} as FormSchemaType),
    resolver: zodResolver(formSchema),
  });

  const validationMessages = {
    radio_incomplete: "This question requires a response",
  }

  const runValidation = (fieldName: string, value: any, forceTouch = false) => {
    const newErrors: string[] = [];
    const isTouched = touched[fieldName] || forceTouch;

    if (isTouched) {
      if (!value) {
        newErrors.push(validationMessages.radio_incomplete);
      }
    }
    
    setErrors(prev => ({ ...prev, [fieldName]: newErrors }));
    return newErrors;
  };

  const handleRadioChange = (
    fieldName: keyof FormSchemaType,
    formOnChange: (value: string) => void,
    newValue: string
  ) => {
    formOnChange(newValue);
    if (!touched[fieldName]) {
      setTouched(prev => ({ ...prev, [fieldName]: true }));
    }
    runValidation(fieldName, newValue, true);
  };

  const scrollToQuestion = (questionId: string) => {
    const targetElement = document.getElementById(`${questionId}-section`)
    if (targetElement) {
      const elementRect = targetElement.getBoundingClientRect()
      const absoluteElementTop = elementRect.top + window.pageYOffset
      const targetPosition = Math.max(0, absoluteElementTop - 120)
      window.scrollTo({
        behavior: 'smooth',
        top: targetPosition
      })
    }
    setCurrentStep(7)
  }

  function onSubmit(values: FormSchemaType) {
    let firstErrorId: null | string = null;
    const newTouchedState: Record<string, boolean> = {};

    questionsData.forEach(q => {
      newTouchedState[q.id] = true;
      const value = values[q.id];
      const validationErrors = runValidation(q.id, value, true);
      if (validationErrors.length > 0 && !firstErrorId) {
        firstErrorId = q.id;
      }
    });

    setTouched(newTouchedState);
    
    if (firstErrorId) {
      scrollToQuestion(firstErrorId);
      return;
    }

    updateFormData({
      radios: radioKeys.map((key) => ({ [key]: values[key] as string })),
    });
    markStepCompleted(7)
    setCurrentStep(8)
  }

  return (
    <div className="min-h-screen">
      <QuestionSidebar onTitleClick={scrollToQuestion} titles={questionTitles} />
      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Persistent Form Title */}
          <div className="bg-card border rounded-lg p-4 sm:p-6 shadow-sm">
            <div className="text-left space-y-2 sm:space-y-3">
              <div className="flex items-center gap-4">
                <Image
                  alt="NEXEA Logo"
                  height={40}
                  src="/nexealogo.png"
                  width={40}
                />
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Entrepreneurs Behaviour Assessment
                </h1>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form className="space-y-3 sm:space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              {questionsData.map((q) => (
                <div id={`${q.id}-section`} key={q.id}>
                  <FormField
                    control={form.control}
                    name={q.id}
                    render={({ field }) => (
                      <FormItem>
                        <RadioQuestion
                          error={errors[q.id]?.[0]}
                          onChange={(newValue) => handleRadioChange(q.id, field.onChange, newValue)}
                          options={radioOptions}
                          question={q.question}
                          questionId={q.id}
                          value={field.value as string}
                        />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
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
