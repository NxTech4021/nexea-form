import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

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

    // Delete the question (cascade will handle options and rows)
    await prisma.question.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json(
      { error: 'Failed to delete question' },
      { status: 500 }
    );
  }
}

// Get all questions
export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      include: {
        matrixRows: {
          orderBy: { order: 'asc' }
        },
        options: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: [
        { step: 'asc' },
        { createdAt: 'asc' }
      ]
    });

    return new NextResponse(JSON.stringify(questions), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch questions' }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
}

// Create a new question
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, options = [], rows = [], step, text, type } = data;

    const question = await prisma.question.create({
      data: {
        id,
        matrixRows: {
          create: rows.map((row: string, idx: number) => ({
            label: row,
            order: idx
          }))
        },
        options: {
          create: options.map((opt: string, idx: number) => ({
            order: idx,
            value: opt
          }))
        },
        step,
        text,
        type
      },
      include: {
        matrixRows: true,
        options: true
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
    const { id, options = [], rows = [], step, text, type } = data;

    // Delete existing options and rows
    await prisma.$transaction([
      prisma.option.deleteMany({ where: { questionId: id } }),
      prisma.matrixRow.deleteMany({ where: { questionId: id } })
    ]);

    // Update question and create new options and rows
    const question = await prisma.question.update({
      data: {
        matrixRows: {
          create: rows.map((row: string, idx: number) => ({
            label: row,
            order: idx
          }))
        },
        options: {
          create: options.map((opt: string, idx: number) => ({
            order: idx,
            value: opt
          }))
        },
        step,
        text,
        type
      },
      include: {
        matrixRows: {
          orderBy: { order: 'asc' }
        },
        options: {
          orderBy: { order: 'asc' }
        }
      },
      where: { id }
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