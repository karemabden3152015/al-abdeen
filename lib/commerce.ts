import type { Category, Product } from "@/lib/types";

export const GLOBAL_COMMISSION_PERCENT = 10;
export const GLOBAL_AFFILIATE_COMMISSION_PERCENT = 3;
export const DELIVERY_FEE_EGP = 45;

export function formatEGP(value: number) {
  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0
  }).format(value);
}

export function getCommissionPercent(product: Product, categories: Category[]) {
  const category = categories.find((item) => item.slug === product.categorySlug);
  return product.commissionPercent ?? category?.commissionPercent ?? GLOBAL_COMMISSION_PERCENT;
}

export function getAffiliateCommissionPercent(product: Product, categories: Category[]) {
  const category = categories.find((item) => item.slug === product.categorySlug);
  return product.affiliateCommissionPercent ?? category?.affiliateCommissionPercent ?? GLOBAL_AFFILIATE_COMMISSION_PERCENT;
}

export function calculateMarketplaceSplit({
  priceEGP,
  platformCommissionPercent,
  affiliateCommissionPercent = 0,
  quantity = 1,
  discountEGP = 0
}: {
  priceEGP: number;
  platformCommissionPercent: number;
  affiliateCommissionPercent?: number;
  quantity?: number;
  discountEGP?: number;
}) {
  const gross = Math.max(0, priceEGP * quantity - discountEGP);
  const platformCommission = Math.round(gross * (platformCommissionPercent / 100));
  const affiliateCommission = Math.round(gross * (affiliateCommissionPercent / 100));
  const sellerEarning = gross - platformCommission - affiliateCommission;

  return {
    gross,
    platformCommission,
    affiliateCommission,
    sellerEarning
  };
}

export function calculateCommission(priceEGP: number, commissionPercent: number, quantity = 1, affiliateCommissionPercent = 0) {
  const gross = priceEGP * quantity;
  return calculateMarketplaceSplit({
    priceEGP: gross,
    platformCommissionPercent: commissionPercent,
    affiliateCommissionPercent
  });
}

export function createProductUrl(slug: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return `${base}/products/${slug}`;
}
