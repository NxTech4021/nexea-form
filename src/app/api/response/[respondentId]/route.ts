import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ respondentId: string }> }
) {
  try {
    const { respondentId } = await params;

    if (!respondentId) {
      return NextResponse.json(
        { error: 'Respondent ID is required' },
        { status: 400 }
      );
    }

    // Get all responses for this respondent
    const responses = await prisma.response.findMany({
      where: { respondentId },
      include: {
        answers: true,
      },
    });

    return NextResponse.json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
