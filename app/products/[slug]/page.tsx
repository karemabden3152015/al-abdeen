import type { Metadata } from "next";
import { BadgeCheck, Heart, ShieldCheck, ShoppingCart, Star } from "lucide-react";
import { notFound } from "next/navigation";
import { ShareButtons } from "@/components/share-buttons";
import { calculateCommission, createProductUrl, formatEGP, getAffiliateCommissionPercent, getCommissionPercent } from "@/lib/commerce";
import { categories, products, reviews } from "@/lib/mock-data";
import { getLocale, localizedDescription, localizedName, tx } from "@/lib/i18n";

type ProductDetailsProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductDetailsProps): Promise<Metadata> {
  const locale = await getLocale();
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return { title: "Product not found | AL-Abdeen" };
  }

  return {
    title: tx(locale, product.metaTitle, `${product.nameAr} | العابدين ماركت بليس`),
    description: tx(locale, product.metaDescription, product.descriptionAr),
    alternates: {
      canonical: `/products/${product.slug}`
    },
    openGraph: {
      title: tx(locale, product.metaTitle, `${product.nameAr} | العابدين ماركت بليس`),
      description: tx(locale, product.metaDescription, product.descriptionAr),
      images: [product.image],
      type: "website"
    }
  };
}

export default async function ProductDetailsPage({ params }: ProductDetailsProps) {
  const locale = await getLocale();
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  const platformCommissionPercent = getCommissionPercent(product, categories);
  const affiliateCommissionPercent = getAffiliateCommissionPercent(product, categories);
  const commission = calculateCommission(product.priceEGP, platformCommissionPercent, 1, affiliateCommissionPercent);
  const productUrl = createProductUrl(product.slug);
  const productReviews = reviews.filter((review) => review.productSlug === product.slug);
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: localizedName(locale, product),
    description: tx(locale, product.metaDescription, product.descriptionAr),
    image: product.images,
    brand: { "@type": "Brand", name: product.brandName },
    sku: product.variants[0]?.sku,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.ratingCount
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EGP",
      price: product.priceEGP,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: productUrl
    }
  };

  return (
    <main className="container-shell py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="space-y-3">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <img src={product.image} alt={localizedName(locale, product)} className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.images.map((image) => (
              <img key={image} src={image} alt={localizedName(locale, product)} className="aspect-[4/3] rounded-lg border border-slate-200 object-cover" />
            ))}
          </div>
        </section>

        <section>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <p className="rounded-full bg-sand px-3 py-1 text-sm font-semibold text-ocean">{tx(locale, product.categoryNameEn, product.categoryNameAr)}</p>
              <p className="rounded-full bg-midnight px-3 py-1 text-sm font-semibold text-white">{product.brandName}</p>
            </div>
            <h1 className="mt-3 text-3xl font-black leading-tight text-ink">{localizedName(locale, product)}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-sand px-3 py-1 text-sm font-semibold">
                <Star className="h-4 w-4 fill-gold text-gold" />
                {product.rating} ({product.ratingCount})
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-slate-500">
                <BadgeCheck className="h-4 w-4 text-emerald-600" />
                {tx(locale, "Sold by", "يباع بواسطة")} {product.sellerName}
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-slate-500">
                <ShieldCheck className="h-4 w-4 text-ocean" />
                {product.stock > 0 ? tx(locale, `${product.stock} in stock`, `${product.stock} متوفر`) : tx(locale, "Out of stock", "غير متوفر")}
              </span>
            </div>
            <p className="mt-5 text-3xl font-black text-ink">{formatEGP(product.priceEGP)}</p>
            <p className="mt-4 leading-7 text-slate-700">{localizedDescription(locale, product)}</p>

            <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="grid gap-3 sm:grid-cols-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">{tx(locale, "Platform", "المنصة")}</p>
                  <p className="mt-1 font-black">{platformCommissionPercent}%</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">{tx(locale, "Affiliate", "المسوق")}</p>
                  <p className="mt-1 font-black">{affiliateCommissionPercent}%</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">{tx(locale, "Platform earns", "أرباح المنصة")}</p>
                  <p className="mt-1 font-black">{formatEGP(commission.platformCommission)}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">{tx(locale, "Seller earns", "أرباح البائع")}</p>
                  <p className="mt-1 font-black">{formatEGP(commission.sellerEarning)}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
              <button disabled={product.stock === 0} className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md bg-midnight px-5 font-semibold text-white hover:bg-ocean disabled:cursor-not-allowed disabled:bg-slate-300">
                <ShoppingCart className="h-5 w-5" />
                {product.stock === 0 ? tx(locale, "Out of stock", "غير متوفر") : tx(locale, "Add to cart", "أضف للسلة")}
              </button>
              <button className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md border border-slate-200 px-5 font-semibold hover:border-gold">
                <Heart className="h-5 w-5" />
                {tx(locale, "Wishlist", "المفضلة")}
              </button>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 font-bold">{tx(locale, "Share product", "مشاركة المنتج")}</h2>
            <ShareButtons url={productUrl} title={localizedName(locale, product)} />
          </div>

          <div className="mt-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold">{tx(locale, "Verified reviews", "مراجعات المشترين")}</h2>
            <div className="mt-3 space-y-3">
              {productReviews.length === 0 ? <p className="text-sm text-slate-500">{tx(locale, "Reviews will appear after moderation.", "ستظهر المراجعات بعد الموافقة.")}</p> : null}
              {productReviews.map((review) => (
                <article key={`${review.customer}-${review.rating}`} className="rounded-lg border border-slate-200 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">{review.customer}</p>
                    <span className="text-sm text-gold">{review.rating}/5</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{review.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
