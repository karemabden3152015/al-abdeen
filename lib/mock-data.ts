import type { Affiliate, Category, Coupon, Order, Product, Recruiter, SellerPlan, ShippingZone, Wallet } from "@/lib/types";

export const platformSettings = {
  whatsappSupportNumber: "+201124460043",
  whatsappTemplates: {
    orderConfirmationEn: "Hello {{customer}}, your AL-Abdeen order {{orderNumber}} is pending confirmation. Total: {{total}}.",
    orderConfirmationAr: "مرحباً {{customer}}، طلبك من العابدين رقم {{orderNumber}} بانتظار التأكيد. الإجمالي: {{total}}.",
    sellerNewOrderEn: "New AL-Abdeen order {{orderNumber}} for your store. Please prepare it for confirmation.",
    sellerNewOrderAr: "طلب جديد من العابدين رقم {{orderNumber}} لمتجرك. برجاء تجهيزه للتأكيد."
  },
  analytics: {
    googleAnalyticsId: "",
    metaPixelId: "",
    tiktokPixelId: ""
  },
  recruiterFixedCommissionEGP: 150,
  recruiterPlatformCommissionSharePercent: 5
};

export const sellerPlans: SellerPlan[] = [
  {
    code: "FREE",
    nameEn: "Free Plan",
    nameAr: "الخطة المجانية",
    maxProducts: 25,
    searchBoost: "Standard visibility",
    featuresEn: ["Free product uploads", "COD orders", "Basic dashboard"],
    featuresAr: ["رفع منتجات مجاناً", "طلبات دفع عند الاستلام", "لوحة تحكم أساسية"]
  },
  {
    code: "SILVER",
    nameEn: "Silver Plan",
    nameAr: "الخطة الفضية",
    maxProducts: 150,
    searchBoost: "Better search visibility",
    featuresEn: ["More products", "Featured category slots", "Extra sales statistics"],
    featuresAr: ["عدد منتجات أكبر", "ظهور داخل الأقسام", "إحصائيات مبيعات إضافية"]
  },
  {
    code: "GOLD",
    nameEn: "Gold Plan",
    nameAr: "الخطة الذهبية",
    maxProducts: 500,
    searchBoost: "Highest search visibility",
    featuresEn: ["Priority placement", "Advanced analytics", "Marketing support"],
    featuresAr: ["أولوية في الظهور", "تحليلات متقدمة", "دعم تسويقي"]
  }
];

export const categories: Category[] = [
  {
    id: "cat_electronics",
    slug: "electronics",
    nameEn: "Electronics",
    nameAr: "إلكترونيات",
    commissionPercent: 8,
    affiliateCommissionPercent: 3,
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "cat_fashion",
    slug: "fashion",
    nameEn: "Fashion",
    nameAr: "أزياء",
    commissionPercent: 12,
    affiliateCommissionPercent: 4,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "cat_home",
    slug: "home-kitchen",
    nameEn: "Home & Kitchen",
    nameAr: "منزل ومطبخ",
    commissionPercent: 10,
    affiliateCommissionPercent: 3,
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "cat_beauty",
    slug: "beauty",
    nameEn: "Beauty",
    nameAr: "جمال وصحة",
    commissionPercent: 15,
    affiliateCommissionPercent: 5,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "cat_tools",
    slug: "tools",
    nameEn: "Tools",
    nameAr: "أدوات وعدد",
    commissionPercent: 9,
    affiliateCommissionPercent: 3,
    image: "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "cat_auto",
    slug: "auto",
    nameEn: "Auto Accessories",
    nameAr: "سيارات وإكسسوارات",
    commissionPercent: 11,
    affiliateCommissionPercent: 3,
    image: "https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?auto=format&fit=crop&w=700&q=80"
  }
];

