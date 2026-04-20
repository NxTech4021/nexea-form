import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { decrypt } from '@/lib/session';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const count = await prisma.question.count();
  return NextResponse.json({ count });
}

export async function POST(req: NextRequest) {
  const session = (await cookies()).get('session')?.value;
  const auth = await decrypt(session);
  if (!auth?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const existing = await prisma.question.count();
  if (existing > 0) {
    return NextResponse.json(
      { error: 'Questions already seeded', count: existing },
      { status: 409 },
    );
  }

  const questions = await req.json();

  if (!Array.isArray(questions) || questions.length === 0) {
    return NextResponse.json({ error: 'No questions provided' }, { status: 400 });
  }

  let seeded = 0;
  for (const q of questions) {
    await prisma.question.create({
      data: {
        id: q.id,
        step: q.step,
        text: q.text,
        type: (q.type as string).toUpperCase() as 'TEXT' | 'RADIO' | 'MATRIX',
        options: {
          create: (q.options ?? []).map((value: string, idx: number) => ({
            value,
            order: idx,
          })),
        },
        matrixRows: {
          create: (q.rows ?? []).map((label: string, idx: number) => ({
            label,
            order: idx,
          })),
        },
      },
    });
    seeded++;
  }

  return NextResponse.json({ success: true, seeded });
}
