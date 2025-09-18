import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Response ID is required' },
        { status: 400 },
      );
    }

    // Safely parse the ID
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return NextResponse.json(
        { error: 'Invalid response ID format' },
        { status: 400 },
      );
    }

    // Check if response exists
    const response = await prisma.response.findUnique({
      include: { 
        allowlist: { select: { email: true, id: true } },
        answers: true
      },
      where: { id: parsedId },
    });

    if (!response) {
      return NextResponse.json(
        { error: 'Response not found' },
        { status: 404 },
      );
    }

    // Check if response has already been submitted
    // We'll check if submittedAt is not epoch (meaning it was updated from the original creation)
    const isSubmitted = response.submittedAt.getTime() > new Date(0).getTime();
    
    if (isSubmitted) {
      return NextResponse.json(
        { 
          error: 'This assessment link has already been used. Each email gets 2 credits, so you can request a new assessment link.',
          isSubmitted: true 
        },
        { status: 410 }, // 410 Gone - resource no longer available
      );
    }

    return NextResponse.json({ response, success: true });
  } catch (error) {
    console.error('Error verifying response:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
