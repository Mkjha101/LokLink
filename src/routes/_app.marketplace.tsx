import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { marketplaceApi } from "@/lib/api";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, ShoppingBag, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/marketplace")({
  head: () => ({ meta: [{ title: "Marketplace · LokLink" }] }),
  component: MarketplacePage,
});

const fmt = new Intl.NumberFormat("en-IN");

function MarketplacePage() {
  const { data } = useQuery({ queryKey: ["marketplace"], queryFn: marketplaceApi.list });
  const cats = useMemo(() => ["All", ...new Set(data?.map((l) => l.category) ?? [])], [data]);
  const [cat, setCat] = useState("All");
  const items = data?.filter((l) => cat === "All" || l.category === cat) ?? [];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <SectionHeader
        title="Marketplace"
        subtitle="Buy and sell within your community."
        action={
          <Button className="h-10 rounded-xl">
            <Plus className="mr-1.5 h-4 w-4" /> Sell something
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              cat === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground/70 hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((l) => (
          <article key={l.id} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-0.5 hover:shadow-pop">
            <div className="grid h-44 place-items-center bg-gradient-to-br from-surface to-surface-muted">
              <ShoppingBag className="h-10 w-10 text-muted-foreground/40" />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold leading-snug">{l.title}</h3>
                <span className="shrink-0 rounded-md bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
                  {l.condition}
                </span>
              </div>
              <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{l.description}</p>
              <p className="mt-3 text-xl font-bold text-primary">₹{fmt.format(l.price)}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Tag className="h-3.5 w-3.5" />{l.category}</span>
                <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{l.block}</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="rounded-xl">Chat seller</Button>
                <Button size="sm" className="rounded-xl">View</Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
