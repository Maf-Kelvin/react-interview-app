const COLORS = [
  "bg-indigo-100 text-indigo-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-sky-100 text-sky-700",
  "bg-violet-100 text-violet-700",
];

export default function Avatar({ name, size = "md" }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const colorClass = COLORS[name.charCodeAt(0) % COLORS.length];
  const sizeClass = {
    sm: "w-9 h-9 text-sm",
    md: "w-11 h-11 text-base",
    lg: "w-16 h-16 text-xl",
    xl: "w-20 h-20 text-2xl",
  }[size];
  return (
    <div
      aria-label={`Avatar for ${name}`}
      className={`rounded-full flex items-center justify-center font-bold flex-shrink-0 ${colorClass} ${sizeClass}`}
    >
      {initials}
    </div>
  );
}
