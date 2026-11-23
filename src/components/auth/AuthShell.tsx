import Image from "next/image";
import { BadgeCheck, Lock, HeartHandshake } from "lucide-react";

// Two-panel layout for Log in / Register: photo on the left, form on the right.
export default function AuthShell({ title, subtitle, children }: { title: React.ReactNode; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-14">
      <div className="relative hidden min-h-[560px] overflow-hidden rounded-3xl lg:block">
        <Image src="/images/hero-wedding.jpg" alt="" fill sizes="40vw" className="object-cover object-[50%_45%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-plum/85 via-plum/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-9 text-white">
          <p className="font-serif text-3xl leading-snug">Your forever begins with a single hello.</p>
          <ul className="mt-6 space-y-3 text-sm text-white/85">
            <li className="flex items-center gap-3"><BadgeCheck className="h-5 w-5 text-maroon-100" aria-hidden /> Verified profiles</li>
            <li className="flex items-center gap-3"><Lock className="h-5 w-5 text-maroon-100" aria-hidden /> Your details stay private</li>
            <li className="flex items-center gap-3"><HeartHandshake className="h-5 w-5 text-maroon-100" aria-hidden /> Matches based on your preferences</li>
          </ul>
        </div>
      </div>
      <div className="rounded-3xl border border-maroon/10 bg-white p-6 shadow-card sm:p-10">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-ink-soft">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
