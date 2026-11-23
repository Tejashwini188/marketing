import Link from "next/link";
import { BadgeCheck, Briefcase, Heart, MapPin, Sparkles, Star, Trash2, Users } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { getAllProfiles, getCandidates, profilesForTab } from "@/lib/matching";
import { ageFrom, firstName, heightLabel } from "@/lib/options";
import { photoAction } from "@/lib/actions";
import Avatar from "@/components/member/Avatar";
import LikeButton from "@/components/member/LikeButton";
import PhotoUploader from "@/components/member/PhotoUploader";
import PreferencesForm from "@/components/member/PreferencesForm";
import { card } from "@/components/ui/styles";
import type { User } from "@/lib/types";

export const metadata = { title: "My dashboard — CSP Matrimony" };

function completeness(u: User) {
  const checks = [
    u.photos.length > 0,
    u.aboutMe.length >= 30,
    !!u.fatherOccupation,
    !!u.motherOccupation,
    !!u.siblings,
    u.photos.length >= 3,
    u.preferences.location !== "" || u.preferences.religion !== "Any",
  ];
  return Math.round(((checks.filter(Boolean).length + 3) / (checks.length + 3)) * 100);
}

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ welcome?: string }> }) {
  const me = await requireUser();
  const { welcome } = await searchParams;
  const [all, candidates] = await Promise.all([getAllProfiles(), getCandidates(me)]);
  const liked = me.likes.map((id) => all.find((p) => p.id === id)).filter((p) => !!p);
  const myMatches = profilesForTab("my", me, candidates);
  const newMatches = profilesForTab("new", me, candidates);
  const pct = completeness(me);

  const details: [string, string][] = [
    ["Age", `${ageFrom(me.dob)} years`],
    ["Height", heightLabel(me.heightCm)],
    ["Marital status", me.maritalStatus],
    ["Religion", me.religion],
    ["Community", me.community],
    ["Mother tongue", me.motherTongue],
    ["Diet", me.diet],
    ["Education", me.education],
    ["Annual income", me.income],
    ["Family type", me.familyType],
    ["Father", me.fatherOccupation || "—"],
    ["Mother", me.motherOccupation || "—"],
    ["Siblings", me.siblings || "—"],
    ["Profile created by", me.createdFor],
  ];

  const stats = [
    { icon: Heart, value: liked.length, label: "Profiles you liked", href: "#liked" },
    { icon: Star, value: myMatches.length, label: "Match your preferences", href: "/matches?tab=my" },
    { icon: Sparkles, value: newMatches.length, label: "New in the last 2 weeks", href: "/matches?tab=new" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
      {/* Welcome band */}
      <section className="relative overflow-hidden rounded-3xl bg-maroon p-7 text-white shadow-card sm:p-10">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" aria-hidden />
        <div className="absolute -bottom-20 right-32 h-48 w-48 rounded-full bg-white/5" aria-hidden />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon-100">My dashboard</p>
            <h1 className="mt-3 font-serif text-3xl sm:text-4xl">
              {welcome ? "Welcome" : "Welcome back"}, <em className="italic">{firstName(me.fullName)}</em>
            </h1>
            <p className="mt-3 max-w-md text-sm text-white/80">
              {welcome
                ? "Your profile is ready. Add a few photos and set your partner preferences to get better matches."
                : "Here’s what’s happening with your profile today."}
            </p>
            <div className="mt-6 max-w-sm">
              <div className="flex justify-between text-xs text-white/80"><span>Profile complete</span><span>{pct}%</span></div>
              <div className="mt-2 h-2 rounded-full bg-white/15"><div className="h-2 rounded-full bg-white" style={{ width: `${pct}%` }} /></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {stats.map(({ icon: Icon, value, label, href }) => (
              <Link key={label} href={href} className="rounded-3xl bg-white/10 p-4 text-center backdrop-blur transition hover:bg-white/20">
                <Icon className="mx-auto h-5 w-5 text-maroon-100" aria-hidden />
                <p className="mt-2 font-serif text-3xl">{value}</p>
                <p className="mt-1 text-[11px] leading-tight text-white/75">{label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* My profile */}
        <aside className={`${card} h-fit lg:sticky lg:top-24`} id="profile">
          <div className="flex flex-col items-center text-center">
            <Avatar profile={me} className="h-28 w-28 rounded-full text-3xl ring-4 ring-maroon-50" />
            <h2 className="mt-4 flex items-center gap-1.5 font-serif text-2xl text-ink">
              {me.fullName}
              {me.verified && <BadgeCheck className="h-5 w-5 text-maroon" aria-label="Verified" />}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft"><Briefcase className="h-4 w-4" aria-hidden /> {me.occupation}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft"><MapPin className="h-4 w-4" aria-hidden /> {me.city}, {me.state}</p>
            {!me.verified && (
              <span className="mt-3 rounded-full bg-ivory px-3 py-1 text-xs text-ink-soft">Verification pending</span>
            )}
          </div>
          <dl className="mt-6 divide-y divide-maroon/10 border-t border-maroon/10 text-sm">
            {details.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2.5">
                <dt className="text-ink-soft">{k}</dt>
                <dd className="text-right font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 rounded-3xl bg-ivory p-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-maroon">About me</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink">{me.aboutMe}</p>
          </div>
        </aside>

        <div className="space-y-6">
          {/* Photos */}
          <section className={card} id="photos">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl text-ink">My photos</h2>
                <p className="mt-1 text-sm text-ink-soft">Profiles with photos get far more responses. Your first photo is your main photo.</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {me.photos.map((name, i) => (
                <figure key={name} className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-ivory">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/api/photos/${me.id}/${name}`} alt={`My photo ${i + 1}`} className="h-full w-full object-cover" />
                  {i === 0 && <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-maroon">Main photo</span>}
                  <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                    {i > 0 && (
                      <form action={photoAction} className="flex-1">
                        <input type="hidden" name="name" value={name} />
                        <button name="op" value="main" className="w-full rounded-full bg-white/95 py-2 text-xs font-semibold text-maroon">Make main</button>
                      </form>
                    )}
                    <form action={photoAction}>
                      <input type="hidden" name="name" value={name} />
                      <button name="op" value="delete" aria-label="Delete photo" className="grid h-8 w-8 place-items-center rounded-full bg-white/95 text-maroon">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </figure>
              ))}
              {me.photos.length === 0 && (
                <div className="col-span-2 grid aspect-[8/3] place-items-center rounded-3xl border-2 border-dashed border-maroon/15 bg-ivory/60 text-sm text-ink-soft sm:col-span-3">
                  No photos yet
                </div>
              )}
            </div>
            <div className="mt-6"><PhotoUploader disabled={me.photos.length >= 6} /></div>
          </section>

          {/* Partner preferences */}
          <section className={card} id="preferences">
            <h2 className="font-serif text-2xl text-ink">Partner preferences</h2>
            <p className="mt-1 text-sm text-ink-soft">We use these to build &ldquo;My matches&rdquo; and your match percentage.</p>
            <div className="mt-6"><PreferencesForm prefs={me.preferences} /></div>
          </section>

          {/* Liked */}
          <section className={card} id="liked">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl text-ink">People you liked</h2>
                <p className="mt-1 text-sm text-ink-soft">Tap the heart on any profile to add it here.</p>
              </div>
              <Link href="/matches" className="rounded-full bg-maroon-50 px-5 py-2.5 text-sm font-semibold text-maroon transition hover:bg-maroon hover:text-white">
                Browse matches
              </Link>
            </div>
            {liked.length === 0 ? (
              <div className="mt-6 flex flex-col items-center rounded-3xl bg-ivory/70 px-6 py-10 text-center">
                <Users className="h-8 w-8 text-maroon/60" aria-hidden />
                <p className="mt-3 text-sm text-ink-soft">You haven’t liked anyone yet.</p>
              </div>
            ) : (
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {liked.map((p) => (
                  <li key={p.id} className="flex items-center gap-4 rounded-3xl border border-maroon/10 p-3 pr-4">
                    <Avatar profile={p} className="h-16 w-16 shrink-0 rounded-2xl text-lg" />
                    <Link href={`/matches/${p.id}`} className="min-w-0 flex-1">
                      <p className="truncate font-serif text-lg text-ink hover:text-maroon">{p.fullName}</p>
                      <p className="truncate text-xs text-ink-soft">
                        {ageFrom(p.dob)} yrs · {p.religion} · {p.city}
                      </p>
                    </Link>
                    <LikeButton profileId={p.id} liked />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
