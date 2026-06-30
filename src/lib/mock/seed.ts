import type { Role } from "@/features/rbac/roles";

export type MockUser = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: Role;
  community: string;
  bio?: string;
  block?: string;
  phone?: string;
};

export const currentUser: MockUser = {
  id: "u_1",
  name: "Aarav Sharma",
  email: "aarav@bhel.in",
  role: "member",
  community: "BHEL Haridwar Township",
  bio: "Engineer at BHEL. Cricket on weekends. Always up for chai.",
  block: "Sector 3, Block B-14",
  phone: "+91 98765 43210",
};

export const adminUser: MockUser = {
  ...currentUser,
  id: "u_admin",
  name: "Priya Verma",
  email: "priya.admin@bhel.in",
  role: "community_admin",
};

export type FeedPost = {
  id: string;
  author: { name: string; role: Role; block: string };
  time: string;
  content: string;
  tag?: string;
  likes: number;
  comments: number;
  shares: number;
};

export const feedPosts: FeedPost[] = [
  {
    id: "p1",
    author: { name: "Priya Verma", role: "community_admin", block: "Sector 1" },
    time: "2h",
    tag: "Announcement",
    content:
      "Water supply maintenance scheduled for Sector 3 & 4 tomorrow between 10 AM – 1 PM. Please store water in advance. Apologies for the inconvenience.",
    likes: 84,
    comments: 12,
    shares: 6,
  },
  {
    id: "p2",
    author: { name: "Rohit Joshi", role: "member", block: "Sector 2, B-7" },
    time: "5h",
    content:
      "Morning walk group meeting at Sector 5 park, 6 AM daily. New members welcome — we cover 4 km in about an hour. Bring water!",
    tag: "Health",
    likes: 41,
    comments: 9,
    shares: 2,
  },
  {
    id: "p3",
    author: { name: "Meera Iyer", role: "moderator", block: "Sector 4, A-22" },
    time: "Yesterday",
    content:
      "Reminder: Diwali cultural night rehearsals start this Saturday at the community hall. Open to all ages — kids, please come with a parent.",
    tag: "Events",
    likes: 156,
    comments: 28,
    shares: 14,
  },
  {
    id: "p4",
    author: { name: "Karan Bhatt", role: "member", block: "Sector 6, C-3" },
    time: "2d",
    content:
      "Big thanks to whoever returned my son's school ID card to the security gate. This is why LokLink works. ❤️",
    likes: 212,
    comments: 19,
    shares: 5,
  },
];

export type MarketplaceListing = {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: "New" | "Like New" | "Good" | "Fair";
  seller: string;
  block: string;
  postedAt: string;
  description: string;
};

export const marketplaceListings: MarketplaceListing[] = [
  {
    id: "m1",
    title: "Royal Enfield Classic 350 (2021)",
    price: 142000,
    category: "Vehicles",
    condition: "Like New",
    seller: "Vikram Singh",
    block: "Sector 2, A-9",
    postedAt: "1d ago",
    description: "Single owner, 8,400 km. All papers clean. Serviced last month.",
  },
  {
    id: "m2",
    title: "Study Table + Bookshelf Combo",
    price: 3500,
    category: "Furniture",
    condition: "Good",
    seller: "Anjali Rao",
    block: "Sector 5, B-2",
    postedAt: "3h ago",
    description: "Solid wood. Moving out, so quick sale preferred.",
  },
  {
    id: "m3",
    title: "Samsung 1.5 Ton Inverter AC",
    price: 22500,
    category: "Appliances",
    condition: "Good",
    seller: "Naveen Kumar",
    block: "Sector 1, C-11",
    postedAt: "6h ago",
    description: "Used 2 summers. Cools fast. Includes stabilizer.",
  },
  {
    id: "m4",
    title: "Cycle — Hero Sprint Pro",
    price: 4800,
    category: "Sports",
    condition: "Like New",
    seller: "Ishaan Mehta",
    block: "Sector 3, B-14",
    postedAt: "2d ago",
    description: "21 gears. Bought last Diwali, barely used.",
  },
  {
    id: "m5",
    title: "Class 10 NCERT + Reference Books",
    price: 950,
    category: "Books",
    condition: "Good",
    seller: "Tanya Kapoor",
    block: "Sector 4, D-5",
    postedAt: "5d ago",
    description: "Full set — Maths, Science, SST, English. Minimal markings.",
  },
  {
    id: "m6",
    title: "Sofa Set 3+1+1 (Fabric)",
    price: 11500,
    category: "Furniture",
    condition: "Fair",
    seller: "Rakesh Patel",
    block: "Sector 6, A-1",
    postedAt: "1w ago",
    description: "Comfortable and sturdy. Cushion covers washed recently.",
  },
];

export type LostFoundItem = {
  id: string;
  type: "lost" | "found" | "resolved";
  title: string;
  location: string;
  date: string;
  description: string;
  contact: string;
};

