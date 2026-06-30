import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/features/auth/AuthContext";
import { BrandMark } from "@/components/layout/BrandMark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sparkles, ShieldCheck, Users } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in · LokLink" },
      { name: "description", content: "Sign in to your LokLink community." },
    ],
  }),
  component: Login,
});

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    try {
      const u = await login({ email, password });
      toast.success(`Welcome back, ${u.name.split(" ")[0]} 👋`);
      navigate({ to: "/dashboard" });
    } catch {
      toast.error("Could not sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="mx-auto w-full max-w-md">
        <Link to="/" className="inline-block"><BrandMark /></Link>
        <h1 className="mt-8 text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Sign in to your community.{" "}
          <span className="text-foreground/70">Tip: include "admin" in your email to preview admin mode.</span>
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@bhel.in"
              required
              className="mt-1.5 h-11 rounded-xl"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button type="button" className="text-xs font-medium text-accent hover:underline">
                Forgot?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mt-1.5 h-11 rounded-xl"
            />
          </div>
          <Button type="submit" disabled={loading} className="h-11 w-full rounded-xl text-base">
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or continue with
          <span className="h-px flex-1 bg-border" />
        </div>
        <Button variant="outline" className="h-11 w-full rounded-xl">
          <GoogleIcon /> Continue with Google
        </Button>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          New to LokLink?{" "}
          <Link to="/register" className="font-semibold text-accent hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 sm:px-8">{children}</div>
      <aside className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0 brand-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <BrandMark tone="onDark" />
          <div className="max-w-md">
            <p className="devanagari text-sm font-medium text-white/80">समुदाय का डिजिटल घर</p>
            <h2 className="mt-2 text-4xl font-bold leading-tight">
              The calm digital home for your community.
            </h2>
            <p className="mt-4 text-white/85">
              Feed, marketplace, lost & found, events, clubs and emergency — all in one trusted place.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                { Icon: ShieldCheck, t: "Verified, neighbourhood-scoped accounts" },
                { Icon: Users, t: "Built-in roles: Admin, Moderator, Member" },
                { Icon: Sparkles, t: "Mobile-first, accessible, no noise" },
              ].map(({ Icon, t }) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/15">
                    <Icon className="h-4 w-4" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-white/70">© {new Date().getFullYear()} LokLink · BHEL Haridwar Township</p>
        </div>
      </aside>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.2-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.7 6.4 29.1 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.7 6.4 29.1 4.5 24 4.5c-7.4 0-13.8 4.2-17.7 10.2z"/>
      <path fill="#4CAF50" d="M24 43.5c5 0 9.6-1.9 13-5l-6-5.1c-2 1.4-4.4 2.2-7 2.2-5.3 0-9.7-3-11.3-7.2l-6.6 5.1C9.9 39.2 16.4 43.5 24 43.5z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.4 4.2-4.3 5.4l6 5.1c-.4.4 6.5-4.7 6.5-14.5 0-1.2-.1-2.4-.4-3.5z"/>
    </svg>
  );
}
