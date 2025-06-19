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
  radio73: z.string().optional(),
  radio74: z.string().optional(),
  radio75: z.string().optional(),
  radio76: z.string().optional(),
  radio77: z.string().optional(),
  radio78: z.string().optional(),
  radio79: z.string().optional(),
  radio80: z.string().optional(),
  radio81: z.string().optional(),
  radio82: z.string().optional(),
  radio83: z.string().optional(),
  radio84: z.string().optional(),
  radio85: z.string().optional(),
  radio86: z.string().optional(),
  radio87: z.string().optional(),
})

type FormSchemaType = z.infer<typeof formSchema>

const radioKeys = Object.keys(formSchema.shape) as (keyof FormSchemaType)[];

const radioOptions = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree']

const questionTitles = [
  { id: 'radio73', title: 'Sensitive to Others' },
  { id: 'radio74', title: 'Pay Attention' },
  { id: 'radio75', title: 'Unhappy' },
  { id: 'radio76', title: 'Ignore Rules' },
  { id: 'radio77', title: 'Order and Stability' },
  { id: 'radio78', title: 'Ignore Regulations' },
  { id: 'radio79', title: 'Strictly Enforced Rules' },
  { id: 'radio80', title: 'Nonsense Rules' },
  { id: 'radio81', title: 'Overperform' },
  { id: 'radio82', title: 'Volunteer' },
  { id: 'radio83', title: 'New Responsibilities' },
  { id: 'radio84', title: 'Take Initiative' },
  { id: 'radio85', title: 'Work Alone' },
  { id: 'radio86', title: 'Work with Others' },
  { id: 'radio87', title: 'Work with Lots of People' },
]

type Question = {
  id: keyof FormSchemaType;
  question: string;
};

const questionsData: Question[] = [
  { id: 'radio73', question: 'I am sensitive to the overall feelings of my co-workers' },
  { id: 'radio74', question: 'I don\'t pay much attention to people\'s emotions' },
  { id: 'radio75', question: 'No one has ever been unhappy with me in any way'},
  { id: 'radio76', question: 'I am prepared to ignore the rules and regulations when it is necessary'},
  { id: 'radio77', question: 'I like to have order and stability'},
  { id: 'radio78', question: 'I sometimes ignore regulations at work'},
  { id: 'radio79', question: 'I believe that rules should be strictly enforced'},
  { id: 'radio80', question: 'I sometimes ignore rules that do not make any sense'},
  { id: 'radio81', question: 'I do more than what is expected of me'},
  { id: 'radio82', question: 'I volunteer to do things that are not in my job description'},
  { id: 'radio83', question: 'I enjoy taking on new responsibilities'},
  { id: 'radio84', question: 'I often take the initiative'},
  { id: 'radio85', question: 'I would rather work by myself than with others'},
  { id: 'radio86', question: 'I prefer to work with others rather than alone'},
  { id: 'radio87', question: 'I prefer to work with lots of people'},
 ]

 
export function Step11() {
  const { formData, markStepCompleted, setCurrentStep, updateFormData } = useFormContext()
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const form = useForm<FormSchemaType>({
    defaultValues: radioKeys.reduce((acc, key) => {
      acc[key] = formData.radios?.find((r) => r[key])?.[key] || ''
      return acc
    }, {} as FormSchemaType),
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
    setCurrentStep(11)
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
    markStepCompleted(11)
    setCurrentStep(12)
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

// ── Mirror Step11’s own questions for Admin/FormContext ──
export const questionsDataStep11 = questionsData.map(q => ({
    id:      q.id,
    step:    11,
   text:    q.question,
    type:    'radio' as const,
    options: radioOptions,
  }))