import TopBar from "@/components/TopBar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// Public pages: Home, Success Stories, Contact, Log in, Register.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
