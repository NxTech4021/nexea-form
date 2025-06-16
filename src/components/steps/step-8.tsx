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
  radio28: z.string().optional(),
  radio29: z.string().optional(),
  radio30: z.string().optional(),
  radio31: z.string().optional(),
  radio32: z.string().optional(),
  radio33: z.string().optional(),
  radio34: z.string().optional(),
  radio35: z.string().optional(),
  radio36: z.string().optional(),
  radio37: z.string().optional(),
  radio38: z.string().optional(),
  radio39: z.string().optional(),
  radio40: z.string().optional(),
  radio41: z.string().optional(),
  radio42: z.string().optional(),
})

type FormSchemaType = z.infer<typeof formSchema>

const radioOptions = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree']

const questionTitles = [
    { id: 'radio28', title: 'Give Up' },
    { id: 'radio29', title: 'Commitment' },
    { id: 'radio30', title: 'Persistent' },
    { id: 'radio31', title: 'Stick With Things' },
    { id: 'radio32', title: 'Difficult Problems' },
    { id: 'radio33', title: 'Upset' },
    { id: 'radio34', title: 'Composure' },
    { id: 'radio35', title: 'Annoyance' },
    { id: 'radio36', title: 'Temper' },
    { id: 'radio37', title: 'Things Go Wrong' },
    { id: 'radio38', title: 'Irritation' },
    { id: 'radio39', title: 'Anger Control' },
    { id: 'radio40', title: 'Impatience' },
    { id: 'radio41', title: 'Stressful Situations' },
    { id: 'radio42', title: 'Stressed Easily' },
]

type Question = {
  id: keyof FormSchemaType;
  question: string;
};

const questionsData: Question[] = [
  { id: 'radio28', question: 'I sometimes give up when things become difficult' },
  { id: 'radio29', question: 'I always see the job through to the end' },
  { id: 'radio30', question: 'People describe me as persistent'},
  { id: 'radio31', question: 'I stick with things no matter what it takes' },
  { id: 'radio32', question: 'I have the tendency to give up when I meet difficult problems' },
  { id: 'radio33', question: 'It takes a lot to upset me'},
  { id: 'radio34', question: 'I maintain my composure even in difficult situations' },
  { id: 'radio35', question: 'I am easily annoyed' },
  { id: 'radio36', question: 'I hardly ever lose my temper' },
  { id: 'radio37', question: 'I get upset when things go wrong' },
  { id: 'radio38', question: 'I have never become irritated with a coworker' },
  { id: 'radio39', question: 'I cannot always control my anger in front of others' },
  { id: 'radio40', question: 'I am sometimes impatient with people' },
  { id: 'radio41', question: 'I generally remain calm and composed in stressful situations' },
  { id: 'radio42', question: 'I get stressed easily' },
 ]

export function Step8() {
  const { formData, updateFormData, setCurrentStep, markStepCompleted } = useFormContext()
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      radio28: formData.radio28,
      radio29: formData.radio29,
      radio30: formData.radio30,
      radio31: formData.radio31,
      radio32: formData.radio32,
      radio33: formData.radio33,
      radio34: formData.radio34,
      radio35: formData.radio35,
      radio36: formData.radio36,
      radio37: formData.radio37,
      radio38: formData.radio38,
      radio39: formData.radio39,
      radio40: formData.radio40,
      radio41: formData.radio41,
      radio42: formData.radio42,
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
    setCurrentStep(8)
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
    markStepCompleted(8)
    setCurrentStep(9)
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
