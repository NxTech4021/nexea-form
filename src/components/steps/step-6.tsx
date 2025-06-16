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
import { MatrixAssessment } from "@/components/matrix-assessment"
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

const MATRIX_ROWS = 4
const validationMessages = {
  matrix_duplicate: "Please don't select more than one response per column",
  matrix_incomplete: `This question requires one response per row.`,
  radio_incomplete: "This question requires a response",
}

const matrixSchema = z.record(z.string())
  .refine(val => Object.keys(val).length === MATRIX_ROWS, {
    message: validationMessages.matrix_incomplete,
  })
  .refine(val => {
    const selectedValues = Object.values(val)
    return new Set(selectedValues).size === selectedValues.length
  }, {
    message: validationMessages.matrix_duplicate,
  })

const formSchema = z.object({
  radio1: z.string().optional(),
  radio2: z.string().optional(),
  radio3: z.string().optional(),
  matrix34: z.record(z.string()),
  radio4: z.string().optional(),
  radio5: z.string().optional(),
  radio6: z.string().optional(),
  radio7: z.string().optional(),
  radio8: z.string().optional(),
  matrix35: z.record(z.string()),
  radio9: z.string().optional(),
  radio10: z.string().optional(),
  matrix36: z.record(z.string()),
  radio11: z.string().optional(),
  radio12: z.string().optional(),
})

type FormSchemaType = z.infer<typeof formSchema>

const radioOptions = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree']
const columns = ["Least Accurate", "Somewhat Accurate", "Quite Accurate", "Most Accurate"]

const questionTitles = [
    { id: 'radio1', title: 'Introverted' },
    { id: 'radio2', title: 'Planning' },
    { id: 'radio3', title: 'Awkward' },
    { id: 'matrix34', title: 'Change' },
    { id: 'radio4', title: 'Inventive' },
    { id: 'radio5', title: 'Group Activities' },
    { id: 'radio6', title: 'Long Term Plans' },
    { id: 'radio7', title: 'Detailed Plans' },
    { id: 'radio8', title: 'Around New People' },
    { id: 'matrix35', title: 'Meetings' },
    { id: 'radio9', title: 'Spend Time By Myself' },
    { id: 'radio10', title: 'Inventive' },
    { id: 'matrix36', title: 'Colleagues Expectations' },
    { id: 'radio11', title: 'Planned Activities' },
    { id: 'radio12', title: 'Planning for the Future' },
]

type Question = {
  id: keyof FormSchemaType;
  type: 'radio' | 'matrix';
  question: string;
  rows?: string[];
};

const questionsData: Question[] = [
  { id: 'radio1', type: 'radio', question: 'I am usually an introverted person' },
  { id: 'radio2', type: 'radio', question: 'I enjoy planning my work carefully' },
  { id: 'radio3', type: 'radio', question: 'I feel awkward when meeting new people'},
  { id: 'matrix34', type: 'matrix', question: 'Of greatest concern to me when things change is that:',
  rows: [ 
    "There is acceptance by the people involved", 
    "We don't lose sight of the big picture", 
    "Things are done right and in the proper sequence", 
    "Things get done rapidly", ] },
  { id: 'radio4', type: 'radio', question: 'People describe me as inventive' },
  { id: 'radio5', type: 'radio', question: 'I really enjoy group activities' },
  { id: 'radio6', type: 'radio', question: 'I like to make long term plans' },
  { id: 'radio7', type: 'radio', question: 'I like to develop detailed plans for the task at hand' },
  { id: 'radio8', type: 'radio', question: 'I feel comfortable around new people' },
  { id: 'matrix35', type: 'matrix', question: 'For me, meetings are:', 
    rows: [ "A chance to listen to other points of view and understand the politics", 
      "A nuisance as they take time away from more important work", 
      "A place to see all of the risks associated with a new endevour", 
      "An opportunity to provide the big ideas and new solutions", ] },
  { id: 'radio9', type: 'radio', question: 'I like to spend time by myself' },
  { id: 'radio10', type: 'radio', question: 'I find it difficult to be inventive' },
  { id: 'matrix36', type: 'matrix', question: 'My colleagues expect me to:', 
    rows: [ "Work quickly", 
      "Dare to try new ideas or ways of doing things", 
      "Contribute to the maintenance of high quality", 
      "Help sort out conflicts", ] },
  { id: 'radio11', type: 'radio', question: 'I like to have all my activities planned well in advance' },
  { id: 'radio12', type: 'radio', question: 'I like planning for the future' }, ]

