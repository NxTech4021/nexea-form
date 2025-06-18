"use client"

import { AlertCircle } from "lucide-react"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Matrix Assessment Component
export interface MatrixAssessmentProps {
  columns: string[]
  errors?: string[]
  matrixId: string
  onChange: (value: Record<string, string>) => void
  question: string
  rows: string[]
  value: Record<string, string>
}

export function MatrixAssessment({ 
  columns, 
  errors = [], 
  matrixId, 
  onChange, 
  question, 
  rows,
  value 
}: MatrixAssessmentProps) {
  const handleRowChange = (rowIndex: number, columnValue: string) => {
    const newValue = { ...value }
    newValue[`row_${rowIndex}`] = columnValue
    onChange(newValue)
  }

  // Check if there's a duplicate column error
  const hasDuplicateError = errors.some(error => 
    error.includes("Please don't select more than one response per column")
  )

  // Find which columns have duplicates
  const getDuplicateColumns = () => {
    if (!hasDuplicateError) return new Set()
    
    const columnCounts: Record<string, number> = {}
    Object.values(value).forEach(columnValue => {
      columnCounts[columnValue] = (columnCounts[columnValue] || 0) + 1
    })
    
    const duplicateColumns = new Set<number>()
    Object.entries(columnCounts).forEach(([columnValue, count]) => {
      if (count > 1) {
        // Extract column index from columnValue (e.g., "col_0" -> 0)
        const columnIndex = parseInt(columnValue.split('_')[1])
        duplicateColumns.add(columnIndex)
      }
    })
    
    return duplicateColumns
  }

  const duplicateColumns = getDuplicateColumns()

  return (
    <div className={cn(
      "bg-card border rounded-lg p-3 sm:p-5 shadow-sm transition-colors relative",
      errors.length > 0 && "border-red-500 border-1"
    )}>
      <div className="space-y-2 sm:space-y-3">
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-2" id={`${matrixId}-title`}>{question}</h3>
          <Separator className="mb-2 sm:mb-3" />
        </div>
      
      {/* Wrapper for column headers and matrix grid with seamless overlay */}
      <div className="relative">
        {/* Column Headers */}
        <div className="pb-1 sm:pb-2">
          <div className="grid grid-cols-5 gap-1 sm:gap-2 text-xs sm:text-sm font-semibold text-foreground items-end">
            <div></div> {/* Empty cell for row labels */}
            {columns.map((column, index) => (
              <div 
                className={cn(
                  "text-center px-1 py-1 relative z-10",
                  duplicateColumns.has(index) && "text-foreground"
                )} 
                key={index}
              >
                {column}
              </div>
            ))}
          </div>
        </div>
        
        {/* Matrix Grid */}
        <div className="space-y-1 sm:space-y-2">
          {rows.map((row, rowIndex) => (
            <div className="bg-muted/30 rounded-lg p-2 sm:p-3 border border-muted/50 hover:bg-muted/40 transition-colors" key={rowIndex}>
              <div className="grid grid-cols-5 gap-1 sm:gap-2 items-center">
                <div className="text-xs sm:text-sm font-medium text-foreground pr-1 sm:pr-2">
                  {row}
                </div>
                
                <RadioGroup
                  className="contents"
                  onValueChange={(columnValue) => handleRowChange(rowIndex, columnValue)}
                  value={value[`row_${rowIndex}`] || ""}
                >
                  {columns.map((_column, columnIndex) => {
                    const columnValue = `col_${columnIndex}`
                    const isColumnSelected = Object.values(value).includes(columnValue);
                    const isCurrentCellSelected = value[`row_${rowIndex}`] === columnValue;
                    const isMuted = isColumnSelected && !isCurrentCellSelected && !hasDuplicateError;
                    
                    return (
                      <div className="flex justify-center" key={columnIndex}>
                        <Label
                          className="p-2 rounded-full hover:bg-muted/80 transition-colors cursor-pointer flex items-center justify-center relative z-10"
                          htmlFor={`${matrixId}-${rowIndex}-${columnIndex}`}
                        >
                          <RadioGroupItem
                            className={cn("w-4 h-4 cursor-pointer", isMuted && "opacity-30")}
                            id={`${matrixId}-${rowIndex}-${columnIndex}`}
                            value={columnValue}
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
        
        {/* Seamless Column Overlay Boxes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="grid grid-cols-5 gap-1 sm:gap-2 h-full">
            <div></div> {/* Empty cell for row labels */}
            {columns.map((_column, index) => (
              <div 
                className={cn(
                  "relative h-full rounded-md",
                  duplicateColumns.has(index) && "bg-red-50/70 border-2 border-red-500"
                )}
                key={index}
              />
            ))}
          </div>
        </div>
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