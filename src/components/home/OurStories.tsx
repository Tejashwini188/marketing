import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
import { ArrowRight } from "lucide-react";

// Curved "Our stories" gallery. Drop real couple photos into
// public/images/stories/story-1.jpg … story-7.jpg — any that exist are used.
// Until then each card shows a different crop of the hero wedding photo.
const FALLBACK = "/images/hero-wedding.jpg";
const FALLBACK_CROPS = ["15% 20%", "55% 10%", "30% 45%", "55% 62%", "80% 35%", "10% 85%", "88% 70%"];

const CARDS = FALLBACK_CROPS.map((pos, i) => {
  const own = `/images/stories/story-${i + 1}.jpg`;
  const hasOwn = existsSync(path.join(process.cwd(), "public", own));
  return { src: hasOwn ? own : FALLBACK, pos: hasOwn ? "50% 50%" : pos, zoom: hasOwn ? 1 : 2.4 };
});

// Concave curve: cards further from the centre turn inwards and grow, like
// the inside of a ring. Offsets run −3 … 3.
function curve(offset: number) {
  const d = Math.abs(offset);
  return {
    transform: `perspective(1100px) rotateY(${offset * -11}deg) scale(${1 + d * 0.07})`,
    height: `${15 + d * 1.6}rem`,
    zIndex: 10 - d,
  };
}

export default function OurStories() {
  return (
    <section className="overflow-hidden py-20">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon">Here are our stories</p>
        <h2 className="mt-4 font-serif text-[2.1rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-5xl">
          Every couple has a story worth telling,{" "}
          <span className="relative inline-block whitespace-nowrap">
            one match at a time
            {/* hand-drawn underline */}
            <svg
              aria-hidden
              viewBox="0 0 300 18"
              preserveAspectRatio="none"
              className="absolute -bottom-3 left-0 h-3 w-full text-maroon"
            >
              <path
                d="M2 12 C 70 3, 170 2, 296 8 M 40 15 C 120 9, 210 9, 286 13"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ink-soft">
          Real couples who found each other on CSP Matrimony — their love, their families and the
          moments they will cherish forever.
        </p>
      </div>

      {/* Desktop: curved row */}
      <div className="mx-auto mt-14 hidden max-w-[1500px] items-center justify-center gap-4 px-4 md:flex [transform-style:preserve-3d]">
        {CARDS.map((c, i) => {
          const s = curve(i - 3);
          return (
            <div
              key={i}
              className="relative w-[13%] shrink-0 overflow-hidden rounded-[1.75rem] shadow-card ring-1 ring-black/5 transition duration-500 hover:-translate-y-2"
              style={{ transform: s.transform, height: s.height, zIndex: s.zIndex }}
            >
              <Image
                src={c.src}
                alt={`Couple story ${i + 1}`}
                fill
                sizes="15vw"
                className="object-cover"
                style={{ transformOrigin: c.pos, transform: `scale(${c.zoom})` }}
              />
            </div>
          );
        })}
      </div>

      {/* Mobile: swipeable row */}
      <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:hidden">
        {CARDS.map((c, i) => (
          <div key={i} className="relative h-72 w-52 shrink-0 snap-center overflow-hidden rounded-[1.75rem] shadow-card">
            <Image
              src={c.src}
              alt={`Couple story ${i + 1}`}
              fill
              sizes="210px"
              className="object-cover"
              style={{ transformOrigin: c.pos, transform: `scale(${c.zoom})` }}
            />
          </div>
        ))}
      </div>

      <div className="mt-14 text-center">
        <Link
          href="/success-stories"
          className="inline-flex items-center gap-2 rounded-full bg-maroon px-7 py-3.5 text-sm font-semibold text-white shadow-card transition hover:gap-3 hover:bg-maroon-dark"
        >
          Read their stories <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
