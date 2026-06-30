import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { eventsApi } from "@/lib/api";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Plus } from "lucide-react";

export const Route = createFileRoute("/_app/events")({
  head: () => ({ meta: [{ title: "Events · LokLink" }] }),
  component: EventsPage,
});

function EventsPage() {
  const { data } = useQuery({ queryKey: ["events"], queryFn: eventsApi.list });
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <SectionHeader
        title="Events"
        subtitle="What's happening around the township."
        action={<Button className="h-10 rounded-xl"><Plus className="mr-1.5 h-4 w-4" /> New event</Button>}
      />

      {/* Static month strip */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div className="grid grid-cols-7 gap-px bg-border text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="bg-card p-2">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-border">
          {Array.from({ length: 35 }, (_, i) => {
            const day = i - 1;
            const hasEvent = [3, 8, 14, 21, 22, 26, 27].includes(day);
            return (
              <div key={i} className="min-h-[64px] bg-card p-2 text-xs">
                <span className={day > 0 && day < 32 ? "font-semibold" : "text-muted-foreground/40"}>
                  {day > 0 && day < 32 ? day : ""}
                </span>
                {hasEvent && <div className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data?.map((e) => (
          <article key={e.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-start gap-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Calendar className="h-7 w-7" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">{e.category}</p>
                <h3 className="mt-0.5 text-base font-semibold">{e.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{e.date} · {e.time}</p>
                <p className="mt-1 inline-flex items-center text-xs text-muted-foreground">
                  <MapPin className="mr-1 h-3.5 w-3.5" /> {e.location}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-flex items-center text-xs text-muted-foreground">
                    <Users className="mr-1 h-3.5 w-3.5" /> {e.attendees} going
                  </span>
                  <Button size="sm" variant="outline" className="rounded-xl">RSVP</Button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
