"use client";

import { useActionState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { ImagePlus } from "lucide-react";
import { uploadPhotoAction } from "@/lib/actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-maroon px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-maroon-dark">
      <ImagePlus className="h-4 w-4" aria-hidden /> {pending ? "Uploading…" : "Add photo"}
    </span>
  );
}

export default function PhotoUploader({ disabled }: { disabled: boolean }) {
  const [state, action] = useActionState(uploadPhotoAction, undefined);
  const form = useRef<HTMLFormElement>(null);
  return (
    <form ref={form} action={action} className="flex flex-wrap items-center gap-3">
      <label className={`group ${disabled ? "pointer-events-none opacity-50" : "cursor-pointer"}`}>
        <input
          type="file"
          name="photo"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          disabled={disabled}
          onChange={() => form.current?.requestSubmit()}
        />
        <Submit />
      </label>
      <span className="text-xs text-ink-soft">JPG, PNG or WebP · up to 5 MB · max 6 photos</span>
      {state?.error && <p role="alert" className="w-full text-sm text-maroon">{state.error}</p>}
      {state?.ok && <p className="w-full text-sm text-green-700">{state.ok}</p>}
    </form>
  );
}
