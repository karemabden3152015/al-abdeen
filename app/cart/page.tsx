import Link from "next/link";
import { Trash2 } from "lucide-react";
import { DELIVERY_FEE_EGP, formatEGP } from "@/lib/commerce";
import { products } from "@/lib/mock-data";
import { getLocale, localizedName, tx } from "@/lib/i18n";

export default async function CartPage() {
  const locale = await getLocale();
  const cartItems = [
    { product: products[0], quantity: 1 },
    { product: products[2], quantity: 1 }
  ];
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.priceEGP * item.quantity, 0);
  const total = subtotal + DELIVERY_FEE_EGP;

  return (
    <main className="container-shell py-8">
      <h1 className="mb-6 text-3xl font-black text-ink">{tx(locale, "Cart", "السلة")}</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <section className="space-y-3">
          {cartItems.map(({ product, quantity }) => (
            <article key={product.id} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[120px_1fr_auto]">
              <img src={product.image} alt={localizedName(locale, product)} className="aspect-square w-full rounded-md object-cover sm:w-[120px]" />
              <div>
                <h2 className="font-bold">{localizedName(locale, product)}</h2>
                <p className="mt-1 text-sm text-slate-500">{product.sellerName}</p>
                <select aria-label={tx(locale, "Quantity", "الكمية")} defaultValue={quantity} className="mt-3 h-10 rounded-md border border-slate-200 px-3">
                  {[1, 2, 3, 4].map((value) => <option key={value}>{value}</option>)}
                </select>
              </div>
              <div className="flex items-start justify-between gap-4 sm:block sm:text-right">
                <p className="font-black">{formatEGP(product.priceEGP * quantity)}</p>
                <button aria-label={tx(locale, "Remove item", "حذف المنتج")} className="focus-ring mt-3 grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-slate-600 hover:text-rose-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </section>
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-bold">{tx(locale, "Order summary", "ملخص الطلب")}</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><span>{tx(locale, "Subtotal", "الإجمالي الفرعي")}</span><span>{formatEGP(subtotal)}</span></div>
            <div className="flex justify-between"><span>{tx(locale, "Delivery", "الشحن")}</span><span>{formatEGP(DELIVERY_FEE_EGP)}</span></div>
            <div className="border-t border-slate-200 pt-3 text-base font-black">
              <div className="flex justify-between"><span>{tx(locale, "Total", "الإجمالي")}</span><span>{formatEGP(total)}</span></div>
            </div>
          </div>
          <Link href="/checkout" className="focus-ring mt-5 inline-flex h-12 w-full items-center justify-center rounded-md bg-gold font-bold text-ink">
            {tx(locale, "Checkout", "إتمام الطلب")}
          </Link>
        </aside>
      </div>
    </main>
  );
}
