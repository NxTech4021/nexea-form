import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { resend } from '@/config/resend';
import EbaEmailTemplate from '@/email-templates/emails';

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
    const allow = await prisma.allowlist.findFirst({
      select: { credits: true, email: true, id: true },
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });

    if (!allow) {
      return NextResponse.json(
        { error: 'Email not found in allowlist' },
        { status: 404 },
      );
    }

    // Note: We'll check credits more precisely below after checking submitted responses

    // Check if there's already an unsubmitted response for this email
    const existingUnsubmittedResponse = await prisma.response.findFirst({
      where: {
        allowlistId: allow.id,
        submittedAt: new Date(0), // Not submitted yet
      },
    });

    // If there's already an unsubmitted response, reuse it instead of creating new one
    if (existingUnsubmittedResponse) {
      // Generate token for existing response
      const token = jwt.sign({ allowlistId: allow.email, email }, JWT_SECRET);

      const link = `${BASE_URL}/begin-quiz?token=${token}`;

      // Send email with existing response
      try {
        const { data } = await resend.emails.send({
          from: 'no-reply <no-reply@eba.nexea.co>',
          react: EbaEmailTemplate({
            name: 'Afiq',
            verificationLink: link,
          }) as any,
          subject: 'Your Assessment Link is Here',
          to: allow.email,
        });

        console.log(data);

        return NextResponse.json({
          message:
            'Assessment link sent successfully (reusing existing response)',
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
          { status: 500 },
        );
      }
    }

    // Check if user has remaining credits (credits are decremented on submission)
    if (allow.credits <= 0) {
      return NextResponse.json(
        { error: 'No remaining assessment credits' },
        { status: 403 },
      );
    }

    // Create a new response for this assessment
    const newResponse = await prisma.response.create({
      data: {
        allowlistId: allow.id,
        submittedAt: new Date(0), // Set to epoch to indicate not submitted yet
        userId: null, // Since we're not requiring user authentication
      },
    });

    // Generate token (expires in 15 minutes)
    const token = jwt.sign({ allowlistId: allow.email, email }, JWT_SECRET);

    const link = `${BASE_URL}/begin-quiz?token=${token}`;

    // Send email
    try {
      const { data } = await resend.emails.send({
        from: 'no-reply <no-reply@eba.nexea.co>',
        react: EbaEmailTemplate({
          name: 'Afiq',
          verificationLink: link,
        }) as any,
        subject: 'Your Assessment Link is Here',
        to: allow.email,
      });

      console.log(data);

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
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
