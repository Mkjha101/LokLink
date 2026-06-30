# LokLink (लोकलिंक) — Frontend MVP Plan

You chose "Keep MERN spec, frontend-only here." I'll build the full React frontend in this Lovable project and structure it so it cleanly plugs into your separate Express + MongoDB + JWT backend later. No Lovable Cloud, no Postgres, no real auth on this side.

## Stack note (important)

This project runs on **TanStack Start** (React 19 + Vite 7 + TanStack Router), not Create React App or React Router DOM. I'll use TanStack Router with file-based routes — it gives you the same SPA navigation, type-safe links, and layout routes, and is the supported router on this stack. Axios + Tailwind work exactly as specified.

## Design system

- **Brand:** LokLink with Devanagari लोकलिंक accent in the wordmark.
- **Palette:** Deep Indigo `#3F51B5` (primary), Royal Blue `#2563EB` (accent), white `#FFFFFF`, light gray surfaces `#F5F7FA` / `#EEF1F6`, ink `#0F172A`, muted `#64748B`. All as semantic tokens in `src/styles.css` (`--primary`, `--accent`, `--surface`, etc.) in oklch — no hardcoded hex in components.
- **Typography:** Inter via `@fontsource-variable/inter`. Display weights 600–800 for headings; 400/500 for body. Devanagari fallback via `Noto Sans Devanagari` for the wordmark.
- **Shape & depth:** 16px radius default (`--radius: 1rem`), 12px on inputs/chips, soft elevation shadows (`--shadow-sm`, `--shadow-card`, `--shadow-pop`), thin 1px borders in `#E5E9F0`.
- **Tone:** Apple-clean spacing, Notion-quiet surfaces, Discord-friendly density on feed/messenger, LinkedIn-credible cards. No social-media noise, no gradients beyond a single subtle indigo→blue brand wash on hero/auth.
- **Accessibility:** AA contrast on all tokens, focus-visible rings in `--accent`, 44px tap targets, full keyboard nav, prefers-reduced-motion respected.
- **Responsive:** mobile-first; bottom tab bar on mobile for app routes, sidebar shell on `lg+`.

## Pages (15)

Public:
1. **Landing** — hero with bilingual wordmark, "Built for BHEL Haridwar Township, scalable to any community," feature grid (8 modules), trust strip, footer.
2. **Login** — email + password, "Continue with Google" placeholder, split layout with brand panel.
3. **Register** — name, email, community code, password; role defaults to Member.

Authenticated app shell (sidebar + topbar + mobile tab bar):
4. **Home Dashboard** — greeting, quick actions, recent feed snippet, upcoming events, emergency shortcut, lost & found highlights.
5. **Community Feed** — composer + post cards (text/image), like/comment/share, realistic seed posts.
6. **Lost & Found** — filterable grid (Lost / Found / Resolved), item cards with photo, location, date, contact CTA, "Report item" modal.
7. **Marketplace** — category chips, listing grid with price/condition/seller, listing detail drawer, "Sell something" CTA.
8. **Community Updates** — official announcements feed (Admin/Moderator badges), pinned notices, category filters.
9. **Events** — static UI: month view + upcoming list + event detail card.
10. **Messenger** — static UI: conversations list, chat pane, composer.
11. **Clubs & Hobby Groups** — static UI: club cards, member counts, join CTA, club detail.
12. **Emergency Contacts** — static UI: categorized cards (Medical, Security, Fire, Township Office, Helplines) with call/copy actions.
13. **Local Navigation** — static UI: map placeholder + categorized POI list (Hospitals, Schools, Markets, Parks, Bus Stops).
14. **User Profile** — avatar, bio, role badge, activity tabs (Posts / Listings / Lost&Found), edit profile.
15. **Admin Dashboard** — stat tiles, user table with role controls, reported content queue, module toggles. Gated to Super Admin / Community Admin.

## Frontend architecture

