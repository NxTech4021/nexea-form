import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, phoneNumber, company } = await request.json();

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Use upsert to either update existing respondent or create new one
    const respondent = await prisma.respondent.upsert({
      where: { email },
      update: {
        fullName,
        phoneNumber,
        company,
        updatedAt: new Date(),
      },
      create: {
        fullName,
        email,
        phoneNumber,
        company,
      },
    });

    // console.log('Respondent upserted:', {
    //   id: respondent.id,
    //   email: respondent.email,
    //   action: 'updated'
    // });

    return NextResponse.json(respondent);
  } catch (error) {
    console.error('Error upserting respondent:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const respondent = await prisma.respondent.findUnique({
      where: { email },
      include: {
        responses: {
          include: {
            answers: true,
          },
        },
      },
    });

    if (!respondent) {
      return NextResponse.json(
        { error: 'Respondent not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(respondent);
  } catch (error) {
    console.error('Error fetching respondent:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
