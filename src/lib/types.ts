import type { Gender } from "./options";

// What other members can see. Never contains email, phone or password.
export type Profile = {
  id: string;
  fullName: string;
  gender: Gender;
  dob: string; // YYYY-MM-DD
  maritalStatus: string;
  heightCm: number;
  motherTongue: string;
  religion: string;
  community: string;
  diet: string;
  country: string;
  state: string;
  city: string;
  education: string;
  occupation: string;
  income: string;
  familyType: string;
  fatherOccupation: string;
  motherOccupation: string;
  siblings: string;
  aboutMe: string;
  createdFor: string;
  createdAt: string; // ISO
  photos: string[]; // file names under .data/uploads/<id>/
  verified?: boolean;
  sample?: boolean;
};

export type Preferences = {
  ageMin: number;
  ageMax: number;
  heightMin: number; // cm, 0 = any
  heightMax: number; // cm, 0 = any
  religion: string; // "Any" or a religion
  maritalStatus: string; // "Any" or a status
  motherTongue: string; // "Any" or a language
  education: string; // "Any" or a level
  location: string; // free text city/state, "" = anywhere
};

export type User = Profile & {
  email: string;
  phone: string;
  passwordHash: string;
  salt: string;
  likes: string[]; // profile ids
  preferences: Preferences;
};

export type Db = {
  users: User[];
  sessions: Record<string, { userId: string; createdAt: string }>;
};