export const lostFoundItems: LostFoundItem[] = [
  {
    id: "lf1",
    type: "lost",
    title: "Black Wallet — leather, contains BHEL ID",
    location: "Near Sector 4 community park",
    date: "Today, 8:30 AM",
    description: "Brown stitching, some cash and a driving licence inside.",
    contact: "Rajeev — Sector 4, B-9",
  },
  {
    id: "lf2",
    type: "found",
    title: "Golden Retriever — friendly, no collar",
    location: "Sector 2 main gate",
    date: "Yesterday evening",
    description: "Very friendly. Currently with security. Please claim soon.",
    contact: "Security Gate 2 — 0133-2456-100",
  },
  {
    id: "lf3",
    type: "lost",
    title: "School water bottle (blue, Milton)",
    location: "Bus stop near Sector 1 market",
    date: "2 days ago",
    description: "Has name 'AARYAN' written in marker on the base.",
    contact: "Sunita — Sector 1, A-3",
  },
  {
    id: "lf4",
    type: "found",
    title: "Set of keys with red Maruti keychain",
    location: "Walking track behind Sector 5",
    date: "3 days ago",
    description: "3 keys on the ring, one looks like a scooter key.",
    contact: "Submitted to township office",
  },
  {
    id: "lf5",
    type: "resolved",
    title: "Spectacles in brown case — returned",
    location: "Sector 6 chai stall",
    date: "Last week",
    description: "Owner found via LokLink within 4 hours. Thanks community!",
    contact: "—",
  },
  {
    id: "lf6",
    type: "lost",
    title: "Apple AirPods (2nd gen)",
    location: "Community hall, during yoga class",
    date: "4 days ago",
    description: "White case with a small sticker of a tree on the lid.",
    contact: "Neha — Sector 3, C-7",
  },
];

export type Update = {
  id: string;
  title: string;
  body: string;
  author: string;
  role: Role;
  category: "Notice" | "Maintenance" | "Safety" | "Event" | "Policy";
  pinned?: boolean;
  postedAt: string;
};

export const updates: Update[] = [
  {
    id: "u1",
    title: "Monthly maintenance bill due by 10th",
    body: "Please clear your dues via the township office or online portal. Late fee of ₹100 applies after the due date.",
    author: "Township Office",
    role: "community_admin",
    category: "Notice",
    pinned: true,
    postedAt: "1d ago",
  },
  {
    id: "u2",
    title: "Power cut: Sector 3 transformer maintenance",
    body: "Scheduled outage on Sunday 7 AM – 11 AM. Backup advisable for medical equipment users.",
    author: "Maintenance Team",
    role: "moderator",
    category: "Maintenance",
    postedAt: "3h ago",
  },
  {
    id: "u3",
    title: "Stray dog vaccination drive — Saturday",
    body: "Free vaccination camp organized in partnership with the municipal vet. Volunteers welcome.",
    author: "Priya Verma",
    role: "community_admin",
    category: "Safety",
    postedAt: "2d ago",
  },
  {
    id: "u4",
    title: "Diwali cultural night — 26 October",
    body: "Cultural night at community hall, 6 PM onwards. Performances, food stalls, and rangoli competition.",
    author: "Cultural Committee",
    role: "moderator",
    category: "Event",
    postedAt: "5d ago",
  },
];

export type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
};

export const events: EventItem[] = [
  { id: "e1", title: "Yoga in the Park", date: "Tomorrow", time: "6:00 AM", location: "Sector 5 Park", category: "Health", attendees: 34 },
  { id: "e2", title: "Diwali Cultural Night", date: "Sat, 26 Oct", time: "6:00 PM", location: "Community Hall", category: "Festival", attendees: 312 },
  { id: "e3", title: "Kids Chess Tournament", date: "Sun, 27 Oct", time: "10:00 AM", location: "Recreation Centre", category: "Sports", attendees: 28 },
  { id: "e4", title: "Senior Citizens Health Camp", date: "Mon, 28 Oct", time: "9:00 AM", location: "Community Clinic", category: "Health", attendees: 56 },
];

export type Club = {
  id: string;
  name: string;
  members: number;
  category: string;
  description: string;
};

export const clubs: Club[] = [
  { id: "c1", name: "Morning Walkers", members: 142, category: "Fitness", description: "Daily 6 AM walks across Sectors 3–5." },
  { id: "c2", name: "Book Lovers Circle", members: 58, category: "Hobby", description: "Monthly book swap and discussion." },
  { id: "c3", name: "Tech & Coding", members: 89, category: "Learning", description: "Weekend meetups for makers and devs." },
  { id: "c4", name: "Yoga & Wellness", members: 124, category: "Fitness", description: "Sunrise yoga sessions and workshops." },
  { id: "c5", name: "Photography Club", members: 47, category: "Hobby", description: "Photo walks every other Saturday." },
  { id: "c6", name: "Gardening Group", members: 76, category: "Hobby", description: "Plant exchanges and composting tips." },
];

