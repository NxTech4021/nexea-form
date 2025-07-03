const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedAllowlist() {
  try {
    // Clear existing records (optional - comment out if you don't want to clear)
    await prisma.allowlist.deleteMany({});

    // Sample emails to add to allowlist
    const sampleEmails = [
      { email: 'john@example.com', credits: 2 },
      { email: 'jane@example.com', credits: 1 },
      { email: 'test@nexea.co', credits: 3 },
      { email: 'demo@example.com', credits: 1 },
      { email: 'user@test.com', credits: 0 }, // Example of user with no credits
      { email: 'syafinion@gmail.com', credits: 3 }, // Added new email
    ];

    console.log('Start seeding Allowlist...');

    for (const data of sampleEmails) {
      const allowlist = await prisma.allowlist.create({
        data: {
          email: data.email,
          credits: data.credits,
        },
      });
      console.log(
        `Created Allowlist entry: ${allowlist.email} (${allowlist.credits} credits)`
      );
    }

    console.log('✅ Seeding finished.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAllowlist();