export const products: Product[] = [
  {
    id: "prod_speaker",
    slug: "smart-home-speaker",
    nameEn: "Smart Home Speaker",
    nameAr: "سماعة منزلية ذكية",
    descriptionEn: "Voice-ready speaker with rich sound, room tuning, and Arabic/English assistant support.",
    descriptionAr: "سماعة ذكية بصوت واضح وضبط تلقائي للغرفة ودعم للمساعد باللغتين العربية والإنجليزية.",
    metaTitle: "Smart Home Speaker | AL-Abdeen Marketplace",
    metaDescription: "Buy a voice-ready smart speaker from AL-Abdeen with COD and affiliate-ready sharing.",
    priceEGP: 1850,
    categorySlug: "electronics",
    categoryNameEn: "Electronics",
    categoryNameAr: "إلكترونيات",
    brandName: "Delta Devices",
    sellerName: "Nile Home Goods",
    sellerSlug: "nile-home-goods",
    stock: 25,
    lowStockThreshold: 6,
    rating: 4.7,
    ratingCount: 128,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80"
    ],
    variants: [{ name: "Black", sku: "SPEAKER-BLK", stock: 12 }, { name: "Gold", sku: "SPEAKER-GLD", stock: 13 }],
    status: "PUBLISHED",
    featured: true,
    bestSeller: true
  },
  {
    id: "prod_shirt",
    slug: "cotton-weekend-shirt",
    nameEn: "Cotton Weekend Shirt",
    nameAr: "قميص قطني يومي",
    descriptionEn: "Breathable cotton shirt tailored for daily comfort and easy pairing.",
    descriptionAr: "قميص قطني مريح بتصميم مناسب للاستخدام اليومي وسهل التنسيق.",
    metaTitle: "Cotton Weekend Shirt | AL-Abdeen Marketplace",
    metaDescription: "Shop a breathable cotton shirt with transparent seller and affiliate commissions.",
    priceEGP: 690,
    categorySlug: "fashion",
    categoryNameEn: "Fashion",
    categoryNameAr: "أزياء",
    brandName: "Cairo Threads",
    sellerName: "Cairo Threads",
    sellerSlug: "cairo-threads",
    stock: 60,
    lowStockThreshold: 10,
    rating: 4.5,
    ratingCount: 72,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
    images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80"],
    variants: [{ name: "M", sku: "SHIRT-M", stock: 20 }, { name: "L", sku: "SHIRT-L", stock: 20 }, { name: "XL", sku: "SHIRT-XL", stock: 20 }],
    commissionPercent: 9,
    affiliateCommissionPercent: 4,
    status: "PUBLISHED",
    featured: true,
    newArrival: true
  },
  {
    id: "prod_ceramic",
    slug: "ceramic-dinner-set",
    nameEn: "Ceramic Dinner Set",
    nameAr: "طقم عشاء سيراميك",
    descriptionEn: "Twelve-piece ceramic set with durable glazing for family tables.",
    descriptionAr: "طقم سيراميك من 12 قطعة بطبقة لامعة متينة لطاولات العائلة.",
    metaTitle: "Ceramic Dinner Set | AL-Abdeen Marketplace",
    metaDescription: "Premium ceramic dinner set with COD delivery and verified buyer reviews.",
    priceEGP: 1250,
    categorySlug: "home-kitchen",
    categoryNameEn: "Home & Kitchen",
    categoryNameAr: "منزل ومطبخ",
    brandName: "NileCraft",
    sellerName: "Nile Home Goods",
    sellerSlug: "nile-home-goods",
    stock: 18,
    lowStockThreshold: 5,
    rating: 4.8,
    ratingCount: 94,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80",
    images: ["https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80"],
    variants: [{ name: "12 piece", sku: "CERAMIC-12", stock: 18 }],
    status: "PUBLISHED",
    featured: true,
    bestSeller: true
  },
  {
    id: "prod_beauty",
    slug: "daily-care-bundle",
    nameEn: "Daily Care Bundle",
    nameAr: "مجموعة عناية يومية",
    descriptionEn: "A compact personal care bundle for travel and everyday use.",
    descriptionAr: "مجموعة عناية شخصية مناسبة للسفر والاستخدام اليومي.",
    metaTitle: "Daily Care Bundle | AL-Abdeen Marketplace",
    metaDescription: "Beauty and personal care bundle with affiliate tracking and COD checkout.",
    priceEGP: 540,
    categorySlug: "beauty",
    categoryNameEn: "Beauty",
    categoryNameAr: "جمال وصحة",
    brandName: "AL-Abdeen Select",
    sellerName: "Lotus Beauty",
    sellerSlug: "lotus-beauty",
    stock: 40,
    lowStockThreshold: 8,
    rating: 4.4,
    ratingCount: 57,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
    images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80"],
    variants: [{ name: "Bundle", sku: "CARE-BUNDLE", stock: 40 }],
    commissionPercent: 14,
    affiliateCommissionPercent: 5,
    status: "PUBLISHED",
    newArrival: true
  },
  {
    id: "prod_watch",
    slug: "midnight-fitness-watch",
    nameEn: "Midnight Fitness Watch",
    nameAr: "ساعة رياضية ليلية",
    descriptionEn: "Fitness watch with long battery life, heart tracking, and water resistance.",
    descriptionAr: "ساعة رياضية بعمر بطارية طويل وتتبع للقلب ومقاومة للماء.",
    metaTitle: "Midnight Fitness Watch | AL-Abdeen Marketplace",
    metaDescription: "Fitness watch pending admin approval in the seller product workflow.",
    priceEGP: 2100,
    categorySlug: "electronics",
    categoryNameEn: "Electronics",
    categoryNameAr: "إلكترونيات",
    brandName: "Delta Devices",
    sellerName: "Delta Devices",
    sellerSlug: "delta-devices",
    stock: 12,
    lowStockThreshold: 4,
    rating: 4.6,
    ratingCount: 81,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"],
    variants: [{ name: "Black", sku: "WATCH-BLK", stock: 12 }],
    status: "PENDING_REVIEW"
  },
  {
    id: "prod_lamp",
    slug: "brass-reading-lamp",
    nameEn: "Brass Reading Lamp",
    nameAr: "مصباح قراءة نحاسي",
    descriptionEn: "Adjustable lamp with warm light for desks, bedrooms, and living spaces.",
    descriptionAr: "مصباح قابل للتعديل بإضاءة دافئة للمكاتب وغرف النوم والمعيشة.",
    metaTitle: "Brass Reading Lamp | AL-Abdeen Marketplace",
    metaDescription: "Warm brass reading lamp from a verified seller on AL-Abdeen.",
    priceEGP: 880,
    categorySlug: "home-kitchen",
    categoryNameEn: "Home & Kitchen",
    categoryNameAr: "منزل ومطبخ",
    brandName: "NileCraft",
    sellerName: "Nile Home Goods",
    sellerSlug: "nile-home-goods",
    stock: 3,
    lowStockThreshold: 5,
    rating: 4.3,
    ratingCount: 39,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80"],
    variants: [{ name: "Brass", sku: "LAMP-BRASS", stock: 3 }],
    status: "PUBLISHED"
  }
];

