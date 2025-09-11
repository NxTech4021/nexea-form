import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { respondentId } = await request.json();

    if (!respondentId) {
      return NextResponse.json(
        { error: 'Respondent ID is required' },
        { status: 400 }
      );
    }

    // Get the response ID from cookies (set during token verification)
    const cookieStore = await cookies();
    const responseIdCookie = cookieStore.get('response_id');
    
    if (!responseIdCookie) {
      return NextResponse.json(
        { error: 'No response ID found in session' },
        { status: 400 }
      );
    }

    const responseId = parseInt(responseIdCookie.value);
    if (isNaN(responseId)) {
      return NextResponse.json(
        { error: 'Invalid response ID format' },
        { status: 400 }
      );
    }

    // First check if the response exists and get its current state
    const existingResponse = await prisma.response.findUnique({
      where: { id: responseId },
    });

    if (!existingResponse) {
      return NextResponse.json(
        { error: 'Response not found' },
        { status: 404 }
      );
    }

    // If the response is already linked to this respondent, no need to update
    if (existingResponse.respondentId === respondentId) {
      return NextResponse.json({ 
        success: true, 
        responseId: existingResponse.id,
        message: 'Response already linked to this respondent'
      });
    }

    // Update the existing response with respondentId
    const response = await prisma.response.update({
      where: { id: responseId },
      data: { respondentId },
    });

    return NextResponse.json({ 
      success: true, 
      responseId: response.id,
      message: 'Response updated with respondent successfully'
    });
  } catch (error) {
    console.error('Error updating response with respondent:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
