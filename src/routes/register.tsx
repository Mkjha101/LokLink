import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/features/auth/AuthContext";
import { BrandMark } from "@/components/layout/BrandMark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AuthLayout } from "./login";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your LokLink account" },
      { name: "description", content: "Join your community on LokLink." },
    ],
  }),
  component: Register,
});

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", communityCode: "BHEL-HW", password: "" });
  const [loading, setLoading] = useState(false);

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.communityCode) return;
    setLoading(true);
    try {
      const u = await register(form);
      toast.success(`Welcome to LokLink, ${u.name.split(" ")[0]} 🎉`);
      navigate({ to: "/dashboard" });
    } catch {
      toast.error("Could not create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="mx-auto w-full max-w-md">
        <Link to="/" className="inline-block"><BrandMark /></Link>
        <h1 className="mt-8 text-3xl font-bold tracking-tight">Create your account</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Join your community in under a minute.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              autoComplete="name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Aarav Sharma"
              required
              className="mt-1.5 h-11 rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="you@bhel.in"
              required
              className="mt-1.5 h-11 rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="code">Community code</Label>
            <Input
              id="code"
              value={form.communityCode}
              onChange={(e) => set("communityCode", e.target.value)}
              placeholder="BHEL-HW"
              required
              className="mt-1.5 h-11 rounded-xl"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Use the code shared by your township office, society, or campus.
            </p>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              placeholder="At least 8 characters"
              required
              minLength={8}
              className="mt-1.5 h-11 rounded-xl"
            />
          </div>
          <Button type="submit" disabled={loading} className="h-11 w-full rounded-xl text-base">
            {loading ? "Creating account…" : "Create account"}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-accent hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
