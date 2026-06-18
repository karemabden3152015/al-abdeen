import { cookies } from "next/headers";
import type { Role } from "@/lib/types";

export type DemoSession = {
  id: string;
  name: string;
  email: string;
  role: Role;
  label?: string;
};

const demoSessions: Record<Role, DemoSession> = {
  CUSTOMER: { id: "demo_customer", name: "Demo Customer", email: "customer@al-abdeen.test", role: "CUSTOMER", label: "Customer" },
  SELLER: { id: "demo_seller", name: "Nile Seller", email: "seller@al-abdeen.test", role: "SELLER", label: "Seller" },
  RECRUITER: { id: "demo_recruiter", name: "Growth Partner", email: "recruiter@al-abdeen.test", role: "RECRUITER", label: "Recruiter" },
  ADMIN: { id: "demo_admin", name: "AL-Abdeen Admin", email: "admin@al-abdeen.test", role: "ADMIN", label: "Admin" }
};

export async function getCurrentUser(): Promise<DemoSession> {
  const cookieStore = await cookies();
  const role = cookieStore.get("alabdeen_role")?.value as Role | undefined;
  return demoSessions[role ?? "CUSTOMER"] ?? demoSessions.CUSTOMER;
}

export const demoAccounts = [
  ...Object.values(demoSessions),
  { id: "demo_affiliate", name: "Affiliate Partner", email: "affiliate@al-abdeen.test", role: "CUSTOMER" as const, label: "Affiliate" }
];
