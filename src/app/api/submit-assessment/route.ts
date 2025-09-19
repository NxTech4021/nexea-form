import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { responseId } = await request.json();

    if (!responseId) {
      return NextResponse.json(
        { error: 'Response ID is required' },
        { status: 400 },
      );
    }

    // Find the response and its associated allowlist
    const response = await prisma.response.findUnique({
      include: {
        allowlist: true,
        answers: true,
      },
      where: { id: responseId },
    });

    if (!response) {
      return NextResponse.json(
        { error: 'Response not found' },
        { status: 404 },
      );
    }

    // Check if already submitted by checking if submittedAt is not epoch
    const isSubmitted = response.submittedAt.getTime() > new Date(0).getTime();
    if (isSubmitted) {
      return NextResponse.json(
        { error: 'Assessment has already been submitted' },
        { status: 400 },
      );
    }

    // Check if allowlist exists and has credits
    if (!response.allowlist) {
      return NextResponse.json(
        { error: 'No allowlist found for this response' },
        { status: 400 },
      );
    }

    if (response.allowlist.credits <= 0) {
      return NextResponse.json(
        { error: 'No remaining assessment credits' },
        { status: 403 },
      );
    }

    // Use a transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      // Mark response as submitted (update submittedAt to current time as a way to mark as submitted)
      const updatedResponse = await tx.response.update({
        data: {
          submittedAt: new Date(),
          // Note: isSubmitted field will be added after migration
        },
        where: { id: responseId },
      });

      // Deduct one credit from allowlist
      const updatedAllowlist = await tx.allowlist.update({
        data: {
          credits: {
            decrement: 1,
          },
        },
        where: { id: response.allowlist!.id },
      });

      return { updatedAllowlist, updatedResponse };
    });

    return NextResponse.json({
      message: 'Assessment submitted successfully',
      remainingCredits: result.updatedAllowlist.credits,
      success: true,
    });
  } catch (error) {
    console.error('Error submitting assessment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
