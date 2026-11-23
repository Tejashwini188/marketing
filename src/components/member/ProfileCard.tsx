import Link from "next/link";
import { BadgeCheck, Briefcase, MapPin } from "lucide-react";
import Avatar from "./Avatar";
import LikeButton from "./LikeButton";
import { ageFrom, heightLabel } from "@/lib/options";
import type { Profile } from "@/lib/types";

export default function ProfileCard({ profile: p, liked, score }: { profile: Profile; liked: boolean; score?: number }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-maroon/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-card">
      <div className="relative aspect-[4/3.6] overflow-hidden rounded-3xl m-2 mb-0">
        <Avatar profile={p} className="h-full w-full text-5xl" />
        <div className="absolute right-3 top-3">
          <LikeButton profileId={p.id} liked={liked} />
        </div>
        {typeof score === "number" && (
          <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-maroon backdrop-blur">
            {score}% match
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="flex items-center gap-1.5 font-serif text-lg text-ink">
          {p.fullName}
          {p.verified && <BadgeCheck className="h-4 w-4 text-maroon" aria-label="Verified" />}
        </h3>
        <p className="mt-1 text-sm text-ink-soft">
          {ageFrom(p.dob)} yrs · {heightLabel(p.heightCm)} · {p.religion}, {p.community}
        </p>
        <p className="mt-3 flex items-center gap-2 text-sm text-ink">
          <Briefcase className="h-4 w-4 shrink-0 text-maroon" aria-hidden /> {p.occupation}
        </p>
        <p className="mt-1.5 flex items-center gap-2 text-sm text-ink">
          <MapPin className="h-4 w-4 shrink-0 text-maroon" aria-hidden /> {p.city}, {p.state}
        </p>
        <Link
          href={`/matches/${p.id}`}
          className="mt-5 rounded-full bg-maroon-50 py-2.5 text-center text-sm font-semibold text-maroon transition hover:bg-maroon hover:text-white"
        >
          View full profile
        </Link>
      </div>
    </article>
  );
}
