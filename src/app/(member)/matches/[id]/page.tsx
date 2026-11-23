import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, Briefcase, Check, GraduationCap, Lock, MapPin, X } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { getProfile, matchScore } from "@/lib/matching";
import { ageFrom, firstName, heightLabel } from "@/lib/options";
import Avatar from "@/components/member/Avatar";
import LikeButton from "@/components/member/LikeButton";
import { card } from "@/components/ui/styles";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const me = await requireUser();
  const { id } = await params;
  const p = await getProfile(id);
  if (!p || p.id === me.id) notFound();

  const age = ageFrom(p.dob);
  const pr = me.preferences;
  const score = matchScore(p, pr);
  const prefRows: [string, boolean][] = [
    [`Age ${pr.ageMin}–${pr.ageMax}`, age >= pr.ageMin && age <= pr.ageMax],
    [
      pr.heightMin || pr.heightMax ? `Height ${pr.heightMin ? heightLabel(pr.heightMin) : "any"} – ${pr.heightMax ? heightLabel(pr.heightMax) : "any"}` : "Any height",
      (!pr.heightMin || p.heightCm >= pr.heightMin) && (!pr.heightMax || p.heightCm <= pr.heightMax),
    ],
    [pr.religion === "Any" ? "Any religion" : pr.religion, pr.religion === "Any" || pr.religion === p.religion],
    [pr.maritalStatus === "Any" ? "Any marital status" : pr.maritalStatus, pr.maritalStatus === "Any" || pr.maritalStatus === p.maritalStatus],
    [pr.motherTongue === "Any" ? "Any mother tongue" : pr.motherTongue, pr.motherTongue === "Any" || pr.motherTongue === p.motherTongue],
    [pr.education === "Any" ? "Any education" : pr.education, pr.education === "Any" || pr.education === p.education],
    [pr.location ? `Lives in ${pr.location}` : "Any location",
      !pr.location || [p.city, p.state].some((x) => x.toLowerCase().includes(pr.location.toLowerCase()))],
  ];

  const sections: { title: string; rows: [string, string][] }[] = [
    { title: "Basic details", rows: [["Age", `${age} years`], ["Height", heightLabel(p.heightCm)], ["Marital status", p.maritalStatus], ["Mother tongue", p.motherTongue], ["Diet", p.diet], ["Profile created by", p.createdFor]] },
    { title: "Religion & community", rows: [["Religion", p.religion], ["Community", p.community]] },
    { title: "Education & career", rows: [["Education", p.education], ["Occupation", p.occupation], ["Annual income", p.income]] },
    { title: "Location", rows: [["City", p.city], ["State", p.state], ["Country", p.country]] },
    { title: "Family", rows: [["Family type", p.familyType], ["Father", p.fatherOccupation || "—"], ["Mother", p.motherOccupation || "—"], ["Siblings", p.siblings || "—"]] },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
      <Link href="/matches" className="inline-flex items-center gap-2 rounded-full px-1 text-sm font-semibold text-maroon hover:gap-3">
        <ArrowLeft className="h-4 w-4" aria-hidden /> Back to matches
      </Link>

      <div className="mt-5 grid gap-6 lg:grid-cols-[380px_1fr]">
        <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          <div className="overflow-hidden rounded-3xl border border-maroon/10 bg-white p-2 shadow-card">
            <Avatar profile={p} className="aspect-[4/4.4] w-full rounded-3xl text-7xl" />
            <div className="p-5">
              <h1 className="flex items-center gap-2 font-serif text-3xl text-ink">
                {p.fullName}
                {p.verified && <BadgeCheck className="h-6 w-6 text-maroon" aria-label="Verified" />}
              </h1>
              <p className="mt-1 text-sm text-ink-soft">{age} yrs · {heightLabel(p.heightCm)} · {p.religion}, {p.community}</p>
              <ul className="mt-4 space-y-2 text-sm text-ink">
                <li className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-maroon" aria-hidden /> {p.occupation}</li>
                <li className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-maroon" aria-hidden /> {p.education}</li>
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-maroon" aria-hidden /> {p.city}, {p.state}</li>
              </ul>
              <div className="mt-6"><LikeButton profileId={p.id} liked={me.likes.includes(p.id)} big /></div>
            </div>
          </div>
          {p.photos.length > 1 && (
            <div className="grid grid-cols-3 gap-2">
              {p.photos.slice(1).map((ph) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={ph} src={`/api/photos/${p.id}/${ph}`} alt="" className="aspect-square w-full rounded-2xl object-cover" />
              ))}
            </div>
          )}
        </aside>

        <div className="space-y-6">
          <section className={card}>
            <h2 className="font-serif text-2xl text-ink">About {firstName(p.fullName)}</h2>
            <p className="mt-3 leading-relaxed text-ink">{p.aboutMe}</p>
          </section>

          <section className={`${card} grid gap-x-10 gap-y-8 md:grid-cols-2`}>
            {sections.map((s) => (
              <div key={s.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-maroon">{s.title}</h3>
                <dl className="mt-3 divide-y divide-maroon/10 text-sm">
                  {s.rows.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 py-2.5">
                      <dt className="text-ink-soft">{k}</dt>
                      <dd className="text-right font-medium text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </section>

          <section className={card}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-serif text-2xl text-ink">How you match</h2>
              <span className="rounded-full bg-maroon px-4 py-1.5 text-sm font-semibold text-white">{score}% match</span>
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {prefRows.map(([text, ok]) => (
                <li key={text} className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-sm ${ok ? "bg-maroon-50 text-ink" : "bg-ivory text-ink-soft"}`}>
                  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${ok ? "bg-maroon text-white" : "bg-white text-ink-soft"}`}>
                    {ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </section>

          <section className="flex items-start gap-4 rounded-3xl bg-blush/70 p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white"><Lock className="h-5 w-5 text-maroon" aria-hidden /></span>
            <div>
              <h2 className="font-serif text-lg text-ink">Contact details are private</h2>
              <p className="mt-1 text-sm text-ink-soft">
                Phone numbers and email addresses are never shown on profiles. Like this profile to show your interest.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
