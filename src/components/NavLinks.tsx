"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string };

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop text links with the maroon underline on the current page. */
export function NavLinks({ items }: { items: Item[] }) {
  const pathname = usePathname();
  return (
    <>
      {items.map((n) => {
        const active = isActive(pathname, n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`relative py-1 transition hover:text-maroon ${
              active ? "font-semibold text-maroon after:absolute after:inset-x-1 after:-bottom-1 after:h-0.5 after:rounded after:bg-maroon" : ""
            }`}
          >
            {n.label}
          </Link>
        );
      })}
    </>
  );
}

/** Mobile: a row of pill links under the header. */
export function NavPills({ items }: { items: Item[] }) {
  const pathname = usePathname();
  return (
    <nav className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden" aria-label="Sections">
      {items.map((n) => {
        const active = isActive(pathname, n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition ${
              active ? "bg-maroon font-semibold text-white" : "bg-maroon-50 text-ink hover:text-maroon"
            }`}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}
