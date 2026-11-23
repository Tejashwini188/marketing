import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, ArrowRight } from "lucide-react";
import HeroSearch from "./HeroSearch";

export default function Hero() {
  return (
    <section className="relative">
      {/* Photo + copy band */}
      <div className="relative overflow-hidden bg-ivory">
        {/* Wedding photo — right side, melting into ivory on the left */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[60%]">
          <Image
            src="/images/hero-wedding.jpg"
            alt="Bride and groom holding hands at their wedding, with mehndi, bangles and garlands"
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover object-[50%_55%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/70 to-transparent lg:via-ivory/25" />
          <div className="absolute inset-0 bg-ivory/55 lg:hidden" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center px-5 pb-12 pt-14 lg:min-h-[600px] lg:grid-cols-2 lg:px-8 lg:pb-36">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon">
              Begin your forever with us
            </p>
            <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.1] text-ink sm:text-5xl lg:text-[3.6rem]">
              Every love story deserves a{" "}
              <em className="font-serif italic text-maroon">beautiful</em> beginning
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
              Discover meaningful connections and meet compatible people who are looking for a
              lifelong partner — with verified profiles and complete privacy.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/register"
                className="rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-maroon-dark"
              >
                Create your profile
              </Link>
              <Link
                href="/matches"
                className="rounded-full border border-ink/25 bg-white/70 px-6 py-3 text-sm font-semibold text-ink backdrop-blur transition hover:border-maroon hover:text-maroon"
              >
                Browse matches
              </Link>
            </div>
          </div>

          {/* Floating highlight card (like the reference's offer card) */}
          <div className="hidden justify-end self-end lg:flex">
            <div className="w-56 rounded-3xl bg-white/95 p-5 shadow-card backdrop-blur">
              <BadgeCheck className="h-6 w-6 text-maroon" aria-hidden />
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                Premium membership
              </p>
              <p className="mt-1 font-serif text-2xl text-ink">See who likes you</p>
              <p className="mt-1 text-sm text-ink-soft">Unlock contact details and priority matches.</p>
              <Link
                href="/register"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-maroon hover:gap-2.5"
              >
                Join free <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search card overlapping the bottom of the photo band */}
      <div className="relative z-10 mx-auto mt-6 max-w-7xl px-5 lg:-mt-24 lg:px-8">
        <HeroSearch />
      </div>
    </section>
  );
}
