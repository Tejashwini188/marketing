"use client";

import Link from "next/link";
import { useActionState, useTransition, type FormEvent } from "react";
import { loginAction } from "@/lib/actions";
import { input, label, primaryBtn } from "@/components/ui/styles";

export default function LoginForm({ next }: { next: string }) {
  const [state, action] = useActionState(loginAction, undefined);
  const [pending, start] = useTransition();
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    start(() => action(fd));
  };

  return (
    <form onSubmit={submit} className="max-w-md space-y-5">
      <input type="hidden" name="next" value={next} />
      <div>
        <label htmlFor="email" className={label}>Email address</label>
        <input id="email" name="email" type="email" autoComplete="email" required className={input} placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="password" className={label}>Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={input} />
      </div>
      {state?.error && <p role="alert" className="rounded-2xl bg-maroon-50 px-4 py-3 text-sm text-maroon">{state.error}</p>}
      <button type="submit" disabled={pending} className={`${primaryBtn} w-full`}>
        {pending ? "Logging in…" : "Log in"}
      </button>
      <p className="text-center text-sm text-ink-soft">
        New to CSP Matrimony?{" "}
        <Link href="/register" className="font-semibold text-maroon hover:underline">Register free</Link>
      </p>
    </form>
  );
}
