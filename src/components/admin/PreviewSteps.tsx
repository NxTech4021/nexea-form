// src/components/admin/PreviewSteps.tsx
'use client'

import React, { useState } from 'react'
import { useFormContext, QuestionDefinition } from '@/contexts/form-context'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const ITEMS_PER_PAGE = 5

export function PreviewSteps() {
  const { questions } = useFormContext()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStep, setSelectedStep] = useState<number | 'all'>('all')

  // Filter questions by step if selected
  const filteredQuestions = selectedStep === 'all' 
    ? questions 
    : questions.filter(q => q.step === selectedStep)

  // Calculate pagination
  const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedQuestions = filteredQuestions.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePrevPage = () => setCurrentPage(p => Math.max(1, p - 1))
  const handleNextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1))

  if (!questions || questions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Preview Form</CardTitle>
          <CardDescription>No questions defined yet.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preview Form</CardTitle>
          <CardDescription>Preview how your form will look to users.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="step-filter">Filter by Step</Label>
            <Select
              value={String(selectedStep)}
              onValueChange={(value) => {
                setSelectedStep(value === 'all' ? 'all' : Number(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select step" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Steps</SelectItem>
                {Array.from(new Set(questions.map(q => q.step))).sort((a, b) => a - b).map(step => (
                  <SelectItem key={step} value={String(step)}>
                    Step {step}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <ScrollArea className="h-[600px] rounded-md border p-4">
        <div className="space-y-8 pb-6">
          {paginatedQuestions.map((q) => (
            <Card key={q.id} className="relative">
              <CardHeader>
                <div className="absolute top-4 right-4 text-sm text-muted-foreground">
                  Step {q.step}
                </div>
                <CardTitle className="text-lg font-medium">
                  {q.text}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {q.type === 'text' && (
                  <Input
                    type="text"
                    disabled
                    placeholder="User's answer will appear here"
                    className="max-w-md"
                  />
                )}

                {q.type === 'radio' && (
                  <RadioGroup disabled defaultValue={q.options[0]} className="space-y-2">
                    {q.options.map((opt, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`${q.id}-${idx}`} />
                        <Label htmlFor={`${q.id}-${idx}`}>{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {q.type === 'matrix' && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="p-2 border"></th>
                          {Array(5).fill(0).map((_, i) => (
                            <th key={i} className="p-2 border text-center w-24">
                              Option {i + 1}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {q.rows?.map((row, i) => (
                          <tr key={i}>
                            <td className="p-2 border">{row}</td>
                            <td colSpan={5} className="p-2 border">
                              <RadioGroup
                                disabled
                                defaultValue="0"
                                className="flex justify-around"
                                orientation="horizontal"
                              >
                                {Array(5).fill(0).map((_, j) => (
                                  <RadioGroupItem
                                    key={j}
                                    value={String(j)}
                                    id={`${q.id}-${i}-${j}`}
                                    className="data-[state=checked]:bg-primary"
                                  />
                                ))}
                              </RadioGroup>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {totalPages > 1 && (
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          <div className="flex gap-2">
            {(() => {
              const pages = []
              const maxVisible = 5 // Show max 5 page numbers at once
              const halfVisible = Math.floor(maxVisible / 2)

              // Always show first page
              pages.push(
                <Button
                  key={1}
                  variant={currentPage === 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </Button>
              )

              // Calculate range of visible pages
              let startPage = Math.max(2, currentPage - halfVisible)
              let endPage = Math.min(totalPages - 1, currentPage + halfVisible)

              // Adjust range if at edges
              if (currentPage <= halfVisible + 1) {
                endPage = Math.min(totalPages - 1, maxVisible - 1)
              } else if (currentPage >= totalPages - halfVisible) {
                startPage = Math.max(2, totalPages - maxVisible + 1)
              }

              // Add ellipsis after first page if needed
              if (startPage > 2) {
                pages.push(
                  <Button key="start-ellipsis" variant="outline" disabled>
                    ...
                  </Button>
                )
              }

              // Add middle pages
              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <Button
                    key={i}
                    variant={currentPage === i ? "default" : "outline"}
                    onClick={() => setCurrentPage(i)}
                  >
                    {i}
                  </Button>
                )
              }

              // Add ellipsis before last page if needed
              if (endPage < totalPages - 1) {
                pages.push(
                  <Button key="end-ellipsis" variant="outline" disabled>
                    ...
                  </Button>
                )
              }

              // Always show last page if more than 1 page
              if (totalPages > 1) {
                pages.push(
                  <Button
                    key={totalPages}
                    variant={currentPage === totalPages ? "default" : "outline"}
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </Button>
                )
              }

              return pages
            })()}
          </div>
          
          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
