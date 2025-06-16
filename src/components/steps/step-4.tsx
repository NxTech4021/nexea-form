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
  matrix4: z.record(z.string()),
  matrix5: z.record(z.string()),
  matrix6: z.record(z.string()),
  matrix7: z.record(z.string()),
  matrix8: z.record(z.string()),
  matrix9: z.record(z.string()),
  matrix10: z.record(z.string()),
  matrix11: z.record(z.string()),
  matrix12: z.record(z.string()),
  matrix13: z.record(z.string()),
  matrix14: z.record(z.string()),
  matrix15: z.record(z.string()),
  matrix16: z.record(z.string()),
  matrix17: z.record(z.string()),
  matrix18: z.record(z.string()),
})

type MatrixName = keyof z.infer<typeof formSchema>;

export function Step4() {
  const { formData, updateFormData, setCurrentStep, markStepCompleted } = useFormContext()
  const [matrixErrors, setMatrixErrors] = useState<Record<string, string[]>>({});
  const [touchedMatrices, setTouchedMatrices] = useState<Record<string, boolean>>({});

  const matricesToValidate: MatrixName[] = [
    "matrix4", "matrix5", "matrix6", "matrix7", "matrix8", "matrix9", "matrix10",
    "matrix11", "matrix12", "matrix13", "matrix14", "matrix15", "matrix16",
    "matrix17", "matrix18"
  ];
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      matrix4: formData.matrix4 || {},
      matrix5: formData.matrix5 || {},
      matrix6: formData.matrix6 || {},
      matrix7: formData.matrix7 || {},
      matrix8: formData.matrix8 || {},
      matrix9: formData.matrix9 || {},
      matrix10: formData.matrix10 || {},
      matrix11: formData.matrix11 || {},
      matrix12: formData.matrix12 || {},
      matrix13: formData.matrix13 || {},
      matrix14: formData.matrix14 || {},
      matrix15: formData.matrix15 || {},
      matrix16: formData.matrix16 || {},
      matrix17: formData.matrix17 || {},
      matrix18: formData.matrix18 || {},
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
    setCurrentStep(4);
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
    markStepCompleted(4);
    setCurrentStep(5);
  }

  const columns = ["Least Accurate", "Somewhat Accurate", "Quite Accurate", "Most Accurate"]
  
  const matrix4Rows = [ "Work and get results", "Work well with others", "Work systematically", "Think creatively" ]
  const matrix5Rows = [ "Well liked", "In control of situations", "Using my creativity", "Making progress and getting things done" ]
  const matrix6Rows = [ "Pleasant and easy to work with", "Focused and organized", "Creative and forward thinking", "Good at getting things done" ]
  const matrix7Rows = [ "I am able to work without interruption", "My new ideas have won acceptance", "I have met all my objectives for the day", "We start from different viewpoints but in the end come out as an aligned team" ]
  const matrix8Rows = [ "Efficient and systematic", "A good judge of character and a mediator", "Creative and progressive", "Motivated by results" ]
  const matrix9Rows = [ "Clean up or organize my paper work", "Get ahead on the day-to-day work", "Develop a new project or explore new opportunities", "Develop better relationships with my colleagues, external partners, clients, prospective clients" ]
  const matrix10Rows = [ "Working hard to get things done", "Aligning colleagues, dealing with conflicts and fostering a team oriented climate", "Ensuring we have the right rules and that they are followed", "My job changes too often to be characterized" ]
  const matrix11Rows = [ "Opportunities to be creative", "Stability and job security", "Demands on the individual to perform", "An environment where teamwork is valued" ]
  const matrix12Rows = [ "Completing my tasks", "Planning and structuring my work day", "Spotting new opportunities", "Listening to others", ]
  const matrix13Rows = [ "Looking for innovative ways to get things done", "Ensuring compliance of decisions made", "Getting results from projects/tasks", "Ensuring acceptance of decisions/solutions by the parties concerned" ]
  const matrix14Rows = [ "A job that is challenging and offers opportunities to be creative", "A job that is stable and offers job security", "A job that is demanding and offers opportunities to perform", "A job that is team-oriented and offers opportunities to work with others" ]
  const matrix15Rows = [ "Inter-departmental teamwork", "Being at the cutting edge of our profession", "Having procedures and systems that work", "Getting things done", ]
  const matrix16Rows = [ "Be with people I like", "Be creative and develop my own ideas", "Concentrate on getting results", "Structure my work", ]
  const matrix17Rows = [ "Rules, regulations and standard operating procedures of our business", "Nuts and bolts of getting the job done", "Future of our industry", "Different individuals in our organization and how to get them to work together", ]
  const matrix18Rows = [ "Systemtically following internal procedures", "Cooperating and collaborating across departmental units", "Getting the day to day work done", "Thinking of new ways to face tomorrow's challenges", ]

  const matrixTitles = [
    { id: "matrix4", title: "Abilities", shortTitle: "Abilities", question: "What I want others to notice about me is my ability to:" },
    { id: "matrix5", title: "Feeling", shortTitle: "Feeling", question: "I need to feel that I am:" },
    { id: "matrix6", title: "Colleague Values", shortTitle: "Colleague Values", question: "My closest colleagues think I am:" },
    { id: "matrix7", title: "Good Day", shortTitle: "Good Day", question: "A good day for me is when:" },
    { id: "matrix8", title: "Complement", shortTitle: "Complement", question: "To complement the style of others in the team, the person holding my position should be:" },
    { id: "matrix9", title: "Spare Time", shortTitle: "Spare Time", question: "If I had some spare time at work, I would like to:" },
    { id: "matrix10", title: "Job Characteristics", shortTitle: "Job Characteristics", question: "My job is characterized by:" },
    { id: "matrix11", title: "New Job", shortTitle: "New Job", question: "In considering a new job, what is most important to me is:" },
    { id: "matrix12", title: "Manager", shortTitle: "Manager", question: "What characterizes me in my day-to-day work as a manager is that I am good at:" },
    { id: "matrix13", title: "Time Spent", shortTitle: "Time Spent", question: "I spend most of my time:" },
    { id: "matrix14", title: "New Job Characteristics", shortTitle: "New Job Characteristics", question: "The kind of new job I would like to apply for is characterized by:" },
    { id: "matrix15", title: "Daily Operation", shortTitle: "Daily Operation", question: "The most important thing for our daily operation is:" },
    { id: "matrix16", title: "Perfect World", shortTitle: "Perfect World", question: "In a perfect world, my job would permit me to:" },
    { id: "matrix17", title: "Boss Expectations", shortTitle: "Boss Expectations", question: "My boss expects me to know the:" },
    { id: "matrix18", title: "Culture", shortTitle: "Culture", question: "Our organization's culture is characterized by:" }
  ]

  const matrixData: { name: MatrixName, rows: string[], question: string }[] = [
    { name: 'matrix4', rows: matrix4Rows, question: "What I want others to notice about me is my ability to:" },
    { name: 'matrix5', rows: matrix5Rows, question: "I need to feel that I am:" },
    { name: 'matrix6', rows: matrix6Rows, question: "My closest colleagues think I am:" },
    { name: 'matrix7', rows: matrix7Rows, question: "A good day for me is when:" },
    { name: 'matrix8', rows: matrix8Rows, question: "To complement the style of others in the team, the person holding my position should be:" },
    { name: 'matrix9', rows: matrix9Rows, question: "If I had some spare time at work, I would like to:" },
    { name: 'matrix10', rows: matrix10Rows, question: "My job is characterized by:" },
    { name: 'matrix11', rows: matrix11Rows, question: "In considering a new job, what is most important to me is:" },
    { name: 'matrix12', rows: matrix12Rows, question: "What characterizes me in my day-to-day work as a manager is that I am good at:" },
    { name: 'matrix13', rows: matrix13Rows, question: "I spend most of my time:" },
    { name: 'matrix14', rows: matrix14Rows, question: "The kind of new job I would like to apply for is characterized by:" },
    { name: 'matrix15', rows: matrix15Rows, question: "The most important thing for our daily operation is:" },
    { name: 'matrix16', rows: matrix16Rows, question: "In a perfect world, my job would permit me to:" },
    { name: 'matrix17', rows: matrix17Rows, question: "My boss expects me to know the:" },
    { name: 'matrix18', rows: matrix18Rows, question: "Our organization's culture is characterized by:" },
  ]

  return (
    <div className="min-h-screen bg-background">
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
            isNextDisabled={!form.formState.isValid}
          />
        </div>
      </div>
    </div>
  )
}
