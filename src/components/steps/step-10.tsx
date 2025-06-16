"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
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
  radio58: z.string().optional(),
  radio59: z.string().optional(),
  radio60: z.string().optional(),
  radio61: z.string().optional(),
  radio62: z.string().optional(),
  radio63: z.string().optional(),
  radio64: z.string().optional(),
  radio65: z.string().optional(),
  radio66: z.string().optional(),
  radio67: z.string().optional(),
  radio68: z.string().optional(),
  radio69: z.string().optional(),
  radio70: z.string().optional(),
  radio71: z.string().optional(),
  radio72: z.string().optional(),
})

type FormSchemaType = z.infer<typeof formSchema>

const radioOptions = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree']

const questionTitles = [
  { id: 'radio58', title: 'Complete Tasks' },
  { id: 'radio59', title: 'Ambitious Goals' },
  { id: 'radio60', title: 'Work Hard' },
  { id: 'radio61', title: 'Surpass Others' },
  { id: 'radio62', title: 'Check Work Thoroughly' },
  { id: 'radio63', title: 'Attention to Detail' },
  { id: 'radio64', title: 'Highly Detailed Work' },
  { id: 'radio65', title: 'Perfectionist' },
  { id: 'radio66', title: 'Dislike Detailed Work' },
  { id: 'radio67', title: 'Routines' },
  { id: 'radio68', title: 'Variety' },
  { id: 'radio69', title: 'Routine Work' },
  { id: 'radio70', title: 'Understand Others' },
  { id: 'radio71', title: 'Sensitive to Others' },
  { id: 'radio72', title: 'Aware of Others' },
]

type Question = {
  id: keyof FormSchemaType;
  question: string;
};

const questionsData: Question[] = [
  { id: 'radio58', question: 'I always complete a task once I start it' },
  { id: 'radio59', question: 'I enjoy setting ambitious personal goals' },
  { id: 'radio60', question: 'I work hard to get ahead'},
  { id: 'radio61', question: 'I try to surpass others\' accomplishments'},
  { id: 'radio62', question: 'I take the time to check my work thoroughly'},
  { id: 'radio63', question: 'I pay careful attention to detail'},
  { id: 'radio64', question: 'I enjoy highly detailed work'},
  { id: 'radio65', question: 'I like every detail to be perfect'},
  { id: 'radio66', question: 'I dislike detailed work'},
  { id: 'radio67', question: 'I feel that routines interfere with my ability to work effectively'},
  { id: 'radio68', question: 'I prefer variety to routine'},
  { id: 'radio69', question: 'I rarely enjoy routine work'},
  { id: 'radio70', question: 'I have the ability to understand others people\'s feelings.'},
  { id: 'radio71', question: 'I am sensitive to the needs of others'},
  { id: 'radio72', question: 'I am not usually aware of how people feel'},
 ]

export function Step10() {
  const { formData, markStepCompleted, setCurrentStep, updateFormData } = useFormContext()
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const form = useForm<FormSchemaType>({
    defaultValues: {
      radio58: formData.radio58,
      radio59: formData.radio59,
      radio60: formData.radio60,
      radio61: formData.radio61,
      radio62: formData.radio62,
      radio63: formData.radio63,
      radio64: formData.radio64,
      radio65: formData.radio65,
      radio66: formData.radio66,
      radio67: formData.radio67,
      radio68: formData.radio68,
      radio69: formData.radio69,
      radio70: formData.radio70,
      radio71: formData.radio71,
      radio72: formData.radio72,
    },
    resolver: zodResolver(formSchema),
  })

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
    setCurrentStep(10)
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

    updateFormData(values)
    markStepCompleted(10)
    setCurrentStep(11)
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
            <form className="space-y-3 sm:space-y-4" onSubmit={() => form.handleSubmit(onSubmit)()}>
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
