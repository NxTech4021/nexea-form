// src/app/admin/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useFormContext, QuestionDefinition } from '@/contexts/form-context'

type QuestionType = 'text' | 'radio' | 'matrix'

import { PreviewSteps } from '@/components/admin/PreviewSteps'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
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

export default function AdminPage() {
  const { questions, setQuestions } = useFormContext()

  // which step we’re editing
  const [adminStep, setAdminStep] = useState<number>(1)
  // editor vs preview tab
  const [tab, setTab] = useState<'editor' | 'preview'>('editor')

  // only questions for this step
  const stepQs = questions.filter((q) => q.step === adminStep)

  // helper to patch one question
  const updateQ = (id: string, patch: Partial<QuestionDefinition>) => {
    setQuestions((qs) =>
      qs.map((q) => (q.id === id ? { ...q, ...patch } : q))
    )
  }

  // add a brand-new blank question
  const addQuestion = () => {
    setQuestions((qs) => [
      ...qs,
      {
        id: Date.now().toString(),
        step: adminStep,
        text: 'New question',
        type: 'text',
        options: [],
        rows: [],
      },
    ])
  }

  // remove by id
  const removeQuestion = (id: string) => {
    setQuestions((qs) => qs.filter((q) => q.id !== id))
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Link href="/" className="text-indigo-600 hover:underline">
        ← Back to Survey
      </Link>

      {/* Step picker */}
      <Card>
        <CardHeader>
          <CardTitle>Edit Step</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={String(adminStep)}
            onValueChange={(v) => setAdminStep(Number(v))}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Step…" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 13 }, (_, i) => (
                <SelectItem key={i + 1} value={String(i + 1)}>
                  Step {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex space-x-4">
        <Button
          variant={tab === 'editor' ? 'default' : 'outline'}
          onClick={() => setTab('editor')}
        >
          Editor
        </Button>
        <Button
          variant={tab === 'preview' ? 'default' : 'outline'}
          onClick={() => setTab('preview')}
        >
          Live Preview
        </Button>
      </div>

      {tab === 'editor' && (
        <>
          <Button onClick={addQuestion} className="mb-4">
            + Add Question
          </Button>

          {stepQs.map((q) => (
            <Card key={q.id} className="mb-4">
              <CardHeader>
                <CardTitle>Question #{q.id}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Text */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium">Text</label>
                  <Textarea
                    value={q.text}
                    onChange={(e) => updateQ(q.id, { text: e.target.value })}
                  />
                </div>

                {/* Type */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium">Type</label>
                  <Select
                    value={q.type}
                    onValueChange={(v) =>
                      updateQ(q.id, { type: v as QuestionType })
                    }
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="radio">Multiple Choice</SelectItem>
                      <SelectItem value="matrix">Matrix</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Radio options */}
                {q.type === 'radio' && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Options</label>
                    {q.options.map((opt, i) => (
                      <div key={i} className="flex space-x-2">
                        <Input
                          value={opt}
                          onChange={(e) => {
                            const opts = [...q.options]
                            opts[i] = e.target.value
                            updateQ(q.id, { options: opts })
                          }}
                        />
                        <Button
                          variant="destructive"
                          onClick={() => {
                            const opts = q.options.filter((_, j) => j !== i)
                            updateQ(q.id, { options: opts })
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() =>
                        updateQ(q.id, { options: [...q.options, ''] })
                      }
                    >
                      + Add Option
                    </Button>
                  </div>
                )}

                {/* Matrix rows */}
                {q.type === 'matrix' && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Rows</label>
                    {(q.rows ?? []).map((row, i) => (
                      <div key={i} className="flex space-x-2">
                        <Input
                          value={row}
                          onChange={(e) => {
                            const rows = [...(q.rows ?? [])]
                            rows[i] = e.target.value
                            updateQ(q.id, { rows })
                          }}
                        />
                        <Button
                          variant="destructive"
                          onClick={() => {
                            const rows = (q.rows ?? []).filter((_, j) => j !== i)
                            updateQ(q.id, { rows })
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() =>
                        updateQ(q.id, { rows: [...(q.rows ?? []), ''] })
                      }
                    >
                      + Add Row
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="destructive"
                  onClick={() => removeQuestion(q.id)}
                >
                  Delete Question
                </Button>
              </CardFooter>
            </Card>
          ))}
        </>
      )}

      {tab === 'preview' && <PreviewSteps />}
    </div>
  )
}
