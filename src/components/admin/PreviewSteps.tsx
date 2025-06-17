// src/components/admin/PreviewSteps.tsx
'use client'

import React from 'react'
import { useFormContext, QuestionDefinition } from '@/contexts/form-context'

export function PreviewSteps() {
  const { questions } = useFormContext()

  if (!questions || questions.length === 0) {
    return <p className="text-sm text-gray-500">No questions defined.</p>
  }

  return (
    <div className="space-y-6">
      {questions.map((q: QuestionDefinition) => (
        <div
          key={q.id}
          className="p-4 bg-white border rounded-lg shadow-sm"
        >
          <label className="block mb-2 font-medium">
            {q.text}
          </label>

          {q.type === 'text' && (
            <input
              type="text"
              disabled
              placeholder={q.text}
              className="w-full border px-3 py-2 rounded"
            />
          )}

          {q.type === 'radio' && (
            <div className="space-y-2">
              {q.options.map((opt, idx) => (
                <label key={idx} className="flex items-center space-x-2">
                  <input type="radio" disabled className="form-radio" />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
