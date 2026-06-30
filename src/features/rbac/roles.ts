export const ROLES = {
  SUPER_ADMIN: "super_admin",
  COMMUNITY_ADMIN: "community_admin",
  MODERATOR: "moderator",
  MEMBER: "member",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABEL: Record<Role, string> = {
  super_admin: "Super Admin",
  community_admin: "Community Admin",
  moderator: "Moderator",
  member: "Member",
};

/** Higher number = more privilege. */
export const ROLE_RANK: Record<Role, number> = {
  member: 1,
  moderator: 2,
  community_admin: 3,
  super_admin: 4,
};

export const ADMIN_ROLES: Role[] = ["super_admin", "community_admin"];
export const STAFF_ROLES: Role[] = ["super_admin", "community_admin", "moderator"];

export function hasRole(userRole: Role | undefined | null, roles: Role[]): boolean {
  if (!userRole) return false;
  return roles.includes(userRole);
}

export function hasMinRank(userRole: Role | undefined | null, min: Role): boolean {
  if (!userRole) return false;
  return ROLE_RANK[userRole] >= ROLE_RANK[min];
}
