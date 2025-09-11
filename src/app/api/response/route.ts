import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { respondentId, step, answers } = await request.json();


    // Validate required fields
    if (!respondentId || !step || !answers) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if respondent exists
    const respondent = await prisma.respondent.findUnique({
      where: { id: respondentId },
    });

    if (!respondent) {
      return NextResponse.json(
        { error: 'Respondent not found' },
        { status: 404 }
      );
    }

    // First, try to find existing response by respondentId
    let response = await prisma.response.findFirst({
      where: { respondentId },
      include: { answers: true },
    });

    // If no response found by respondentId, try to find by session (from token verification)
    if (!response) {
      const cookieStore = await cookies();
      const responseIdCookie = cookieStore.get('response_id');
      
      if (responseIdCookie) {
        const responseId = parseInt(responseIdCookie.value);
        if (!isNaN(responseId)) {
          response = await prisma.response.findUnique({
            where: { id: responseId },
            include: { answers: true },
          });
          
          // If found by session, update it with respondentId
          if (response && !response.respondentId) {
            response = await prisma.response.update({
              where: { id: responseId },
              data: { respondentId },
              include: { answers: true },
            });
          }
        }
      }
    }

    // If still no response found, create a new one
    if (!response) {
      response = await prisma.response.create({
        data: {
          respondentId,
        },
        include: { answers: true },
      });
    }

    // Process answers for this step
    
    for (const [questionId, answerData] of Object.entries(answers)) {
      
      if (answerData !== undefined && answerData !== null) {
        // Normalize the answer data to ensure consistent JSON structure
        let normalizedValue;
        if (typeof answerData === 'string') {
          // For radio questions, wrap string in an object for consistency
          normalizedValue = { value: answerData, type: 'radio' };
        } else if (typeof answerData === 'object' && answerData !== null) {
          // For matrix questions, keep as object but add type
          normalizedValue = { ...answerData, type: 'matrix' };
        } else {
          // For other types, wrap in object
          normalizedValue = { value: answerData, type: 'other' };
        }

        // Check if answer already exists for this question
        const existingAnswer = await prisma.answer.findFirst({
          where: {
            responseId: response.id,
            questionId: questionId,
          },
        });

        if (existingAnswer) {
          // Update existing answer
          await prisma.answer.update({
            where: { id: existingAnswer.id },
            data: { value: normalizedValue },
          });
        } else {
          // Create new answer
          await prisma.answer.create({
            data: {
              responseId: response.id,
              questionId: questionId,
              value: normalizedValue,
            },
          });
        }
      }
    }

    return NextResponse.json({ success: true, responseId: response.id });
  } catch (error) {
    console.error('Error saving response:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const respondentId = searchParams.get('respondentId');

    if (!respondentId) {
      return NextResponse.json(
        { error: 'Respondent ID parameter is required' },
        { status: 400 }
      );
    }

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