export function Step6() {
  const { formData, updateFormData, setCurrentStep, markStepCompleted } = useFormContext()
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      radio1: formData.radio1,
      radio2: formData.radio2,
      radio3: formData.radio3,
      matrix34: formData.matrix34 || {},
      radio4: formData.radio4,
      radio5: formData.radio5,
      radio6: formData.radio6,
      radio7: formData.radio7,
      radio8: formData.radio8,
      matrix35: formData.matrix35 || {},
      radio9: formData.radio9,
      radio10: formData.radio10,
      matrix36: formData.matrix36 || {},
      radio11: formData.radio11,
      radio12: formData.radio12,
    },
  })

  const validationMessages = {
    matrix_duplicate: "Please don't select more than one response per column",
    matrix_incomplete: `This question requires one response per row.`,
    radio_incomplete: "This question requires a response",
  }

  const runValidation = (fieldName: string, value: any, isMatrix: boolean, forceTouch = false) => {
    const newErrors: string[] = [];
    const isTouched = touched[fieldName] || forceTouch;

    if (isTouched) {
      if (isMatrix) {
        const rowCount = 4;
        if (Object.keys(value).length < rowCount) {
          newErrors.push(validationMessages.matrix_incomplete);
        } else {
          const selectedValues = Object.values(value);
          if (new Set(selectedValues).size < selectedValues.length) {
            newErrors.push(validationMessages.matrix_duplicate);
          }
        }
      } else { // isRadio
        if (!value) {
          newErrors.push(validationMessages.radio_incomplete);
        }
      }
    }
    
    setErrors(prev => ({ ...prev, [fieldName]: newErrors }));
    return newErrors;
  };

  const handleMatrixChange = (
    fieldName: keyof FormSchemaType,
    formOnChange: (value: Record<string, string>) => void,
    newValue: Record<string, string>
  ) => {
    formOnChange(newValue);
    if (!touched[fieldName]) {
      setTouched(prev => ({ ...prev, [fieldName]: true }));
    }
    runValidation(fieldName, newValue, true, true);
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
    runValidation(fieldName, newValue, false, true);
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
    setCurrentStep(6)
  }

  function onSubmit(values: FormSchemaType) {
    let firstErrorId: string | null = null;
    const newTouchedState: Record<string, boolean> = {};

    questionsData.forEach(q => {
      newTouchedState[q.id] = true;
      const value = values[q.id];
      const isMatrix = q.type === 'matrix';
      const validationErrors = runValidation(q.id, value, isMatrix, true);
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
    markStepCompleted(6)
    setCurrentStep(7)
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
                        {q.type === 'matrix' && q.rows && (
                          <MatrixAssessment
                            question={q.question}
                            rows={q.rows}
                            columns={columns}
                            value={field.value as Record<string, string>}
                            onChange={(newValue) => handleMatrixChange(q.id, field.onChange, newValue)}
                            errors={errors[q.id]}
                            matrixId={q.id}
                          />
                        )}
                        {q.type === 'radio' && (
                          <RadioQuestion
                            question={q.question}
                            options={radioOptions}
                            value={field.value as string}
                            onChange={(newValue) => handleRadioChange(q.id, field.onChange, newValue)}
                            error={errors[q.id]?.[0]}
                            questionId={q.id}
                          />
                        )}
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
