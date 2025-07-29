// src/components/admin/PreviewSteps.tsx
'use client'

import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { QuestionDefinition, useFormContext } from '@/contexts/form-context'

const ITEMS_PER_PAGE = 5

export function PreviewSteps() {
  const { questions } = useFormContext()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStep, setSelectedStep] = useState<'all' | number>('all')

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
              onValueChange={(value) => {
                setSelectedStep(value === 'all' ? 'all' : Number(value))
                setCurrentPage(1)
              }}
              value={String(selectedStep)}
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
            <Card className="relative" key={q.id}>
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
                    className="max-w-md"
                    disabled
                    placeholder="User's answer will appear here"
                    type="text"
                  />
                )}

                {q.type === 'radio' && (
                  <RadioGroup className="space-y-2" defaultValue={q.options[0]} disabled>
                    {q.options.map((opt, idx) => (
                      <div className="flex items-center space-x-2" key={idx}>
                        <RadioGroupItem id={`${q.id}-${idx}`} value={opt} />
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
                            <th className="p-2 border text-center w-24" key={i}>
                              Option {i + 1}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {q.rows?.map((row, i) => (
                          <tr key={i}>
                            <td className="p-2 border">{row}</td>
                            <td className="p-2 border" colSpan={5}>
                              <RadioGroup
                                className="flex justify-around"
                                defaultValue="0"
                                disabled
                                orientation="horizontal"
                              >
                                {Array(5).fill(0).map((_, j) => (
                                  <RadioGroupItem
                                    className="data-[state=checked]:bg-primary"
                                    id={`${q.id}-${i}-${j}`}
                                    key={j}
                                    value={String(j)}
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
            disabled={currentPage === 1}
            onClick={handlePrevPage}
            variant="outline"
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
                  onClick={() => setCurrentPage(1)}
                  variant={currentPage === 1 ? "default" : "outline"}
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
                  <Button disabled key="start-ellipsis" variant="outline">
                    ...
                  </Button>
                )
              }

              // Add middle pages
              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <Button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    variant={currentPage === i ? "default" : "outline"}
                  >
                    {i}
                  </Button>
                )
              }

              // Add ellipsis before last page if needed
              if (endPage < totalPages - 1) {
                pages.push(
                  <Button disabled key="end-ellipsis" variant="outline">
                    ...
                  </Button>
                )
              }

              // Always show last page if more than 1 page
              if (totalPages > 1) {
                pages.push(
                  <Button
                    key={totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    variant={currentPage === totalPages ? "default" : "outline"}
                  >
                    {totalPages}
                  </Button>
                )
              }

              return pages
            })()}
          </div>
          
          <Button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
            variant="outline"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
