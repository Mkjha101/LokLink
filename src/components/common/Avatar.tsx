import { cn } from "@/lib/utils";

export function Avatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const sizes = {
    xs: "h-7 w-7 text-[11px]",
    sm: "h-9 w-9 text-xs",
    md: "h-11 w-11 text-sm",
    lg: "h-16 w-16 text-lg",
  }[size];

  // deterministic hue from name
  const hue = Array.from(name).reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  const bg = `oklch(0.92 0.04 ${hue})`;
  const fg = `oklch(0.35 0.12 ${hue})`;

  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-semibold",
        sizes,
        className,
      )}
      style={{ backgroundColor: bg, color: fg }}
      aria-label={name}
    >
      {initials || "?"}
    </div>
  );
}
