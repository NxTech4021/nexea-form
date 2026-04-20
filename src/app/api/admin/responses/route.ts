import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { decrypt } from '@/lib/session';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = (await cookies()).get('session')?.value;
  const auth = await decrypt(session);
  if (!auth?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const responses = await prisma.response.findMany({
    include: {
      respondent: true,
      answers: {
        orderBy: { id: 'asc' },
      },
    },
    orderBy: { id: 'desc' },
  });

  return NextResponse.json(responses);
}
