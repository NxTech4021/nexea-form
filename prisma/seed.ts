// prisma/seed.ts
import fs from 'fs'
import path from 'path'
import { PrismaClient, QuestionType } from '@prisma/client'

const prisma = new PrismaClient()

// 1) load the JSON
const questions: {
  id: string
  step: number
  text: string
  type: 'text' | 'radio' | 'matrix'
  options: string[]
  rows?: string[]
}[] = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'questions.json'), 'utf-8')
)

// 2) map your front-end types to your Prisma enum
function mapType(t: 'text'|'radio'|'matrix'): QuestionType {
  switch (t) {
    case 'text':   return QuestionType.TEXT
    case 'radio':  return QuestionType.RADIO
    case 'matrix': return QuestionType.MATRIX
  }
}

async function main() {
  for (const q of questions) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: {
        text:      q.text,
        step:      q.step,
        type:      mapType(q.type),
        updatedAt: new Date(),
      },
      create: {
        id:    q.id,
        step:  q.step,
        text:  q.text,
        type:  mapType(q.type),
        options: q.options.length
          ? { create: q.options.map((value, idx) => ({ value, order: idx })) }
          : undefined,
        matrixRows: q.rows && q.rows.length
          ? { create: q.rows.map((label, idx) => ({ label, order: idx })) }
          : undefined,
      },
    })
  }
  console.log(`✅ Seeded ${questions.length} questions`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