export const orders: Order[] = [
  {
    id: "ord_1001",
    orderNumber: "ALB-1001",
    customerName: "Mariam Hassan",
    status: "PROCESSING",
    paymentStatus: "PENDING",
    paymentProvider: "CASH_ON_DELIVERY",
    totalEGP: 1935,
    platformCommissionEGP: 148,
    affiliateCommissionEGP: 74,
    sellerEarningEGP: 1628,
    city: "Cairo",
    createdAt: "2026-06-18"
  },
  {
    id: "ord_1002",
    orderNumber: "ALB-1002",
    customerName: "Omar Ali",
    status: "SHIPPED",
    paymentStatus: "PENDING",
    paymentProvider: "CASH_ON_DELIVERY",
    totalEGP: 1295,
    platformCommissionEGP: 125,
    affiliateCommissionEGP: 0,
    sellerEarningEGP: 1125,
    city: "Giza",
    createdAt: "2026-06-17"
  },
  {
    id: "ord_1003",
    orderNumber: "ALB-1003",
    customerName: "Nour Adel",
    status: "DELIVERED",
    paymentStatus: "PAID",
    paymentProvider: "MANUAL_CONFIRMATION",
    totalEGP: 735,
    platformCommissionEGP: 62,
    affiliateCommissionEGP: 21,
    sellerEarningEGP: 607,
    city: "Alexandria",
    createdAt: "2026-06-15"
  },
  {
    id: "ord_1004",
    orderNumber: "ALB-1004",
    customerName: "Laila Fathy",
    status: "RETURNED",
    paymentStatus: "REFUNDED",
    paymentProvider: "MANUAL_CONFIRMATION",
    totalEGP: 540,
    platformCommissionEGP: 76,
    affiliateCommissionEGP: 27,
    sellerEarningEGP: 437,
    city: "Cairo",
    createdAt: "2026-06-13"
  }
];

export const affiliates: Affiliate[] = [
  { name: "Affiliate Partner", code: "ABD-PARTNER", status: "APPROVED", clicks: 128, sales: 9, conversionRate: 7.03, earningsEGP: 410 },
  { name: "Cairo Deals", code: "CAIRO-DEALS", status: "PENDING", clicks: 42, sales: 0, conversionRate: 0, earningsEGP: 0 },
  { name: "Nile Reviews", code: "NILE-REVIEWS", status: "APPROVED", clicks: 311, sales: 18, conversionRate: 5.79, earningsEGP: 920 }
];

