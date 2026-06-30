# LokLink Backend — Express + MongoDB Blueprint

This is the **server-side blueprint** for LokLink. The frontend in this repo already calls these endpoints through `src/lib/api/*` clients (currently resolving to mock data). Build the backend below in a separate repo, point `VITE_API_BASE_URL` at it, and the UI lights up end-to-end with zero frontend changes.

> Note on hosting: this Lovable project runs on TanStack Start / Cloudflare Workers, which cannot host an Express server or a Mongo connection. Keep your Node/Express + MongoDB stack as a **separate** deployable (Render, Railway, Fly, EC2, etc.).

---

## Project structure

```
backend/
├── package.json
├── .env.example
└── src/
    ├── server.js               # bootstraps app, starts HTTP server
    ├── app.js                  # express() instance, middleware, routes
    ├── config/
    │   ├── env.js              # validated env loader (dotenv + zod)
    │   ├── db.js               # mongoose connection
    │   └── logger.js
    ├── models/                 # Mongoose schemas
    │   ├── User.js
    │   ├── Community.js
    │   ├── Post.js
    │   ├── Comment.js
    │   ├── Listing.js
    │   ├── LostFoundItem.js
    │   ├── Update.js
    │   ├── Event.js
    │   ├── Club.js
    │   ├── Conversation.js
    │   ├── Message.js
    │   ├── EmergencyContact.js
    │   ├── Place.js
    │   ├── Report.js
    │   └── Notification.js
    ├── controllers/            # one file per module
    │   ├── auth.controller.js
    │   ├── users.controller.js
    │   ├── posts.controller.js
    │   ├── marketplace.controller.js
    │   ├── lostFound.controller.js
    │   ├── updates.controller.js
    │   ├── events.controller.js
    │   ├── clubs.controller.js
    │   ├── messenger.controller.js
    │   ├── emergency.controller.js
    │   ├── navigation.controller.js
    │   └── admin.controller.js
    ├── routes/                 # express routers; mounted by app.js
    │   ├── index.js
    │   ├── auth.routes.js
    │   ├── users.routes.js
    │   ├── posts.routes.js
    │   ├── marketplace.routes.js
    │   ├── lostFound.routes.js
    │   ├── updates.routes.js
    │   ├── events.routes.js
    │   ├── clubs.routes.js
    │   ├── messenger.routes.js
    │   ├── emergency.routes.js
    │   ├── navigation.routes.js
    │   └── admin.routes.js
    ├── middlewares/
    │   ├── auth.js             # verifies JWT, attaches req.user
    │   ├── rbac.js             # requireRole(...roles)
    │   ├── validate.js         # zod / joi request validation
    │   └── error.js            # central error handler
    └── utils/
        ├── jwt.js              # sign + verify
        ├── hash.js             # bcrypt wrappers
        ├── apiResponse.js      # { success, data, error } envelope
        └── asyncHandler.js     # try/catch helper
```

---

## Roles (RBAC)

```
super_admin       # full platform access
community_admin   # full control of one community
moderator         # content moderation in one community
member            # default
```

`middlewares/rbac.js`:

```js
export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ success: false, error: "Unauthorized" });
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, error: "Forbidden" });
  }
  next();
};
```

Usage:

```js
router.get("/", authenticate, listPosts);
router.delete("/:id", authenticate, requireRole("super_admin", "community_admin", "moderator"), removePost);
```

---

## Mongoose schema sketches

### User
```js
{
  name: String,
  email: { type: String, unique: true, index: true },
  passwordHash: String,
  role: { type: String, enum: ["super_admin","community_admin","moderator","member"], default: "member" },
  community: { type: ObjectId, ref: "Community", index: true },
  block: String,
  phone: String,
  avatar: String,
  bio: String,
  createdAt, updatedAt
}
```

### Community
```js
{ code: { type: String, unique: true }, name: String, city: String, type: String /* township|society|campus */ }
```

### Post
```js
{ author: ObjectId<User>, community: ObjectId<Community>, content: String,
  tag: String, media: [String], likes: [ObjectId<User>], commentCount: Number, createdAt }
```

### Listing (Marketplace)
```js
{ seller: ObjectId<User>, community: ObjectId<Community>, title, description,
  price: Number, category, condition, photos: [String], status: "active"|"sold", createdAt }
```

### LostFoundItem
```js
{ reporter: ObjectId<User>, community: ObjectId<Community>, type: "lost"|"found"|"resolved",
  title, description, location, dateSeen: Date, contact, photos: [String], createdAt }
```

### Update (announcement)
```js
{ author: ObjectId<User>, community: ObjectId<Community>, title, body,
  category: "Notice"|"Maintenance"|"Safety"|"Event"|"Policy", pinned: Boolean, createdAt }
```

### Event
```js
{ host: ObjectId<User>, community: ObjectId<Community>, title, description,
  category, location, startsAt: Date, endsAt: Date, attendees: [ObjectId<User>] }
```

### Club
```js
{ owner: ObjectId<User>, community: ObjectId<Community>, name, category,
  description, members: [ObjectId<User>] }
```

### Conversation / Message
```js
// Conversation
{ participants: [ObjectId<User>], isGroup: Boolean, name: String, lastMessageAt: Date }

// Message
{ conversation: ObjectId<Conversation>, sender: ObjectId<User>, text: String, readBy: [ObjectId<User>], createdAt }
```

