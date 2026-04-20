import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { allQuestions } from '@/lib/allQuestions';
import { decrypt } from '@/lib/session';
import { prisma } from '@/lib/prisma';

export async function POST() {
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

  let seeded = 0;
  for (const q of allQuestions) {
    await prisma.question.create({
      data: {
        id: q.id,
        step: q.step,
        text: q.text,
        type: q.type.toUpperCase() as 'TEXT' | 'RADIO' | 'MATRIX',
        options: {
          create: (q.options ?? []).map((value: string, idx: number) => ({
            value,
            order: idx,
          })),
        },
        matrixRows: {
          create: ((q as any).rows ?? []).map((label: string, idx: number) => ({
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
