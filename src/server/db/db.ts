import { PrismaClient } from "@prisma/client";

import { env } from "src/env";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

const prisma = globalForPrisma.prisma ?? createPrismaClient();
export default prisma;

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
