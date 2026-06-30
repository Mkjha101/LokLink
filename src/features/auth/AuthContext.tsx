import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { authApi, type LoginPayload, type RegisterPayload } from "@/lib/api";
import { storage } from "@/lib/storage";
import type { MockUser } from "@/lib/mock/seed";
import type { Role } from "@/features/rbac/roles";
import { hasRole as roleHas } from "@/features/rbac/roles";

type AuthState = {
  user: MockUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<MockUser>;
  register: (payload: RegisterPayload) => Promise<MockUser>;
  logout: () => void;
  hasRole: (roles: Role[]) => boolean;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = storage.getUser<MockUser>();
    if (stored && storage.getToken()) setUser(stored);
    setLoading(false);
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const { token, user: u } = await authApi.login(payload);
    storage.setToken(token);
    storage.setUser(u);
    setUser(u);
    return u;
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const { token, user: u } = await authApi.register(payload);
    storage.setToken(token);
    storage.setUser(u);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(() => {
    storage.clearToken();
    storage.clearUser();
    setUser(null);
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      user,
      isAuthenticated: !!user,
      loading,
      login,
      register,
      logout,
      hasRole: (roles) => roleHas(user?.role, roles),
    }),
    [user, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
