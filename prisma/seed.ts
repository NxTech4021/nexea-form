import { PrismaClient, QuestionType } from '@prisma/client';
// @ts-nocheck
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// 1) load the JSON
const questions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'questions.json'), 'utf-8'),
);

async function main() {
  // Clear existing records (optional)
  await prisma.allowlist.deleteMany({});

  // Sample emails to add to allowlist
  const sampleEmails = [
    { credits: 2, email: 'john@example.com' },
    { credits: 1, email: 'jane@example.com' },
    { credits: 3, email: 'test@nexea.co' },
    { credits: 1, email: 'demo@example.com' },
    { credits: 0, email: 'user@test.com' }, // Example of user with no credits
  ];

  console.log('Start seeding Allowlist...');

  for (const data of sampleEmails) {
    const allowlist = await prisma.allowlist.create({
      data: {
        credits: data.credits,
        email: data.email,
      },
    });
    console.log(
      `Created Allowlist entry: ${allowlist.email} (${allowlist.credits} credits)`,
    );
  }

  console.log('Seeding finished.');
}

// 2) map your front-end types to your Prisma enum
function mapType(t: any) {
  switch (t) {
    case 'matrix':
      return QuestionType.MATRIX;
    case 'radio':
      return QuestionType.RADIO;
    case 'text':
      return QuestionType.TEXT;
    default:
      throw new Error(`Unknown question type: ${t}`);
  }
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
