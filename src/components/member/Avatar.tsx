import { initials } from "@/lib/options";
import type { Profile } from "@/lib/types";

// Main photo if the member has added one, otherwise their initials.
export default function Avatar({ profile, className = "" }: { profile: Profile; className?: string }) {
  const photo = profile.photos[0];
  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/api/photos/${profile.id}/${photo}`}
        alt={profile.fullName}
        className={`object-cover ${className}`}
      />
    );
  }
  const tone = profile.gender === "Female" ? "from-maroon-100 via-blush to-ivory" : "from-maroon-50 via-ivory-dark to-blush";
  return (
    <span
      role="img"
      aria-label={profile.fullName}
      className={`grid place-items-center bg-gradient-to-br ${tone} font-serif font-semibold text-maroon ${className}`}
    >
      {initials(profile.fullName)}
    </span>
  );
}
