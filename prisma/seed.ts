// @ts-nocheck
const fs = require('fs');
const path = require('path');
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1) load the JSON
const questions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'questions.json'), 'utf-8')
);

// 2) map your front-end types to your Prisma enum
function mapType(t) {
  switch (t) {
    case 'text':   return QuestionType.TEXT;
    case 'radio':  return QuestionType.RADIO;
    case 'matrix': return QuestionType.MATRIX;
    default: throw new Error(`Unknown question type: ${t}`);
  }
}

async function main() {
  // Clear existing records (optional)
  await prisma.allowlist.deleteMany({});

  // Sample emails to add to allowlist
  const sampleEmails = [
    { email: 'john@example.com', credits: 2 },
    { email: 'jane@example.com', credits: 1 },
    { email: 'test@nexea.co', credits: 3 },
    { email: 'demo@example.com', credits: 1 },
    { email: 'user@test.com', credits: 0 }, // Example of user with no credits
  ];

  console.log('Start seeding Allowlist...');

  for (const data of sampleEmails) {
    const allowlist = await prisma.allowlist.create({
      data: {
        email: data.email,
        credits: data.credits,
      },
    });
    console.log(`Created Allowlist entry: ${allowlist.email} (${allowlist.credits} credits)`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
