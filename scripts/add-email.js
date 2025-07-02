const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addEmail() {
  try {
    const email = 'syafinion@gmail.com';
    
    // Check if email already exists
    const existing = await prisma.allowlist.findUnique({
      where: { email },
    });

    if (existing) {
      console.log(`Email ${email} already exists with ${existing.credits} credits`);
      return;
    }

    // Add new email
    const allowlist = await prisma.allowlist.create({
      data: {
        email,
        credits: 3,
      },
    });

    console.log(`✅ Added new email: ${allowlist.email} with ${allowlist.credits} credits`);
  } catch (error) {
    console.error('Error adding email:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addEmail(); 