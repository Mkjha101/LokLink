import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import { useAuth } from "@/features/auth/AuthContext";
import { ADMIN_ROLES, ROLE_LABEL, type Role } from "@/features/rbac/roles";
import { SectionHeader } from "@/components/common/SectionHeader";
import { RoleBadge } from "@/components/common/RoleBadge";
import { Avatar } from "@/components/common/Avatar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Flag, Shield } from "lucide-react";

export const Route = createFileRoute("/_app/admin")({
  head: () => ({ meta: [{ title: "Admin · LokLink" }] }),
  component: AdminPage,
});

const REPORTS = [
  { id: "r1", type: "Post", subject: "Inappropriate language in Sector 3 thread", reporter: "Anita K.", urgency: "High" as const },
  { id: "r2", type: "Listing", subject: "Suspicious pricing on phone listing", reporter: "Vinay S.", urgency: "Medium" as const },
  { id: "r3", type: "User", subject: "Spam DMs from unknown user", reporter: "Meera I.", urgency: "Low" as const },
];

function AdminPage() {
  const { hasRole } = useAuth();
  const navigate = useNavigate();
  const allowed = hasRole(ADMIN_ROLES);

  useEffect(() => {
    if (!allowed) navigate({ to: "/dashboard" });
  }, [allowed, navigate]);

  const stats = useQuery({ queryKey: ["adminStats"], queryFn: adminApi.stats, enabled: allowed });
  const users = useQuery({ queryKey: ["adminUsers"], queryFn: adminApi.users, enabled: allowed });

  if (!allowed) {
    return (
      <div className="mx-auto max-w-md text-center">
        <Shield className="mx-auto h-10 w-10 text-muted-foreground" />
        <p className="mt-3 font-semibold">Admins only</p>
        <p className="text-sm text-muted-foreground">Redirecting…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <SectionHeader
        title="Admin Dashboard"
        subtitle="Manage members, content and community settings."
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.data?.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className="mt-2 text-3xl font-bold">{s.value}</p>
            {s.delta && <p className="mt-1 text-xs text-success">{s.delta}</p>}
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Reports queue */}
        <div className="lg:col-span-1 rounded-2xl border border-border bg-card p-5 shadow-card">
          <h2 className="text-base font-semibold">Open reports</h2>
          <ul className="mt-4 space-y-3">
            {REPORTS.map((r) => (
              <li key={r.id} className="rounded-xl border border-border bg-surface/40 p-3">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-warning/15 text-warning-foreground">
                    <Flag className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-xs font-semibold uppercase text-muted-foreground">{r.type}</span>
                  <span
                    className={
                      "ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold " +
                      (r.urgency === "High"
                        ? "bg-destructive/10 text-destructive"
                        : r.urgency === "Medium"
                          ? "bg-warning/15 text-warning-foreground"
                          : "bg-muted text-muted-foreground")
                    }
                  >
                    {r.urgency}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium">{r.subject}</p>
                <p className="text-xs text-muted-foreground">Reported by {r.reporter}</p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" className="rounded-lg">Dismiss</Button>
                  <Button size="sm" className="rounded-lg">Review</Button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Users table */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Members</h2>
            <p className="text-xs text-muted-foreground">{users.data?.length ?? 0} shown</p>
          </div>
          <div className="-mx-5 mt-3 overflow-x-auto px-5">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="py-2">Member</th>
                  <th className="py-2">Block</th>
                  <th className="py-2">Joined</th>
                  <th className="py-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.data?.map((u) => (
                  <tr key={u.id} className="border-b border-border/60 last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={u.name} size="xs" />
                        <div className="min-w-0">
                          <p className="truncate font-medium">{u.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">{u.block}</td>
                    <td className="py-3 text-muted-foreground">{u.joined}</td>
                    <td className="py-3">
                      <Select defaultValue={u.role}>
                        <SelectTrigger className="h-9 w-[170px] rounded-lg">
                          <SelectValue>
                            <RoleBadge role={u.role} />
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(ROLE_LABEL) as Role[]).map((r) => (
                            <SelectItem key={r} value={r}>{ROLE_LABEL[r]}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-warning/30 bg-warning/5 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning-foreground" />
          <div>
            <p className="text-sm font-semibold">Phase 1 preview</p>
            <p className="text-sm text-foreground/80">
              Role changes, reports and module toggles are wired to placeholder APIs. Connect the Express + MongoDB backend
              (see <code className="rounded bg-card px-1.5 py-0.5 text-xs">backend/README.md</code>) to make them persistent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
