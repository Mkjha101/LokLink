import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { clubsApi } from "@/lib/api";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";

export const Route = createFileRoute("/_app/clubs")({
  head: () => ({ meta: [{ title: "Clubs & Hobby Groups · LokLink" }] }),
  component: ClubsPage,
});

function ClubsPage() {
  const { data } = useQuery({ queryKey: ["clubs"], queryFn: clubsApi.list });
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <SectionHeader
        title="Clubs & Hobby Groups"
        subtitle="Find your people — fitness, books, tech, more."
        action={<Button className="h-10 rounded-xl"><Plus className="mr-1.5 h-4 w-4" /> Start a club</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((c) => (
          <article key={c.id} className="rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-pop">
            <div className="grid h-12 w-12 place-items-center rounded-xl brand-gradient text-white">
              <Users className="h-6 w-6" />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                {c.category}
              </span>
              <span className="text-xs text-muted-foreground">{c.members} members</span>
            </div>
            <h3 className="mt-2 text-base font-semibold">{c.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="rounded-xl">View</Button>
              <Button size="sm" className="rounded-xl">Join</Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
