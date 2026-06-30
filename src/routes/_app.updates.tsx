import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { updatesApi } from "@/lib/api";
import { SectionHeader } from "@/components/common/SectionHeader";
import { RoleBadge } from "@/components/common/RoleBadge";
import { Pin, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/updates")({
  head: () => ({ meta: [{ title: "Community Updates · LokLink" }] }),
  component: UpdatesPage,
});

const CATEGORY_STYLE: Record<string, string> = {
  Notice: "bg-primary/10 text-primary",
  Maintenance: "bg-warning/15 text-warning-foreground",
  Safety: "bg-destructive/10 text-destructive",
  Event: "bg-accent/10 text-accent",
  Policy: "bg-muted text-foreground",
};

function UpdatesPage() {
  const { data } = useQuery({ queryKey: ["updates"], queryFn: updatesApi.list });
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <SectionHeader title="Community Updates" subtitle="Official notices from your township." />
      <ul className="space-y-4">
        {data?.map((u) => (
          <li
            key={u.id}
            className={cn(
              "rounded-2xl border bg-card p-5 shadow-card",
              u.pinned ? "border-primary/30 ring-1 ring-primary/15" : "border-border",
            )}
          >
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Megaphone className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-semibold", CATEGORY_STYLE[u.category])}>
                    {u.category}
                  </span>
                  {u.pinned && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                      <Pin className="h-3 w-3" /> Pinned
                    </span>
                  )}
                </div>
                <h3 className="mt-1.5 text-base font-semibold">{u.title}</h3>
                <p className="mt-1 text-sm text-foreground/85">{u.body}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span>{u.author}</span>
                  <RoleBadge role={u.role} />
                  <span>· {u.postedAt}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
