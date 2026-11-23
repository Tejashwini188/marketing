"use client";

import { useActionState, useTransition, type FormEvent } from "react";
import { AGES, EDUCATION, HEIGHTS, MARITAL_STATUS, MOTHER_TONGUES, RELIGIONS } from "@/lib/options";
import { input, label, primaryBtn, select } from "@/components/ui/styles";
import { savePreferencesAction } from "@/lib/actions";
import type { Preferences } from "@/lib/types";

function AnySelect({ id, options, value }: { id: string; options: string[]; value: string }) {
  return (
    <select id={id} name={id} defaultValue={value} className={select}>
      <option>Any</option>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}

export default function PreferencesForm({ prefs }: { prefs: Preferences }) {
  const [state, action] = useActionState(savePreferencesAction, undefined);
  const [pending, start] = useTransition();
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    start(() => action(fd));
  };

  return (
    <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <span className={label}>Age</span>
        <div className="flex items-center gap-2">
          <select name="ageMin" aria-label="Minimum age" defaultValue={prefs.ageMin} className={select}>
            {AGES.map((a) => <option key={a}>{a}</option>)}
          </select>
          <span className="text-xs text-ink-soft">to</span>
          <select name="ageMax" aria-label="Maximum age" defaultValue={prefs.ageMax} className={select}>
            {AGES.map((a) => <option key={a}>{a}</option>)}
          </select>
        </div>
      </div>
      <div>
        <span className={label}>Height</span>
        <div className="flex items-center gap-2">
          <select name="heightMin" aria-label="Minimum height" defaultValue={prefs.heightMin} className={select}>
            <option value={0}>Any</option>
            {HEIGHTS.map((h) => <option key={h.cm} value={h.cm}>{h.label}</option>)}
          </select>
          <span className="text-xs text-ink-soft">to</span>
          <select name="heightMax" aria-label="Maximum height" defaultValue={prefs.heightMax} className={select}>
            <option value={0}>Any</option>
            {HEIGHTS.map((h) => <option key={h.cm} value={h.cm}>{h.label}</option>)}
          </select>
        </div>
      </div>
      <div><label htmlFor="religion" className={label}>Religion</label><AnySelect id="religion" options={RELIGIONS} value={prefs.religion} /></div>
      <div><label htmlFor="maritalStatus" className={label}>Marital status</label><AnySelect id="maritalStatus" options={MARITAL_STATUS} value={prefs.maritalStatus} /></div>
      <div><label htmlFor="motherTongue" className={label}>Mother tongue</label><AnySelect id="motherTongue" options={MOTHER_TONGUES} value={prefs.motherTongue} /></div>
      <div><label htmlFor="education" className={label}>Education</label><AnySelect id="education" options={EDUCATION} value={prefs.education} /></div>
      <div className="sm:col-span-2">
        <label htmlFor="location" className={label}>Preferred location (city or state)</label>
        <input id="location" name="location" defaultValue={prefs.location} maxLength={60} className={input} placeholder="Anywhere" />
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={pending} className={primaryBtn}>{pending ? "Saving…" : "Save preferences"}</button>
        {state?.error && <p role="alert" className="text-sm text-maroon">{state.error}</p>}
        {state?.ok && !pending && <p className="text-sm text-green-700">{state.ok}</p>}
      </div>
    </form>
  );
}
