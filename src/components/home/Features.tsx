import Link from "next/link";
import { ArrowRight, BadgeCheck, Crown, HeartHandshake, Lock, MapPin, Users } from "lucide-react";

// "Our services" row from the reference, adapted to what CSP Matrimony offers.
const FEATURES = [
  { icon: BadgeCheck, title: "Verified profiles", body: "Every profile is checked so you meet genuine people.", href: "/about#verification" },
  { icon: HeartHandshake, title: "Daily matches", body: "Fresh matches every day, based on your partner preferences.", href: "/matches" },
  { icon: MapPin, title: "Matches near you", body: "Find compatible people in your city or community.", href: "/matches?tab=near-me" },
  { icon: Users, title: "Detailed search", body: "Filter by age, religion, height, education and more.", href: "/search" },
  { icon: Lock, title: "Privacy control", body: "Choose who can see your photos and contact details.", href: "/about#privacy" },
  { icon: Crown, title: "Premium membership", body: "Unlock contact details, priority listing and more.", href: "/membership" },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon">Why CSP Matrimony</p>
        <h2 className="mx-auto mt-3 max-w-xl font-serif text-3xl leading-snug text-ink sm:text-4xl">
          Everything you need for a <em className="italic text-maroon">perfect</em> match
        </h2>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {FEATURES.map(({ icon: Icon, title, body, href }) => (
          <article
            key={title}
            className="group flex flex-col rounded-xl border border-maroon/10 bg-white text-center shadow-sm transition hover:-translate-y-1 hover:shadow-card"
          >
            <div className="h-20 rounded-t-xl bg-gradient-to-br from-blush via-maroon-50 to-ivory" />
            <span className="mx-auto -mt-7 grid h-14 w-14 place-items-center rounded-full bg-white shadow-card ring-1 ring-maroon/10">
              <Icon className="h-6 w-6 text-maroon" aria-hidden />
            </span>
            <div className="flex flex-1 flex-col px-5 pb-6 pt-4">
              <h3 className="font-serif text-lg text-ink">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{body}</p>
              <Link
                href={href}
                className="mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-maroon transition group-hover:gap-2.5"
              >
                Learn more <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
