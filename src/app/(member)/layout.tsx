import Link from "next/link";
import { requireUser } from "@/lib/auth";
import MemberHeader from "@/components/member/MemberHeader";

// Everything in here needs a logged-in member.
export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  return (
    <div className="flex min-h-screen flex-col">
      <MemberHeader user={user} />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-maroon/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-ink-soft sm:flex-row sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} CSP Matrimony</p>
          <div className="flex gap-5">
            <Link href="/" className="hover:text-maroon">Home</Link>
            <Link href="/success-stories" className="hover:text-maroon">Success stories</Link>
            <Link href="/contact" className="hover:text-maroon">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
