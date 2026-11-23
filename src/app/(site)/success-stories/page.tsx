import Link from "next/link";
import { Quote, Star } from "lucide-react";
import OurStories from "@/components/home/OurStories";
import { STORIES } from "@/lib/stories";

export const metadata = { title: "Success stories — CSP Matrimony" };

export default function SuccessStoriesPage() {
  return (
    <>
      <OurStories cta={false} />

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {STORIES.map((s) => (
            <figure key={s.names} className="rounded-3xl border border-maroon/10 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <Quote className="h-8 w-8 fill-maroon-100 text-maroon-100" aria-hidden />
                <span className="flex gap-0.5 text-maroon" aria-label="5 out of 5">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" aria-hidden />)}
                </span>
              </div>
              <blockquote className="mt-4 font-serif text-xl leading-relaxed text-ink">&ldquo;{s.text}&rdquo;</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-maroon font-semibold text-white">{s.names.charAt(0)}</span>
                <span>
                  <span className="block font-serif text-lg text-ink">{s.names}</span>
                  <span className="block text-xs text-ink-soft">{s.when}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-5 rounded-3xl bg-maroon px-6 py-12 text-center text-white sm:px-12">
          <h2 className="font-serif text-3xl sm:text-4xl">Your story could be next</h2>
          <p className="max-w-md text-sm text-white/80">Create your free profile and start meeting people who share your values.</p>
          <Link href="/register" className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-maroon transition hover:bg-maroon-50">
            Register free
          </Link>
        </div>
      </section>
    </>
  );
}
