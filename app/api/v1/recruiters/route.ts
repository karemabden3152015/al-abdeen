import { NextResponse } from "next/server";
import { recruiters } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ recruiters });
}
