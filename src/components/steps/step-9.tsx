"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormNavigation } from "@/components/form-navigation"
import { useFormContext } from "@/contexts/form-context"
import { cn } from "@/lib/utils"
import { AlertCircle } from "lucide-react"
import { QuestionSidebar } from "@/components/question-sidebar"
import Image from "next/image"
import { useState } from "react"

// Radio Button Question Component
interface RadioQuestionProps {
  question: string
  options: string[]
  value: string
  onChange: (value: string) => void
  error?: string
  questionId: string
}

function RadioQuestion({ question, options, value, onChange, error, questionId }: RadioQuestionProps) {
  return (
    <div className={cn(
      "bg-card border rounded-lg p-4 sm:p-6 shadow-sm transition-colors",
      error && "border-red-500 border-1"
    )}>
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-semibold mb-6">{question}</h3>
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="space-y-2 pb-2"
        >
          {options.map((option, index) => (
            <FormItem key={index} className="flex items-center space-x-3 space-y-0 px-2">
              <FormControl>
                <RadioGroupItem value={option} id={`${questionId}-${index}`} className="cursor-pointer" />
              </FormControl>
              <FormLabel htmlFor={`${questionId}-${index}`} className="font-normal cursor-pointer">
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
  radio43: z.string().optional(),
  radio44: z.string().optional(),
  radio45: z.string().optional(),
  radio46: z.string().optional(),
  radio47: z.string().optional(),
  radio48: z.string().optional(),
  radio49: z.string().optional(),
  radio50: z.string().optional(),
  radio51: z.string().optional(),
  radio52: z.string().optional(),
  radio53: z.string().optional(),
  radio54: z.string().optional(),
  radio55: z.string().optional(),
  radio56: z.string().optional(),
  radio57: z.string().optional(),
})

type FormSchemaType = z.infer<typeof formSchema>

const radioOptions = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree']

const questionTitles = [
    { id: 'radio43', title: 'Tense' },
    { id: 'radio44', title: 'Workload' },
    { id: 'radio45', title: 'Think Clearly' },
    { id: 'radio46', title: 'Pressure' },
    { id: 'radio47', title: 'Critically Analyze' },
    { id: 'radio48', title: 'Analyze All Angles' },
    { id: 'radio49', title: 'Pattern Recognition' },
    { id: 'radio50', title: 'Underlying Themes' },
    { id: 'radio51', title: 'At Ease With People' },
    { id: 'radio52', title: 'Shy With Others' },
    { id: 'radio53', title: 'Socially Confident' },
    { id: 'radio54', title: 'Confidence' },
    { id: 'radio55', title: 'Timid With Others' },
    { id: 'radio56', title: 'Demanding Goals' },
    { id: 'radio57', title: 'Tough Goals' },
]

type Question = {
  id: keyof FormSchemaType;
  question: string;
};

const questionsData: Question[] = [
  { id: 'radio43', question: 'I become tense when too many things happen at once' },
  { id: 'radio44', question: 'I enjoy working less when there is lots to do' },
  { id: 'radio45', question: 'I find it hard to think clearly when stressed'},
  { id: 'radio46', question: 'I am able to remain relaxed even under extreme pressure.'},
  { id: 'radio47', question: 'I like critically analyzing information'},
  { id: 'radio48', question: 'I enjoy analyzing a problem from all possible angles'},
  { id: 'radio49', question: 'I enjoy searching for patterns among the details'},
  { id: 'radio50', question: 'I enjoy searching for underlying themes and patterns'},
  { id: 'radio51', question: 'I am at ease with people I have just met'},
  { id: 'radio52', question: 'I often feel shy with others'},
  { id: 'radio53', question: 'I am socially confident '},
  { id: 'radio54', question: 'I am confident in formal situations'},
  { id: 'radio55', question: 'I am generally timid with other people'},
  { id: 'radio56', question: 'I set demanding goals for myself'},
  { id: 'radio57', question: 'I establish tough goals for myself'},
 ]

export function Step9() {
  const { formData, updateFormData, setCurrentStep, markStepCompleted } = useFormContext()
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      radio43: formData.radio43,
      radio44: formData.radio44,
      radio45: formData.radio45,
      radio46: formData.radio46,
      radio47: formData.radio47,
      radio48: formData.radio48,
      radio49: formData.radio49,
      radio50: formData.radio50,
      radio51: formData.radio51,
      radio52: formData.radio52,
      radio53: formData.radio53,
      radio54: formData.radio54,
      radio55: formData.radio55,
      radio56: formData.radio56,
      radio57: formData.radio57,
    },
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
        top: targetPosition,
        behavior: 'smooth'
      })
    }
    setCurrentStep(9)
  }

  function onSubmit(values: FormSchemaType) {
    let firstErrorId: string | null = null;
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
    markStepCompleted(9)
    setCurrentStep(10)
  }

  return (
    <div className="min-h-screen">
      <QuestionSidebar titles={questionTitles} onTitleClick={scrollToQuestion} />
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
            <form onSubmit={() => form.handleSubmit(onSubmit)()} className="space-y-3 sm:space-y-4">
              {questionsData.map((q) => (
                <div id={`${q.id}-section`} key={q.id}>
                  <FormField
                    control={form.control}
                    name={q.id}
                    render={({ field }) => (
                      <FormItem>
                        <RadioQuestion
                          question={q.question}
                          options={radioOptions}
                          value={field.value as string}
                          onChange={(newValue) => handleRadioChange(q.id, field.onChange, newValue)}
                          error={errors[q.id]?.[0]}
                          questionId={q.id}
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
