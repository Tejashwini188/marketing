"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

// SAMPLE CONTENT — replace with real success stories (with the couples'
// permission) before the site goes live.
const STORIES = [
  { names: "Priya & Arjun", when: "Married March 2026", text: "We matched on a Sunday and our families met within a month. The verified profiles gave us real confidence." },
  { names: "Ayesha & Imran", when: "Married January 2026", text: "The privacy settings meant I only shared my photos when I was ready. It felt respectful from day one." },
  { names: "Neha & Rohit", when: "Married November 2025", text: "Our parents created our profiles together. The matches were thoughtful and the support team was always there." },
  { names: "Sara & Daniel", when: "Married August 2025", text: "Searching by community and location made it easy to find someone who shared our values." },
];

export default function Testimonials() {
  const [start, setStart] = useState(0);
  const visible = [0, 1, 2].map((i) => STORIES[(start + i) % STORIES.length]);
  const move = (d: number) => setStart((s) => (s + d + STORIES.length) % STORIES.length);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon">Success stories</p>
          <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">They found their forever here</h2>
        </div>

        <div className="relative mt-12">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous stories"
            className="absolute -left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white shadow-card ring-1 ring-maroon/10 transition hover:text-maroon md:grid lg:-left-5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="grid gap-5 md:grid-cols-3">
            {visible.map((s, i) => (
              <figure
                key={`${s.names}-${i}`}
                className={`rounded-xl border border-maroon/10 bg-ivory/60 p-7 ${i > 0 ? "hidden md:block" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <Quote className="h-7 w-7 fill-maroon-100 text-maroon-100" aria-hidden />
                  <span className="flex gap-0.5 text-maroon" aria-label="5 out of 5">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-current" aria-hidden />
                    ))}
                  </span>
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-ink">{s.text}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-maroon text-sm font-semibold text-white">
                    {s.names.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-serif text-base text-ink">{s.names}</span>
                    <span className="block text-xs text-ink-soft">{s.when}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next stories"
            className="absolute -right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white shadow-card ring-1 ring-maroon/10 transition hover:text-maroon md:grid lg:-right-5"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-6 flex justify-center gap-3 md:hidden">
            <button type="button" onClick={() => move(-1)} aria-label="Previous story" className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-card ring-1 ring-maroon/10">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Next story" className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-card ring-1 ring-maroon/10">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
