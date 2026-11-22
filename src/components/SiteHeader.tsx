import Link from "next/link";
import { HeartHandshake } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/matches", label: "Browse Matches" },
  { href: "/search", label: "Search" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-maroon/10 bg-ivory/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-5 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2 whitespace-nowrap text-base font-bold text-maroon sm:text-lg">
          <HeartHandshake className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
          CSP Matrimony
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-soft md:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="transition hover:text-maroon">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/login"
            className="whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-semibold text-maroon sm:px-4 transition hover:bg-maroon-50"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="whitespace-nowrap rounded-lg bg-maroon px-3 py-2 text-sm font-semibold text-white sm:px-4 transition hover:bg-maroon-dark"
          >
            Register free
          </Link>
        </div>
      </div>
    </header>
  );
}
