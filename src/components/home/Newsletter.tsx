"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  // No backend yet — this only confirms on screen. Wire it to the database
  // when sign-ups are built.
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setDone(true);
  };

  return (
    <section className="relative overflow-hidden bg-blush">
      <div className="absolute inset-y-0 left-0 hidden w-1/2 md:block">
        <Image src="/images/hero-wedding.jpg" alt="" fill sizes="50vw" className="object-cover object-[50%_60%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blush/40 to-blush" />
      </div>

      <div className="relative mx-auto grid max-w-7xl px-5 py-16 md:grid-cols-2 lg:px-8">
        <div className="md:col-start-2 md:pl-12">
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">Stay connected</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
            Get new-match alerts, relationship advice and member offers straight to your inbox.
          </p>

          {done ? (
            <p className="mt-6 rounded-md bg-white px-4 py-3 text-sm font-medium text-maroon" role="status">
              Thank you — you&apos;re on the list.
            </p>
          ) : (
            <form onSubmit={submit} className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <div className="flex h-11 flex-1 items-center rounded-md border border-maroon/15 bg-white px-3 focus-within:border-maroon">
                <input
                  id="nl-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="h-full w-full bg-transparent text-sm outline-none"
                />
                <Mail className="h-4 w-4 text-ink-soft" aria-hidden />
              </div>
              <button type="submit" className="h-11 rounded-md bg-maroon px-6 text-sm font-semibold text-white transition hover:bg-maroon-dark">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
