"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { FormNavigation } from "@/components/form-navigation"
import { useFormContext } from "@/contexts/form-context"

const formSchema = z.object({
  workStyle: z.enum(["independent", "collaborative", "mixed"], {
    required_error: "Please select your preferred work style.",
  }),
  decisionMaking: z.enum(["quick", "deliberate", "consultative"], {
    required_error: "Please select your decision-making approach.",
  }),
})

export function Step2() {
  const { formData, updateFormData, setCurrentStep, markStepCompleted } = useFormContext()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workStyle: formData.workStyle || undefined,
      decisionMaking: formData.decisionMaking || undefined,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateFormData(values)
    markStepCompleted(2)
    setCurrentStep(3)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-card border rounded-lg p-4 sm:p-6 shadow-sm">
            <div className="text-left space-y-2 sm:space-y-3">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Entrepreneurs Behaviour Assessment
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <FormNavigation 
            // onNext={() => form.handleSubmit(onSubmit)()}
            // isNextDisabled={!form.formState.isValid}
          />
        </div>
      </div>
    </div>
  )
} 