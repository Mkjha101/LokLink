import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { messengerApi } from "@/lib/api";
import { Avatar } from "@/components/common/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Smile, Phone, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/messenger")({
  head: () => ({ meta: [{ title: "Messenger · LokLink" }] }),
  component: MessengerPage,
});

const MOCK_THREAD = [
  { id: 1, from: "them", text: "Hey! Are you joining the morning walk tomorrow?", time: "8:45 PM" },
  { id: 2, from: "me", text: "Yes! 6 AM at the usual spot?", time: "8:46 PM" },
  { id: 3, from: "them", text: "Yep. Bringing the new folks from Sector 5.", time: "8:47 PM" },
  { id: 4, from: "me", text: "Perfect, see you all there 👟", time: "8:48 PM" },
];

function MessengerPage() {
  const { data: convos } = useQuery({ queryKey: ["conversations"], queryFn: messengerApi.conversations });
  const [activeId, setActiveId] = useState<string | undefined>(undefined);
  const active = convos?.find((c) => c.id === (activeId ?? convos[0]?.id));

  return (
    <div className="mx-auto h-[calc(100vh-10rem)] max-w-6xl">
      <div className="grid h-full grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card shadow-card md:grid-cols-[320px_minmax(0,1fr)]">
        {/* Conversations list */}
        <aside className={cn("border-r border-border bg-surface/30", active && "hidden md:block")}>
          <div className="border-b border-border p-4">
            <h2 className="text-lg font-bold">Messages</h2>
            <Input placeholder="Search…" className="mt-3 h-9 rounded-xl bg-card" />
          </div>
          <ul className="divide-y divide-border">
            {convos?.map((c) => {
              const isActive = c.id === (active?.id);
              return (
                <li key={c.id}>
                  <button
                    onClick={() => setActiveId(c.id)}
                    className={cn(
                      "grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 text-left transition-colors",
                      isActive ? "bg-primary/5" : "hover:bg-surface",
                    )}
                  >
                    <Avatar name={c.name} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{c.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{c.last}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className="text-[11px] text-muted-foreground">{c.time}</span>
                      {c.unread && (
                        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                          {c.unread}
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Chat pane */}
        <section className="flex h-full flex-col">
          <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border p-4">
            <Avatar name={active?.name ?? "?"} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{active?.name}</p>
              <p className="text-xs text-success">Active now</p>
            </div>
            <div className="flex shrink-0 gap-1">
              <Button variant="ghost" size="icon" aria-label="Call"><Phone className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" aria-label="More"><MoreVertical className="h-4 w-4" /></Button>
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-surface/30 p-4">
            {MOCK_THREAD.map((m) => (
              <div key={m.id} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                    m.from === "me"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground border border-border",
                  )}
                >
                  <p>{m.text}</p>
                  <p className={cn("mt-1 text-[10px]", m.from === "me" ? "text-primary-foreground/70" : "text-muted-foreground")}>
                    {m.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <footer className="border-t border-border p-3">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-2">
              <Button variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button>
              <Input placeholder="Type a message…" className="h-10 rounded-xl bg-surface" />
              <Button variant="ghost" size="icon"><Smile className="h-4 w-4" /></Button>
              <Button size="icon" className="rounded-xl"><Send className="h-4 w-4" /></Button>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
