import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, credits = 1 } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await prisma.allowlist.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Email already exists in allowlist' },
        { status: 400 }
      );
    }

    // Add to allowlist
    const allowlist = await prisma.allowlist.create({
      data: {
        email,
        credits,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Email added to allowlist successfully'
    });

  } catch (error: any) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get all allowlist entries
export async function GET() {
  try {
    const entries = await prisma.allowlist.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(entries);
  } catch (error) {
    console.error('Error fetching allowlist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch allowlist' },
      { status: 500 }
    );
  }
} 