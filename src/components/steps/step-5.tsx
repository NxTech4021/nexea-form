"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { FormNavigation } from "@/components/form-navigation"
import { useFormContext } from "@/contexts/form-context"
import { useState } from "react"
import { QuestionSidebar } from "@/components/question-sidebar"
import { MatrixAssessment } from "@/components/matrix-assessment"
import Image from "next/image"

const formSchema = z.object({
  matrix19: z.record(z.string()),
  matrix20: z.record(z.string()),
  matrix21: z.record(z.string()),
  matrix22: z.record(z.string()),
  matrix23: z.record(z.string()),
  matrix24: z.record(z.string()),
  matrix25: z.record(z.string()),
  matrix26: z.record(z.string()),
  matrix27: z.record(z.string()),
  matrix28: z.record(z.string()),
  matrix29: z.record(z.string()),
  matrix30: z.record(z.string()),
  matrix31: z.record(z.string()),
  matrix32: z.record(z.string()),
  matrix33: z.record(z.string()),
})

type MatrixName = keyof z.infer<typeof formSchema>;

export function Step5() {
  const { formData, updateFormData, setCurrentStep, markStepCompleted } = useFormContext()
  const [matrixErrors, setMatrixErrors] = useState<Record<string, string[]>>({});
  const [touchedMatrices, setTouchedMatrices] = useState<Record<string, boolean>>({});

  const matricesToValidate: MatrixName[] = [
    "matrix19", "matrix20", "matrix21", "matrix22", "matrix23", "matrix24",
    "matrix25", "matrix26", "matrix27", "matrix28", "matrix29", "matrix30",
    "matrix31", "matrix32", "matrix33"
  ];
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      matrix19: formData.matrix19 || {},
      matrix20: formData.matrix20 || {},
      matrix21: formData.matrix21 || {},
      matrix22: formData.matrix22 || {},
      matrix23: formData.matrix23 || {},
      matrix24: formData.matrix24 || {},
      matrix25: formData.matrix25 || {},
      matrix26: formData.matrix26 || {},
      matrix27: formData.matrix27 || {},
      matrix28: formData.matrix28 || {},
      matrix29: formData.matrix29 || {},
      matrix30: formData.matrix30 || {},
      matrix31: formData.matrix31 || {},
      matrix32: formData.matrix32 || {},
      matrix33: formData.matrix33 || {},
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
    matrixName: MatrixName,
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
    setCurrentStep(5);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    let firstErrorMatrix: string | null = null;
    const newTouchedState: Record<string, boolean> = {};

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
    markStepCompleted(5);
    setCurrentStep(6);
  }

  const columns = ["Least Accurate", "Somewhat Accurate", "Quite Accurate", "Most Accurate"]
  
  const matrix19Rows = [ "Takes me away from important day-to-day work", "Is undesirable if it requires too many changes to our policies", "Creates opportunities for creative thinking", "Creates too much change and conflict/disharmony" ]
  const matrix20Rows = [ "Establishing procedures which ensure efficient use of our resources", "Getting the day-to-day work done", "Ensuring my organization remains on the cutting edge", "Motivating my colleagues in their work", ]
  const matrix21Rows = [ "Finding new ways to accomplish my work", "Ensuring that things are done correctly", "Getting results", "Maintaining a collaborative working environment", ]
  const matrix22Rows = [ "Getting results fast", "Minimizing risk", "Finding a solution that is acceptable to everyone", "Finding new and innovative solutions", ]
  const matrix23Rows = [ "Who is well-liked", "They can approach for accurate information", "Who can find new solutions", "Who can get the job done", ]
  const matrix24Rows = [ "Require cooperation with colleagues", "Give me the opportunity to think out side of the box", "Are clearly defined and allow me to work systematically and within a structure", "Allow me to see the results quickly", ]
  const matrix25Rows = [ "Systematize", "Achieve goals", "Change and be flexible", "Work well with others", ]
  const matrix26Rows = [ "Opportunities to be creative", "Stability and job security", "Demands on the individual to perform", "An environment where teamwork is valued" ]
  const matrix27Rows = [ "Big idea person", "Hard worker", "Team player", "Precise and accurate worker", ]
  const matrix28Rows = [ "Work quickly and in an orderly way", "Inspire the commitment of my colleagues", "Find new methods of working", "Work carefully and systematically", ]
  const matrix29Rows = [ "Meet my performance objectives", "Foresee and plan for future developments", "Work with others in a collaborative environment", "See that the rules and regulations are followed", ]
  const matrix30Rows = [ "Work hard", "Foresee future trends and opportunities", "Attend to details and minimize mistakes", "Get others to view things from a different perspective", ]
  const matrix31Rows = [ "Getting results", "Working closely with others", "Being in a secure and stable working environment", "Risks and excitement", ]
  const matrix32Rows = [ "Developing people", "Assuring the day-to-day work is achieved", "Developing new products/services/systems", "Making sure that rules and systems are clearly defined and adhered to", ]
  const matrix33Rows = [ "Do not have enough information", "Am not sure of other people's opinion", "Have too much to do", "See multiple solutions to the problem", ]

  const matrixTitles = [
    { id: "matrix19", title: "Development Work", shortTitle: "Development Work", question: "My attitude toward development work is that it:" },
    { id: "matrix20", title: "Job Importance", shortTitle: "Job Importance", question: "The most important aspect of my job is:" },
    { id: "matrix21", title: "Job Abilities", shortTitle: "Job Abilities", question: "In my job I am good at:" },
    { id: "matrix22", title: "Good Day", shortTitle: "Good Day", question: "What I consider most important when making a decision is:" },
    { id: "matrix23", title: "Colleague Values", shortTitle: "Colleague Values", question: "Deep down, I would like my colleagues to see me as someone:" },
    { id: "matrix24", title: "Tasks", shortTitle: "Tasks", question: "The kinds of tasks I like are those that:" },
    { id: "matrix25", title: "Quality", shortTitle: "Quality", question: "My most important quality in my current job is my ability to:" },
    { id: "matrix26", title: "Work Performance", shortTitle: "Work Performance", question: "The type of work where I perform well is work which requires:" },
    { id: "matrix27", title: "Thought of as", shortTitle: "Thought of as", question: "I want to be thought of as a:" },
    { id: "matrix28", title: "Job Requirements", shortTitle: "Job Requirements", question: "My job requires me to:" },
    { id: "matrix29", title: "Job", shortTitle: "Job", question: "What pleases me most in my current job is when I am able to:" },
    { id: "matrix30", title: "Manager", shortTitle: "Manager", question: "Managers in our organization are praised for their ability to:" },
    { id: "matrix31", title: "Motivation", shortTitle: "Motivation", question: "The person taking over from me should be motivated by:" },
    { id: "matrix32", title: "Boss Expectations", shortTitle: "Boss Expectations", question: "The most important areas of responsibility in my job are:" },
    { id: "matrix33", title: "Culture", shortTitle: "Culture", question: "The primary reason that I wait to make an important decision is that I:" }
  ]

  const matrixData: { name: MatrixName, rows: string[], question: string }[] = [
    { name: 'matrix19', rows: matrix19Rows, question: "My attitude toward development work is that it:" },
    { name: 'matrix20', rows: matrix20Rows, question: "The most important aspect of my job is:" },
    { name: 'matrix21', rows: matrix21Rows, question: "In my job I am good at:" },
    { name: 'matrix22', rows: matrix22Rows, question: "What I consider most important when making a decision is:" },
    { name: 'matrix23', rows: matrix23Rows, question: "Deep down, I would like my colleagues to see me as someone:" },
    { name: 'matrix24', rows: matrix24Rows, question: "The kinds of tasks I like are those that:" },
    { name: 'matrix25', rows: matrix25Rows, question: "My most important quality in my current job is my ability to:" },
    { name: 'matrix26', rows: matrix26Rows, question: "The type of work where I perform well is work which requires:" },
    { name: 'matrix27', rows: matrix27Rows, question: "I want to be thought of as a:" },
    { name: 'matrix28', rows: matrix28Rows, question: "My job requires me to:" },
    { name: 'matrix29', rows: matrix29Rows, question: "What pleases me most in my current job is when I am able to:" },
    { name: 'matrix30', rows: matrix30Rows, question: "Managers in our organization are praised for their ability to:" },
    { name: 'matrix31', rows: matrix31Rows, question: "The person taking over from me should be motivated by:" },
    { name: 'matrix32', rows: matrix32Rows, question: "The most important areas of responsibility in my job are:" },
    { name: 'matrix33', rows: matrix33Rows, question: "The primary reason that I wait to make an important decision is that I:" },
  ]

  return (
    <div className="min-h-screen">
      <QuestionSidebar titles={matrixTitles} onTitleClick={scrollToMatrix} />

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
              {matrixData.map(({ name, rows, question }) => (
                <div id={`${name}-section`} key={name}>
                  <FormField
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <MatrixAssessment
                          question={question}
                          rows={rows}
                          columns={columns}
                          value={field.value}
                          onChange={(newValue) => handleMatrixChange(name, field.onChange, newValue)}
                          errors={matrixErrors[name]}
                          matrixId={name}
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
