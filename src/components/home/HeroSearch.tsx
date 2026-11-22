"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";

const RELIGIONS = [
  "Any",
  "Hindu",
  "Muslim",
  "Christian",
  "Sikh",
  "Jain",
  "Buddhist",
  "Parsi",
  "Jewish",
  "Other",
];

const AGES = Array.from({ length: 53 }, (_, i) => 18 + i); // 18–70

// Heights 4'6" to 7'0", stored in centimetres.
const HEIGHTS = Array.from({ length: 31 }, (_, i) => {
  const inches = 54 + i;
  return { cm: Math.round(inches * 2.54), label: `${Math.floor(inches / 12)}'${inches % 12}"` };
});

const field =
  "h-11 w-full rounded-lg border border-maroon/15 bg-ivory px-3 text-sm text-ink outline-none transition focus:border-maroon focus:ring-4 focus:ring-maroon/10";
const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft";

export default function HeroSearch() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [ageMin, setAgeMin] = useState("21");
  const [ageMax, setAgeMax] = useState("30");
  const [religion, setReligion] = useState("Any");
  const [heightMin, setHeightMin] = useState("");
  const [heightMax, setHeightMax] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams();
    if (name.trim()) q.set("name", name.trim());
    q.set("ageMin", ageMin);
    q.set("ageMax", ageMax);
    if (religion !== "Any") q.set("religion", religion);
    if (heightMin) q.set("heightMin", heightMin);
    if (heightMax) q.set("heightMax", heightMax);
    router.push(`/search?${q}`);
  };

  return (
    <form
      onSubmit={submit}
      aria-label="Start your search"
      className="rounded-2xl border border-maroon/10 bg-white p-5 shadow-card sm:p-6"
    >
      <h2 className="text-lg font-bold text-ink">Start Your Search</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:items-end">
        <div>
          <label htmlFor="s-name" className={label}>Name</label>
          <input
            id="s-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search by name"
            className={field}
          />
        </div>

        <div>
          <span className={label}>Age</span>
          <div className="flex items-center gap-2">
            <select aria-label="Minimum age" value={ageMin} onChange={(e) => setAgeMin(e.target.value)} className={field}>
              {AGES.map((a) => (
                <option key={a} value={a} disabled={a > Number(ageMax)}>{a}</option>
              ))}
            </select>
            <span className="text-xs text-ink-soft">to</span>
            <select aria-label="Maximum age" value={ageMax} onChange={(e) => setAgeMax(e.target.value)} className={field}>
              {AGES.map((a) => (
                <option key={a} value={a} disabled={a < Number(ageMin)}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="s-religion" className={label}>Religion</label>
          <select id="s-religion" value={religion} onChange={(e) => setReligion(e.target.value)} className={field}>
            {RELIGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <span className={label}>Height</span>
          <div className="flex items-center gap-2">
            <select aria-label="Minimum height" value={heightMin} onChange={(e) => setHeightMin(e.target.value)} className={field}>
              <option value="">Any</option>
              {HEIGHTS.map((h) => (
                <option key={h.cm} value={h.cm} disabled={!!heightMax && h.cm > Number(heightMax)}>{h.label}</option>
              ))}
            </select>
            <span className="text-xs text-ink-soft">to</span>
            <select aria-label="Maximum height" value={heightMax} onChange={(e) => setHeightMax(e.target.value)} className={field}>
              <option value="">Any</option>
              {HEIGHTS.map((h) => (
                <option key={h.cm} value={h.cm} disabled={!!heightMin && h.cm < Number(heightMin)}>{h.label}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="flex h-11 items-center justify-center gap-2 rounded-lg bg-maroon px-6 text-sm font-semibold text-white transition hover:bg-maroon-dark sm:col-span-2 lg:col-span-1"
        >
          <Search className="h-4 w-4" aria-hidden />
          Find Matches
        </button>
      </div>
    </form>
  );
}
