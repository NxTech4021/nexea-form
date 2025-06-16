"use client"

import { useState, useEffect } from "react"
import { useFormContext } from "@/contexts/form-context"
import { Step1 } from "@/components/steps/step-1"
import { Step2 } from "@/components/steps/step-2"
import { Step3 } from "@/components/steps/step-3"
import { Step4 } from "@/components/steps/step-4"
import { Step5 } from "@/components/steps/step-5"
import { Step6 } from "@/components/steps/step-6"

export function Assessment() {
  const { currentStep } = useFormContext()
  const [isVisible, setIsVisible] = useState(true)
  const [displayStep, setDisplayStep] = useState(currentStep)

  // Fade out and in the step
  useEffect(() => {
    if (currentStep !== displayStep) {
      setIsVisible(false)
      
      const timer = setTimeout(() => {
        setDisplayStep(currentStep)
        setIsVisible(true)
      }, 150)
      
      return () => clearTimeout(timer)
    }
  }, [currentStep, displayStep])

  const renderStep = () => {
    switch (displayStep) {
      case 1:
        return <Step1 />
      case 2:
        return <Step2 />
      case 3:
        return <Step3 />
      case 4:
        return <Step4 />
      case 5:
        return <Step5 />
      case 6:
        return <Step6 />
      default:
        return (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold">Assessment Complete</h2>
              <p className="text-muted-foreground">
                Thank you for completing the assessment!
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div 
      className={`transition-opacity duration-300 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {renderStep()}
    </div>
  )
} 