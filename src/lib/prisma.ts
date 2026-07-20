import "dotenv/config";
import { PrismaClient } from "@/lib/prisma/generated/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = globalThis as unknown as {
   prisma?: ReturnType<typeof createClient>;
};

function createClient() {
  const accelerateUrl = process.env.DATABASE_URL;
  if (!accelerateUrl?.startsWith("prisma")) {
    throw new Error(`DATABASE_URL invalide: ${accelerateUrl?.slice(0, 20)}`);
  }
  return new PrismaClient({ accelerateUrl }).$extends(withAccelerate());
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
   globalForPrisma.prisma = prisma;
}
