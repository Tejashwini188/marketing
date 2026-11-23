import { LogOut } from "lucide-react";
import { Logo } from "@/components/SiteHeader";
import { NavLinks, NavPills } from "@/components/NavLinks";
import Avatar from "./Avatar";
import { logoutAction } from "@/lib/actions";
import { firstName } from "@/lib/options";
import type { User } from "@/lib/types";

export const MEMBER_NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/matches", label: "Matches" },
  { href: "/search", label: "Search" },
];

export default function MemberHeader({ user }: { user: User }) {
  return (
    <header className="sticky top-0 z-30 border-b border-maroon/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-5 lg:px-8">
        <Logo href="/dashboard" />

        <nav className="hidden items-center gap-8 text-sm text-ink lg:flex" aria-label="Member">
          <NavLinks items={MEMBER_NAV} />
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex items-center gap-2.5 rounded-full bg-ivory py-1 pl-1 pr-3.5">
            <Avatar profile={user} className="h-8 w-8 rounded-full text-xs" />
            <span className="hidden text-sm font-semibold text-ink sm:block">{firstName(user.fullName)}</span>
          </span>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-maroon transition hover:bg-maroon-50"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </form>
        </div>
      </div>
      <NavPills items={MEMBER_NAV} />
    </header>
  );
}
