import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["CUSTOMER", "SELLER", "RECRUITER"]).default("CUSTOMER"),
  storeName: z.string().optional()
});

export async function POST(request: Request) {
  const payload = registerSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Invalid registration data" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(payload.data.password, 10);
  const user = await prisma.user.create({
    data: {
      name: payload.data.name,
      email: payload.data.email,
      passwordHash,
      role: payload.data.role,
      recruiterProfile:
        payload.data.role === "RECRUITER"
          ? {
              create: {
                referralCode: `REC-${payload.data.email.split("@")[0].toUpperCase().replace(/[^A-Z0-9]+/g, "-")}`
              }
            }
          : undefined,
      sellerProfile:
        payload.data.role === "SELLER"
          ? {
              create: {
                storeName: payload.data.storeName ?? payload.data.name,
                storeSlug: payload.data.email.split("@")[0].toLowerCase().replace(/[^a-z0-9]+/g, "-")
              }
            }
          : undefined
    },
    select: { id: true, name: true, email: true, role: true }
  });

  return NextResponse.json({ user }, { status: 201 });
}
