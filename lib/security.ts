import type { Role } from "@/lib/types";

const rolePermissions: Record<Role, string[]> = {
  CUSTOMER: ["products:read", "orders:create", "affiliate:apply"],
  SELLER: ["products:read", "products:write", "orders:manage_seller", "reports:read"],
  RECRUITER: ["seller_leads:create", "recruiter:read", "reports:read"],
  ADMIN: ["*"]
};

export function can(role: Role, permission: string) {
  const permissions = rolePermissions[role] ?? [];
  return permissions.includes("*") || permissions.includes(permission);
}

export function assertPermission(role: Role, permission: string) {
  if (!can(role, permission)) {
    throw new Error(`Role ${role} cannot perform ${permission}`);
  }
}
