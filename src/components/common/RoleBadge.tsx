import { Badge } from "@/components/ui/badge";
import { ROLE_LABEL, type Role } from "@/features/rbac/roles";
import { Shield, ShieldCheck, Star, User } from "lucide-react";
import { cn } from "@/lib/utils";

const STYLE: Record<Role, { className: string; Icon: typeof Shield }> = {
  super_admin: { className: "bg-primary/10 text-primary border-primary/20", Icon: ShieldCheck },
  community_admin: { className: "bg-accent/10 text-accent border-accent/20", Icon: Shield },
  moderator: { className: "bg-warning/15 text-warning-foreground border-warning/30", Icon: Star },
  member: { className: "bg-muted text-muted-foreground border-border", Icon: User },
};

export function RoleBadge({ role, className }: { role: Role; className?: string }) {
  const s = STYLE[role];
  const Icon = s.Icon;
  return (
    <Badge variant="outline" className={cn("gap-1 rounded-full font-medium", s.className, className)}>
      <Icon className="h-3 w-3" />
      {ROLE_LABEL[role]}
    </Badge>
  );
}
