"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { CalendarHeart, ChevronDown, Search, Sparkles, User } from "lucide-react";

const RELIGIONS = ["Any", "Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist", "Parsi", "Jewish", "Other"];

const AGES = Array.from({ length: 53 }, (_, i) => 18 + i); // 18–70

// Heights 4'6" to 7'0", stored in centimetres.
const HEIGHTS = Array.from({ length: 31 }, (_, i) => {
  const inches = 54 + i;
  return { cm: Math.round(inches * 2.54), label: `${Math.floor(inches / 12)}'${inches % 12}"` };
});

const box =
  "relative flex h-11 items-center rounded-md border border-maroon/15 bg-white text-sm text-ink transition focus-within:border-maroon focus-within:ring-4 focus-within:ring-maroon/10";
const control = "h-full w-full appearance-none bg-transparent pr-7 text-sm outline-none";
const label = "mb-1.5 block text-xs font-semibold text-ink";

function Chevron() {
  return <ChevronDown className="pointer-events-none absolute right-2.5 h-4 w-4 text-ink-soft" aria-hidden />;
}

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
      className="grid gap-5 rounded-xl bg-white p-5 shadow-card ring-1 ring-maroon/5 sm:p-6 lg:grid-cols-[230px_1fr] lg:items-center lg:gap-8"
    >
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-maroon-50">
          <Sparkles className="h-5 w-5 text-maroon" aria-hidden />
        </span>
        <div>
          <h2 className="font-serif text-xl text-ink">Start your search</h2>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">
            Tell us who you&apos;re looking for and we&apos;ll show compatible profiles.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.1fr_1fr_1.1fr_auto] lg:items-end">
        <div>
          <label htmlFor="s-name" className={label}>Name</label>
          <div className={box}>
            <User className="pointer-events-none ml-3 mr-2 h-4 w-4 shrink-0 text-maroon/70" aria-hidden />
            <input
              id="s-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search by name"
              className="h-full w-full bg-transparent pr-3 text-sm outline-none placeholder:text-ink-soft/70"
            />
          </div>
        </div>

        <div>
          <span className={label}>Age</span>
          <div className="flex items-center gap-1.5">
            <div className={`${box} flex-1 pl-3`}>
              <select aria-label="Minimum age" value={ageMin} onChange={(e) => setAgeMin(e.target.value)} className={control}>
                {AGES.map((a) => (
                  <option key={a} value={a} disabled={a > Number(ageMax)}>{a}</option>
                ))}
              </select>
              <Chevron />
            </div>
            <span className="text-xs text-ink-soft">to</span>
            <div className={`${box} flex-1 pl-3`}>
              <select aria-label="Maximum age" value={ageMax} onChange={(e) => setAgeMax(e.target.value)} className={control}>
                {AGES.map((a) => (
                  <option key={a} value={a} disabled={a < Number(ageMin)}>{a}</option>
                ))}
              </select>
              <Chevron />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="s-religion" className={label}>Religion</label>
          <div className={box}>
            <CalendarHeart className="pointer-events-none ml-3 mr-2 h-4 w-4 shrink-0 text-maroon/70" aria-hidden />
            <select id="s-religion" value={religion} onChange={(e) => setReligion(e.target.value)} className={control}>
              {RELIGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <Chevron />
          </div>
        </div>

        <div>
          <span className={label}>Height</span>
          <div className="flex items-center gap-1.5">
            <div className={`${box} flex-1 pl-3`}>
              <select aria-label="Minimum height" value={heightMin} onChange={(e) => setHeightMin(e.target.value)} className={control}>
                <option value="">Any</option>
                {HEIGHTS.map((h) => (
                  <option key={h.cm} value={h.cm} disabled={!!heightMax && h.cm > Number(heightMax)}>{h.label}</option>
                ))}
              </select>
              <Chevron />
            </div>
            <span className="text-xs text-ink-soft">to</span>
            <div className={`${box} flex-1 pl-3`}>
              <select aria-label="Maximum height" value={heightMax} onChange={(e) => setHeightMax(e.target.value)} className={control}>
                <option value="">Any</option>
                {HEIGHTS.map((h) => (
                  <option key={h.cm} value={h.cm} disabled={!!heightMin && h.cm < Number(heightMin)}>{h.label}</option>
                ))}
              </select>
              <Chevron />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex h-11 items-center justify-center gap-2 rounded-md bg-maroon px-6 text-sm font-semibold text-white transition hover:bg-maroon-dark sm:col-span-2 lg:col-span-1"
        >
          <Search className="h-4 w-4" aria-hidden />
          Find matches
        </button>
      </div>
    </form>
  );
}
