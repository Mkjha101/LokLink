import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/features/auth/AuthContext";
import { Avatar } from "@/components/common/Avatar";
import { RoleBadge } from "@/components/common/RoleBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Mail, Phone, Pencil, Newspaper, ShoppingBag, Search } from "lucide-react";
import { feedPosts, marketplaceListings, lostFoundItems } from "@/lib/mock/seed";
import { EmptyState } from "@/components/common/SectionHeader";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profile · LokLink" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  const [tab, setTab] = useState("posts");
  if (!user) return null;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div className="h-32 brand-gradient" />
        <div className="grid gap-4 px-6 pb-6 pt-0 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-end">
          <div className="-mt-12">
            <div className="rounded-full border-4 border-card bg-card">
              <Avatar name={user.name} size="lg" />
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <RoleBadge role={user.role} />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{user.bio}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{user.block}</span>
              <span className="inline-flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{user.email}</span>
              {user.phone && <span className="inline-flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{user.phone}</span>}
            </div>
          </div>
          <Button variant="outline" className="shrink-0 rounded-xl">
            <Pencil className="mr-1.5 h-4 w-4" /> Edit profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:max-w-md">
        {[
          { l: "Posts", v: feedPosts.filter((p) => p.author.name === user.name).length || 12 },
          { l: "Listings", v: 4 },
          { l: "Helped", v: 7 },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-card p-4 text-center shadow-card">
            <p className="text-2xl font-bold text-primary">{s.v}</p>
            <p className="text-xs text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="rounded-xl">
          <TabsTrigger value="posts" className="rounded-lg"><Newspaper className="mr-1.5 h-4 w-4" />Posts</TabsTrigger>
          <TabsTrigger value="listings" className="rounded-lg"><ShoppingBag className="mr-1.5 h-4 w-4" />Listings</TabsTrigger>
          <TabsTrigger value="lostfound" className="rounded-lg"><Search className="mr-1.5 h-4 w-4" />Lost & Found</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-4 space-y-3">
          {feedPosts.slice(0, 3).map((p) => (
            <div key={p.id} className="rounded-2xl border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground">{p.time}</p>
              <p className="mt-1 text-sm">{p.content}</p>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="listings" className="mt-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {marketplaceListings.slice(0, 2).map((l) => (
              <div key={l.id} className="rounded-2xl border border-border bg-card p-4">
                <p className="text-sm font-semibold">{l.title}</p>
                <p className="text-xs text-muted-foreground">{l.category} · {l.condition}</p>
                <p className="mt-2 font-bold text-primary">₹{l.price.toLocaleString("en-IN")}</p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="lostfound" className="mt-4">
          {lostFoundItems.slice(0, 1).map((i) => (
            <div key={i.id} className="rounded-2xl border border-border bg-card p-4">
              <p className="text-sm font-semibold">{i.title}</p>
              <p className="text-xs text-muted-foreground">{i.type.toUpperCase()} · {i.date}</p>
            </div>
          ))}
          <div className="mt-3">
            <EmptyState title="That's all for now" description="Your future reports will show up here." />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
