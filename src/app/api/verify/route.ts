import { PrismaClient } from '@prisma/client';
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-key'
);

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 });
    }

    const { payload } = await jwtVerify(token, secret);

    const { email } = payload as { email: string };

    if (!email)
      return NextResponse.json(
        { error: 'Email not found in the token' },
        { status: 404 }
      );

    await prisma.user.update({
      data: {
        status: 'active',
      },
      where: {
        email: email,
      },
    });

    return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Failed to send email` },
      { status: 400 }
    );
  }
}
