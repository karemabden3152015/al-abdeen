import { AlertTriangle, Heart, ShoppingCart, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { calculateCommission, formatEGP, getAffiliateCommissionPercent, getCommissionPercent } from "@/lib/commerce";
import { categories } from "@/lib/mock-data";
import type { Product } from "@/lib/types";
import type { AppLocale } from "@/lib/i18n";
import { localizedName, tx } from "@/lib/i18n";

export function ProductCard({ product, locale = "en" }: { product: Product; locale?: AppLocale }) {
  const commission = getCommissionPercent(product, categories);
  const affiliateCommission = getAffiliateCommissionPercent(product, categories);
  const earnings = calculateCommission(product.priceEGP, commission, 1, affiliateCommission);
  const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
      <Link href={`/products/${product.slug}`} className="block bg-slate-100">
        <div className="relative">
          <img src={product.image} alt={product.nameEn} className="aspect-[4/3] w-full object-cover" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.bestSeller ? <span className="rounded-full bg-gold px-2 py-1 text-xs font-black text-ink">{tx(locale, "Best seller", "الأكثر مبيعاً")}</span> : null}
            {product.newArrival ? <span className="rounded-full bg-midnight px-2 py-1 text-xs font-black text-white">{tx(locale, "New", "جديد")}</span> : null}
          </div>
        </div>
      </Link>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="rounded-full bg-sand px-2 py-1 text-xs font-semibold text-ocean">{tx(locale, product.categoryNameEn, product.categoryNameAr)}</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            {product.rating}
          </span>
        </div>
        <Link href={`/products/${product.slug}`} className="focus-ring rounded-sm">
          <h3 className="line-clamp-2 min-h-12 font-semibold leading-6 text-ink">{localizedName(locale, product)}</h3>
        </Link>
        <p className="mt-1 text-sm text-slate-500">{product.brandName} · {product.sellerName}</p>
        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-lg font-black text-ink">{formatEGP(product.priceEGP)}</p>
            <p className="text-xs text-slate-500">{tx(locale, "Seller", "البائع")} {formatEGP(earnings.sellerEarning)} · {tx(locale, "Affiliate", "المسوق")} {formatEGP(earnings.affiliateCommission)}</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
              {isLowStock ? <AlertTriangle className="h-3 w-3 text-amber-600" /> : <TrendingUp className="h-3 w-3 text-emerald-600" />}
              {product.stock === 0 ? tx(locale, "Out of stock", "غير متوفر") : isLowStock ? tx(locale, `Low stock: ${product.stock}`, `كمية منخفضة: ${product.stock}`) : tx(locale, `${product.stock} in stock`, `${product.stock} متوفر`)}
            </p>
          </div>
          <div className="flex gap-1">
            <button aria-label={tx(locale, "Add to wishlist", "أضف للمفضلة")} className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-slate-200 hover:bg-slate-100">
              <Heart className="h-4 w-4" />
            </button>
            <button aria-label={tx(locale, "Add to cart", "أضف للسلة")} className="focus-ring grid h-9 w-9 place-items-center rounded-md bg-midnight text-white hover:bg-ocean">
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
