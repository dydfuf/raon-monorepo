import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

declare global {
  var __prisma: PrismaClient;
}
if (!global.__prisma) {
  const libsql = createClient({
    url: `${process.env.TURSO_DATABASE_URL}`,
    authToken: `${process.env.TURSO_AUTH_TOKEN}`,
  });

  const adapter = new PrismaLibSQL(libsql);
  global.__prisma = new PrismaClient({ adapter });
}
global.__prisma.$connect();
export const prisma = global.__prisma;
