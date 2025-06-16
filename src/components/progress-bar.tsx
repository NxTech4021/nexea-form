"use client"

import { Progress } from "@/components/ui/progress"
import { useFormContext } from "@/contexts/form-context"

export function ProgressBar() {
  const { currentStep, totalSteps } = useFormContext()
  const progressPercentage = (currentStep / totalSteps) * 100

  return (
    <div className="w-full space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
      <Progress value={progressPercentage} className="h-2 bg-muted" />
    </div>
  )
} 