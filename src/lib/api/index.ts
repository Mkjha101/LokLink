/**
 * Per-module API clients. Each module exposes the endpoints the LokLink
 * Express backend should implement. In Phase 1 they resolve to mock data
 * so the UI works end-to-end; flip them to `api.get(...)` when the backend
 * is live (no caller-side changes required).
 */
import { api } from "./client";
import {
  feedPosts,
  marketplaceListings,
  lostFoundItems,
  updates,
  events,
  clubs,
  conversations,
  emergencyContacts,
  places,
  adminStats,
  adminUsers,
  currentUser,
  type FeedPost,
  type MarketplaceListing,
  type LostFoundItem,
  type Update,
  type EventItem,
  type Club,
  type Conversation,
  type EmergencyContact,
  type Place,
  type AdminStat,
  type AdminUser,
  type MockUser,
} from "@/lib/mock/seed";
import type { Role } from "@/features/rbac/roles";

const delay = <T,>(data: T, ms = 200): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

/* ---------- auth ---------- */
export type LoginPayload = { email: string; password: string };
export type RegisterPayload = { name: string; email: string; password: string; communityCode: string };
export type AuthResponse = { token: string; user: MockUser };

export const authApi = {
  /** POST /api/auth/login */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    // Real backend: return (await api.post<AuthResponse>("/auth/login", payload)).data;
    const role: Role = payload.email.toLowerCase().includes("admin") ? "community_admin" : "member";
    return delay({
      token: `mock.${btoa(payload.email)}.${Date.now()}`,
      user: { ...currentUser, email: payload.email, role },
    });
  },
  /** POST /api/auth/register */
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    return delay({
      token: `mock.${btoa(payload.email)}.${Date.now()}`,
      user: { ...currentUser, name: payload.name, email: payload.email, role: "member" },
    });
  },
  /** GET /api/auth/me */
  async me(): Promise<MockUser> {
    return delay(currentUser);
  },
};

/* ---------- users / profile ---------- */
export const usersApi = {
  /** GET /api/users/:id */
  getById: (_id: string) => delay(currentUser),
  /** PATCH /api/users/:id */
  update: (patch: Partial<MockUser>) => delay({ ...currentUser, ...patch }),
};

/* ---------- feed / posts ---------- */
export const postsApi = {
  /** GET /api/posts */
  list: (): Promise<FeedPost[]> => delay(feedPosts),
  /** POST /api/posts */
  create: (post: { content: string; tag?: string }) =>
    delay<FeedPost>({
      id: `p_${Date.now()}`,
      author: { name: currentUser.name, role: currentUser.role, block: currentUser.block ?? "" },
      time: "Just now",
      content: post.content,
      tag: post.tag,
      likes: 0,
      comments: 0,
      shares: 0,
    }),
  /** POST /api/posts/:id/like */
  like: (_id: string) => delay({ ok: true }),
};

/* ---------- marketplace ---------- */
export const marketplaceApi = {
  /** GET /api/marketplace */
  list: (): Promise<MarketplaceListing[]> => delay(marketplaceListings),
  /** POST /api/marketplace */
  create: (data: Omit<MarketplaceListing, "id" | "postedAt" | "seller" | "block">) =>
    delay<MarketplaceListing>({
      ...data,
      id: `m_${Date.now()}`,
      postedAt: "Just now",
      seller: currentUser.name,
      block: currentUser.block ?? "",
    }),
};

/* ---------- lost & found ---------- */
export const lostFoundApi = {
  /** GET /api/lost-found */
  list: (): Promise<LostFoundItem[]> => delay(lostFoundItems),
  /** POST /api/lost-found */
  report: (item: Omit<LostFoundItem, "id">) => delay<LostFoundItem>({ ...item, id: `lf_${Date.now()}` }),
};

/* ---------- updates ---------- */
export const updatesApi = {
  /** GET /api/updates */
  list: (): Promise<Update[]> => delay(updates),
};

/* ---------- events ---------- */
export const eventsApi = {
  /** GET /api/events */
  list: (): Promise<EventItem[]> => delay(events),
};

/* ---------- clubs ---------- */
export const clubsApi = {
  /** GET /api/clubs */
  list: (): Promise<Club[]> => delay(clubs),
};

/* ---------- messenger ---------- */
export const messengerApi = {
  /** GET /api/messenger/conversations */
  conversations: (): Promise<Conversation[]> => delay(conversations),
};

/* ---------- emergency ---------- */
export const emergencyApi = {
  /** GET /api/emergency */
  list: (): Promise<EmergencyContact[]> => delay(emergencyContacts),
};

/* ---------- navigation / places ---------- */
export const navigationApi = {
  /** GET /api/navigation */
  list: (): Promise<Place[]> => delay(places),
};

/* ---------- admin ---------- */
export const adminApi = {
  /** GET /api/admin/stats */
  stats: (): Promise<AdminStat[]> => delay(adminStats),
  /** GET /api/admin/users */
  users: (): Promise<AdminUser[]> => delay(adminUsers),
  /** PATCH /api/admin/users/:id/role */
  setRole: (_id: string, _role: Role) => delay({ ok: true }),
};

// keep api referenced so the import is preserved when modules switch to real calls
export { api };
