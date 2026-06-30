import { type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Home,
  Newspaper,
  Search,
  ShoppingBag,
  Megaphone,
  Calendar,
  MessageCircle,
  Users,
  PhoneCall,
  MapPin,
  User as UserIcon,
  Shield,
  LogOut,
  Bell,
  Menu,
} from "lucide-react";
import { BrandMark } from "@/components/layout/BrandMark";
import { Avatar } from "@/components/common/Avatar";
import { RoleBadge } from "@/components/common/RoleBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/features/auth/AuthContext";
import { ADMIN_ROLES } from "@/features/rbac/roles";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; Icon: typeof Home; admin?: boolean };

const NAV: NavItem[] = [
  { to: "/dashboard", label: "Home", Icon: Home },
  { to: "/feed", label: "Feed", Icon: Newspaper },
  { to: "/lost-found", label: "Lost & Found", Icon: Search },
  { to: "/marketplace", label: "Marketplace", Icon: ShoppingBag },
  { to: "/updates", label: "Updates", Icon: Megaphone },
  { to: "/events", label: "Events", Icon: Calendar },
  { to: "/messenger", label: "Messenger", Icon: MessageCircle },
  { to: "/clubs", label: "Clubs", Icon: Users },
  { to: "/emergency", label: "Emergency", Icon: PhoneCall },
  { to: "/navigation", label: "Navigation", Icon: MapPin },
  { to: "/profile", label: "Profile", Icon: UserIcon },
];

const MOBILE_TABS: NavItem[] = [
  { to: "/dashboard", label: "Home", Icon: Home },
  { to: "/feed", label: "Feed", Icon: Newspaper },
  { to: "/marketplace", label: "Market", Icon: ShoppingBag },
  { to: "/messenger", label: "Chat", Icon: MessageCircle },
  { to: "/profile", label: "Me", Icon: UserIcon },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { user, hasRole } = useAuth();
  const location = useLocation();
  const items = [...NAV];
  if (hasRole(ADMIN_ROLES)) {
    items.push({ to: "/admin", label: "Admin", Icon: Shield, admin: true });
  }
  return (
    <nav className="flex h-full flex-col gap-1 p-3">
      <div className="px-2 pb-3 pt-2">
        <BrandMark size="md" />
      </div>
      <div className="rounded-xl bg-surface p-3">
        <div className="flex items-center gap-3">
          <Avatar name={user?.name ?? "?"} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{user?.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user?.community}</p>
          </div>
        </div>
        {user?.role && <div className="mt-2"><RoleBadge role={user.role} /></div>}
      </div>
      <div className="mt-2 flex-1 overflow-y-auto">
        {items.map(({ to, label, Icon, admin }) => {
          const active = location.pathname === to || location.pathname.startsWith(to + "/");
          return (
            <Link
              key={to}
              to={to}
              onClick={onNavigate}
              className={cn(
                "group mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground shadow-card"
                  : "text-foreground/80 hover:bg-surface hover:text-foreground",
                admin && !active && "text-accent",
              )}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" strokeWidth={active ? 2.4 : 2} />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </div>
      <div className="border-t border-border pt-3 text-[11px] text-muted-foreground">
        <p>LokLink · Community OS</p>
        <p>BHEL Haridwar Township</p>
      </div>
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface/60">
      <div className="mx-auto flex max-w-[1440px]">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-sidebar lg:block">
          <SidebarNav />
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:px-6">
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-72 p-0">
                    <SidebarNav />
                  </SheetContent>
                </Sheet>
                <div className="lg:hidden">
                  <BrandMark size="sm" />
                </div>
              </div>

              <div className="relative min-w-0 max-w-xl justify-self-stretch">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search people, posts, listings…"
                  className="h-10 rounded-xl border-border bg-surface pl-9 focus-visible:bg-background"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label="Account"
                    >
                      <Avatar name={user?.name ?? "?"} size="sm" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <p className="text-sm font-semibold">{user?.name}</p>
                      <p className="text-xs font-normal text-muted-foreground">{user?.email}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate({ to: "/profile" })}>
                      <UserIcon className="mr-2 h-4 w-4" /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        logout();
                        navigate({ to: "/login" });
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 pb-24 pt-6 lg:px-8 lg:pb-10">{children}</main>
        </div>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur lg:hidden">
        <ul className="grid grid-cols-5">
          {MOBILE_TABS.map(({ to, label, Icon }) => (
            <li key={to}>
              <Link
                to={to}
                className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground"
                activeProps={{ className: "text-primary" }}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
