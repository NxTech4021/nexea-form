import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all questions
export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      include: {
        options: {
          orderBy: { order: 'asc' }
        },
        matrixRows: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: [
        { step: 'asc' },
        { createdAt: 'asc' }
      ]
    });

    return new NextResponse(JSON.stringify(questions), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch questions' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Create a new question
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, step, text, type, options = [], rows = [] } = data;

    // Ensure type is uppercase for database consistency
    const normalizedType = type.toUpperCase();

    const question = await prisma.question.create({
      data: {
        id,
        step,
        text,
        type: normalizedType,
        options: {
          create: options.map((opt: string, idx: number) => ({
            value: opt,
            order: idx
          }))
        },
        matrixRows: {
          create: rows.map((row: string, idx: number) => ({
            label: row,
            order: idx
          }))
        }
      },
      include: {
        options: true,
        matrixRows: true
      }
    });

    return NextResponse.json(question);
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    );
  }
}

// Update a question
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, step, text, type, options = [], rows = [] } = data;

    // Ensure type is uppercase for database consistency
    const normalizedType = type.toUpperCase();

    // Delete existing options and rows
    await prisma.$transaction([
      prisma.option.deleteMany({ where: { questionId: id } }),
      prisma.matrixRow.deleteMany({ where: { questionId: id } })
    ]);

    // Update question and create new options and rows
    const question = await prisma.question.update({
      where: { id },
      data: {
        step,
        text,
        type: normalizedType,
        options: {
          create: options.map((opt: string, idx: number) => ({
            value: opt,
            order: idx
          }))
        },
        matrixRows: {
          create: rows.map((row: string, idx: number) => ({
            label: row,
            order: idx
          }))
        }
      },
      include: {
        options: {
          orderBy: { order: 'asc' }
        },
        matrixRows: {
          orderBy: { order: 'asc' }
        }
      }
    });

    return NextResponse.json(question);
  } catch (error) {
    console.error('Error updating question:', error);
    return NextResponse.json(
      { error: 'Failed to update question' },
      { status: 500 }
    );
  }
}

// Delete a question
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Question ID is required' },
        { status: 400 }
      );
    }

    // Check if there are any answers for this question
    const answerCount = await prisma.answer.count({
      where: { questionId: id }
    });

    if (answerCount > 0) {
      // If there are answers, we need to delete them first
      await prisma.answer.deleteMany({
        where: { questionId: id }
      });
    }

    // Delete related options and matrix rows
    await prisma.$transaction([
      prisma.option.deleteMany({ where: { questionId: id } }),
      prisma.matrixRow.deleteMany({ where: { questionId: id } })
    ]);

    // Now delete the question itself
    await prisma.question.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json(
      { error: `Failed to delete question: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
} 