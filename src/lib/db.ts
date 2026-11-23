// Tiny local JSON store in <project>/.data/db.json — stays on this machine.
// Good enough for building and testing; swap for a real database before launch.
import { promises as fs } from "node:fs";
import path from "node:path";
import type { Db } from "./types";

export const DATA_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DATA_DIR, "db.json");

export async function readDb(): Promise<Db> {
  try {
    return JSON.parse(await fs.readFile(DB_FILE, "utf8")) as Db;
  } catch {
    return { users: [], sessions: {} };
  }
}

let queue: Promise<unknown> = Promise.resolve();

// Serialised read-modify-write so two quick requests can't clobber each other.
export function updateDb<T>(fn: (db: Db) => T | Promise<T>): Promise<T> {
  const run = queue.then(async () => {
    const db = await readDb();
    const result = await fn(db);
    await fs.mkdir(DATA_DIR, { recursive: true });
    const tmp = `${DB_FILE}.${process.pid}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(db, null, 2), { mode: 0o600 });
    await fs.rename(tmp, DB_FILE);
    return result;
  });
  queue = run.catch(() => undefined);
  return run;
}
