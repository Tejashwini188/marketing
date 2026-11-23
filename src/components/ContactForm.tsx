"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { input, label, primaryBtn, textarea } from "@/components/ui/styles";

// NOTE: no backend yet — the message is not sent anywhere.
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-3xl bg-maroon-50 px-6 py-14 text-center">
        <CheckCircle2 className="h-10 w-10 text-maroon" aria-hidden />
        <p className="mt-4 font-serif text-2xl text-ink">Thank you!</p>
        <p className="mt-2 text-sm text-ink-soft">We’ve received your message and will get back to you soon.</p>
      </div>
    );
  }
  return (
    <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
      <div><label htmlFor="c-name" className={label}>Your name</label><input id="c-name" required className={input} autoComplete="name" /></div>
      <div><label htmlFor="c-phone" className={label}>Mobile number</label><input id="c-phone" type="tel" className={input} autoComplete="tel" /></div>
      <div className="sm:col-span-2"><label htmlFor="c-email" className={label}>Email address</label><input id="c-email" type="email" required className={input} autoComplete="email" /></div>
      <div className="sm:col-span-2"><label htmlFor="c-msg" className={label}>How can we help?</label><textarea id="c-msg" required rows={5} className={textarea} /></div>
      <div className="sm:col-span-2"><button type="submit" className={primaryBtn}>Send message</button></div>
    </form>
  );
}
