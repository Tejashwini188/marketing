"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState, useTransition, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { registerAction } from "@/lib/actions";
import {
  CREATED_FOR, DIET, EDUCATION, FAMILY_TYPE, HEIGHTS, INCOME, MARITAL_STATUS, MOTHER_TONGUES, RELIGIONS,
} from "@/lib/options";
import { ghostBtn, input, label, primaryBtn, select, textarea } from "@/components/ui/styles";

const STEPS = ["Account", "Personal", "Career & location", "Family & about"];

function Field({ id, text, children, wide }: { id: string; text: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className={label}>{text}</label>
      {children}
    </div>
  );
}

function Select({ id, options, placeholder = "Select" }: { id: string; options: readonly string[]; placeholder?: string }) {
  return (
    <select id={id} name={id} required defaultValue="" className={select}>
      <option value="" disabled>{placeholder}</option>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}

export default function RegisterForm() {
  const [state, action] = useActionState(registerAction, undefined);
  const [pending, start] = useTransition();
  const [step, setStep] = useState(0);
  const steps = useRef<(HTMLFieldSetElement | null)[]>([]);

  // Server found a problem — jump back to the step that has it.
  useEffect(() => {
    if (typeof state?.step === "number") setStep(state.step);
  }, [state]);

  const stepValid = (i: number) => {
    const fields = steps.current[i]?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea");
    for (const f of Array.from(fields ?? [])) {
      if (!f.checkValidity()) {
        f.reportValidity();
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (stepValid(step)) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < STEPS.length - 1) return nextStep();
    if (!stepValid(step)) return;
    const fd = new FormData(e.currentTarget);
    start(() => action(fd));
  };

  const maxDob = new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().slice(0, 10);

  return (
    <form onSubmit={submit} noValidate>
      {/* Step indicator */}
      <ol className="mb-8 grid grid-cols-4 gap-2" aria-label="Registration steps">
        {STEPS.map((s, i) => (
          <li key={s} className="flex flex-col gap-2">
            <span className={`h-1.5 rounded-full ${i <= step ? "bg-maroon" : "bg-maroon-100"}`} />
            <span className={`flex items-center gap-1.5 text-[11px] font-semibold sm:text-xs ${i === step ? "text-maroon" : "text-ink-soft"}`}>
              <span className={`hidden h-5 w-5 place-items-center rounded-full text-[10px] sm:grid ${i < step ? "bg-maroon text-white" : i === step ? "bg-maroon-50 text-maroon" : "bg-ivory text-ink-soft"}`}>
                {i < step ? <Check className="h-3 w-3" /> : i + 1}
              </span>
              {s}
            </span>
          </li>
        ))}
      </ol>

      {/* Step 1 — account */}
      <fieldset ref={(el) => { steps.current[0] = el; }} className={step === 0 ? "grid gap-5 sm:grid-cols-2" : "hidden"}>
        <legend className="sr-only">Account</legend>
        <Field id="createdFor" text="Creating this profile for"><Select id="createdFor" options={CREATED_FOR} /></Field>
        <Field id="fullName" text="Full name">
          <input id="fullName" name="fullName" required minLength={2} maxLength={80} autoComplete="name" className={input} placeholder="First and last name" />
        </Field>
        <div>
          <span className={label}>Gender</span>
          <div className="flex gap-2">
            {["Female", "Male"].map((g) => (
              <label key={g} className="flex-1 cursor-pointer">
                <input type="radio" name="gender" value={g} required className="peer sr-only" />
                <span className="flex h-11 items-center justify-center rounded-full border border-maroon/15 bg-white text-sm text-ink transition peer-checked:border-maroon peer-checked:bg-maroon peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-maroon/15">
                  {g}
                </span>
              </label>
            ))}
          </div>
        </div>
        <Field id="dob" text="Date of birth">
          <input id="dob" name="dob" type="date" required max={maxDob} min="1940-01-01" className={input} />
        </Field>
        <Field id="email" text="Email address">
          <input id="email" name="email" type="email" required autoComplete="email" className={input} placeholder="you@example.com" />
        </Field>
        <Field id="phone" text="Mobile number">
          <input id="phone" name="phone" type="tel" required pattern="\+?[\d\s\-]{10,16}" autoComplete="tel" className={input} placeholder="+91 98765 43210" />
        </Field>
        <Field id="password" text="Create password">
          <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className={input} placeholder="At least 8 characters" />
        </Field>
        <Field id="confirm" text="Confirm password">
          <input id="confirm" name="confirm" type="password" required minLength={8} autoComplete="new-password" className={input} />
        </Field>
      </fieldset>

      {/* Step 2 — personal & religion */}
      <fieldset ref={(el) => { steps.current[1] = el; }} className={step === 1 ? "grid gap-5 sm:grid-cols-2" : "hidden"}>
        <legend className="sr-only">Personal details</legend>
        <Field id="maritalStatus" text="Marital status"><Select id="maritalStatus" options={MARITAL_STATUS} /></Field>
        <Field id="heightCm" text="Height">
          <select id="heightCm" name="heightCm" required defaultValue="" className={select}>
            <option value="" disabled>Select</option>
            {HEIGHTS.map((h) => <option key={h.cm} value={h.cm}>{h.label} ({h.cm} cm)</option>)}
          </select>
        </Field>
        <Field id="motherTongue" text="Mother tongue"><Select id="motherTongue" options={MOTHER_TONGUES} /></Field>
        <Field id="religion" text="Religion"><Select id="religion" options={RELIGIONS} /></Field>
        <Field id="community" text="Caste / community">
          <input id="community" name="community" required maxLength={60} className={input} placeholder="e.g. Reddy, Iyer, Sunni" />
        </Field>
        <Field id="diet" text="Diet"><Select id="diet" options={DIET} /></Field>
      </fieldset>

      {/* Step 3 — location, education & career */}
      <fieldset ref={(el) => { steps.current[2] = el; }} className={step === 2 ? "grid gap-5 sm:grid-cols-2" : "hidden"}>
        <legend className="sr-only">Career and location</legend>
        <Field id="country" text="Country">
          <input id="country" name="country" required defaultValue="India" maxLength={60} autoComplete="country-name" className={input} />
        </Field>
        <Field id="state" text="State">
          <input id="state" name="state" required maxLength={60} autoComplete="address-level1" className={input} placeholder="e.g. Telangana" />
        </Field>
        <Field id="city" text="City">
          <input id="city" name="city" required maxLength={60} autoComplete="address-level2" className={input} placeholder="e.g. Hyderabad" />
        </Field>
        <Field id="education" text="Highest education"><Select id="education" options={EDUCATION} /></Field>
        <Field id="occupation" text="Occupation">
          <input id="occupation" name="occupation" required maxLength={80} className={input} placeholder="e.g. Software engineer" />
        </Field>
        <Field id="income" text="Annual income"><Select id="income" options={INCOME} /></Field>
      </fieldset>

      {/* Step 4 — family & about */}
      <fieldset ref={(el) => { steps.current[3] = el; }} className={step === 3 ? "grid gap-5 sm:grid-cols-2" : "hidden"}>
        <legend className="sr-only">Family and about</legend>
        <Field id="familyType" text="Family type"><Select id="familyType" options={FAMILY_TYPE} /></Field>
        <Field id="siblings" text="Siblings">
          <input id="siblings" name="siblings" maxLength={120} className={input} placeholder="e.g. One younger sister" />
        </Field>
        <Field id="fatherOccupation" text="Father's occupation">
          <input id="fatherOccupation" name="fatherOccupation" maxLength={80} className={input} />
        </Field>
        <Field id="motherOccupation" text="Mother's occupation">
          <input id="motherOccupation" name="motherOccupation" maxLength={80} className={input} />
        </Field>
        <Field id="aboutMe" text="About me" wide>
          <textarea id="aboutMe" name="aboutMe" required minLength={30} maxLength={1000} rows={5} className={textarea}
            placeholder="A few lines about your personality, interests, values and what you're looking for." />
        </Field>
        <label className="flex items-start gap-3 text-sm text-ink-soft sm:col-span-2">
          <input type="checkbox" name="agree" required className="mt-0.5 h-4 w-4 rounded accent-maroon" />
          <span>I agree to the <Link href="/terms" className="font-semibold text-maroon">terms of use</Link> and <Link href="/privacy" className="font-semibold text-maroon">privacy policy</Link>.</span>
        </label>
      </fieldset>

      {state?.error && <p role="alert" className="mt-6 rounded-2xl bg-maroon-50 px-4 py-3 text-sm text-maroon">{state.error}</p>}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className={ghostBtn}>
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back
          </button>
        ) : (
          <p className="text-sm text-ink-soft">
            Already a member? <Link href="/login" className="font-semibold text-maroon hover:underline">Log in</Link>
          </p>
        )}
        <button type="submit" disabled={pending} className={primaryBtn}>
          {step < STEPS.length - 1 ? <>Continue <ArrowRight className="h-4 w-4" aria-hidden /></> : pending ? "Creating profile…" : "Create my profile"}
        </button>
      </div>
    </form>
  );
}
