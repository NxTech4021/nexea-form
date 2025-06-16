"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useFormContext } from "@/contexts/form-context"
import { cn } from "@/lib/utils"

interface FormNavigationProps {
  onNext?: () => void
  onPrevious?: () => void
  isNextDisabled?: boolean
  isLastStep?: boolean
  nextLabel?: string
}

export function FormNavigation({ 
  onNext, 
  onPrevious, 
  isNextDisabled = false,
  isLastStep = false,
  nextLabel
}: FormNavigationProps) {
  const { currentStep, setCurrentStep, totalSteps } = useFormContext()
  const progressPercentage = (currentStep / totalSteps) * 100

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious()
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
    window.scrollTo(0, 0)
  }

  const handleNext = () => {
    if (onNext) {
      onNext()
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
    window.scrollTo(0, 0)
  }

  return (
    <div className="bg-card border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between gap-6">
        {/* Previous Button */}
        {currentStep > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            className="flex items-center gap-2 h-10 px-4 transition-all duration-200 flex-shrink-0 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
        ) : (
          <div className="w-[100px]"></div>
        )}

        {/* Progress Bar in the Middle */}
        <div className="flex-1 max-w-md space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-foreground">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-muted-foreground">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="relative">
            <Progress value={progressPercentage} className="h-2 bg-muted/50" />
            <div 
              className="absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${progressPercentage}%`,
                background: 'linear-gradient(to right, #1340FF, #1340FF80)'
              }}
            />
          </div>
        </div>

        {/* Next Button */}
        <Button
          type="submit"
          onClick={handleNext}
          disabled={isNextDisabled}
          className={cn(
            "flex items-center gap-2 h-10 px-6 transition-all duration-200 flex-shrink-0 cursor-pointer",
            isLastStep && "bg-green-600 hover:bg-green-700",
            isNextDisabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {nextLabel || (isLastStep ? "Complete Assessment" : "Next")}
          {!isLastStep && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
} 