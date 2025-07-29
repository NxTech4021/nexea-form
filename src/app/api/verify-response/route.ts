import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Response ID is required' }, { status: 400 });
    }

    // Safely parse the ID
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return NextResponse.json({ error: 'Invalid response ID format' }, { status: 400 });
    }

    // Check if response exists
    const response = await prisma.response.findUnique({
      where: { id: parsedId },
    });

    if (!response) {
      return NextResponse.json({ error: 'Response not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error verifying response:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 