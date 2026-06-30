import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  size = "md",
  tone = "default",
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "default" | "onDark";
}) {
  const sizes = {
    sm: { wrap: "gap-1.5", logo: "h-6 w-6 text-[11px]", title: "text-base", sub: "text-[10px]" },
    md: { wrap: "gap-2", logo: "h-8 w-8 text-sm", title: "text-lg", sub: "text-xs" },
    lg: { wrap: "gap-2.5", logo: "h-10 w-10 text-base", title: "text-2xl", sub: "text-sm" },
    xl: { wrap: "gap-3", logo: "h-12 w-12 text-lg", title: "text-3xl", sub: "text-base" },
  }[size];

  return (
    <div className={cn("flex items-center", sizes.wrap, className)}>
      <div
        className={cn(
          "grid shrink-0 place-items-center rounded-xl font-bold text-white shadow-card brand-gradient",
          sizes.logo,
        )}
      >
        L
      </div>
      <div className="flex min-w-0 flex-col leading-tight">
        <span
          className={cn(
            "font-bold tracking-tight",
            sizes.title,
            tone === "onDark" ? "text-white" : "text-foreground",
          )}
        >
          LokLink
        </span>
        <span
          className={cn(
            "devanagari font-medium",
            sizes.sub,
            tone === "onDark" ? "text-white/70" : "text-muted-foreground",
          )}
        >
          लोकलिंक
        </span>
      </div>
    </div>
  );
}
