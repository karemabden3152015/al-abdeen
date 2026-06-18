import { ArrowRight, BadgeCheck, PackageSearch, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { StatCard } from "@/components/stat-card";
import { affiliates, categories, orders, products } from "@/lib/mock-data";
import { formatEGP } from "@/lib/commerce";
import { getLocale, localizedName, tx } from "@/lib/i18n";

export default async function HomePage() {
  const locale = await getLocale();
  const featured = products.filter((product) => product.featured && product.status === "PUBLISHED");
  const bestSellers = products.filter((product) => product.bestSeller && product.status === "PUBLISHED");
  const platformStats = [
    { label: tx(locale, "Total sales", "إجمالي المبيعات"), value: formatEGP(orders.reduce((sum, order) => sum + order.totalEGP, 0)) },
    { label: tx(locale, "Platform commission", "عمولة المنصة"), value: formatEGP(orders.reduce((sum, order) => sum + order.platformCommissionEGP, 0)) },
    { label: tx(locale, "Affiliate earnings", "أرباح المسوقين"), value: formatEGP(orders.reduce((sum, order) => sum + order.affiliateCommissionEGP, 0)) },
    { label: tx(locale, "Active affiliates", "المسوقون النشطون"), value: String(affiliates.filter((affiliate) => affiliate.status === "APPROVED").length) }
  ];
  const trustCards = [
    {
      title: tx(locale, "Secure shopping", "تسوق آمن"),
      text: tx(locale, "Verified products, moderated reviews, and clean order tracking.", "منتجات موثقة ومراجعات خاضعة للإدارة وتتبع واضح للطلبات."),
      icon: "/brand/icons/safe-store.png"
    },
    {
      title: tx(locale, "Fast delivery", "شحن سريع"),
      text: tx(locale, "Shipping zones decide fees, delivery estimates, and COD availability.", "مناطق الشحن تحدد الرسوم ومدة التوصيل وإمكانية الدفع عند الاستلام."),
      icon: "/brand/icons/delivery-fast.png"
    },
    {
      title: tx(locale, "Cash on delivery", "دفع عند الاستلام"),
      text: tx(locale, "No online payment is active now. Orders are confirmed manually.", "لا يوجد دفع إلكتروني حالياً. يتم تأكيد الطلبات يدوياً."),
      icon: "/brand/icons/cash-delivery.png"
    },
    {
      title: tx(locale, "Quality marketplace", "سوق بجودة عالية"),
      text: tx(locale, "Premium seller dashboards, commissions, wallets, and future payments.", "لوحات بائعين احترافية وعمولات ومحافظ وتجهيز للمدفوعات المستقبلية."),
      icon: "/brand/icons/quality-badge.png"
    }
  ];

  return (
    <main>
      <section className="bg-midnight text-white">
        <div className="container-shell grid gap-8 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-10">
          <div className="flex min-h-[430px] flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/85">
              <BadgeCheck className="h-4 w-4 text-gold" />
              {tx(locale, "Shop More .. Sell More .. Earn More", "تسوق أكثر .. بيع أكثر .. اربح أكثر")}
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              {tx(locale, "Al-Abdeen Marketplace", "العابدين ماركت بليس")}
            </h1>
            <p className="mt-2 font-[var(--font-kufi)] text-2xl font-bold text-gold">
              {tx(locale, "Shop premium products with confidence", "تسوق منتجات مميزة بثقة")}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/76 md:text-lg">
              {tx(locale, "A premium bilingual marketplace for customers, sellers, affiliates, COD orders, wallets, coupons, shipping zones, and future online payments.", "منصة سوق إلكتروني احترافية ثنائية اللغة للعملاء والبائعين والمسوقين والدفع عند الاستلام والمحافظ والكوبونات والشحن والمدفوعات المستقبلية.")}
            </p>
            <form action="/products" className="mt-7 flex max-w-2xl flex-col gap-3 rounded-lg bg-white p-2 shadow-soft sm:flex-row">
              <input
                name="q"
                aria-label={tx(locale, "Search products", "ابحث عن منتجات")}
                placeholder={tx(locale, "Search electronics, fashion, kitchen...", "ابحث عن إلكترونيات، أزياء، مطبخ...")}
                className="min-h-12 flex-1 rounded-md border border-transparent px-4 text-ink outline-none focus:border-gold"
              />
              <button className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-gold px-5 font-semibold text-ink">
                <PackageSearch className="h-5 w-5" />
                {tx(locale, "Search", "بحث")}
              </button>
            </form>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/products" className="focus-ring inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 font-bold text-ink">
                <ShoppingBag className="h-5 w-5" />
                {tx(locale, "Shop now", "تسوق الآن")}
              </Link>
              <Link href="/products?sort=best-sellers" className="focus-ring rounded-md border border-white/20 px-5 py-3 font-bold text-white hover:border-gold">
                {tx(locale, "View best sellers", "شاهد الأكثر مبيعاً")}
              </Link>
            </div>
          </div>
          <div className="content-center">
            <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2 shadow-soft">
              <img src="/brand/homepage-hero-premium.png" alt={tx(locale, "Al-Abdeen premium marketplace visual", "هوية العابدين الاحترافية")} className="aspect-[16/11] w-full rounded-md object-cover" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <img src="/brand/seller-strip.png" alt="" className="h-24 w-full rounded-md object-cover" />
              <img src="/brand/shipping-strip.png" alt="" className="h-24 w-full rounded-md object-cover" />
              <img src="/brand/market-strip.png" alt="" className="h-24 w-full rounded-md object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell -mt-7">
        <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
          {platformStats.map((stat) => <StatCard key={stat.label} label={stat.label} value={stat.value} />)}
        </div>
      </section>

      <section className="container-shell py-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustCards.map(({ title, text, icon }) => (
            <div key={title} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <img src={icon} alt="" className="h-11 w-11 rounded-md object-contain" />
              <h2 className="mt-3 font-semibold">{title}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell pb-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-ocean">{tx(locale, "Shop by category", "تسوق حسب القسم")}</p>
            <h2 className="text-2xl font-bold text-ink">{tx(locale, "Popular departments", "الأقسام الشائعة")}</h2>
          </div>
          <Link href="/products" className="focus-ring inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-ocean">
            {tx(locale, "View all", "عرض الكل")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {categories.map((category) => (
            <Link key={category.slug} href={`/products?category=${category.slug}`} className="focus-ring overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
              <img src={category.image} alt={localizedName(locale, category)} className="aspect-[4/3] w-full object-cover" />
              <div className="p-3">
                <p className="font-semibold">{localizedName(locale, category)}</p>
                <p className="mt-3 text-xs text-slate-500">{tx(locale, "Seller", "البائع")} {category.commissionPercent}% · {tx(locale, "Affiliate", "المسوق")} {category.affiliateCommissionPercent}%</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-shell pb-12">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-ocean">{tx(locale, "Featured", "منتجات مميزة")}</p>
            <h2 className="text-2xl font-bold text-ink">{tx(locale, "Ready to order", "جاهزة للطلب")}</h2>
          </div>
          <p className="text-sm text-slate-600">{tx(locale, "From", "تبدأ من")} {formatEGP(Math.min(...featured.map((item) => item.priceEGP)))}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}
        </div>
      </section>

      <section className="container-shell pb-12">
        <div className="rounded-lg bg-midnight p-5 text-white">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gold">{tx(locale, "Best sellers", "الأكثر مبيعاً")}</p>
              <h2 className="text-2xl font-bold">{tx(locale, "Products moving fast", "منتجات عليها طلب كبير")}</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {bestSellers.map((product) => (
              <div key={product.id} className="grid gap-4 rounded-lg border border-white/10 bg-white/10 p-3 sm:grid-cols-[120px_1fr]">
                <img src={product.image} alt={localizedName(locale, product)} className="aspect-square rounded-md object-cover" />
                <div>
                  <p className="font-bold">{localizedName(locale, product)}</p>
                  <p className="mt-1 text-sm text-white/65">{product.sellerName}</p>
                  <p className="mt-3 text-xl font-black text-gold">{formatEGP(product.priceEGP)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
