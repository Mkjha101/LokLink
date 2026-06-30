import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { postsApi } from "@/lib/api";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Avatar } from "@/components/common/Avatar";
import { RoleBadge } from "@/components/common/RoleBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageSquare, Share2, ImagePlus, Hash } from "lucide-react";
import { useAuth } from "@/features/auth/AuthContext";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/feed")({
  head: () => ({ meta: [{ title: "Community Feed · LokLink" }] }),
  component: FeedPage,
});

function FeedPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { data: posts } = useQuery({ queryKey: ["posts"], queryFn: postsApi.list });
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    if (!text.trim()) return;
    setSubmitting(true);
    const post = await postsApi.create({ content: text.trim() });
    qc.setQueryData(["posts"], (old: typeof posts) => [post, ...(old ?? [])]);
    setText("");
    setSubmitting(false);
    toast.success("Shared with your community");
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="space-y-5">
        <SectionHeader title="Community Feed" subtitle="What's on your mind, neighbour?" />

        {/* Composer */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
          <div className="flex gap-3">
            <Avatar name={user?.name ?? "?"} size="sm" />
            <div className="min-w-0 flex-1">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`Share something with ${user?.community}…`}
                className="min-h-[80px] resize-none rounded-xl border-border bg-surface/60 focus-visible:bg-background"
              />
              <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:flex sm:justify-between">
                <div className="flex flex-wrap gap-1.5 text-xs">
                  <Button type="button" variant="ghost" size="sm" className="h-8 rounded-lg text-muted-foreground">
                    <ImagePlus className="mr-1.5 h-4 w-4" /> Photo
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-8 rounded-lg text-muted-foreground">
                    <Hash className="mr-1.5 h-4 w-4" /> Tag
                  </Button>
                </div>
                <Button onClick={submit} disabled={!text.trim() || submitting} className="h-9 rounded-xl">
                  {submitting ? "Posting…" : "Post"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        {posts?.map((p) => (
          <article key={p.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
              <Avatar name={p.author.name} />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-semibold">{p.author.name}</p>
                  {p.author.role !== "member" && <RoleBadge role={p.author.role} />}
                </div>
                <p className="text-xs text-muted-foreground">{p.author.block} · {p.time}</p>
              </div>
              {p.tag && (
                <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                  {p.tag}
                </span>
              )}
            </header>
            <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-foreground/90">
              {p.content}
            </p>
            <footer className="mt-4 flex items-center gap-1 border-t border-border pt-3 text-sm text-muted-foreground">
              <Button variant="ghost" size="sm" className="h-9 rounded-lg">
                <Heart className="mr-1.5 h-4 w-4" /> {p.likes}
              </Button>
              <Button variant="ghost" size="sm" className="h-9 rounded-lg">
                <MessageSquare className="mr-1.5 h-4 w-4" /> {p.comments}
              </Button>
              <Button variant="ghost" size="sm" className="h-9 rounded-lg">
                <Share2 className="mr-1.5 h-4 w-4" /> {p.shares}
              </Button>
            </footer>
          </article>
        ))}
      </div>

      {/* Sidebar */}
      <aside className="hidden space-y-4 lg:block">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">Trending tags</p>
          <ul className="mt-3 space-y-2">
            {["#Diwali", "#Maintenance", "#MorningWalk", "#Marketplace", "#Sector3"].map((t) => (
              <li key={t} className="flex items-center justify-between text-sm">
                <span className="font-medium">{t}</span>
                <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 80) + 10}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">Be kind</p>
          <p className="mt-2 text-sm text-muted-foreground">
            LokLink is a shared neighbourhood space. Stay respectful, stay local.
          </p>
        </div>
      </aside>
    </div>
  );
}