```text
src/
  routes/
    __root.tsx                 # html shell, providers, font links
    index.tsx                  # Landing
    login.tsx
    register.tsx
    _app.tsx                   # AppShell layout (sidebar+topbar+mobile tabs), RBAC gate
    _app.dashboard.tsx
    _app.feed.tsx
    _app.lost-found.tsx
    _app.marketplace.tsx
    _app.updates.tsx
    _app.events.tsx
    _app.messenger.tsx
    _app.clubs.tsx
    _app.emergency.tsx
    _app.navigation.tsx
    _app.profile.tsx
    _app._admin.tsx            # admin-only nested layout
    _app._admin.dashboard.tsx
  components/
    layout/        # AppShell, Sidebar, Topbar, MobileTabBar, BrandMark
    ui/            # shadcn primitives (already present)
    feed/, marketplace/, lostfound/, updates/, events/,
    messenger/, clubs/, emergency/, navigation/, profile/, admin/
    common/        # EmptyState, SectionHeader, RoleBadge, Avatar, PriceTag
  features/
    auth/          # AuthContext, useAuth, RequireRole, mock login/register
    rbac/          # roles enum, permission map, hasRole/hasAnyRole helpers
  lib/
    api/           # axios instance + per-module API clients
      client.ts            # axios.create({ baseURL: VITE_API_BASE_URL }), JWT interceptor
      auth.api.ts
      users.api.ts
      posts.api.ts
      marketplace.api.ts
      lostfound.api.ts
      updates.api.ts
      events.api.ts
      clubs.api.ts
      messenger.api.ts
      emergency.api.ts
      admin.api.ts
    mock/          # seed data for feed/marketplace/lost-found/updates/profile
    storage.ts    # token storage helper
  styles.css      # design tokens, @theme inline, base layer
```

- **Auth layer:** `AuthContext` reads a mock JWT from `localStorage` (`loklink_token`) and a mock user. `login()`/`register()` resolve against in-memory users so the UI flows work end-to-end without a backend. Axios interceptor attaches `Authorization: Bearer <token>` to every call — ready for your Express backend the moment you flip `VITE_API_BASE_URL`.
- **RBAC:** `roles.ts` exports `Role = 'super_admin' | 'community_admin' | 'moderator' | 'member'` and a `permissions` matrix. `<RequireRole roles={[...]}/>` wraps admin routes; sidebar entries hide based on role. The `_app` layout redirects unauthenticated users to `/login`; `_app/_admin` redirects non-admins to `/dashboard`.
- **Data:** all module pages render from `lib/mock/*` seed data through their `*.api.ts` client (which currently returns the mock, so swapping to real HTTP is a one-line change per module).
- **State:** TanStack Query (already in stack) for all API calls; React Hook Form + Zod for auth/composer forms.

## Backend blueprint (delivered as docs, not code)

Since this project can't host Express/Mongo, I'll ship a `backend/README.md` at the repo root describing the exact structure your separate backend should follow, so the frontend's API clients line up 1:1:

```text
backend/
  src/
    config/        # db.js (mongoose), env.js, logger.js
    models/        # User, Community, Post, Comment, Listing, LostFoundItem,
                   # Update, Event, Club, Message, Conversation, EmergencyContact,
                   # Place, Report, Notification
    controllers/   # one per module, placeholder handlers
    routes/        # /api/auth, /api/users, /api/posts, /api/marketplace,
                   # /api/lost-found, /api/updates, /api/events, /api/clubs,
                   # /api/messenger, /api/emergency, /api/navigation, /api/admin
    middlewares/   # auth.js (JWT verify), rbac.js (requireRole), error.js, validate.js
    utils/         # jwt.js, hash.js (bcrypt), apiResponse.js, asyncHandler.js
    app.js
    server.js
```

Includes Mongoose schema sketches for each model, the RBAC middleware pattern, and the route → controller → model wiring map. Your team implements the handlers; the frontend will already be calling the right endpoints with the right payload shapes.

## What's in scope this phase

- All 15 pages with the design system applied.
- Working navigation, auth flow against mock store, role-gated admin.
- Realistic seed content for Feed, Marketplace, Lost & Found, Updates, Profile, Admin.
- Static-but-polished UI for Messenger, Events, Clubs, Emergency, Navigation.
- Axios + JWT interceptor + per-module API clients, env-driven base URL.
- `backend/README.md` blueprint document.

## Out of scope this phase

- Real Express server, Mongo connection, real JWT signing — those live in your separate backend repo per your choice.
- Realtime messenger, real maps tiles, payments, push notifications, image uploads to S3.

Ready to build on approval.