import { AlertTriangle, Edit, PackageCheck, Plus, Trash2, WalletCards } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { StatCard } from "@/components/stat-card";
import { StatusPill } from "@/components/status-pill";
import { calculateCommission, formatEGP, getAffiliateCommissionPercent, getCommissionPercent } from "@/lib/commerce";
import { categories, orders, products, wallets } from "@/lib/mock-data";
import { getLocale, localizedName, tx } from "@/lib/i18n";

export default async function SellerDashboardPage() {
  const locale = await getLocale();
  const sellerProducts = products.filter((product) => product.sellerName === "Nile Home Goods");
  const sellerOrders = orders.filter((order) => order.sellerEarningEGP > 0);
  const sellerWallet = wallets.find((wallet) => wallet.owner === "Seller");
  const lowStock = sellerProducts.filter((product) => product.stock <= product.lowStockThreshold);

  return (
    <DashboardShell
      eyebrow={tx(locale, "Seller workspace", "مساحة البائع")}
      title="Nile Home Goods"
      nav={[
        [tx(locale, "Products", "المنتجات"), "#products"],
        [tx(locale, "Orders", "الطلبات"), "#orders"],
        [tx(locale, "Inventory", "المخزون"), "#inventory"],
        [tx(locale, "Reports", "التقارير"), "#reports"]
      ]}
    >
      <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="overflow-hidden rounded-lg bg-midnight text-white shadow-soft">
          <img src="/brand/logistics-hero.png" alt="Seller logistics" className="h-56 w-full object-cover" />
          <div className="p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">{tx(locale, "Approved seller", "بائع معتمد")}</p>
            <h2 className="mt-1 text-2xl font-black">{tx(locale, "Sell Anything, Earn More", "بيع أي شيء واربح أكثر")}</h2>
            <p className="mt-2 text-sm leading-7 text-white/70">{tx(locale, "Add products, monitor approval status, track stock, and see seller earnings after platform and affiliate commissions.", "أضف المنتجات، تابع حالة الموافقة والمخزون، واعرف أرباحك بعد عمولة المنصة والمسوقين.")}</p>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-md bg-sand text-ocean">
              <WalletCards className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500">{tx(locale, "Seller wallet", "محفظة البائع")}</p>
              <p className="text-2xl font-black">{formatEGP(sellerWallet?.balanceEGP ?? 0)}</p>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {sellerWallet?.transactions.map((transaction) => (
              <div key={`${transaction.type}-${transaction.reference}`} className="flex items-center justify-between rounded-lg border border-slate-200 p-3 text-sm">
                <span>{transaction.reference}</span>
                <span className="font-bold">{formatEGP(transaction.amountEGP)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={tx(locale, "Seller balance", "رصيد البائع")} value={formatEGP(sellerWallet?.balanceEGP ?? 0)} />
        <StatCard label={tx(locale, "Active products", "منتجات نشطة")} value={String(sellerProducts.filter((item) => item.status === "PUBLISHED").length)} />
        <StatCard label={tx(locale, "Low stock alerts", "تنبيهات مخزون منخفض")} value={String(lowStock.length)} />
        <StatCard label={tx(locale, "Orders this week", "طلبات هذا الأسبوع")} value={String(sellerOrders.length)} />
      </section>

      <section id="products" className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-bold">{tx(locale, "Product management", "إدارة المنتجات")}</h2>
          <button className="focus-ring inline-flex h-10 items-center gap-2 rounded-md bg-midnight px-4 text-sm font-semibold text-white">
            <Plus className="h-4 w-4" />
            {tx(locale, "Add product", "إضافة منتج")}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">{tx(locale, "Product", "المنتج")}</th>
                <th className="p-3">{tx(locale, "Price", "السعر")}</th>
                <th className="p-3">{tx(locale, "Platform", "المنصة")}</th>
                <th className="p-3">{tx(locale, "Affiliate", "المسوق")}</th>
                <th className="p-3">{tx(locale, "Expected earning", "الأرباح المتوقعة")}</th>
                <th className="p-3">{tx(locale, "Stock", "المخزون")}</th>
                <th className="p-3">{tx(locale, "Status", "الحالة")}</th>
                <th className="p-3">{tx(locale, "Actions", "الإجراءات")}</th>
              </tr>
            </thead>
            <tbody>
              {sellerProducts.map((product) => {
                const platformPercent = getCommissionPercent(product, categories);
                const affiliatePercent = getAffiliateCommissionPercent(product, categories);
                const split = calculateCommission(product.priceEGP, platformPercent, 1, affiliatePercent);
                const low = product.stock <= product.lowStockThreshold;
                return (
                  <tr key={product.id} className="border-t border-slate-100">
                    <td className="p-3 font-semibold">{localizedName(locale, product)}</td>
                    <td className="p-3">{formatEGP(product.priceEGP)}</td>
                    <td className="p-3">{platformPercent}%</td>
                    <td className="p-3">{affiliatePercent}%</td>
                    <td className="p-3">{formatEGP(split.sellerEarning)}</td>
                    <td className="p-3">
                      <span className={low ? "inline-flex items-center gap-1 font-bold text-amber-700" : ""}>
                        {low ? <AlertTriangle className="h-4 w-4" /> : null}
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-3"><StatusPill status={product.status} locale={locale} /></td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <button aria-label="Edit product" className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-slate-200"><Edit className="h-4 w-4" /></button>
                        <button aria-label="Delete product" className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-rose-600"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section id="orders" className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-bold">{tx(locale, "Order management", "إدارة الطلبات")}</h2>
        <div className="grid gap-3 lg:grid-cols-4">
          {sellerOrders.map((order) => (
            <article key={order.id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold">{order.orderNumber}</p>
                  <p className="text-sm text-slate-500">{order.customerName}</p>
                </div>
                <StatusPill status={order.status} locale={locale} />
              </div>
              <p className="mt-4 text-sm text-slate-500">{tx(locale, "Seller earning", "أرباح البائع")}</p>
              <p className="text-xl font-black">{formatEGP(order.sellerEarningEGP)}</p>
              <select aria-label="Manage order status" defaultValue={order.status} className="mt-4 h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-gold">
                {["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"].map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </article>
          ))}
        </div>
      </section>

      <section id="reports" className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <PackageCheck className="h-5 w-5 text-ocean" />
          <h2 className="font-bold">{tx(locale, "Sales report", "تقرير المبيعات")}</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {sellerProducts.map((product) => (
            <div key={product.id} className="rounded-lg border border-slate-200 p-4">
              <p className="font-semibold">{localizedName(locale, product)}</p>
              <div className="mt-3 h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-gold" style={{ width: `${Math.min(100, product.rating * 20)}%` }} />
              </div>
              <p className="mt-2 text-xs text-slate-500">{tx(locale, "Rating-driven sales score", "مؤشر مبيعات حسب التقييم")}</p>
            </div>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
