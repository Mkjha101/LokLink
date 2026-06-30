import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { useAuth } from "@/features/auth/AuthContext";
import { storage } from "@/lib/storage";

export const Route = createFileRoute("/_app")({
  // SSR-safe pre-check using localStorage isn't possible server-side, so we
  // re-check on the client below. On the server we just render the shell.
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    if (!storage.getToken()) {
      throw redirect({ to: "/login" });
    }
  },
  component: AppLayout,
});

function AppLayout() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate({ to: "/login" });
  }, [loading, isAuthenticated, navigate]);

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
