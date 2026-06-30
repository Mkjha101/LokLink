import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { navigationApi } from "@/lib/api";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MapPin, Compass, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/navigation")({
  head: () => ({ meta: [{ title: "Local Navigation · LokLink" }] }),
  component: NavigationPage,
});

function NavigationPage() {
  const { data } = useQuery({ queryKey: ["places"], queryFn: navigationApi.list });
  const cats = useMemo(() => ["All", ...new Set(data?.map((p) => p.category) ?? [])], [data]);
  const [cat, setCat] = useState("All");
  const items = data?.filter((p) => cat === "All" || p.category === cat) ?? [];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <SectionHeader title="Local Navigation" subtitle="Hospitals, schools, markets and more — within reach." />

      {/* Map placeholder */}
      <div className="relative h-64 overflow-hidden rounded-2xl border border-border shadow-card sm:h-80">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.93_0.03_260),oklch(0.96_0.02_220))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(63,81,181,0.18),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(37,99,235,0.18),transparent_40%)]" />
        <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden="true">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="rounded-2xl bg-background/85 px-4 py-3 text-center shadow-card backdrop-blur">
            <Compass className="mx-auto h-6 w-6 text-primary" />
            <p className="mt-1 text-sm font-semibold">Map preview</p>
            <p className="text-xs text-muted-foreground">Live map integration coming in Phase 2.</p>
          </div>
        </div>
        <div className="pointer-events-none absolute left-[20%] top-[40%]"><Pin /></div>
        <div className="pointer-events-none absolute left-[55%] top-[60%]"><Pin /></div>
        <div className="pointer-events-none absolute left-[75%] top-[30%]"><Pin /></div>
      </div>

      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium",
              cat === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground/70 hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {items.map((p) => (
          <div key={p.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-card">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <MapPin className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.category} · {p.distance}{p.hours ? ` · ${p.hours}` : ""}</p>
            </div>
            <Button variant="outline" size="sm" className="shrink-0 rounded-xl">
              <Navigation className="mr-1.5 h-3.5 w-3.5" /> Directions
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pin() {
  return (
    <span className="relative grid h-7 w-7 -translate-x-1/2 -translate-y-full place-items-center rounded-full bg-primary text-primary-foreground shadow-pop">
      <MapPin className="h-3.5 w-3.5" />
      <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-primary" />
    </span>
  );
}
