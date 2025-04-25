const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function cleanExpiredTokens() {
  const now = new Date();
  const deleted = await prisma.refreshToken.deleteMany({
    where: {
      expiresAt: {
        lt: now
      }
    }
  });
  console.log(`🧹 Cleaned ${deleted.count} expired refresh tokens`);
}

module.exports = { cleanExpiredTokens };
