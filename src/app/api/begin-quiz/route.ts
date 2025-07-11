import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

const EMAIL_FROM = process.env.EMAIL_FROM!;
const EMAIL_USER = process.env.EMAIL_USER!;
const EMAIL_PASS = process.env.EMAIL_PASS!;
const BASE_URL = process.env.BASE_URL!; // e.g. https://yourdomain.com
const JWT_SECRET = process.env.JWT_SECRET!;

// if (!EMAIL_FROM || !EMAIL_USER || !EMAIL_PASS || !BASE_URL || !JWT_SECRET) {
//   throw new Error('Missing required environment variables');
// }

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check allowlist
    const allow = await prisma.allowlist.findUnique({
      select: { credits: true, email: true },
      where: { email },
    });

    if (!allow) {
      return NextResponse.json(
        { error: 'Email not found in allowlist' },
        { status: 404 }
      );
    }

    if (allow.credits <= 0) {
      return NextResponse.json(
        { error: 'No remaining assessment credits' },
        { status: 403 }
      );
    }

    // Generate token (expires in 15 minutes)
    const token = jwt.sign({ allowlistId: allow.email, email }, JWT_SECRET, {
      expiresIn: '15m',
    });

    // Setup email transport
    const transporter = nodemailer.createTransport({
      auth: {
        pass: EMAIL_PASS, // This should be an app-specific password
        user: EMAIL_USER,
      },
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      tls: {
        rejectUnauthorized: false, // Only for development
      },
    });

    const link = `${BASE_URL}/begin-quiz?token=${token}`;

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP Verification Error:', verifyError);
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    // Send email
    try {
      const info = await transporter.sendMail({
        from: `"NEXEA Assessment" <${EMAIL_FROM}>`,
        html: `
          <p>Hello,</p>
          <p>Click the link below to begin your Entrepreneurs Behaviour Assessment. This link will expire in 15 minutes.</p>
          <p><a href="${link}">${link}</a></p>
          <p>If you did not request this assessment, please ignore this email.</p>
        `,
        subject: 'Your Entrepreneurs Behaviour Assessment Link',
        to: email,
      });

      console.log('Email sent successfully:', info.messageId);

      // Deduct one credit after successful email send
      await prisma.allowlist.update({
        data: {
          credits: {
            decrement: 1,
          },
        },
        where: { email },
      });

      return NextResponse.json({
        message: 'Assessment link sent successfully',
        success: true,
      });
    } catch (emailError: any) {
      console.error('Failed to send email. Error details:', {
        code: emailError.code,
        command: emailError.command,
        error: emailError.message,
        response: emailError.response,
      });

      return NextResponse.json(
        { error: `Failed to send email: ${emailError.message}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
