import { Package, UserRound } from "lucide-react";
import { StatusPill } from "@/components/status-pill";
import { orders, products } from "@/lib/mock-data";
import { getLocale, localizedName, tx } from "@/lib/i18n";

export default async function AccountPage() {
  const locale = await getLocale();

  return (
    <main className="container-shell py-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-md bg-midnight text-white">
          <UserRound className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-ink">{tx(locale, "Customer account", "حساب العميل")}</h1>
          <p className="text-sm text-slate-600">customer@al-abdeen.test</p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-bold">{tx(locale, "Order tracking", "تتبع الطلبات")}</h2>
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-4">
                <div>
                  <p className="font-bold">{order.orderNumber}</p>
                  <p className="text-sm text-slate-500">{order.createdAt}</p>
                </div>
                <StatusPill status={order.status} locale={locale} />
              </div>
            ))}
          </div>
        </section>
        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-bold">{tx(locale, "Wishlist", "المفضلة")}</h2>
          <div className="space-y-3">
            {products.slice(1, 4).map((product) => (
              <div key={product.id} className="flex gap-3">
                <img src={product.image} alt={localizedName(locale, product)} className="h-14 w-14 rounded-md object-cover" />
                <div>
                  <p className="text-sm font-semibold">{localizedName(locale, product)}</p>
                  <p className="flex items-center gap-1 text-xs text-slate-500"><Package className="h-3 w-3" /> {tx(locale, `${product.stock} available`, `${product.stock} متاح`)}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
