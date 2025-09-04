import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

import { prisma } from '@/lib/prisma';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-key'
);

// GET /api/reset-password - Validate token
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Verify the JWT token
    let payload;
    try {
      const { payload: tokenPayload } = await jwtVerify(token, secret);
      payload = tokenPayload;
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // Check if token type is correct
    if (payload.type !== 'password-reset') {
      return NextResponse.json(
        { error: 'Invalid token type' },
        { status: 400 }
      );
    }

    // Verify user exists and token matches stored token
    const user = await prisma.user.findUnique({
      where: { 
        email: payload.email as string,
        token: token,
      },
      select: { 
        id: true, 
        email: true,
        token: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        valid: true, 
        email: user.email,
        message: 'Token is valid'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error validating reset token:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/reset-password - Reset password using token
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }

    // Verify the JWT token
    let payload;
    try {
      const { payload: tokenPayload } = await jwtVerify(token, secret);
      payload = tokenPayload;
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // Check token type
    if (payload.type !== 'password-reset') {
      return NextResponse.json(
        { error: 'Invalid token type' },
        { status: 400 }
      );
    }

    // Find user and verify token
    const user = await prisma.user.findUnique({
      where: { 
        email: payload.email as string,
        token: token,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // Hash new password
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hashedPassword,
        token: null, // Clear the reset token
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Password reset successful'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}