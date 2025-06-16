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
  const { formData, updateFormData, setCurrentStep, markStepCompleted } = useFormContext()
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      radio73: formData.radio73,
      radio74: formData.radio74,
      radio75: formData.radio75,
      radio76: formData.radio76,
      radio77: formData.radio77,
      radio78: formData.radio78,
      radio79: formData.radio79,
      radio80: formData.radio80,
      radio81: formData.radio81,
      radio82: formData.radio82,
      radio83: formData.radio83,
      radio84: formData.radio84,
      radio85: formData.radio85,
      radio86: formData.radio86,
      radio87: formData.radio87,
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
    setCurrentStep(11)
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
    markStepCompleted(11)
    setCurrentStep(12)
  }

  return (
    <div className="min-h-screen bg-background">
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
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
