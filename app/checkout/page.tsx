import { Banknote, ClipboardCheck } from "lucide-react";
import { getLocale, tx } from "@/lib/i18n";

export default async function CheckoutPage() {
  const locale = await getLocale();
  const fields = [
    ["customerName", tx(locale, "Full name", "الاسم بالكامل")],
    ["phone", tx(locale, "Phone", "رقم الهاتف")],
    ["city", tx(locale, "City", "المحافظة")],
    ["address", tx(locale, "Address", "العنوان")]
  ];

  return (
    <main className="container-shell py-8">
      <h1 className="mb-6 text-3xl font-black text-ink">{tx(locale, "Checkout", "إتمام الطلب")}</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <form className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map(([name, label]) => (
              <label key={name} className="block text-sm font-semibold">
                {label}
                <input name={name} className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold" required />
              </label>
            ))}
          </div>
          <label className="mt-4 block text-sm font-semibold">
            {tx(locale, "Notes", "ملاحظات")}
            <textarea name="notes" className="mt-1 min-h-28 w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-gold" />
          </label>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gold bg-sand p-4">
              <input type="radio" name="paymentMethod" defaultChecked value="CASH_ON_DELIVERY" />
              <Banknote className="h-5 w-5 text-ocean" />
              <span className="font-semibold">{tx(locale, "Cash on Delivery", "الدفع عند الاستلام")}</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-4">
              <input type="radio" name="paymentMethod" value="MANUAL_CONFIRMATION" />
              <ClipboardCheck className="h-5 w-5 text-ocean" />
              <span className="font-semibold">{tx(locale, "Manual Confirmation", "تأكيد يدوي")}</span>
            </label>
          </div>
          <button className="focus-ring mt-5 h-12 w-full rounded-md bg-midnight font-bold text-white">{tx(locale, "Place order", "تأكيد الطلب")}</button>
        </form>
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-bold">{tx(locale, "Manual payment status", "حالة الدفع اليدوي")}</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>{tx(locale, "Payment starts as Pending.", "تبدأ حالة الدفع كقيد الانتظار.")}</p>
            <p>{tx(locale, "Admin can mark Paid after cash collection or manual confirmation.", "يمكن للأدمن تحويل الحالة إلى مدفوع بعد التحصيل أو التأكيد اليدوي.")}</p>
            <p>{tx(locale, "Online gateways are prepared but not active yet.", "بوابات الدفع الإلكتروني مجهزة لكنها غير مفعلة حالياً.")}</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
