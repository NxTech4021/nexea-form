// src/app/admin/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useFormContext, QuestionDefinition } from '@/contexts/form-context'
import { FormProvider } from '@/contexts/form-context'
import Image from 'next/image'

type QuestionType = 'text' | 'radio' | 'matrix'
type AdminTab = 'form' | 'emails' | 'preview'

import { PreviewSteps } from '@/components/admin/PreviewSteps'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Spinner } from '@/components/ui'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Separate the form editor component
function FormEditor() {
  const { 
    questions, 
    createQuestion, 
    updateQuestion, 
    deleteQuestion,
    isLoading,
    error 
  } = useFormContext()
  const [adminStep, setAdminStep] = useState<number>(1)

  // Form editor state and functions
  const stepQs = questions.filter((q) => q.step === adminStep)

  const handleUpdateQuestion = async (id: string, patch: Partial<QuestionDefinition>) => {
    const question = questions.find(q => q.id === id)
    if (!question) return

    try {
      await updateQuestion({
        ...question,
        ...patch
      })
    } catch (err) {
      console.error('Failed to update question:', err)
    }
  }

  const handleAddQuestion = async () => {
    try {
      await createQuestion({
        step: adminStep,
        text: 'New question',
        type: 'text',
        options: [],
        rows: []
      })
    } catch (err) {
      console.error('Failed to create question:', err)
    }
  }

  const handleDeleteQuestion = async (id: string) => {
    try {
      await deleteQuestion(id)
    } catch (err) {
      console.error('Failed to delete question:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Form Editor</CardTitle>
          <CardDescription>
            Edit your form questions and structure. Changes are saved automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Select
                value={String(adminStep)}
                onValueChange={(v) => setAdminStep(Number(v))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select step to edit" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 13 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      Step {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddQuestion} disabled={isLoading}>
              + Add Question
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <ScrollArea className="h-[600px] rounded-md border">
        <div className="p-6 space-y-6">
          <Accordion type="single" collapsible className="w-full">
            {stepQs.map((q, idx) => (
              <AccordionItem key={q.id} value={q.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">Q{idx + 1}</Badge>
                    <span className="font-normal text-left">
                      {q.text.length > 60 ? q.text.substring(0, 60) + '...' : q.text}
                    </span>
                    <Badge>{q.type}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardContent className="pt-6 space-y-6">
                      {/* Question Text */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Question Text</label>
                        <Textarea
                          value={q.text}
                          onChange={(e) => handleUpdateQuestion(q.id, { text: e.target.value })}
                          placeholder="Enter your question"
                          className="min-h-[100px]"
                        />
                      </div>

                      <Separator />

                      {/* Question Type */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Question Type</label>
                        <Select
                          value={q.type}
                          onValueChange={(v) =>
                            handleUpdateQuestion(q.id, { type: v as QuestionType })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text Input</SelectItem>
                            <SelectItem value="radio">Multiple Choice</SelectItem>
                            <SelectItem value="matrix">Matrix</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      {/* Radio Options */}
                      {q.type === 'radio' && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">Answer Options</label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleUpdateQuestion(q.id, { options: [...q.options, ''] })
                              }
                            >
                              Add Option
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {q.options.map((opt, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <Input
                                  value={opt}
                                  onChange={(e) => {
                                    const opts = [...q.options]
                                    opts[i] = e.target.value
                                    handleUpdateQuestion(q.id, { options: opts })
                                  }}
                                  placeholder={`Option ${i + 1}`}
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    const opts = q.options.filter((_, j) => j !== i)
                                    handleUpdateQuestion(q.id, { options: opts })
                                  }}
                                >
                                  ×
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Matrix Rows */}
                      {q.type === 'matrix' && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">Matrix Rows</label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleUpdateQuestion(q.id, { rows: [...(q.rows ?? []), ''] })
                              }
                            >
                              Add Row
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {(q.rows ?? []).map((row, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <Input
                                  value={row}
                                  onChange={(e) => {
                                    const rows = [...(q.rows ?? [])]
                                    rows[i] = e.target.value
                                    handleUpdateQuestion(q.id, { rows })
                                  }}
                                  placeholder={`Row ${i + 1}`}
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    const rows = (q.rows ?? []).filter((_, j) => j !== i)
                                    handleUpdateQuestion(q.id, { rows })
                                  }}
                                >
                                  ×
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-end pt-6">
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteQuestion(q.id)}
                        disabled={isLoading}
                      >
                        Delete Question
                      </Button>
                    </CardFooter>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {stepQs.length === 0 && (
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  No questions in this step yet.
                  <br />
                  Click "Add Question" to create one.
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>('form')
  const [emailInput, setEmailInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Email allowlist functions
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const emails = emailInput.split(/[\n,]/).map(e => e.trim()).filter(Boolean)
      
      for (const email of emails) {
        const res = await fetch('/api/admin/allowlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, credits: 1 }),
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Failed to add email')
        }
      }

      setSuccess(`Successfully added ${emails.length} email(s) to allowlist`)
      setEmailInput('')
    } catch (err: any) {
      setError(err.message || 'Failed to add email(s) to allowlist')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FormProvider>
      <div className="min-h-screen bg-background">
        {/* Modern Header */}
        <header className="sticky top-0 z-50 bg-card border-border border-b">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center gap-6">
              <Link 
                href="/" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-left"
                >
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                <span>Back to Survey</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-4">
                <Image alt='NEXEA Logo' height={32} src='/nexealogo.png' width={32} />
                <h1 className="text-xl font-bold tracking-tight text-foreground">Assessment Form Editor</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary" />
                All changes saved
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 max-w-6xl mx-auto space-y-6">
          <Tabs value={tab} onValueChange={(v) => setTab(v as AdminTab)} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="form">Form Editor</TabsTrigger>
              <TabsTrigger value="emails">Email Management</TabsTrigger>
              <TabsTrigger value="preview">Preview Form</TabsTrigger>
            </TabsList>

            <TabsContent value="form" className="space-y-4">
              <FormEditor />
            </TabsContent>

            <TabsContent value="emails">
              <Card>
                <CardHeader>
                  <CardTitle>Email Allowlist Management</CardTitle>
                  <CardDescription>
                    Add emails to the allowlist. Each email will receive 1 credit.
                    Enter multiple emails separated by commas or newlines.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Email Addresses
                      </label>
                      <Textarea
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Enter emails (one per line or comma-separated)&#10;example1@domain.com&#10;example2@domain.com"
                        rows={6}
                        className="font-mono"
                        disabled={isSubmitting}
                      />
                    </div>
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    {success && (
                      <Alert variant="default" className="bg-green-50 border-green-200">
                        <AlertDescription className="text-green-800">{success}</AlertDescription>
                      </Alert>
                    )}
                    <Button
                      type="submit"
                      disabled={isSubmitting || !emailInput.trim()}
                      className="w-full"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Spinner size="sm" />
                          Adding...
                        </span>
                      ) : (
                        'Add to Allowlist'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview">
              <PreviewSteps />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </FormProvider>
  )
}
