import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { lostFoundApi } from "@/lib/api";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Calendar, Phone, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LostFoundItem } from "@/lib/mock/seed";

export const Route = createFileRoute("/_app/lost-found")({
  head: () => ({ meta: [{ title: "Lost & Found · LokLink" }] }),
  component: LostFoundPage,
});

const TABS: Array<{ key: "all" | LostFoundItem["type"]; label: string }> = [
  { key: "all", label: "All" },
  { key: "lost", label: "Lost" },
  { key: "found", label: "Found" },
  { key: "resolved", label: "Resolved" },
];

const TYPE_STYLE: Record<LostFoundItem["type"], string> = {
  lost: "bg-destructive/10 text-destructive",
  found: "bg-success/10 text-success",
  resolved: "bg-muted text-muted-foreground",
};

function LostFoundPage() {
  const { data } = useQuery({ queryKey: ["lostFound"], queryFn: lostFoundApi.list });
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("all");
  const items = data?.filter((i) => tab === "all" || i.type === tab) ?? [];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <SectionHeader
        title="Lost & Found"
        subtitle="Help your neighbours find what matters."
        action={
          <Button className="h-10 rounded-xl">
            <Plus className="mr-1.5 h-4 w-4" /> Report item
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              tab === t.key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground/70 hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface/40 p-12 text-center">
          <Search className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 font-semibold">Nothing here yet</p>
          <p className="text-sm text-muted-foreground">Be the first to post in this category.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <article key={i.id} className="flex flex-col rounded-2xl border border-border bg-card shadow-card">
              <div className="grid h-36 place-items-center rounded-t-2xl bg-surface-muted">
                <Search className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className={cn("self-start rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase", TYPE_STYLE[i.type])}>
                  {i.type}
                </span>
                <h3 className="mt-2 text-base font-semibold leading-snug">{i.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{i.description}</p>
                <dl className="mt-3 space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {i.location}</div>
                  <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {i.date}</div>
                  <div className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {i.contact}</div>
                </dl>
                {i.type !== "resolved" && (
                  <Button variant="outline" size="sm" className="mt-4 rounded-xl">Contact</Button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
