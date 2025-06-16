"use client"

import Image from "next/image"

import { FormNavigation } from "@/components/form-navigation"
import { useFormContext } from "@/contexts/form-context"

export function Step2() {
  const { setCurrentStep } = useFormContext()

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
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

          <div className="bg-card border rounded-lg p-4 sm:p-6 shadow-sm">
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-foreground">
                  Important Instructions
                </h2>
              </div>

              <div className="space-y-1.5 rounded-lg border bg-muted/30 p-3.5">
                <p className="font-medium text-foreground">
                  You must choose one answer for each column.
                </p>
                <p className="text-sm text-muted-foreground">
                  This instruction applies to all questions in the assessment.
                </p>
              </div>
              
              <div className="flex justify-center">
                <Image
                  src="/formexample.png"
                  alt="Form Example"
                  width={1039}
                  height={816}
                  className="rounded-md shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <FormNavigation
            onPrevious={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        </div>
      </div>
    </div>
  )
} 