"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

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
  radio88: z.string().optional(),
  radio89: z.string().optional(),
  radio90: z.string().optional(),
  radio91: z.string().optional(),
  radio92: z.string().optional(),
  radio93: z.string().optional(),
  radio94: z.string().optional(),
  radio95: z.string().optional(),
  radio96: z.string().optional(),
  radio97: z.string().optional(),
  radio98: z.string().optional(),
  radio99: z.string().optional(),
  radio100: z.string().optional(),
  radio101: z.string().optional(),
  radio102: z.string().optional(),
})

type FormSchemaType = z.infer<typeof formSchema>

const radioOptions = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree']

const questionTitles = [
    { id: 'radio88', title: 'Team' },
    { id: 'radio89', title: 'Working with Others' },
    { id: 'radio90', title: 'Team Effectiveness' },
    { id: 'radio91', title: 'Deadlines' },
    { id: 'radio92', title: 'Punctuality' },
    { id: 'radio93', title: 'Task Completion' },
    { id: 'radio94', title: 'Things Unfinished' },
    { id: 'radio95', title: 'Promises' },
    { id: 'radio96', title: 'Work Unfinished' },
    { id: 'radio97', title: 'Energy' },
    { id: 'radio98', title: 'Energy Drain' },
    { id: 'radio99', title: 'Lots of Energy' },
    { id: 'radio100', title: 'Full of Energy' },
    { id: 'radio101', title: 'One Thing at a Time' },
    { id: 'radio102', title: 'One Task at a Time' },
]

type Question = {
  id: keyof FormSchemaType;
  question: string;
};

const questionsData: Question[] = [
  { id: 'radio88', question: 'Working on a team slows me down' },
  { id: 'radio89', question: 'I enjoy working with others' },
  { id: 'radio90', question: 'Working on a team increases my effectiveness'},
  { id: 'radio91', question: 'I sometimes miss a deadline'},
  { id: 'radio92', question: 'I have never been late for work'},
  { id: 'radio93', question: 'I have never failed to complete a task at work'},
  { id: 'radio94', question: 'I sometimes leave things unfinished'},
  { id: 'radio95', question: 'I sometimes cannot keep my promises'},
  { id: 'radio96', question: 'I sometimes leave work unfinished'},
  { id: 'radio97', question: 'I enjoy work that requires a high level of energy'},
  { id: 'radio98', question: 'Demanding tasks quickly drain my energy'},
  { id: 'radio99', question: 'I have lots of energy'},
  { id: 'radio100', question: 'People describe me as being full of energy'},
  { id: 'radio101', question: 'I prefer to do one thing at a time'},
  { id: 'radio102', question: 'When I work by myself I usually work on one task at a time'},
 ]

export function Step12() {
  const { formData, updateFormData, setCurrentStep, markStepCompleted } = useFormContext()
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      radio88: formData.radio88,
      radio89: formData.radio89,
      radio90: formData.radio90,
      radio91: formData.radio91,
      radio92: formData.radio92,
      radio93: formData.radio93,
      radio94: formData.radio94,
      radio95: formData.radio95,
      radio96: formData.radio96,
      radio97: formData.radio97,
      radio98: formData.radio98,
      radio99: formData.radio99,
      radio100: formData.radio100,
      radio101: formData.radio101,
      radio102: formData.radio102,
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
    setCurrentStep(12)
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
    markStepCompleted(12)
    setCurrentStep(13)
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
