"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { AlertCircle } from "lucide-react"

// Matrix Assessment Component
export interface MatrixAssessmentProps {
  question: string
  rows: string[]
  columns: string[]
  value: Record<string, string>
  onChange: (value: Record<string, string>) => void
  errors?: string[]
  matrixId: string
}

export function MatrixAssessment({ 
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
                  const isColumnSelected = Object.values(value).includes(columnValue);
                  const isCurrentCellSelected = value[`row_${rowIndex}`] === columnValue;
                  const isMuted = isColumnSelected && !isCurrentCellSelected;
                  
                  return (
                    <div key={columnIndex} className="flex justify-center">
                      <Label
                        htmlFor={`${matrixId}-${rowIndex}-${columnIndex}`}
                        className="p-2 rounded-full hover:bg-muted/80 transition-colors cursor-pointer flex items-center justify-center"
                      >
                        <RadioGroupItem
                          value={columnValue}
                          id={`${matrixId}-${rowIndex}-${columnIndex}`}
                          className={cn("w-4 h-4 cursor-pointer", isMuted && "opacity-30")}
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