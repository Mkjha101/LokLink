import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/AuthContext";
import { postsApi, eventsApi, lostFoundApi, updatesApi } from "@/lib/api";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Avatar } from "@/components/common/Avatar";
import { Button } from "@/components/ui/button";
import {
  Newspaper,
  Search,
  ShoppingBag,
  Calendar,
  PhoneCall,
  Megaphone,
  ArrowRight,
  MapPin,
} from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Home · LokLink" }] }),
  component: Dashboard,
});

const QUICK = [
  { to: "/feed", Icon: Newspaper, label: "Open Feed", tint: "primary" as const },
  { to: "/lost-found", Icon: Search, label: "Report Lost", tint: "accent" as const },
  { to: "/marketplace", Icon: ShoppingBag, label: "Sell Item", tint: "primary" as const },
  { to: "/emergency", Icon: PhoneCall, label: "Emergency", tint: "destructive" as const },
];

function Dashboard() {
  const { user } = useAuth();
  const posts = useQuery({ queryKey: ["posts"], queryFn: postsApi.list });
  const upcoming = useQuery({ queryKey: ["events"], queryFn: eventsApi.list });
  const lf = useQuery({ queryKey: ["lostFound"], queryFn: lostFoundApi.list });
  const ups = useQuery({ queryKey: ["updates"], queryFn: updatesApi.list });

  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <SectionHeader
        title={`${greet}, ${user?.name.split(" ")[0] ?? "neighbour"} 👋`}
        subtitle={`Here's what's happening in ${user?.community}.`}
      />

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {QUICK.map(({ to, Icon, label, tint }) => (
          <Link
            key={to}
            to={to}
            className="group rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-card"
          >
            <span
              className={
                "grid h-10 w-10 place-items-center rounded-xl " +
                (tint === "primary"
                  ? "bg-primary/10 text-primary"
                  : tint === "accent"
                    ? "bg-accent/10 text-accent"
                    : "bg-destructive/10 text-destructive")
              }
            >
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-sm font-semibold">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent feed */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <SectionHeader
              title="Latest in your feed"
              action={
                <Button asChild variant="ghost" size="sm" className="text-accent">
                  <Link to="/feed">View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              }
            />
            <ul className="mt-4 divide-y divide-border">
              {posts.data?.slice(0, 3).map((p) => (
                <li key={p.id} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 py-4">
                  <Avatar name={p.author.name} size="sm" />
                  <div className="min-w-0">
                    <p className="text-sm">
                      <span className="font-semibold">{p.author.name}</span>{" "}
                      <span className="text-muted-foreground">· {p.time}</span>
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-foreground/85">{p.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Announcements */}
          <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-card">
            <SectionHeader
              title="Community updates"
              action={
                <Button asChild variant="ghost" size="sm" className="text-accent">
                  <Link to="/updates">All updates <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              }
            />
            <ul className="mt-3 space-y-3">
              {ups.data?.slice(0, 3).map((u) => (
                <li key={u.id} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-xl bg-surface/60 p-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Megaphone className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{u.title}</p>
                    <p className="line-clamp-1 text-xs text-muted-foreground">{u.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Side column */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <SectionHeader title="Upcoming" />
            <ul className="mt-3 space-y-3">
              {upcoming.data?.slice(0, 3).map((e) => (
                <li key={e.id} className="rounded-xl border border-border bg-surface/40 p-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-accent">
                    <Calendar className="h-3.5 w-3.5" /> {e.date} · {e.time}
                  </div>
                  <p className="mt-1 text-sm font-semibold">{e.title}</p>
                  <p className="text-xs text-muted-foreground">
                    <MapPin className="mr-1 inline h-3 w-3" />
                    {e.location}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <SectionHeader title="Lost & Found" />
            <ul className="mt-3 space-y-3">
              {lf.data?.filter((i) => i.type !== "resolved").slice(0, 3).map((i) => (
                <li key={i.id}>
                  <p className="text-sm font-semibold">{i.title}</p>
                  <p className="text-xs text-muted-foreground">{i.location} · {i.date}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
