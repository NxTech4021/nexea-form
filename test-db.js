const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  const prisma = new PrismaClient();
  try {
    console.log('Attempting to connect to database...');
    const users = await prisma.user.findMany();
    console.log('Successfully connected to database');
    console.log('Users in database:', users);
  } catch (error) {
    console.error('Error connecting to database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection(); 