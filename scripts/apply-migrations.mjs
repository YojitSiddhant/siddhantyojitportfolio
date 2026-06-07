import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@libsql/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationPath = path.join(__dirname, "..", "prisma", "migrations", "20260607100000_init", "migration.sql");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const contents = fs.readFileSync(filePath, "utf8");
  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.join(__dirname, "..", ".env.local"));
loadEnvFile(path.join(__dirname, "..", ".env"));

const databaseUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";

function isRemoteLibSql(url) {
  return url.startsWith("libsql://") || url.startsWith("libsqls://") || url.startsWith("https://");
}

async function tableExistsRemote(client) {
  const result = await client.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='Profile' LIMIT 1");
  return result.rows.length > 0;
}

async function main() {
  const sql = fs.readFileSync(migrationPath, "utf8");

  if (isRemoteLibSql(databaseUrl)) {
    const client = createClient({
      url: databaseUrl,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });

    if (await tableExistsRemote(client)) {
      return;
    }

    await client.executeMultiple(sql);
    return;
  }

  const { default: Database } = await import("better-sqlite3");
  const dbPath = databaseUrl.replace(/^file:/, "");
  const db = new Database(dbPath);
  const row = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='Profile' LIMIT 1").get();
  if (!row) {
    db.exec(sql);
  }
  db.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
