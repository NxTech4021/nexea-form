import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Response ID is required' }, { status: 400 });
    }

    // Check if response exists
    const response = await prisma.response.findUnique({
      where: { id: parseInt(id) },
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