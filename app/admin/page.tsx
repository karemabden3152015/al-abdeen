import { BadgeDollarSign, Check, CreditCard, Settings, Star, Truck, WalletCards, X } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { StatCard } from "@/components/stat-card";
import { StatusPill } from "@/components/status-pill";
import { GLOBAL_AFFILIATE_COMMISSION_PERCENT, GLOBAL_COMMISSION_PERCENT, formatEGP } from "@/lib/commerce";
import { affiliates, categories, coupons, notifications, orders, platformSettings, products, recruiters, reviews, sellerPlans, shippingZones, wallets } from "@/lib/mock-data";
import { getLocale, localizedName, tx } from "@/lib/i18n";

const providers = ["Cash on Delivery", "Manual Confirmation", "Paymob", "Fawry", "Stripe", "Visa", "Mastercard"];

export default async function AdminDashboardPage() {
  const locale = await getLocale();
  const totalSales = orders.reduce((sum, order) => sum + order.totalEGP, 0);
  const platformCommission = orders.reduce((sum, order) => sum + order.platformCommissionEGP, 0);
  const sellerEarnings = orders.reduce((sum, order) => sum + order.sellerEarningEGP, 0);
  const affiliateEarnings = orders.reduce((sum, order) => sum + order.affiliateCommissionEGP, 0);
  const pendingProducts = products.filter((product) => product.status === "PENDING_REVIEW");

  return (
    <DashboardShell
      eyebrow={tx(locale, "Admin control", "تحكم الأدمن")}
      title={tx(locale, "AL-Abdeen platform dashboard", "لوحة منصة العابدين")}
      nav={[
        [tx(locale, "Analytics", "التحليلات"), "#analytics"],
        [tx(locale, "Approvals", "الموافقات"), "#approvals"],
        [tx(locale, "Commissions", "العمولات"), "#commissions"],
        [tx(locale, "Affiliates", "المسوقون"), "#affiliates"],
        [tx(locale, "Recruiters", "جاذبو البائعين"), "#recruiters"],
        [tx(locale, "Operations", "التشغيل"), "#operations"],
        [tx(locale, "Payments", "المدفوعات"), "#payments"]
      ]}
    >
      <section id="analytics" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={tx(locale, "Total sales", "إجمالي المبيعات")} value={formatEGP(totalSales)} />
        <StatCard label={tx(locale, "Platform revenue", "إيراد المنصة")} value={formatEGP(platformCommission)} />
        <StatCard label={tx(locale, "Seller earnings", "أرباح البائعين")} value={formatEGP(sellerEarnings)} />
        <StatCard label={tx(locale, "Affiliate earnings", "أرباح المسوقين")} value={formatEGP(affiliateEarnings)} />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-bold">{tx(locale, "Sales by order", "المبيعات حسب الطلب")}</h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-semibold">{order.orderNumber}</span>
                  <span>{formatEGP(order.totalEGP)}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gold" style={{ width: `${Math.min(100, (order.totalEGP / totalSales) * 220)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-bold">{tx(locale, "Top affiliates", "أفضل المسوقين")}</h2>
          <div className="space-y-3">
            {affiliates.map((affiliate) => (
              <div key={affiliate.code} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <div>
                  <p className="font-semibold">{affiliate.name}</p>
                  <p className="text-xs text-slate-500">{affiliate.clicks} clicks · {affiliate.sales} sales</p>
                </div>
                <p className="font-black">{formatEGP(affiliate.earningsEGP)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="commissions" className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5 text-ocean" />
            <h2 className="font-bold">{tx(locale, "Global commissions", "العمولات العامة")}</h2>
          </div>
          <div className="grid gap-3">
            <label className="block text-sm font-semibold">
              {tx(locale, "Platform percentage", "نسبة المنصة")}
              <input type="number" defaultValue={GLOBAL_COMMISSION_PERCENT} className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold" />
            </label>
            <label className="block text-sm font-semibold">
              {tx(locale, "Affiliate percentage", "نسبة المسوق")}
              <input type="number" defaultValue={GLOBAL_AFFILIATE_COMMISSION_PERCENT} className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold" />
            </label>
          </div>
          <button className="focus-ring mt-4 h-11 w-full rounded-md bg-midnight font-semibold text-white">{tx(locale, "Save global rates", "حفظ النسب العامة")}</button>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-bold">{tx(locale, "Category commissions", "عمولات الأقسام")}</h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <div key={category.slug} className="rounded-lg border border-slate-200 p-3">
                <p className="text-sm font-bold">{localizedName(locale, category)}</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <input aria-label={`${category.nameEn} platform commission`} type="number" defaultValue={category.commissionPercent} className="h-10 rounded-md border border-slate-200 px-3 outline-none focus:border-gold" />
                  <input aria-label={`${category.nameEn} affiliate commission`} type="number" defaultValue={category.affiliateCommissionPercent} className="h-10 rounded-md border border-slate-200 px-3 outline-none focus:border-gold" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="approvals" className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-bold">{tx(locale, "Product approval workflow", "مراجعة واعتماد المنتجات")}</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">{tx(locale, "Product", "المنتج")}</th>
                <th className="p-3">{tx(locale, "Seller", "البائع")}</th>
                <th className="p-3">{tx(locale, "Category", "القسم")}</th>
                <th className="p-3">{tx(locale, "Stock", "المخزون")}</th>
                <th className="p-3">{tx(locale, "Status", "الحالة")}</th>
                <th className="p-3">{tx(locale, "Product commissions", "عمولات المنتج")}</th>
                <th className="p-3">{tx(locale, "Actions", "الإجراءات")}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-slate-100">
                  <td className="p-3 font-semibold">{localizedName(locale, product)}</td>
                  <td className="p-3">{product.sellerName}</td>
                  <td className="p-3">{tx(locale, product.categoryNameEn, product.categoryNameAr)}</td>
                  <td className="p-3">{product.stock}</td>
                  <td className="p-3"><StatusPill status={product.status} locale={locale} /></td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <input type="number" defaultValue={product.commissionPercent} placeholder="Platform" className="h-9 w-28 rounded-md border border-slate-200 px-2 outline-none focus:border-gold" />
                      <input type="number" defaultValue={product.affiliateCommissionPercent} placeholder="Affiliate" className="h-9 w-28 rounded-md border border-slate-200 px-2 outline-none focus:border-gold" />
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button aria-label="Approve product" className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-emerald-700"><Check className="h-4 w-4" /></button>
                      <button aria-label="Reject product" className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-rose-700"><X className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-slate-500">{tx(locale, `${pendingProducts.length} products currently need review.`, `${pendingProducts.length} منتجات تحتاج إلى مراجعة حالياً.`)}</p>
      </section>

      <section id="affiliates" className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <BadgeDollarSign className="h-5 w-5 text-ocean" />
          <h2 className="font-bold">{tx(locale, "Affiliate controls", "إدارة المسوقين")}</h2>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          {affiliates.map((affiliate) => (
            <article key={affiliate.code} className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold">{affiliate.name}</p>
                  <p className="text-sm text-slate-500">{affiliate.code}</p>
                </div>
                <StatusPill status={affiliate.status} locale={locale} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                <div><p className="font-black">{affiliate.clicks}</p><p className="text-xs text-slate-500">Clicks</p></div>
                <div><p className="font-black">{affiliate.sales}</p><p className="text-xs text-slate-500">Sales</p></div>
                <div><p className="font-black">{affiliate.conversionRate}%</p><p className="text-xs text-slate-500">CVR</p></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="recruiters" className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-bold">{tx(locale, "Recruiter controls", "إدارة جاذبي البائعين")}</h2>
        <div className="grid gap-3 lg:grid-cols-2">
          {recruiters.map((recruiter) => (
            <article key={recruiter.code} className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold">{recruiter.name}</p>
                  <p className="text-sm text-slate-500">{recruiter.code}</p>
                </div>
                <StatusPill status={recruiter.status} locale={locale} />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2 text-center text-sm">
                <div><p className="font-black">{recruiter.invitedSellers}</p><p className="text-xs text-slate-500">{tx(locale, "Invited", "مدعوون")}</p></div>
                <div><p className="font-black">{recruiter.activeSellers}</p><p className="text-xs text-slate-500">{tx(locale, "Active", "نشطون")}</p></div>
                <div><p className="font-black">{recruiter.uploadedProducts}</p><p className="text-xs text-slate-500">{tx(locale, "Products", "منتجات")}</p></div>
                <div><p className="font-black">{formatEGP(recruiter.commissionEGP)}</p><p className="text-xs text-slate-500">{tx(locale, "Commission", "عمولة")}</p></div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block text-sm font-semibold">
            {tx(locale, "Fixed amount per active seller", "مبلغ ثابت لكل بائع نشط")}
            <input defaultValue={platformSettings.recruiterFixedCommissionEGP} className="mt-1 h-10 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold" />
          </label>
          <label className="block text-sm font-semibold">
            {tx(locale, "Percentage of platform commission", "نسبة من عمولة المنصة")}
            <input defaultValue={platformSettings.recruiterPlatformCommissionSharePercent} className="mt-1 h-10 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold" />
          </label>
        </div>
      </section>

      <section id="operations" className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Truck className="h-5 w-5 text-ocean" />
            <h2 className="font-bold">{tx(locale, "Shipping zones", "مناطق الشحن")}</h2>
          </div>
          <div className="space-y-3">
            {shippingZones.map((zone) => (
              <div key={zone.city} className="grid grid-cols-4 items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm">
                <span className="font-semibold">{zone.city}</span>
                <span>{formatEGP(zone.feeEGP)}</span>
                <span>{zone.estimate}</span>
                <span>{zone.codEnabled ? "COD" : "No COD"}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-bold">{tx(locale, "Coupons", "الكوبونات")}</h2>
          <div className="space-y-3">
            {coupons.map((coupon) => (
              <div key={coupon.code} className="rounded-lg border border-slate-200 p-3">
                <div className="flex justify-between gap-3">
                  <p className="font-black">{coupon.code}</p>
                  <p className="text-sm text-slate-500">{coupon.usageCount}/{coupon.usageLimit} uses</p>
                </div>
                <p className="mt-1 text-sm text-slate-600">{coupon.type === "PERCENTAGE" ? `${coupon.value}% off` : `${formatEGP(coupon.value)} off`} · expires {coupon.expiresAt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <WalletCards className="h-5 w-5 text-ocean" />
          <h2 className="font-bold">{tx(locale, "Wallets", "المحافظ")}</h2>
          </div>
          <div className="space-y-3">
            {wallets.map((wallet) => (
              <div key={wallet.owner} className="flex justify-between rounded-lg border border-slate-200 p-3">
                <span className="font-semibold">{wallet.owner}</span>
                <span className="font-black">{formatEGP(wallet.balanceEGP)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-ocean" />
            <h2 className="font-bold">{tx(locale, "Review moderation", "مراجعة التقييمات")}</h2>
          </div>
          <div className="space-y-3">
            {reviews.map((review) => (
              <div key={`${review.customer}-${review.productSlug}`} className="rounded-lg border border-slate-200 p-3">
                <div className="flex justify-between">
                  <p className="font-semibold">{review.customer}</p>
                  <StatusPill status={review.status} locale={locale} />
                </div>
                <p className="mt-2 text-sm text-slate-600">{review.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-bold">{tx(locale, "In-app notifications", "إشعارات داخلية")}</h2>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.type} className="rounded-lg border border-slate-200 p-3">
                <p className="font-semibold">{notification.title}</p>
                <p className="mt-1 text-sm text-slate-600">{notification.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="payments" className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-ocean" />
          <h2 className="font-bold">{tx(locale, "Payment architecture", "هيكل المدفوعات")}</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {providers.map((provider, index) => (
            <div key={provider} className="rounded-lg border border-slate-200 p-4">
              <p className="font-bold">{provider}</p>
              <p className="mt-1 text-sm text-slate-500">{index < 2 ? tx(locale, "Active for launch", "مفعل للإطلاق") : tx(locale, "Provider adapter ready", "مجهز للربط لاحقاً")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-bold">{tx(locale, "WhatsApp Business preparation", "تجهيز واتساب بيزنس")}</h2>
          <label className="block text-sm font-semibold">
            {tx(locale, "Support WhatsApp number", "رقم واتساب الدعم")}
            <input defaultValue={platformSettings.whatsappSupportNumber} className="mt-1 h-10 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold" />
          </label>
          <div className="mt-3 grid gap-3 text-sm">
            <textarea defaultValue={tx(locale, platformSettings.whatsappTemplates.orderConfirmationEn, platformSettings.whatsappTemplates.orderConfirmationAr)} className="min-h-20 rounded-md border border-slate-200 p-3" />
            <textarea defaultValue={tx(locale, platformSettings.whatsappTemplates.sellerNewOrderEn, platformSettings.whatsappTemplates.sellerNewOrderAr)} className="min-h-20 rounded-md border border-slate-200 p-3" />
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-bold">{tx(locale, "Analytics integrations", "ربط أدوات التحليل")}</h2>
          {["Google Analytics", "Meta Pixel", "TikTok Pixel"].map((label) => (
            <label key={label} className="mb-3 block text-sm font-semibold">
              {label}
              <input placeholder={tx(locale, "Enter tracking ID", "أدخل كود التتبع")} className="mt-1 h-10 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold" />
            </label>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-bold">{tx(locale, "Seller plans", "باقات البائعين")}</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {sellerPlans.map((plan) => (
            <article key={plan.code} className="rounded-lg border border-slate-200 p-4">
              <p className="font-black">{localizedName(locale, plan)}</p>
              <p className="mt-2 text-sm text-slate-500">{plan.maxProducts} {tx(locale, "products", "منتج")}</p>
              <p className="mt-2 text-sm text-slate-600">{tx(locale, plan.searchBoost, plan.code === "FREE" ? "ظهور عادي" : plan.code === "SILVER" ? "ظهور أفضل في البحث" : "أعلى ظهور في البحث")}</p>
            </article>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
