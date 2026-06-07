import "server-only";

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@/prisma/generated/client";

declare global {
  var __prisma: PrismaClient | undefined;
}

const databaseUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";

function createClient() {
  if (databaseUrl.startsWith("libsql://") || databaseUrl.startsWith("libsqls://") || databaseUrl.startsWith("https://")) {
    return new PrismaClient({
      adapter: new PrismaLibSql({
        url: databaseUrl,
        authToken: process.env.TURSO_AUTH_TOKEN,
      }),
    });
  }

  return new PrismaClient({
    adapter: new PrismaBetterSqlite3({
      url: databaseUrl,
    }),
  });
}

export const prisma = globalThis.__prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}
