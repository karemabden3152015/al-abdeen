import { NextResponse } from "next/server";
import { platformSettings, sellerPlans, shippingZones } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    settings: platformSettings,
    sellerPlans,
    shippingZones
  });
}
