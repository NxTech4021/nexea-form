import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const EMAIL_FROM = process.env.EMAIL_FROM!;
const EMAIL_USER = process.env.EMAIL_USER!;
const EMAIL_PASS = process.env.EMAIL_PASS!;
const BASE_URL = process.env.BASE_URL!;
const JWT_SECRET = process.env.JWT_SECRET!;

if (!EMAIL_FROM || !EMAIL_USER || !EMAIL_PASS || !BASE_URL || !JWT_SECRET) {
  throw new Error('Missing required environment variables');
}

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

    // Generate token for magic link
    const token = jwt.sign(
      { email, allowlistId: allowlist.email },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Setup email transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const link = `${BASE_URL}/begin-quiz?token=${token}`;

    // Send email
    await transporter.sendMail({
      from: `"NEXEA Assessment" <${EMAIL_FROM}>`,
      to: email,
      subject: 'Your Entrepreneurs Behaviour Assessment Link',
      html: `
        <p>Hello,</p>
        <p>You have been invited to take the Entrepreneurs Behaviour Assessment. Click the link below to begin. This link will expire in 15 minutes.</p>
        <p><a href="${link}">${link}</a></p>
        <p>You have ${credits} attempt(s) available.</p>
        <p>If you did not expect this assessment, please ignore this email.</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Email added to allowlist and invitation sent'
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