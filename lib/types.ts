export type Locale = "en" | "ar";

export type Role = "CUSTOMER" | "SELLER" | "RECRUITER" | "ADMIN";

export type ProductStatus = "DRAFT" | "PENDING_REVIEW" | "PUBLISHED" | "REJECTED" | "ARCHIVED";
export type OrderStatus = "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "RETURNED" | "REFUNDED";
export type PaymentStatus = "PENDING" | "AUTHORIZED" | "PAID" | "FAILED" | "CANCELLED" | "REFUNDED";

export type Category = {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  commissionPercent?: number;
  affiliateCommissionPercent?: number;
  image?: string;
};

export type Product = {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  metaTitle: string;
  metaDescription: string;
  priceEGP: number;
  categorySlug: string;
  categoryNameEn: string;
  categoryNameAr: string;
  brandName: string;
  sellerName: string;
  sellerSlug: string;
  stock: number;
  lowStockThreshold: number;
  rating: number;
  ratingCount: number;
  image: string;
  images: string[];
  variants: Array<{ name: string; sku: string; stock: number; priceEGP?: number }>;
  commissionPercent?: number;
  affiliateCommissionPercent?: number;
  status: ProductStatus;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
};

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentProvider: "CASH_ON_DELIVERY" | "MANUAL_CONFIRMATION" | "PAYMOB" | "FAWRY" | "STRIPE" | "VISA" | "MASTERCARD";
  totalEGP: number;
  platformCommissionEGP: number;
  affiliateCommissionEGP: number;
  sellerEarningEGP: number;
  createdAt: string;
  city: string;
};

export type Wallet = {
  owner: "Platform" | "Seller" | "Affiliate" | "Recruiter";
  balanceEGP: number;
  transactions: Array<{
    type: string;
    amountEGP: number;
    reference: string;
    createdAt: string;
  }>;
};

export type Affiliate = {
  name: string;
  code: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
  clicks: number;
  sales: number;
  conversionRate: number;
  earningsEGP: number;
};

export type Coupon = {
  code: string;
  type: "PERCENTAGE" | "FIXED_AMOUNT";
  value: number;
  usageLimit: number;
  usageCount: number;
  expiresAt: string;
  active: boolean;
};

export type ShippingZone = {
  city: string;
  feeEGP: number;
  estimate: string;
  codEnabled: boolean;
};

export type Recruiter = {
  name: string;
  code: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
  invitedSellers: number;
  activeSellers: number;
  uploadedProducts: number;
  salesEGP: number;
  commissionEGP: number;
};

export type SellerPlan = {
  code: "FREE" | "SILVER" | "GOLD";
  nameEn: string;
  nameAr: string;
  maxProducts: number;
  featuresEn: string[];
  featuresAr: string[];
  searchBoost: string;
};
