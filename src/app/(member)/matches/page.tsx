import Link from "next/link";
import { SearchX } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { getCandidates, matchScore, MATCH_TABS, profilesForTab, type MatchTab } from "@/lib/matching";
import ProfileCard from "@/components/member/ProfileCard";

export const metadata = { title: "Matches — CSP Matrimony" };

const INTRO: Record<MatchTab, string> = {
  new: "People who joined in the last two weeks.",
  today: "A fresh handful picked for you every day.",
  my: "Everyone who fits all of your partner preferences.",
  near: "Members in your city first, then your state.",
  all: "Everyone, best match first.",
};

export default async function MatchesPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const me = await requireUser();
  const { tab: raw } = await searchParams;
  const tab = (MATCH_TABS.some((t) => t.key === raw) ? raw : "new") as MatchTab;
  const candidates = await getCandidates(me);
  const list = profilesForTab(tab, me, candidates);

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon">Matches</p>
          <h1 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Profiles picked for <em className="italic text-maroon">you</em></h1>
          <p className="mt-2 text-sm text-ink-soft">{INTRO[tab]}</p>
        </div>
        <Link href="/dashboard#preferences" className="rounded-full border border-maroon/25 bg-white px-5 py-2.5 text-sm font-semibold text-maroon transition hover:bg-maroon-50">
          Edit partner preferences
        </Link>
      </div>

      <nav className="mt-8 flex gap-2 overflow-x-auto rounded-full bg-white p-1.5 shadow-sm ring-1 ring-maroon/10 sm:w-fit" aria-label="Match lists">
        {MATCH_TABS.map((t) => (
          <Link
            key={t.key}
            href={`/matches?tab=${t.key}`}
            aria-current={t.key === tab ? "page" : undefined}
            className={`shrink-0 rounded-full px-5 py-2 text-sm transition ${
              t.key === tab ? "bg-maroon font-semibold text-white" : "text-ink hover:bg-maroon-50 hover:text-maroon"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </nav>

      <p className="mt-6 text-sm text-ink-soft">{list.length} {list.length === 1 ? "profile" : "profiles"}</p>

      {list.length === 0 ? (
        <div className="mt-4 flex flex-col items-center rounded-3xl border border-maroon/10 bg-white px-6 py-16 text-center">
          <SearchX className="h-10 w-10 text-maroon/50" aria-hidden />
          <p className="mt-4 font-serif text-xl text-ink">No profiles here yet</p>
          <p className="mt-2 max-w-sm text-sm text-ink-soft">
            Try widening your partner preferences, or look through all profiles.
          </p>
          <Link href="/matches?tab=all" className="mt-6 rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-white hover:bg-maroon-dark">
            See more matches
          </Link>
        </div>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <ProfileCard key={p.id} profile={p} liked={me.likes.includes(p.id)} score={matchScore(p, me.preferences)} />
          ))}
        </div>
      )}
    </div>
  );
}
