"use client"

import { useEffect, useState } from "react"
import Confetti from 'react-confetti'

import { Step1 } from "@/components/steps/step-1"
import { Step10 } from "@/components/steps/step-10"
import { Step11 } from "@/components/steps/step-11"
import { Step12 } from "@/components/steps/step-12"
import { Step13 } from "@/components/steps/step-13"
import { Step2 } from "@/components/steps/step-2"
import { Step3 } from "@/components/steps/step-3"
import { Step4 } from "@/components/steps/step-4"
import { Step5 } from "@/components/steps/step-5"
import { Step6 } from "@/components/steps/step-6"
import { Step7 } from "@/components/steps/step-7"
import { Step8 } from "@/components/steps/step-8"
import { Step9 } from "@/components/steps/step-9"
import { Button } from "@/components/ui/button"
import { useFormContext } from "@/contexts/form-context"

export function Assessment() {
  const { currentStep, resetForm } = useFormContext()
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
      case 10:
        return <Step10 />
      case 11:
        return <Step11 />
      case 12:
        return <Step12 />
      case 13:
        return <Step13 />
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
      case 7:
        return <Step7 />
      case 8:
        return <Step8 />
      case 9:
        return <Step9 />
      default:
        return (
          <>
            <Confetti numberOfPieces={500} recycle={false} />
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-semibold">Assessment Complete</h2>
                <p className="text-muted-foreground">
                  Thank you for completing the assessment!
                </p>
                <Button className="cursor-pointer" onClick={resetForm}>Take Another Test</Button>
              </div>
            </div>
          </>
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