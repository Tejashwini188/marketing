// Shared option lists and small helpers (safe for client and server).

export const RELIGIONS = ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist", "Parsi", "Jewish", "Other"];
export const MARITAL_STATUS = ["Never married", "Divorced", "Widowed", "Awaiting divorce"];
export const MOTHER_TONGUES = [
  "Hindi", "Telugu", "Tamil", "Kannada", "Malayalam", "Marathi", "Bengali", "Gujarati",
  "Punjabi", "Urdu", "Odia", "English", "Other",
];
export const EDUCATION = ["High school", "Diploma", "Bachelor's", "Master's", "Doctorate", "Professional (CA / CS / etc.)", "Other"];
export const INCOME = ["Prefer not to say", "Below ₹3 lakh", "₹3–6 lakh", "₹6–10 lakh", "₹10–20 lakh", "₹20–35 lakh", "₹35 lakh +"];
export const FAMILY_TYPE = ["Nuclear", "Joint", "Other"];
export const DIET = ["Vegetarian", "Non-vegetarian", "Eggetarian", "Vegan", "Jain"];
export const CREATED_FOR = ["Myself", "My son", "My daughter", "My brother", "My sister", "My relative", "My friend"];
export const GENDERS = ["Female", "Male"] as const;
export type Gender = (typeof GENDERS)[number];

export const AGES = Array.from({ length: 53 }, (_, i) => 18 + i); // 18–70

// Heights 4'6" to 7'0", stored in centimetres.
export const HEIGHTS = Array.from({ length: 31 }, (_, i) => {
  const inches = 54 + i;
  return { cm: Math.round(inches * 2.54), label: `${Math.floor(inches / 12)}'${inches % 12}"` };
});

export function heightLabel(cm: number) {
  const inches = Math.round(cm / 2.54);
  return `${Math.floor(inches / 12)}'${inches % 12}"`;
}

export function ageFrom(dob: string, now = new Date()) {
  const d = new Date(dob);
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

export function firstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

export function initials(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}