export type Conversation = {
  id: string;
  name: string;
  last: string;
  time: string;
  unread?: number;
};

export const conversations: Conversation[] = [
  { id: "cv1", name: "Morning Walkers", last: "Rohit: See you all at 6 sharp!", time: "9:14 PM", unread: 3 },
  { id: "cv2", name: "Priya Verma", last: "Sure, I'll forward the notice.", time: "8:02 PM" },
  { id: "cv3", name: "Block B-14 Neighbours", last: "Anyone has a screwdriver set?", time: "Yesterday", unread: 1 },
  { id: "cv4", name: "Tech & Coding", last: "Meera shared a link.", time: "Mon" },
  { id: "cv5", name: "Security Helpdesk", last: "Visitor pass approved.", time: "Mon" },
];

export type EmergencyContact = {
  id: string;
  name: string;
  number: string;
  category: "Medical" | "Security" | "Fire" | "Township" | "Helpline";
  note?: string;
};

export const emergencyContacts: EmergencyContact[] = [
  { id: "ec1", name: "BHEL Hospital — Emergency", number: "0133-2456-101", category: "Medical", note: "24x7 casualty" },
  { id: "ec2", name: "Ambulance", number: "108", category: "Medical" },
  { id: "ec3", name: "Township Security Control Room", number: "0133-2456-200", category: "Security", note: "24x7" },
  { id: "ec4", name: "Main Gate Security", number: "0133-2456-201", category: "Security" },
  { id: "ec5", name: "Fire Brigade", number: "101", category: "Fire" },
  { id: "ec6", name: "Township Office", number: "0133-2456-300", category: "Township", note: "Mon–Sat, 9 AM – 6 PM" },
  { id: "ec7", name: "Women Helpline", number: "1091", category: "Helpline" },
  { id: "ec8", name: "Child Helpline", number: "1098", category: "Helpline" },
];

export type Place = {
  id: string;
  name: string;
  category: "Hospital" | "School" | "Market" | "Park" | "Bus Stop" | "Temple";
  distance: string;
  hours?: string;
};

export const places: Place[] = [
  { id: "pl1", name: "BHEL Hospital", category: "Hospital", distance: "0.8 km", hours: "24 hours" },
  { id: "pl2", name: "Kendriya Vidyalaya BHEL", category: "School", distance: "1.2 km", hours: "7:30 AM – 2 PM" },
  { id: "pl3", name: "Sector 4 Market", category: "Market", distance: "0.4 km", hours: "8 AM – 10 PM" },
  { id: "pl4", name: "Township Central Park", category: "Park", distance: "0.6 km", hours: "5 AM – 9 PM" },
  { id: "pl5", name: "BHEL Main Gate Bus Stop", category: "Bus Stop", distance: "0.3 km" },
  { id: "pl6", name: "Shiv Mandir", category: "Temple", distance: "0.5 km", hours: "5 AM – 9 PM" },
  { id: "pl7", name: "DAV Public School", category: "School", distance: "1.6 km", hours: "8 AM – 2:30 PM" },
  { id: "pl8", name: "Ranipur Sabzi Mandi", category: "Market", distance: "2.1 km", hours: "6 AM – 1 PM" },
];

export type AdminStat = { label: string; value: string; delta?: string };

export const adminStats: AdminStat[] = [
  { label: "Active members", value: "4,218", delta: "+128 this week" },
  { label: "New posts (24h)", value: "92", delta: "+12%" },
  { label: "Open reports", value: "7", delta: "2 urgent" },
  { label: "Listings live", value: "316", delta: "+24" },
];

export type AdminUser = { id: string; name: string; email: string; role: Role; block: string; joined: string };

export const adminUsers: AdminUser[] = [
  { id: "au1", name: "Aarav Sharma", email: "aarav@bhel.in", role: "member", block: "Sector 3, B-14", joined: "Mar 2024" },
  { id: "au2", name: "Priya Verma", email: "priya.admin@bhel.in", role: "community_admin", block: "Sector 1, A-2", joined: "Jan 2023" },
  { id: "au3", name: "Meera Iyer", email: "meera.i@bhel.in", role: "moderator", block: "Sector 4, A-22", joined: "Aug 2023" },
  { id: "au4", name: "Rohit Joshi", email: "rohit.j@bhel.in", role: "member", block: "Sector 2, B-7", joined: "Feb 2024" },
  { id: "au5", name: "Karan Bhatt", email: "karan.b@bhel.in", role: "member", block: "Sector 6, C-3", joined: "Jun 2024" },
  { id: "au6", name: "Anjali Rao", email: "anjali.r@bhel.in", role: "moderator", block: "Sector 5, B-2", joined: "Nov 2023" },
];
