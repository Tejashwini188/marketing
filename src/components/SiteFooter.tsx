import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./SiteHeader";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/contact", label: "Contact" },
];

const MEMBERS = [
  { href: "/register", label: "Register free" },
  { href: "/login", label: "Member login" },
  { href: "/dashboard", label: "My dashboard" },
  { href: "/matches", label: "Matches" },
  { href: "/search", label: "Search" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-plum text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:px-8">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Helping individuals and families find a compatible life partner with trust, privacy
            and care.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Navigation</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.href}><Link href={n.href} className="transition hover:text-white">{n.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Members</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {MEMBERS.map((n) => (
              <li key={n.label}><Link href={n.href} className="transition hover:text-white">{n.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Contact us</h3>
          {/* PLACEHOLDER contact details — replace with the real ones. */}
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-maroon-100" aria-hidden /> +91 00000 00000</li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-maroon-100" aria-hidden /> hello@example.com</li>
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-maroon-100" aria-hidden /> Office address</li>
            <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-maroon-100" aria-hidden /> Mon – Sat: 10:00 – 19:00</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} CSP Matrimony. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
