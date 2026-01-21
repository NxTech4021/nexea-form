import { NextResponse } from 'next/server';

import { resend } from '@/config/resend';
import EBAEmailTemplate from '@/email-templates/emails';

// export async function GET(req: NextRequest) {}

export async function POST() {
  try {
    const { data } = await resend.emails.send({
      from: 'no-reply <no-reply@eba.nexea.co>',
      react: EBAEmailTemplate({
        name: 'Afiq',
        verificationLink: 'http://localhost:3000/begin-quiz',
      }) as any,
      subject: 'Your Assessment Link is Here',
      to: ['delivered@resend.dev'],
    });

    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}
