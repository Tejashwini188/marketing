import Link from "next/link";
import { HeartHandshake } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/matches", label: "Matches" },
  { href: "/search", label: "Search" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/contact", label: "Contact" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="CSP Matrimony home">
      <HeartHandshake className={`h-7 w-7 ${light ? "text-maroon-100" : "text-maroon"}`} aria-hidden />
      <span className="leading-none">
        <span className={`block font-serif text-xl tracking-wide ${light ? "text-white" : "text-ink"}`}>
          CSP
        </span>
        <span className={`block font-serif text-sm italic ${light ? "text-maroon-100" : "text-maroon"}`}>
          Matrimony
        </span>
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-maroon/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-5 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 text-sm text-ink lg:flex" aria-label="Main">
          {NAV.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              className={`relative py-1 transition hover:text-maroon ${
                i === 0 ? "font-semibold text-maroon after:absolute after:inset-x-1 after:-bottom-1 after:h-0.5 after:rounded after:bg-maroon" : ""
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            href="/login"
            className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-maroon transition hover:bg-maroon-50"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="whitespace-nowrap rounded-md bg-maroon px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-maroon-dark"
          >
            Register free
          </Link>
        </div>
      </div>
    </header>
  );
}
