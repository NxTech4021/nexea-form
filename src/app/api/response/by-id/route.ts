import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const responseId = searchParams.get('id');

    if (!responseId) {
      return NextResponse.json(
        { error: 'Response ID is required' },
        { status: 400 }
      );
    }

    const responseIdNum = parseInt(responseId);
    if (isNaN(responseIdNum)) {
      return NextResponse.json(
        { error: 'Invalid response ID format' },
        { status: 400 }
      );
    }

    // Fetch response with all related data
    const response = await prisma.response.findUnique({
      where: { id: responseIdNum },
      include: {
        respondent: true,
        answers: true,
        allowlist: true,
      },
    });

    if (!response) {
      return NextResponse.json(
        { error: 'Response not found' },
        { status: 404 }
      );
    }

    // console.log('Loaded response data:', {
    //   id: response.id,
    //   respondentId: response.respondentId,
    //   allowlistId: response.allowlistId,
    //   answersCount: response.answers.length,
    // });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error loading response by ID:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
