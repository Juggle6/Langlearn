const { PrismaClient } = require('@prisma/client')

const globalForPrisma = global;
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({
    log: ['query'],
  });
}

module.exports = globalForPrisma.prisma;
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
