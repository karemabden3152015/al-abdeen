import { NextResponse } from "next/server";
import { z } from "zod";
import { calculateCommission, getAffiliateCommissionPercent, getCommissionPercent } from "@/lib/commerce";
import { categories, coupons, products, shippingZones } from "@/lib/mock-data";

const orderSchema = z.object({
  customerName: z.string().min(2),
  phone: z.string().min(6),
  address: z.string().min(5),
  city: z.string().min(2),
  paymentProvider: z.enum(["CASH_ON_DELIVERY", "MANUAL_CONFIRMATION"]).default("CASH_ON_DELIVERY"),
  affiliateCode: z.string().optional(),
  couponCode: z.string().optional(),
  items: z.array(z.object({ productId: z.string(), quantity: z.number().int().positive() })).min(1)
});

export async function POST(request: Request) {
  const payload = orderSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
  }

  const zone = shippingZones.find((candidate) => candidate.city.toLowerCase() === payload.data.city.toLowerCase());
  if (payload.data.paymentProvider === "CASH_ON_DELIVERY" && zone && !zone.codEnabled) {
    return NextResponse.json({ error: "Cash on Delivery is not available for this city" }, { status: 400 });
  }

  const coupon = coupons.find((candidate) => candidate.code === payload.data.couponCode && candidate.active);
  const rawItems = payload.data.items.map((item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    if (!product) throw new Error(`Unknown product: ${item.productId}`);
    if (product.stock < item.quantity) throw new Error(`${product.nameEn} is not available in the requested quantity`);

    const platformPercent = getCommissionPercent(product, categories);
    const affiliatePercent = payload.data.affiliateCode ? getAffiliateCommissionPercent(product, categories) : 0;
    const split = calculateCommission(product.priceEGP, platformPercent, item.quantity, affiliatePercent);

    return {
      productId: product.id,
      quantity: item.quantity,
      unitPriceEGP: product.priceEGP,
      platformCommissionPercent: platformPercent,
      affiliateCommissionPercent: affiliatePercent,
      platformCommissionEGP: split.platformCommission,
      affiliateCommissionEGP: split.affiliateCommission,
      sellerEarningEGP: split.sellerEarning
    };
  });

  const subtotalEGP = rawItems.reduce((sum, item) => sum + item.unitPriceEGP * item.quantity, 0);
  const discountEGP = coupon ? (coupon.type === "PERCENTAGE" ? Math.round(subtotalEGP * (coupon.value / 100)) : coupon.value) : 0;
  const platformCommissionEGP = rawItems.reduce((sum, item) => sum + item.platformCommissionEGP, 0);
  const affiliateCommissionEGP = rawItems.reduce((sum, item) => sum + item.affiliateCommissionEGP, 0);
  const sellerEarningEGP = rawItems.reduce((sum, item) => sum + item.sellerEarningEGP, 0);
  const deliveryFeeEGP = zone?.feeEGP ?? 45;

  return NextResponse.json({
    order: {
      orderNumber: `ALB-${Date.now().toString().slice(-6)}`,
      status: "PENDING",
      paymentStatus: "PENDING",
      paymentProvider: payload.data.paymentProvider,
      subtotalEGP,
      discountEGP,
      platformCommissionEGP,
      affiliateCommissionEGP,
      sellerEarningEGP,
      deliveryFeeEGP,
      totalEGP: Math.max(0, subtotalEGP - discountEGP + deliveryFeeEGP),
      items: rawItems
    }
  });
}
