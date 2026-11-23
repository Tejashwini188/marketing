import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact — CSP Matrimony" };

// PLACEHOLDER contact details — replace with the real ones.
const DETAILS = [
  { icon: Phone, title: "Call us", text: "+91 00000 00000" },
  { icon: Mail, title: "Email", text: "hello@example.com" },
  { icon: MapPin, title: "Visit", text: "Office address" },
  { icon: Clock, title: "Hours", text: "Mon – Sat, 10:00 – 19:00" },
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon">Contact</p>
        <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">We’re here to <em className="italic text-maroon">help</em></h1>
        <p className="mx-auto mt-4 max-w-lg text-ink-soft">Questions about your profile, matches or membership? Send us a message.</p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {DETAILS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-4 rounded-3xl bg-blush/60 p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white shadow-sm"><Icon className="h-5 w-5 text-maroon" aria-hidden /></span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-maroon">{title}</p>
                <p className="mt-0.5 text-ink">{text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-maroon/10 bg-white p-6 shadow-card sm:p-10">
          <h2 className="font-serif text-2xl text-ink">Send us a message</h2>
          <div className="mt-6"><ContactForm /></div>
        </div>
      </div>
    </section>
  );
}
