"use server";

import { randomBytes, randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, endSession, getCurrentUser, hashPassword, startSession } from "./auth";
import { DATA_DIR, readDb, updateDb } from "./db";
import { defaultPreferences, getProfile } from "./matching";
import {
  ageFrom, CREATED_FOR, DIET, EDUCATION, FAMILY_TYPE, GENDERS, INCOME, MARITAL_STATUS, MOTHER_TONGUES, RELIGIONS,
  type Gender,
} from "./options";
import type { Preferences, User } from "./types";

export type FormState = { error?: string; step?: number; ok?: string } | undefined;

const str = (fd: FormData, k: string, max = 200) => String(fd.get(k) ?? "").trim().slice(0, max);
const num = (fd: FormData, k: string) => Number(fd.get(k)) || 0;
const oneOf = (v: string, list: readonly string[]) => list.includes(v);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function safeNext(next: string) {
  return next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
}

// ── Register ────────────────────────────────────────────────────────────────
export async function registerAction(_: FormState, fd: FormData): Promise<FormState> {
  const f = {
    createdFor: str(fd, "createdFor"),
    fullName: str(fd, "fullName", 80),
    gender: str(fd, "gender") as Gender,
    dob: str(fd, "dob", 10),
    email: str(fd, "email", 120).toLowerCase(),
    phone: str(fd, "phone", 20),
    password: String(fd.get("password") ?? ""),
    confirm: String(fd.get("confirm") ?? ""),
    maritalStatus: str(fd, "maritalStatus"),
    heightCm: num(fd, "heightCm"),
    motherTongue: str(fd, "motherTongue"),
    religion: str(fd, "religion"),
    community: str(fd, "community", 60),
    diet: str(fd, "diet"),
    country: str(fd, "country", 60) || "India",
    state: str(fd, "state", 60),
    city: str(fd, "city", 60),
    education: str(fd, "education"),
    occupation: str(fd, "occupation", 80),
    income: str(fd, "income"),
    familyType: str(fd, "familyType"),
    fatherOccupation: str(fd, "fatherOccupation", 80),
    motherOccupation: str(fd, "motherOccupation", 80),
    siblings: str(fd, "siblings", 120),
    aboutMe: str(fd, "aboutMe", 1000),
  };

  // Step 1 — account
  if (!oneOf(f.createdFor, CREATED_FOR)) return { error: "Tell us who this profile is for.", step: 0 };
  if (f.fullName.length < 2) return { error: "Please enter the full name.", step: 0 };
  if (!oneOf(f.gender, GENDERS)) return { error: "Please choose a gender.", step: 0 };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(f.dob) || Number.isNaN(Date.parse(f.dob)))
    return { error: "Please enter a valid date of birth.", step: 0 };
  const minAge = f.gender === "Male" ? 21 : 18;
  if (ageFrom(f.dob) < minAge) return { error: `The minimum age to register is ${minAge}.`, step: 0 };
  if (ageFrom(f.dob) > 80) return { error: "Please check the date of birth.", step: 0 };
  if (!EMAIL_RE.test(f.email)) return { error: "Please enter a valid email address.", step: 0 };
  if (!/^\+?[\d\s-]{10,16}$/.test(f.phone)) return { error: "Please enter a valid mobile number.", step: 0 };
  if (f.password.length < 8) return { error: "Password must be at least 8 characters.", step: 0 };
  if (f.password !== f.confirm) return { error: "Passwords don't match.", step: 0 };

  // Step 2 — personal
  if (!oneOf(f.maritalStatus, MARITAL_STATUS)) return { error: "Please choose a marital status.", step: 1 };
  if (f.heightCm < 130 || f.heightCm > 220) return { error: "Please choose a height.", step: 1 };
  if (!oneOf(f.motherTongue, MOTHER_TONGUES)) return { error: "Please choose a mother tongue.", step: 1 };
  if (!oneOf(f.religion, RELIGIONS)) return { error: "Please choose a religion.", step: 1 };
  if (!oneOf(f.diet, DIET)) return { error: "Please choose a diet.", step: 1 };

  // Step 3 — location & career
  if (!f.state || !f.city) return { error: "Please enter your state and city.", step: 2 };
  if (!oneOf(f.education, EDUCATION)) return { error: "Please choose your education.", step: 2 };
  if (!f.occupation) return { error: "Please enter your occupation.", step: 2 };
  if (!oneOf(f.income, INCOME)) return { error: "Please choose an income range.", step: 2 };

  // Step 4 — family & about
  if (!oneOf(f.familyType, FAMILY_TYPE)) return { error: "Please choose a family type.", step: 3 };
  if (f.aboutMe.length < 30) return { error: "Please write at least a few lines (30+ characters) about yourself.", step: 3 };
  if (fd.get("agree") !== "on") return { error: "Please accept the terms and privacy policy.", step: 3 };

  const { password, confirm, ...rest } = f;
  void confirm;
  const { salt, hash } = hashPassword(password);
  const id = randomUUID();

  const created = await updateDb((db) => {
    if (db.users.some((u) => u.email === f.email)) return false;
    const user: User = {
      ...rest,
      id,
      createdAt: new Date().toISOString(),
      photos: [],
      verified: false,
      salt,
      passwordHash: hash,
      likes: [],
      preferences: defaultPreferences(rest),
    };
    db.users.push(user);
    return true;
  });
  if (!created) return { error: "An account with this email already exists. Please log in.", step: 0 };

  await startSession(id);
  redirect("/dashboard?welcome=1");
}

