import { readDb } from "./db";
import { SAMPLE_PROFILES } from "./sample-profiles";
import { ageFrom } from "./options";
import type { Preferences, Profile, User } from "./types";

export function toProfile(u: User): Profile {
  // Strip everything private before another member can see it.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { email, phone, passwordHash, salt, likes, preferences, ...profile } = u;
  return profile;
}

export async function getAllProfiles(): Promise<Profile[]> {
  const db = await readDb();
  return [...db.users.map(toProfile), ...SAMPLE_PROFILES];
}

export async function getProfile(id: string): Promise<Profile | null> {
  return (await getAllProfiles()).find((p) => p.id === id) ?? null;
}

// Everyone the member could be matched with: not themselves, opposite gender.
export async function getCandidates(me: User): Promise<Profile[]> {
  return (await getAllProfiles()).filter((p) => p.id !== me.id && p.gender !== me.gender);
}

export function defaultPreferences(me: Pick<User, "gender" | "dob" | "religion">): Preferences {
  const age = ageFrom(me.dob);
  const female = me.gender === "Female";
  return {
    ageMin: Math.max(18, female ? age - 1 : age - 6),
    ageMax: Math.min(70, female ? age + 6 : age + 1),
    heightMin: 0,
    heightMax: 0,
    religion: me.religion || "Any",
    maritalStatus: "Any",
    motherTongue: "Any",
    education: "Any",
    location: "",
  };
}

const any = (v: string) => !v || v === "Any";
const contains = (hay: string, needle: string) => hay.toLowerCase().includes(needle.trim().toLowerCase());

// Each preference that a profile meets (unset ones count as met).
function prefChecks(p: Profile, pr: Preferences) {
  const age = ageFrom(p.dob);
  return [
    age >= pr.ageMin && age <= pr.ageMax,
    (!pr.heightMin || p.heightCm >= pr.heightMin) && (!pr.heightMax || p.heightCm <= pr.heightMax),
    any(pr.religion) || p.religion === pr.religion,
    any(pr.maritalStatus) || p.maritalStatus === pr.maritalStatus,
    any(pr.motherTongue) || p.motherTongue === pr.motherTongue,
    any(pr.education) || p.education === pr.education,
    !pr.location.trim() || contains(p.city, pr.location) || contains(p.state, pr.location),
  ];
}

export function fitsPreferences(p: Profile, pr: Preferences) {
  return prefChecks(p, pr).every(Boolean);
}

/** 0–100: how many of the member's preferences this profile meets. */
export function matchScore(p: Profile, pr: Preferences) {
  const checks = prefChecks(p, pr);
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

export const MATCH_TABS = [
  { key: "new", label: "New matches" },
  { key: "today", label: "Today's matches" },
  { key: "my", label: "My matches" },
  { key: "near", label: "Near me" },
  { key: "all", label: "More matches" },
] as const;
export type MatchTab = (typeof MATCH_TABS)[number]["key"];

// Small deterministic hash so "Today's matches" changes daily but not on refresh.
function hash(s: string) {
  let h = 2166136261;
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}

export function profilesForTab(tab: MatchTab, me: User, candidates: Profile[]): Profile[] {
  const byScore = (a: Profile, b: Profile) => matchScore(b, me.preferences) - matchScore(a, me.preferences);
  switch (tab) {
    case "new": {
      const recent = candidates.filter((p) => Date.now() - new Date(p.createdAt).getTime() < 14 * 86_400_000);
      return recent.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
    case "today": {
      const day = new Date().toISOString().slice(0, 10);
      return [...candidates]
        .sort((a, b) => hash(day + me.id + a.id) - hash(day + me.id + b.id))
        .slice(0, 6)
        .sort(byScore);
    }
    case "my":
      return candidates.filter((p) => fitsPreferences(p, me.preferences));
    case "near": {
      const sameCity = candidates.filter((p) => p.city.toLowerCase() === me.city.toLowerCase());
      const sameState = candidates.filter(
        (p) => p.city.toLowerCase() !== me.city.toLowerCase() && p.state.toLowerCase() === me.state.toLowerCase(),
      );
      return [...sameCity, ...sameState];
    }
    default:
      return [...candidates].sort(byScore);
  }
}

export type SearchCriteria = {
  name?: string;
  ageMin?: number;
  ageMax?: number;
  heightMin?: number;
  heightMax?: number;
  religion?: string;
  community?: string;
  maritalStatus?: string;
  motherTongue?: string;
  education?: string;
  diet?: string;
  location?: string;
  verifiedOnly?: boolean;
};

export function searchProfiles(candidates: Profile[], c: SearchCriteria) {
  return candidates.filter((p) => {
    const age = ageFrom(p.dob);
    if (c.name && !contains(p.fullName, c.name)) return false;
    if (c.ageMin && age < c.ageMin) return false;
    if (c.ageMax && age > c.ageMax) return false;
    if (c.heightMin && p.heightCm < c.heightMin) return false;
    if (c.heightMax && p.heightCm > c.heightMax) return false;
    if (c.religion && !any(c.religion) && p.religion !== c.religion) return false;
    if (c.community && !contains(p.community, c.community)) return false;
    if (c.maritalStatus && !any(c.maritalStatus) && p.maritalStatus !== c.maritalStatus) return false;
    if (c.motherTongue && !any(c.motherTongue) && p.motherTongue !== c.motherTongue) return false;
    if (c.education && !any(c.education) && p.education !== c.education) return false;
    if (c.diet && !any(c.diet) && p.diet !== c.diet) return false;
    if (c.location && !contains(p.city, c.location) && !contains(p.state, c.location)) return false;
    if (c.verifiedOnly && !p.verified) return false;
    return true;
  });
}
