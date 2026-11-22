import Image from "next/image";
import Link from "next/link";
import { Compass, HeartHandshake, ShieldCheck, UserRoundCheck } from "lucide-react";

const POINTS = [
  { icon: ShieldCheck, title: "Safe & verified", body: "Profiles are screened and verified before they go live." },
  { icon: Compass, title: "Smart matching", body: "Matches built around your partner preferences and values." },
  { icon: UserRoundCheck, title: "Personal assistance", body: "A dedicated relationship advisor for premium members." },
  { icon: HeartHandshake, title: "Family friendly", body: "Profiles can be created and managed by parents or siblings." },
];

export default function WhyUs() {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 lg:grid-cols-2 lg:px-8">
      {/* Photo with overlay card */}
      <div className="relative min-h-[380px] overflow-hidden rounded-3xl">
        <Image
          src="/images/hero-wedding.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[50%_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-plum/30 to-transparent" />
        <div className="relative m-6 max-w-sm rounded-3xl bg-maroon/90 p-7 text-white backdrop-blur sm:m-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-maroon-100">Why choose us</p>
          <h2 className="mt-3 font-serif text-3xl leading-snug">Trusted care for your most important decision</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/85">
            We bring families and individuals together with honesty, privacy and respect for every
            tradition.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-maroon transition hover:bg-maroon-50"
          >
            Learn more about us
          </Link>
        </div>
      </div>

      {/* 2×2 feature grid */}
      <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-blush/60 sm:grid-cols-2">
        {POINTS.map(({ icon: Icon, title, body }, i) => (
          <div
            key={title}
            className={`flex flex-col items-center justify-center p-8 text-center ${
              i % 2 === 0 ? "sm:border-r" : ""
            } ${i < 2 ? "border-b" : ""} border-maroon/10`}
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-white shadow-sm ring-1 ring-maroon/10">
              <Icon className="h-6 w-6 text-maroon" aria-hidden />
            </span>
            <h3 className="mt-4 font-serif text-lg text-ink">{title}</h3>
            <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-ink-soft">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