// ── Log in / out ────────────────────────────────────────────────────────────
export async function loginAction(_: FormState, fd: FormData): Promise<FormState> {
  const email = str(fd, "email", 120).toLowerCase();
  const password = String(fd.get("password") ?? "");
  const user = (await readDb()).users.find((u) => u.email === email);
  if (!user || !checkPassword(password, user)) return { error: "Email or password is incorrect." };
  await startSession(user.id);
  redirect(safeNext(str(fd, "next", 300)));
}

export async function logoutAction() {
  await endSession();
  redirect("/");
}

// ── Likes ───────────────────────────────────────────────────────────────────
export async function toggleLikeAction(fd: FormData) {
  const me = await getCurrentUser();
  if (!me) redirect("/login");
  const profileId = str(fd, "profileId", 80);
  if (profileId === me.id || !(await getProfile(profileId))) return;
  await updateDb((db) => {
    const u = db.users.find((x) => x.id === me.id);
    if (!u) return;
    u.likes = u.likes.includes(profileId) ? u.likes.filter((x) => x !== profileId) : [...u.likes, profileId];
  });
  revalidatePath("/", "layout");
}

// ── Partner preferences ─────────────────────────────────────────────────────
export async function savePreferencesAction(_: FormState, fd: FormData): Promise<FormState> {
  const me = await getCurrentUser();
  if (!me) redirect("/login");
  const pick = (k: string, list: readonly string[]) => {
    const v = str(fd, k);
    return list.includes(v) ? v : "Any";
  };
  const prefs: Preferences = {
    ageMin: Math.min(70, Math.max(18, num(fd, "ageMin") || 18)),
    ageMax: Math.min(70, Math.max(18, num(fd, "ageMax") || 70)),
    heightMin: num(fd, "heightMin"),
    heightMax: num(fd, "heightMax"),
    religion: pick("religion", RELIGIONS),
    maritalStatus: pick("maritalStatus", MARITAL_STATUS),
    motherTongue: pick("motherTongue", MOTHER_TONGUES),
    education: pick("education", EDUCATION),
    location: str(fd, "location", 60),
  };
  if (prefs.ageMin > prefs.ageMax) return { error: "Minimum age can't be more than maximum age." };
  if (prefs.heightMin && prefs.heightMax && prefs.heightMin > prefs.heightMax)
    return { error: "Minimum height can't be more than maximum height." };
  await updateDb((db) => {
    const u = db.users.find((x) => x.id === me.id);
    if (u) u.preferences = prefs;
  });
  revalidatePath("/", "layout");
  return { ok: "Partner preferences saved." };
}

// ── Photos (stored in .data/uploads/<userId>/, served only to logged-in members) ──
const MAX_PHOTOS = 6;
const MAX_BYTES = 5 * 1024 * 1024;

function sniffImage(buf: Buffer): "jpg" | "png" | "webp" | null {
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP") return "webp";
  return null;
}

export async function uploadPhotoAction(_: FormState, fd: FormData): Promise<FormState> {
  const me = await getCurrentUser();
  if (!me) redirect("/login");
  const file = fd.get("photo");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose a photo to upload." };
  if (file.size > MAX_BYTES) return { error: "Photos must be 5 MB or smaller." };
  if (me.photos.length >= MAX_PHOTOS) return { error: `You can add up to ${MAX_PHOTOS} photos.` };
  const buf = Buffer.from(await file.arrayBuffer());
  const ext = sniffImage(buf);
  if (!ext) return { error: "Please upload a JPG, PNG or WebP image." };

  const name = `${randomBytes(8).toString("hex")}.${ext}`;
  const dir = path.join(DATA_DIR, "uploads", me.id);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), buf, { mode: 0o600 });
  await updateDb((db) => {
    const u = db.users.find((x) => x.id === me.id);
    if (u) u.photos.push(name);
  });
  revalidatePath("/", "layout");
  return { ok: "Photo added." };
}

export async function photoAction(fd: FormData) {
  const me = await getCurrentUser();
  if (!me) redirect("/login");
  const name = str(fd, "name", 40);
  const op = str(fd, "op", 10);
  if (!me.photos.includes(name)) return;
  await updateDb((db) => {
    const u = db.users.find((x) => x.id === me.id);
    if (!u) return;
    if (op === "main") u.photos = [name, ...u.photos.filter((p) => p !== name)];
    if (op === "delete") u.photos = u.photos.filter((p) => p !== name);
  });
  if (op === "delete") await fs.rm(path.join(DATA_DIR, "uploads", me.id, name), { force: true });
  revalidatePath("/", "layout");
}