export const wallets: Wallet[] = [
  {
    owner: "Platform",
    balanceEGP: 411,
    transactions: [
      { type: "PLATFORM_COMMISSION", amountEGP: 148, reference: "ALB-1001", createdAt: "2026-06-18" },
      { type: "PLATFORM_COMMISSION", amountEGP: 125, reference: "ALB-1002", createdAt: "2026-06-17" },
      { type: "PLATFORM_COMMISSION", amountEGP: 62, reference: "ALB-1003", createdAt: "2026-06-15" }
    ]
  },
  {
    owner: "Seller",
    balanceEGP: 3360,
    transactions: [
      { type: "SALE_CREDIT", amountEGP: 1628, reference: "ALB-1001", createdAt: "2026-06-18" },
      { type: "SALE_CREDIT", amountEGP: 1125, reference: "ALB-1002", createdAt: "2026-06-17" },
      { type: "PAYOUT", amountEGP: -800, reference: "PAYOUT-42", createdAt: "2026-06-14" }
    ]
  },
  {
    owner: "Affiliate",
    balanceEGP: 410,
    transactions: [
      { type: "AFFILIATE_COMMISSION", amountEGP: 74, reference: "ALB-1001", createdAt: "2026-06-18" },
      { type: "AFFILIATE_COMMISSION", amountEGP: 21, reference: "ALB-1003", createdAt: "2026-06-15" }
    ]
  },
  {
    owner: "Recruiter",
    balanceEGP: 760,
    transactions: [
      { type: "RECRUITER_COMMISSION", amountEGP: 150, reference: "SELLER-nile-home-goods", createdAt: "2026-06-16" },
      { type: "RECRUITER_COMMISSION", amountEGP: 210, reference: "ALB-1001", createdAt: "2026-06-18" }
    ]
  }
];

export const recruiters: Recruiter[] = [
  {
    name: "Growth Partner",
    code: "REC-GROWTH",
    status: "APPROVED",
    invitedSellers: 12,
    activeSellers: 7,
    uploadedProducts: 184,
    salesEGP: 48250,
    commissionEGP: 760
  },
  {
    name: "Delta Recruiter",
    code: "REC-DELTA",
    status: "PENDING",
    invitedSellers: 3,
    activeSellers: 1,
    uploadedProducts: 22,
    salesEGP: 6400,
    commissionEGP: 150
  }
];

export const coupons: Coupon[] = [
  { code: "GOLD10", type: "PERCENTAGE", value: 10, usageLimit: 500, usageCount: 48, expiresAt: "2026-12-31", active: true },
  { code: "CAIRO50", type: "FIXED_AMOUNT", value: 50, usageLimit: 200, usageCount: 26, expiresAt: "2026-09-30", active: true }
];

export const shippingZones: ShippingZone[] = [
  { city: "Cairo", feeEGP: 45, estimate: "1-2 days", codEnabled: true },
  { city: "Giza", feeEGP: 55, estimate: "2-3 days", codEnabled: true },
  { city: "Alexandria", feeEGP: 70, estimate: "3-4 days", codEnabled: true },
  { city: "Upper Egypt", feeEGP: 95, estimate: "4-6 days", codEnabled: false }
];

export const notifications = [
  { type: "ORDER_CREATED", title: "New COD order", body: "ALB-1001 is waiting for manual confirmation." },
  { type: "SELLER_APPROVAL", title: "Seller approved", body: "Nile Home Goods can publish approved products." },
  { type: "AFFILIATE_SALE", title: "Affiliate sale tracked", body: "ABD-PARTNER earned EGP 74." },
  { type: "COUPON_UPDATE", title: "Coupon usage rising", body: "GOLD10 reached 48 uses." }
];

export const reviews = [
  { productSlug: "smart-home-speaker", customer: "Demo Customer", rating: 5, status: "APPROVED", verifiedBuyer: true, body: "Fast confirmation and the product matched the listing." },
  { productSlug: "ceramic-dinner-set", customer: "Nour Adel", rating: 4, status: "PENDING", verifiedBuyer: true, body: "Good quality, waiting for moderation." }
];
