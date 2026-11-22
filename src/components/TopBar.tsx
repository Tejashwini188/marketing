import { HeartHandshake, Lock, ShieldCheck } from "lucide-react";

const POINTS = [
  { icon: HeartHandshake, text: "Thousands of happy marriages" },
  { icon: ShieldCheck, text: "Verified, genuine profiles" },
  { icon: Lock, text: "Private & secure — you control who sees you" },
];

export default function TopBar() {
  return (
    <div className="hidden bg-blush text-xs text-ink-soft md:block">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-5 lg:px-8">
        <ul className="flex items-center gap-8">
          {POINTS.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2">
              <Icon className="h-3.5 w-3.5 text-maroon" aria-hidden />
              {text}
            </li>
          ))}
        </ul>
        <p className="font-medium text-maroon">Register free today</p>
      </div>
    </div>
  );
}
