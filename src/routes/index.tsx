import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Newspaper,
  ShoppingBag,
  Search,
  Megaphone,
  Calendar,
  MessageCircle,
  Users,
  PhoneCall,
  MapPin,
  Shield,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { BrandMark } from "@/components/layout/BrandMark";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LokLink — Your community, connected" },
      {
        name: "description",
        content:
          "LokLink (लोकलिंक) is a unified platform for modern communities — feed, marketplace, lost & found, events, clubs, emergency and more.",
      },
      { property: "og:title", content: "LokLink — Your community, connected" },
      { property: "og:description", content: "A unified digital platform for modern communities." },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  { Icon: Newspaper, title: "Community Feed", desc: "Share, discuss, celebrate. One quiet feed, no noise." },
  { Icon: Search, title: "Lost & Found", desc: "Recover what matters with help from neighbours." },
  { Icon: ShoppingBag, title: "Local Marketplace", desc: "Buy and sell within trusted community boundaries." },
  { Icon: Megaphone, title: "Community Updates", desc: "Official notices, never lost in a WhatsApp group." },
  { Icon: Calendar, title: "Events", desc: "Festivals, meetups, classes — all in one calendar." },
  { Icon: MessageCircle, title: "Messenger", desc: "Direct chats and neighbourhood groups." },
  { Icon: Users, title: "Clubs & Hobby Groups", desc: "Find your people — fitness, books, tech, more." },
  { Icon: PhoneCall, title: "Emergency Contacts", desc: "Critical numbers, one tap away." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <BrandMark />
          <nav className="hidden items-center justify-center gap-7 text-sm font-medium text-foreground/70 md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#community" className="hover:text-foreground">Community</a>
            <a href="#roadmap" className="hover:text-foreground">Roadmap</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="/login">Sign in</Link>
            </Button>
            <Button asChild className="rounded-xl">
              <Link to="/register">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 brand-gradient opacity-[0.07]" />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pt-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-foreground/70">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                Built for BHEL Haridwar Township · Scalable to any community
              </div>
              <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Your community,
                <br />
                <span className="bg-clip-text text-transparent brand-gradient">beautifully connected.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                LokLink <span className="devanagari font-semibold text-foreground">(लोकलिंक)</span> brings your
                neighbourhood's feed, marketplace, events, lost & found, clubs and emergency contacts into one
                calm, trustworthy place. Simple for elders. Modern for everyone.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-12 rounded-xl px-6 text-base">
                  <Link to="/register">
                    Create your account <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-xl px-6 text-base">
                  <Link to="/login">I already have one</Link>
                </Button>
              </div>
              <ul className="mt-7 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                {["Verified residents only", "Role-based moderation", "Mobile-first & accessible", "Works on slow networks"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Hero preview card */}
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] brand-gradient opacity-20 blur-2xl" />
              <div className="rounded-3xl border border-border bg-card p-5 shadow-pop">
                <div className="flex items-center justify-between">
                  <BrandMark size="sm" />
                  <span className="rounded-full bg-success/10 px-2 py-1 text-[11px] font-semibold text-success">
                    LIVE
                  </span>
                </div>
                <div className="mt-4 grid gap-3">
                  {[
                    { tag: "Update", title: "Water maintenance — Sector 3, 10 AM tomorrow", meta: "Township Office · 2h" },
                    { tag: "Lost", title: "Black leather wallet near Sector 4 park", meta: "Rajeev · today" },
                    { tag: "For sale", title: "Royal Enfield Classic 350 · ₹1,42,000", meta: "Vikram · 1d" },
                    { tag: "Event", title: "Diwali Cultural Night · Sat 6 PM", meta: "Community Hall · 312 going" },
                  ].map((p) => (
                    <div key={p.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-xl border border-border bg-surface/60 p-3">
                      <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary self-start">
                        {p.tag}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{p.title}</p>
                        <p className="truncate text-xs text-muted-foreground">{p.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border bg-surface/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Everything in one place</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Eight modules. One quiet home for your community.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community blurb */}
      <section id="community" className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Trust by design</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Built for organisations. Friendly for families. Simple for seniors.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Role-based access keeps things organised: Super Admins govern the platform, Community Admins run their
              township, Moderators keep conversations healthy, and Members get on with daily life.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { Icon: Shield, t: "RBAC built-in", d: "Super Admin · Community Admin · Moderator · Member" },
                { Icon: MapPin, t: "Local first", d: "Verified, neighbourhood-scoped content." },
              ].map(({ Icon, t, d }) => (
                <div key={t} className="rounded-2xl border border-border bg-card p-4">
                  <Icon className="h-5 w-5 text-primary" />
                  <p className="mt-2 text-sm font-semibold">{t}</p>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-gradient-to-br from-primary to-accent p-8 text-white shadow-pop">
            <p className="devanagari text-sm font-medium text-white/80">समुदाय की डिजिटल पहचान</p>
            <h3 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
              From BHEL Haridwar to universities, societies and smart cities.
            </h3>
            <p className="mt-4 text-white/85">
              LokLink starts hyper-local and scales across organisations. One stack. Many communities.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary" className="rounded-xl">
                <Link to="/register">Join your community</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link to="/login">Sign in</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="border-t border-border bg-surface/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Phase 1 → Phase 2</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { phase: "Phase 1 · Now", items: ["Feed, Marketplace, Lost & Found", "Updates, Profile, Admin", "Static UI for Events, Messenger, Clubs, Emergency, Navigation"] },
              { phase: "Phase 2 · Next", items: ["Realtime messenger", "Maps & live navigation", "Push notifications", "Image uploads to cloud"] },
              { phase: "Phase 3 · Later", items: ["Multi-community federation", "Payments inside marketplace", "Civic services integrations"] },
            ].map((p) => (
              <div key={p.phase} className="rounded-2xl border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">{p.phase}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {p.items.map((i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto grid max-w-7xl items-center gap-4 px-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:px-6 lg:px-8">
          <BrandMark size="sm" />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LokLink. Made for communities, with care.
          </p>
        </div>
      </footer>
    </div>
  );
}
