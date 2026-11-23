import Link from "next/link";
import { RotateCcw, Search, SearchX } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { getCandidates, matchScore, searchProfiles, type SearchCriteria } from "@/lib/matching";
import { AGES, DIET, EDUCATION, HEIGHTS, MARITAL_STATUS, MOTHER_TONGUES, RELIGIONS } from "@/lib/options";
import ProfileCard from "@/components/member/ProfileCard";
import { card, input, label, primaryBtn, select } from "@/components/ui/styles";

export const metadata = { title: "Search — CSP Matrimony" };

type Params = Record<string, string | undefined>;

function AnySelect({ id, text, options, value }: { id: string; text: string; options: string[]; value?: string }) {
  return (
    <div>
      <label htmlFor={id} className={label}>{text}</label>
      <select id={id} name={id} defaultValue={value ?? "Any"} className={select}>
        <option>Any</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<Params> }) {
  const me = await requireUser();
  const q = await searchParams;
  const searched = Object.keys(q).length > 0;
  const n = (v?: string) => (v ? Number(v) || undefined : undefined);

  const criteria: SearchCriteria = {
    name: q.name,
    ageMin: n(q.ageMin),
    ageMax: n(q.ageMax),
    heightMin: n(q.heightMin),
    heightMax: n(q.heightMax),
    religion: q.religion,
    community: q.community,
    maritalStatus: q.maritalStatus,
    motherTongue: q.motherTongue,
    education: q.education,
    diet: q.diet,
    location: q.location,
    verifiedOnly: q.verified === "on",
  };
  const results = searched ? searchProfiles(await getCandidates(me), criteria) : [];

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon">Search</p>
      <h1 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Find the <em className="italic text-maroon">right</em> person</h1>
      <p className="mt-2 text-sm text-ink-soft">Fill in as much or as little as you like — empty fields mean &ldquo;any&rdquo;.</p>

      <form action="/search" className={`${card} mt-8`}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <label htmlFor="name" className={label}>Name</label>
            <input id="name" name="name" defaultValue={q.name} className={input} placeholder="Search by name" />
          </div>
          <div>
            <span className={label}>Age</span>
            <div className="flex items-center gap-2">
              <select name="ageMin" aria-label="Minimum age" defaultValue={q.ageMin ?? "21"} className={select}>
                {AGES.map((a) => <option key={a}>{a}</option>)}
              </select>
              <span className="text-xs text-ink-soft">to</span>
              <select name="ageMax" aria-label="Maximum age" defaultValue={q.ageMax ?? "35"} className={select}>
                {AGES.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
          </div>
          <div>
            <span className={label}>Height</span>
            <div className="flex items-center gap-2">
              <select name="heightMin" aria-label="Minimum height" defaultValue={q.heightMin ?? ""} className={select}>
                <option value="">Any</option>
                {HEIGHTS.map((h) => <option key={h.cm} value={h.cm}>{h.label}</option>)}
              </select>
              <span className="text-xs text-ink-soft">to</span>
              <select name="heightMax" aria-label="Maximum height" defaultValue={q.heightMax ?? ""} className={select}>
                <option value="">Any</option>
                {HEIGHTS.map((h) => <option key={h.cm} value={h.cm}>{h.label}</option>)}
              </select>
            </div>
          </div>
          <AnySelect id="religion" text="Religion" options={RELIGIONS} value={q.religion} />
          <div>
            <label htmlFor="community" className={label}>Caste / community</label>
            <input id="community" name="community" defaultValue={q.community} className={input} placeholder="Any" />
          </div>
          <AnySelect id="maritalStatus" text="Marital status" options={MARITAL_STATUS} value={q.maritalStatus} />
          <AnySelect id="motherTongue" text="Mother tongue" options={MOTHER_TONGUES} value={q.motherTongue} />
          <AnySelect id="education" text="Education" options={EDUCATION} value={q.education} />
          <AnySelect id="diet" text="Diet" options={DIET} value={q.diet} />
          <div className="sm:col-span-2">
            <label htmlFor="location" className={label}>City or state</label>
            <input id="location" name="location" defaultValue={q.location} className={input} placeholder="Anywhere" />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-maroon/10 pt-6">
          <label className="flex items-center gap-3 text-sm text-ink">
            <input type="checkbox" name="verified" defaultChecked={q.verified === "on"} className="h-4 w-4 accent-maroon" />
            Verified profiles only
          </label>
          <div className="flex gap-3">
            <Link href="/search" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-ink-soft hover:text-maroon">
              <RotateCcw className="h-4 w-4" aria-hidden /> Clear
            </Link>
            <button type="submit" className={primaryBtn}><Search className="h-4 w-4" aria-hidden /> Search</button>
          </div>
        </div>
      </form>

      {searched && (
        <section className="mt-10" aria-live="polite">
          <h2 className="font-serif text-2xl text-ink">
            {results.length} {results.length === 1 ? "profile" : "profiles"} found
          </h2>
          {results.length === 0 ? (
            <div className="mt-4 flex flex-col items-center rounded-3xl border border-maroon/10 bg-white px-6 py-14 text-center">
              <SearchX className="h-10 w-10 text-maroon/50" aria-hidden />
              <p className="mt-4 text-sm text-ink-soft">No one matches all of those yet. Try removing a filter or two.</p>
            </div>
          ) : (
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((p) => (
                <ProfileCard key={p.id} profile={p} liked={me.likes.includes(p.id)} score={matchScore(p, me.preferences)} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
