"use client";

import { useFormStatus } from "react-dom";
import { Heart } from "lucide-react";
import { toggleLikeAction } from "@/lib/actions";

function Btn({ liked, big }: { liked: boolean; big?: boolean }) {
  const { pending } = useFormStatus();
  const on = pending ? !liked : liked;
  return (
    <button
      type="submit"
      aria-pressed={on}
      aria-label={on ? "Remove like" : "Like this profile"}
      className={
        big
          ? `inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
              on ? "bg-maroon text-white hover:bg-maroon-dark" : "border border-maroon/30 bg-white text-maroon hover:bg-maroon-50"
            }`
          : `grid h-10 w-10 place-items-center rounded-full shadow-card backdrop-blur transition ${
              on ? "bg-maroon text-white" : "bg-white/90 text-maroon hover:bg-white"
            }`
      }
    >
      <Heart className={`h-[18px] w-[18px] ${on ? "fill-current" : ""}`} aria-hidden />
      {big && (on ? "Liked" : "Like profile")}
    </button>
  );
}

export default function LikeButton({ profileId, liked, big }: { profileId: string; liked: boolean; big?: boolean }) {
  return (
    <form action={toggleLikeAction}>
      <input type="hidden" name="profileId" value={profileId} />
      <Btn liked={liked} big={big} />
    </form>
  );
}
