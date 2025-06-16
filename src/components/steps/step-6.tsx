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
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FormNavigation } from "@/components/form-navigation"
import { useFormContext } from "@/contexts/form-context"
import { cn } from "@/lib/utils"
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
                {columns.map((_column, columnIndex) => {
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
                <RadioGroupItem value={option} id={`${questionId}-${index}`} />
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
  radio1: z.string({ required_error: validationMessages.radio_incomplete }),
  radio2: z.string({ required_error: validationMessages.radio_incomplete }),
  radio3: z.string({ required_error: validationMessages.radio_incomplete }),
  matrix34: matrixSchema,
  radio4: z.string({ required_error: validationMessages.radio_incomplete }),
  radio5: z.string({ required_error: validationMessages.radio_incomplete }),
  radio6: z.string({ required_error: validationMessages.radio_incomplete }),
  radio7: z.string({ required_error: validationMessages.radio_incomplete }),
  radio8: z.string({ required_error: validationMessages.radio_incomplete }),
  matrix35: matrixSchema,
  radio9: z.string({ required_error: validationMessages.radio_incomplete }),
  radio10: z.string({ required_error: validationMessages.radio_incomplete }),
  matrix36: matrixSchema,
  radio11: z.string({ required_error: validationMessages.radio_incomplete }),
  radio12: z.string({ required_error: validationMessages.radio_incomplete }),
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
  
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
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

  const { trigger } = form
  const { errors } = form.formState

  const handleMatrixChange = (
    fieldName: keyof FormSchemaType,
    onChange: (value: Record<string, string>) => void,
    newValue: Record<string, string>
  ) => {
    onChange(newValue);
    trigger(fieldName);
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
  }

  const onInvalid = (errors: any) => {
    const errorFields = Object.keys(errors)
    if (errorFields.length > 0) {
      const firstErrorId = questionsData.find(q => errorFields.includes(q.id))?.id
      if (firstErrorId) {
        scrollToQuestion(firstErrorId)
      }
    }
  }

  function onSubmit(values: FormSchemaType) {
    updateFormData(values)
    markStepCompleted(6)
    setCurrentStep(7)
  }

  return (
    <div className="min-h-screen bg-background">
      <QuestionSidebar titles={questionTitles} onTitleClick={scrollToQuestion} />
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
                            errors={errors[q.id]?.message ? [errors[q.id]?.message as string] : []}
                            matrixId={q.id}
                          />
                        )}
                        {q.type === 'radio' && (
                          <RadioQuestion
                            question={q.question}
                            options={radioOptions}
                            value={field.value as string}
                            onChange={field.onChange}
                            error={errors[q.id]?.message as string | undefined}
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
            onNext={form.handleSubmit(onSubmit, onInvalid)}
            isNextDisabled={!form.formState.isValid}
          />
        </div>
      </div>
    </div>
  )
}
