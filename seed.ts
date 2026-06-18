import {
  AffiliateStatus,
  OrderStatus,
  PaymentProvider,
  PaymentStatus,
  PrismaClient,
  ProductStatus,
  RecruiterStatus,
  SellerStatus,
  UserRole,
  WalletOwnerType,
  WalletTransactionType
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Password123!", 10);

  await prisma.walletTransaction.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.recruiterCommission.deleteMany();
  await prisma.affiliateSale.deleteMany();
  await prisma.affiliateReferral.deleteMany();
  await prisma.paymentTransaction.deleteMany();
  await prisma.refund.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.inventoryLedger.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.shippingZone.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.affiliateProfile.deleteMany();
  await prisma.sellerProfile.deleteMany();
  await prisma.recruiterProfile.deleteMany();
  await prisma.sellerPlan.deleteMany();
  await prisma.user.deleteMany();
  await prisma.banner.deleteMany();

  await prisma.platformSetting.upsert({
    where: { id: "platform" },
    update: {
      globalCommissionPercent: 10,
      globalAffiliateCommissionPercent: 3,
      recruiterFixedCommissionEGP: 150,
      recruiterPlatformCommissionSharePercent: 5,
      whatsappSupportNumber: "+201124460043",
      googleAnalyticsId: "",
      metaPixelId: "",
      tiktokPixelId: ""
    },
    create: {
      id: "platform",
      globalCommissionPercent: 10,
      globalAffiliateCommissionPercent: 3,
      recruiterFixedCommissionEGP: 150,
      recruiterPlatformCommissionSharePercent: 5,
      whatsappSupportNumber: "+201124460043"
    }
  });

  const sellerPlans = await Promise.all([
    prisma.sellerPlan.create({
      data: { code: "FREE", nameEn: "Free Plan", nameAr: "الخطة المجانية", maxProducts: 25, searchBoost: 0, advancedAnalytics: false, supportLevel: "Basic" }
    }),
    prisma.sellerPlan.create({
      data: { code: "SILVER", nameEn: "Silver Plan", nameAr: "الخطة الفضية", maxProducts: 150, searchBoost: 2, advancedAnalytics: true, supportLevel: "Priority" }
    }),
    prisma.sellerPlan.create({
      data: { code: "GOLD", nameEn: "Gold Plan", nameAr: "الخطة الذهبية", maxProducts: 500, searchBoost: 5, advancedAnalytics: true, supportLevel: "Premium" }
    })
  ]);

  const [admin, sellerUser, customer, affiliateUser, recruiterUser] = await Promise.all([
    prisma.user.create({
      data: {
        name: "AL-Abdeen Admin",
        email: "admin@al-abdeen.test",
        passwordHash,
        role: UserRole.ADMIN
      }
    }),
    prisma.user.create({
      data: {
        name: "Nile Seller",
        email: "seller@al-abdeen.test",
        passwordHash,
        role: UserRole.SELLER
      }
    }),
    prisma.user.create({
      data: {
        name: "Demo Customer",
        email: "customer@al-abdeen.test",
        passwordHash,
        role: UserRole.CUSTOMER
      }
    }),
    prisma.user.create({
      data: {
        name: "Affiliate Partner",
        email: "affiliate@al-abdeen.test",
        passwordHash,
        role: UserRole.CUSTOMER
      }
    }),
    prisma.user.create({
      data: {
        name: "Growth Partner",
        email: "recruiter@al-abdeen.test",
        passwordHash,
        role: UserRole.RECRUITER
      }
    })
  ]);

  const recruiter = await prisma.recruiterProfile.create({
    data: {
      userId: recruiterUser.id,
      referralCode: "REC-GROWTH",
      status: RecruiterStatus.APPROVED,
      fixedCommissionEGP: 150,
      platformCommissionSharePercent: 5,
      approvedAt: new Date(),
      balanceEGP: 760
    }
  });

  const seller = await prisma.sellerProfile.create({
    data: {
      userId: sellerUser.id,
      storeName: "Nile Home Goods",
      storeSlug: "nile-home-goods",
      phone: "+20 100 000 0000",
      status: SellerStatus.APPROVED,
      approvedAt: new Date(),
      balanceEGP: 3720,
      planId: sellerPlans[1].id,
      recruiterId: recruiter.id
    }
  });

  const affiliate = await prisma.affiliateProfile.create({
    data: {
      userId: affiliateUser.id,
      referralCode: "ABD-PARTNER",
      status: AffiliateStatus.APPROVED,
      approvedAt: new Date(),
      commissionPercent: 4,
      balanceEGP: 410
    }
  });

  const categories = await Promise.all(
    [
      ["electronics", "Electronics", "إلكترونيات", 8, 3],
      ["fashion", "Fashion", "أزياء", 12, 4],
      ["home-kitchen", "Home & Kitchen", "منزل ومطبخ", 10, 3],
      ["beauty", "Beauty", "جمال وصحة", 15, 5],
      ["tools", "Tools", "أدوات وعدد", 9, 3],
      ["auto", "Auto Accessories", "سيارات وإكسسوارات", 11, 3]
    ].map(([slug, nameEn, nameAr, commissionPercent, affiliateCommissionPercent]) =>
      prisma.category.create({
        data: {
          slug: String(slug),
          nameEn: String(nameEn),
          nameAr: String(nameAr),
          commissionPercent: Number(commissionPercent),
          affiliateCommissionPercent: Number(affiliateCommissionPercent)
        }
      })
    )
  );

  const brands = await Promise.all(
    ["AL-Abdeen Select", "NileCraft", "Cairo Threads", "Delta Devices"].map((name) =>
      prisma.brand.create({
        data: {
          name,
          slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
        }
      })
    )
  );

  const products = await Promise.all(
    [
      {
        slug: "smart-home-speaker",
        nameEn: "Smart Home Speaker",
        nameAr: "سماعة منزلية ذكية",
        categorySlug: "electronics",
        brand: "Delta Devices",
        priceEGP: 1850,
        rating: 4.7,
        stock: 25,
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80",
        descriptionEn: "Voice-ready speaker with rich sound and Arabic/English assistant support.",
        descriptionAr: "سماعة ذكية بصوت واضح ودعم للمساعد باللغتين العربية والإنجليزية.",
        bestSeller: true,
        featured: true
      },
      {
        slug: "cotton-weekend-shirt",
        nameEn: "Cotton Weekend Shirt",
        nameAr: "قميص قطني يومي",
        categorySlug: "fashion",
        brand: "Cairo Threads",
        priceEGP: 690,
        rating: 4.5,
        stock: 60,
        commissionPercent: 9,
        affiliateCommissionPercent: 4,
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
        descriptionEn: "Breathable cotton shirt tailored for daily comfort.",
        descriptionAr: "قميص قطني مريح بتصميم مناسب للاستخدام اليومي.",
        newArrival: true,
        featured: true
      },
      {
        slug: "ceramic-dinner-set",
        nameEn: "Ceramic Dinner Set",
        nameAr: "طقم عشاء سيراميك",
        categorySlug: "home-kitchen",
        brand: "NileCraft",
        priceEGP: 1250,
        rating: 4.8,
        stock: 18,
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80",
        descriptionEn: "Twelve-piece ceramic set with a durable glazed finish.",
        descriptionAr: "طقم سيراميك من 12 قطعة بطبقة لامعة متينة.",
        bestSeller: true,
        featured: true
      },
      {
        slug: "daily-care-bundle",
        nameEn: "Daily Care Bundle",
        nameAr: "مجموعة عناية يومية",
        categorySlug: "beauty",
        brand: "AL-Abdeen Select",
        priceEGP: 540,
        rating: 4.4,
        stock: 40,
        commissionPercent: 14,
        affiliateCommissionPercent: 5,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
        descriptionEn: "A compact personal care bundle for travel and everyday use.",
        descriptionAr: "مجموعة عناية شخصية مناسبة للسفر والاستخدام اليومي.",
        newArrival: true
      }
    ].map((seed) => {
      const category = categories.find((item) => item.slug === seed.categorySlug);
      const brand = brands.find((item) => item.name === seed.brand);
      if (!category || !brand) throw new Error(`Missing category or brand for ${seed.slug}`);

      return prisma.product.create({
        data: {
          sellerId: seller.id,
          categoryId: category.id,
          brandId: brand.id,
          nameEn: seed.nameEn,
          nameAr: seed.nameAr,
          slug: seed.slug,
          metaTitle: `${seed.nameEn} | AL-Abdeen Marketplace`,
          metaDescription: seed.descriptionEn,
          descriptionEn: seed.descriptionEn,
          descriptionAr: seed.descriptionAr,
          priceEGP: seed.priceEGP,
          stock: seed.stock,
          lowStockThreshold: 6,
          rating: seed.rating,
          ratingCount: 48,
          commissionPercent: seed.commissionPercent,
          affiliateCommissionPercent: seed.affiliateCommissionPercent,
          status: ProductStatus.PUBLISHED,
          featured: seed.featured ?? false,
          bestSeller: seed.bestSeller ?? false,
          newArrival: seed.newArrival ?? false,
          images: {
            create: {
              url: seed.image,
              alt: seed.nameEn
            }
          },
          variants: {
            create: [
              { name: "Default", sku: `${seed.slug.toUpperCase()}-STD`, stock: seed.stock }
            ]
          },
          inventoryMovements: {
            create: {
              change: seed.stock,
              reason: "Initial seed stock"
            }
          }
        }
      });
    })
  );

  const subtotalEGP = 1850;
  const platformCommissionEGP = 148;
  const affiliateCommissionEGP = 74;
  const sellerEarningEGP = subtotalEGP - platformCommissionEGP - affiliateCommissionEGP;

  const order = await prisma.order.create({
    data: {
      customerId: customer.id,
      orderNumber: "ALB-1001",
      status: OrderStatus.PROCESSING,
      paymentProvider: PaymentProvider.CASH_ON_DELIVERY,
      paymentStatus: PaymentStatus.PENDING,
      affiliateCode: affiliate.referralCode,
      subtotalEGP,
      platformCommissionEGP,
      affiliateCommissionEGP,
      sellerEarningEGP,
      deliveryFeeEGP: 45,
      totalEGP: subtotalEGP + 45,
      customerName: "Demo Customer",
      phone: "+20 111 222 3333",
      address: "Nasr City, Cairo",
      city: "Cairo",
      items: {
        create: {
          productId: products[0].id,
          sellerId: seller.id,
          quantity: 1,
          unitPriceEGP: 1850,
          platformCommissionPercent: 8,
          affiliateCommissionPercent: 4,
          platformCommissionEGP,
          affiliateCommissionEGP,
          sellerEarningEGP
        }
      },
      paymentTransactions: {
        create: {
          provider: PaymentProvider.CASH_ON_DELIVERY,
          amountEGP: subtotalEGP + 45,
          status: PaymentStatus.PENDING,
          providerRef: "COD-ALB-1001"
        }
      }
    }
  });

  await prisma.affiliateReferral.create({
    data: {
      affiliateId: affiliate.id,
      productId: products[0].id,
      referralUrl: `/products/${products[0].slug}?ref=${affiliate.referralCode}`,
      clicks: 128
    }
  });

  await prisma.affiliateSale.create({
    data: {
      affiliateId: affiliate.id,
      orderId: order.id,
      commissionEGP: affiliateCommissionEGP,
      status: PaymentStatus.PENDING
    }
  });

  const platformWallet = await prisma.wallet.create({
    data: {
      ownerType: WalletOwnerType.PLATFORM,
      ownerId: "platform",
      balanceEGP: platformCommissionEGP
    }
  });
  const sellerWallet = await prisma.wallet.create({
    data: {
      ownerType: WalletOwnerType.SELLER,
      ownerId: seller.id,
      balanceEGP: sellerEarningEGP
    }
  });
  const affiliateWallet = await prisma.wallet.create({
    data: {
      ownerType: WalletOwnerType.AFFILIATE,
      ownerId: affiliate.id,
      balanceEGP: affiliateCommissionEGP
    }
  });
  const recruiterWallet = await prisma.wallet.create({
    data: {
      ownerType: WalletOwnerType.RECRUITER,
      ownerId: recruiter.id,
      balanceEGP: 760
    }
  });

  await prisma.walletTransaction.createMany({
    data: [
      {
        walletId: platformWallet.id,
        type: WalletTransactionType.PLATFORM_COMMISSION,
        amountEGP: platformCommissionEGP,
        balanceAfterEGP: platformCommissionEGP,
        reference: order.orderNumber,
        description: "Platform commission from demo COD order"
      },
      {
        walletId: sellerWallet.id,
        type: WalletTransactionType.SALE_CREDIT,
        amountEGP: sellerEarningEGP,
        balanceAfterEGP: sellerEarningEGP,
        reference: order.orderNumber,
        description: "Seller earning from demo COD order"
      },
      {
        walletId: affiliateWallet.id,
        type: WalletTransactionType.AFFILIATE_COMMISSION,
        amountEGP: affiliateCommissionEGP,
        balanceAfterEGP: affiliateCommissionEGP,
        reference: order.orderNumber,
        description: "Affiliate commission from referral sale"
      },
      {
        walletId: recruiterWallet.id,
        type: WalletTransactionType.RECRUITER_COMMISSION,
        amountEGP: 150,
        balanceAfterEGP: 150,
        reference: seller.storeSlug,
        description: "Recruiter fixed commission for active seller"
      }
    ]
  });

  await prisma.recruiterCommission.create({
    data: {
      recruiterId: recruiter.id,
      sellerId: seller.id,
      orderId: order.id,
      amountEGP: 150,
      basis: "Fixed amount per active seller",
      status: PaymentStatus.PENDING
    }
  });

  await prisma.coupon.create({
    data: {
      code: "GOLD10",
      type: "PERCENTAGE",
      value: 10,
      usageLimit: 500,
      expiresAt: new Date("2026-12-31T23:59:59.000Z")
    }
  });

  await prisma.shippingZone.createMany({
    data: [
      { nameEn: "Cairo Zone", nameAr: "منطقة القاهرة", city: "Cairo", feeEGP: 45, deliveryEstimate: "1-2 days", codEnabled: true },
      { nameEn: "Giza Zone", nameAr: "منطقة الجيزة", city: "Giza", feeEGP: 55, deliveryEstimate: "2-3 days", codEnabled: true },
      { nameEn: "Alexandria Zone", nameAr: "منطقة الإسكندرية", city: "Alexandria", feeEGP: 70, deliveryEstimate: "3-4 days", codEnabled: true }
    ]
  });

  await prisma.review.create({
    data: {
      productId: products[0].id,
      userId: customer.id,
      rating: 5,
      title: "Great COD experience",
      body: "Fast confirmation and the product matched the listing.",
      verifiedBuyer: true,
      status: "APPROVED"
    }
  });

  await prisma.notification.createMany({
    data: [
      {
        userId: admin.id,
        type: "PRODUCT_APPROVAL",
        title: "Product queue ready",
        body: "New seller products can be approved from the admin dashboard."
      },
      {
        userId: sellerUser.id,
        type: "ORDER_CREATED",
        title: "New COD order",
        body: "Order ALB-1001 is pending manual confirmation."
      },
      {
        userId: affiliateUser.id,
        type: "AFFILIATE_SALE",
        title: "Referral sale tracked",
        body: "You earned affiliate commission from ALB-1001."
      }
    ]
  });

  await prisma.banner.create({
    data: {
      id: "banner_seller_growth",
      titleEn: "Sell Anything, Earn More",
      titleAr: "بيع أي شيء بسهولة",
      imageUrl: "/brand/seller-hero.png",
      linkUrl: "/seller",
      sortOrder: 1
    }
  });

  console.log("Seeded AL-Abdeen production demo data.");
  console.log("Admin: admin@al-abdeen.test / Password123!");
  console.log("Seller: seller@al-abdeen.test / Password123!");
  console.log("Customer: customer@al-abdeen.test / Password123!");
  console.log("Affiliate: affiliate@al-abdeen.test / Password123!");
  console.log("Recruiter: recruiter@al-abdeen.test / Password123!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
