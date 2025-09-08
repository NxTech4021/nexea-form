import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { decrypt } from '@/lib/session';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
    const { id } = data;

    if (!id)
      return NextResponse.json(
        { error: 'Id is not specified' },
        { status: 404 },
      );

    await prisma.allowlist.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(
      { message: 'Successfully deleted' },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error' }, { status: 400 });
  }
}

// Get all allowlist entries
export async function GET() {
  try {
    const entries = await prisma.allowlist.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(entries);
  } catch (error) {
    console.error('Error fetching allowlist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch allowlist' },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { credit, id } = await req.json();

    const data = await prisma.allowlist.update({
      data: {
        credits: credit,
      },
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { data, message: 'Updated Successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to update credits' },
      { status: 400 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { credits = 2, email } = await req.json();
    const session = (await cookies()).get('session')?.value;

    const data = await decrypt(session);

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if email already exists
    const existing = await prisma.allowlist.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Email already exists in allowlist' },
        { status: 400 },
      );
    }

    const numericId = data?.userId;

    const user = await prisma.user.findFirst({
      where: {
        id: numericId,
      },
    });

    // Add to allowlist
    const allowlist = await prisma.allowlist.create({
      data: {
        addedBy: user?.email,
        credits,
        email,
      },
    });

    return NextResponse.json({
      data: allowlist,
      message: 'Email added to allowlist successfully',
      success: true,
    });
  } catch (error: any) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 },
    );
  }
}
