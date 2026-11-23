import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { NavLinks, NavPills } from "./NavLinks";

// Public navigation. Dashboard, Matches and Search appear only after login.
export const PUBLIC_NAV = [
  { href: "/", label: "Home" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/contact", label: "Contact" },
];

export function Logo({ light = false, href = "/" }: { light?: boolean; href?: string }) {
  return (
    <Link href={href} className="flex shrink-0 items-center gap-2.5" aria-label="CSP Matrimony home">
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

export default async function SiteHeader() {
  const user = await getCurrentUser();
  return (
    <header className="sticky top-0 z-30 border-b border-maroon/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-5 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 text-sm text-ink lg:flex" aria-label="Main">
          <NavLinks items={PUBLIC_NAV} />
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          {user ? (
            <Link
              href="/dashboard"
              className="whitespace-nowrap rounded-full bg-maroon px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-maroon-dark"
            >
              My dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-maroon transition hover:bg-maroon-50"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="whitespace-nowrap rounded-full bg-maroon px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-maroon-dark"
              >
                Register free
              </Link>
            </>
          )}
        </div>
      </div>
      <NavPills items={PUBLIC_NAV} />
    </header>
  );
}
