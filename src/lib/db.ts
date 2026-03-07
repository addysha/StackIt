import type { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export async function getDb() {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  try {
    const { PrismaClient } = await import("@prisma/client");

    const prisma = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });

    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prisma;
    }

    return prisma;
  } catch {
    return null;
  }
}
