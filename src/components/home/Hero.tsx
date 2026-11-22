import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
import { Heart, ShieldCheck } from "lucide-react";
import HeroSearch from "./HeroSearch";

// Drop the hero photo at public/images/hero-couple.jpg — until then a styled
// placeholder keeps the layout intact.
const HERO_PHOTO = "/images/hero-couple.jpg";
const hasPhoto = existsSync(path.join(process.cwd(), "public", HERO_PHOTO));

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* soft maroon glow behind the photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-maroon-100/60 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-10 pt-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:px-8 lg:pt-16">
        {/* LEFT — tagline, quote, actions */}
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-maroon-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-maroon">
            <Heart className="h-3.5 w-3.5 fill-current" aria-hidden />
            Trusted matrimony
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Find Someone Who <span className="text-maroon">Feels Like Home.</span>
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
            Discover meaningful connections and meet compatible people who are looking for a
            lifelong partner.
          </p>

          <blockquote className="mt-6 max-w-md border-l-2 border-maroon/40 pl-4 text-base italic text-ink-soft">
            “A good marriage is not finding the perfect person, but finding the right one to walk
            beside.”
          </blockquote>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/register"
              className="rounded-xl bg-maroon px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-maroon-dark"
            >
              Create Your Profile
            </Link>
            <Link
              href="/matches"
              className="rounded-xl border border-maroon/20 bg-white px-6 py-3 text-sm font-semibold text-maroon transition hover:border-maroon/40"
            >
              Browse Matches
            </Link>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-ink-soft">
            <ShieldCheck className="h-4 w-4 text-maroon" aria-hidden />
            Trusted by thousands of people looking for a life partner.
          </p>
        </div>

        {/* RIGHT — couple photo */}
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ivory-dark shadow-card ring-1 ring-maroon/10">
            {hasPhoto ? (
              <Image
                src={HERO_PHOTO}
                alt="A happy couple who found each other on CSP Matrimony"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-maroon-50 via-ivory to-maroon-100 text-center">
                <Heart className="h-12 w-12 text-maroon/40" aria-hidden />
                <p className="px-6 text-sm font-medium text-maroon/70">
                  Hero photo goes here
                  <br />
                  <span className="font-normal text-ink-soft">public/images/hero-couple.jpg</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FULL-WIDTH SEARCH BAR */}
      <div className="relative mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <HeroSearch />
      </div>
    </section>
  );
}
