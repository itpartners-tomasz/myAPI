// Plik: src/db.ts
import { PrismaClient, Prisma } from './generated/prisma/client.js';

// Ta sztuczka zapobiega tworzeniu wielu instancji PrismaClient
// w środowisku deweloperskim (przez HMR/watch)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Opcjonalnie: loguj wszystkie zapytania do konsoli
    log: ['query'], 
  });
export { Prisma };

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