### EmergencyContact / Place
```js
// EmergencyContact
{ community: ObjectId<Community>, name, number, category: "Medical"|"Security"|"Fire"|"Township"|"Helpline", note }

// Place
{ community: ObjectId<Community>, name, category: "Hospital"|"School"|"Market"|"Park"|"Bus Stop"|"Temple",
  distance: String, hours: String, geo: { type: "Point", coordinates: [lng, lat] } }
```

### Report / Notification
```js
{ reporter: ObjectId<User>, targetType: "Post"|"Listing"|"User"|"Message", targetId: ObjectId,
  reason: String, urgency: "Low"|"Medium"|"High", status: "open"|"actioned"|"dismissed" }

{ user: ObjectId<User>, type: String, payload: Mixed, readAt: Date, createdAt }
```

---

## REST API surface (must match frontend `src/lib/api/*`)

All responses use the envelope `{ success: boolean, data?: any, error?: string }`.

### Auth (`/api/auth`)
| Method | Path        | Auth | Body / Notes |
|--------|-------------|------|--------------|
| POST   | `/register` | —    | `{ name, email, password, communityCode }` → `{ token, user }` |
| POST   | `/login`    | —    | `{ email, password }` → `{ token, user }` |
| GET    | `/me`       | JWT  | → `user` |
| POST   | `/logout`   | JWT  | invalidate token (optional, JWT is stateless) |

### Users (`/api/users`)
| GET    | `/:id`          | JWT | profile |
| PATCH  | `/:id`          | JWT (self or admin) | update profile |

### Posts (`/api/posts`)
| GET    | `/`             | JWT | community feed |
| POST   | `/`             | JWT | create post |
| POST   | `/:id/like`     | JWT | toggle like |
| GET    | `/:id/comments` | JWT |
| POST   | `/:id/comments` | JWT |
| DELETE | `/:id`          | JWT + (`moderator`+) |

### Marketplace (`/api/marketplace`)
| GET    | `/`             | JWT | listings |
| GET    | `/:id`          | JWT |
| POST   | `/`             | JWT |
| PATCH  | `/:id`          | JWT (owner or admin) |
| DELETE | `/:id`          | JWT (owner or admin) |

### Lost & Found (`/api/lost-found`)
| GET    | `/`             | JWT |
| POST   | `/`             | JWT |
| PATCH  | `/:id`          | JWT (owner or moderator+) |

### Updates (`/api/updates`)
| GET    | `/`             | JWT |
| POST   | `/`             | JWT + (`moderator`+) |
| PATCH  | `/:id`          | JWT + (`moderator`+) |
| DELETE | `/:id`          | JWT + (`community_admin`+) |

### Events (`/api/events`)
| GET / POST / PATCH / DELETE on `/`, `/:id`, `/:id/rsvp` — standard CRUD + RSVP. |

### Clubs (`/api/clubs`)
| GET / POST / PATCH / DELETE + `/:id/join`, `/:id/leave`. |

### Messenger (`/api/messenger`)
| GET  | `/conversations`            | JWT |
| POST | `/conversations`            | JWT |
| GET  | `/conversations/:id/messages` | JWT |
| POST | `/conversations/:id/messages` | JWT |

### Emergency (`/api/emergency`)
| GET / POST / PATCH / DELETE — Admin+ for writes. |

### Navigation (`/api/navigation`)
| GET / POST / PATCH / DELETE on `/places`. |

### Admin (`/api/admin`)
| GET   | `/stats`              | `community_admin`+ |
| GET   | `/users`              | `community_admin`+ |
| PATCH | `/users/:id/role`     | `community_admin`+ (super_admin only for granting admin roles) |
| GET   | `/reports`            | `moderator`+ |
| PATCH | `/reports/:id`        | `moderator`+ |

---

## Server bootstrap

`src/server.js`:
```js
import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 5000;
await connectDB(process.env.MONGO_URI);
app.listen(port, () => console.log(`LokLink API on :${port}`));
```

`src/app.js`:
```js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.js";

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("tiny"));
app.use("/api", routes);
app.use(errorHandler);
export default app;
```

`src/utils/jwt.js`:
```js
import jwt from "jsonwebtoken";
export const sign = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
export const verify = (token) => jwt.verify(token, process.env.JWT_SECRET);
```

`src/utils/hash.js`:
```js
import bcrypt from "bcrypt";
export const hash = (pwd) => bcrypt.hash(pwd, 10);
export const compare = (pwd, h) => bcrypt.compare(pwd, h);
```

`src/middlewares/auth.js`:
```js
import { verify } from "../utils/jwt.js";
import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) return res.status(401).json({ success: false, error: "Unauthorized" });
    const { id } = verify(header.slice(7));
    const user = await User.findById(id).lean();
    if (!user) return res.status(401).json({ success: false, error: "Unauthorized" });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ success: false, error: "Invalid token" });
  }
};
```

---

## Environment variables

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/loklink
JWT_SECRET=replace-me
CLIENT_ORIGIN=http://localhost:5173
```

Frontend `.env`:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## How frontend ↔ backend stay in sync

- Frontend `src/lib/api/index.ts` lists every endpoint as a method with a JSDoc comment naming the route — copy them straight into your Express routers.
- All response payloads should match the TypeScript types exported from `src/lib/mock/seed.ts`. Use those as the contract.
- Once the backend is up, switch each method in `src/lib/api/index.ts` from `delay(mockX)` to the corresponding `api.get/post(...)` call. No component changes required.

Happy shipping. 🚀
