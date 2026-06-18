import { Copy, Link2, MousePointerClick, Share2, WalletCards } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { ProductCard } from "@/components/product-card";
import { StatCard } from "@/components/stat-card";
import { StatusPill } from "@/components/status-pill";
import { createProductUrl, formatEGP, getAffiliateCommissionPercent } from "@/lib/commerce";
import { affiliates, categories, products, wallets } from "@/lib/mock-data";
import { getLocale, localizedName, tx } from "@/lib/i18n";

export default async function AffiliatePage() {
  const locale = await getLocale();
  const affiliate = affiliates[0];
  const affiliateWallet = wallets.find((wallet) => wallet.owner === "Affiliate");
  const promotedProducts = products.filter((product) => product.status === "PUBLISHED").slice(0, 4);

  return (
    <DashboardShell
      eyebrow={tx(locale, "Affiliate program", "برنامج المسوقين")}
      title={tx(locale, "Promote products and earn", "روّج المنتجات واكسب")}
      nav={[
        [tx(locale, "Overview", "نظرة عامة"), "#overview"],
        [tx(locale, "Links", "الروابط"), "#links"],
        [tx(locale, "Wallet", "المحفظة"), "#wallet"]
      ]}
    >
      <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="overflow-hidden rounded-lg bg-midnight text-white shadow-soft">
          <img src="/brand/marketplace-hero.png" alt="Affiliate marketplace" className="h-64 w-full object-cover" />
          <div className="p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">{tx(locale, "Referral code", "كود الإحالة")}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <code className="rounded-md bg-white/10 px-3 py-2 text-lg font-black">{affiliate.code}</code>
              <StatusPill status={affiliate.status} locale={locale} />
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
              {tx(locale, "Share SEO-friendly product links. When a customer buys through your referral, AL-Abdeen records the affiliate commission in your wallet.", "شارك روابط منتجات صديقة لمحركات البحث. عندما يشتري عميل من خلال رابطك، تسجل العابدين عمولتك في محفظتك.")}
            </p>
          </div>
        </div>
        <div id="wallet" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-md bg-sand text-ocean">
              <WalletCards className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500">{tx(locale, "Affiliate wallet", "محفظة المسوق")}</p>
              <p className="text-2xl font-black">{formatEGP(affiliateWallet?.balanceEGP ?? 0)}</p>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {affiliateWallet?.transactions.map((transaction) => (
              <div key={`${transaction.reference}-${transaction.amountEGP}`} className="flex justify-between rounded-lg border border-slate-200 p-3 text-sm">
                <span>{transaction.reference}</span>
                <span className="font-bold">{formatEGP(transaction.amountEGP)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="overview" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={tx(locale, "Clicks", "النقرات")} value={String(affiliate.clicks)} />
        <StatCard label={tx(locale, "Sales", "المبيعات")} value={String(affiliate.sales)} />
        <StatCard label={tx(locale, "Conversion rate", "معدل التحويل")} value={`${affiliate.conversionRate}%`} />
        <StatCard label={tx(locale, "Earnings", "الأرباح")} value={formatEGP(affiliate.earningsEGP)} />
      </section>

      <section id="links" className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Link2 className="h-5 w-5 text-ocean" />
          <h2 className="font-bold">{tx(locale, "Referral links", "روابط الإحالة")}</h2>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {promotedProducts.map((product) => {
            const affiliatePercent = getAffiliateCommissionPercent(product, categories);
            const link = `${createProductUrl(product.slug)}?ref=${affiliate.code}`;
            return (
              <div key={product.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex gap-3">
                  <img src={product.image} alt={product.nameEn} className="h-20 w-20 rounded-md object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold">{localizedName(locale, product)}</p>
                    <p className="mt-1 text-sm text-slate-500">{tx(locale, "Affiliate commission", "عمولة المسوق")} {affiliatePercent}%</p>
                    <p className="mt-2 truncate rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-500">{link}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="focus-ring inline-flex h-10 items-center gap-2 rounded-md bg-midnight px-3 text-sm font-semibold text-white">
                    <Copy className="h-4 w-4" />
                    {tx(locale, "Copy link", "نسخ الرابط")}
                  </button>
                  <button className="focus-ring inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-semibold">
                    <Share2 className="h-4 w-4" />
                    {tx(locale, "Share", "مشاركة")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-4 flex items-center gap-2">
          <MousePointerClick className="h-5 w-5 text-ocean" />
          <h2 className="font-bold">{tx(locale, "Products to promote", "منتجات للترويج")}</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {promotedProducts.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
