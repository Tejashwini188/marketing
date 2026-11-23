import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readDb, updateDb } from "./db";
import type { User } from "./types";

export const SESSION_COOKIE = "csp_session";
const SESSION_DAYS = 30;

export function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  return { salt, hash: scryptSync(password, salt, 64).toString("hex") };
}

export function checkPassword(password: string, user: Pick<User, "salt" | "passwordHash">) {
  const { hash } = hashPassword(password, user.salt);
  return timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(user.passwordHash, "hex"));
}

export async function startSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  await updateDb((db) => {
    db.sessions[token] = { userId, createdAt: new Date().toISOString() };
  });
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function endSession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) await updateDb((db) => void delete db.sessions[token]);
  jar.delete(SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<User | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const db = await readDb();
  const session = db.sessions[token];
  if (!session) return null;
  const age = Date.now() - new Date(session.createdAt).getTime();
  if (age > SESSION_DAYS * 24 * 60 * 60 * 1000) return null;
  return db.users.find((u) => u.id === session.userId) ?? null;
}

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
