import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { emergencyApi } from "@/lib/api";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { Phone, Copy, HeartPulse, Shield, Flame, Building2, LifeBuoy } from "lucide-react";
import { toast } from "sonner";
import type { EmergencyContact } from "@/lib/mock/seed";

export const Route = createFileRoute("/_app/emergency")({
  head: () => ({ meta: [{ title: "Emergency Contacts · LokLink" }] }),
  component: EmergencyPage,
});

const ICON: Record<EmergencyContact["category"], typeof HeartPulse> = {
  Medical: HeartPulse,
  Security: Shield,
  Fire: Flame,
  Township: Building2,
  Helpline: LifeBuoy,
};

const TINT: Record<EmergencyContact["category"], string> = {
  Medical: "bg-destructive/10 text-destructive",
  Security: "bg-primary/10 text-primary",
  Fire: "bg-warning/15 text-warning-foreground",
  Township: "bg-accent/10 text-accent",
  Helpline: "bg-success/10 text-success",
};

function EmergencyPage() {
  const { data } = useQuery({ queryKey: ["emergency"], queryFn: emergencyApi.list });
  const grouped = useMemo(() => {
    const g: Record<string, EmergencyContact[]> = {};
    (data ?? []).forEach((c) => {
      (g[c.category] ??= []).push(c);
    });
    return g;
  }, [data]);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <SectionHeader
        title="Emergency Contacts"
        subtitle="Critical numbers for your township, one tap away."
      />

      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 shadow-card">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-destructive text-destructive-foreground">
            <Phone className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-destructive">In immediate danger?</p>
            <p className="text-sm text-foreground/80">Dial 112 (national emergency) or use the buttons below.</p>
          </div>
          <Button asChild variant="destructive" className="shrink-0 rounded-xl">
            <a href="tel:112">Call 112</a>
          </Button>
        </div>
      </div>

      {Object.entries(grouped).map(([cat, list]) => {
        const Icon = ICON[cat as EmergencyContact["category"]];
        return (
          <section key={cat}>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <span className={`grid h-7 w-7 place-items-center rounded-lg ${TINT[cat as EmergencyContact["category"]]}`}>
                <Icon className="h-4 w-4" />
              </span>
              {cat}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {list.map((c) => (
                <div key={c.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-card">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{c.name}</p>
                    <p className="text-base font-bold text-primary">{c.number}</p>
                    {c.note && <p className="text-xs text-muted-foreground">{c.note}</p>}
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Copy"
                      onClick={() => {
                        if (navigator?.clipboard) {
                          navigator.clipboard.writeText(c.number);
                          toast.success("Number copied");
                        }
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button asChild size="icon" className="rounded-xl">
                      <a href={`tel:${c.number}`} aria-label="Call"><Phone className="h-4 w-4" /></a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
