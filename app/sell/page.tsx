import { BarChart3, Megaphone, PackagePlus, Send, Truck, WalletCards } from "lucide-react";
import { sellerPlans } from "@/lib/mock-data";
import { getLocale, localizedName, tx } from "@/lib/i18n";

export default async function SellPage() {
  const locale = await getLocale();
  const benefits = [
    [tx(locale, "No launch subscription fees", "لا توجد رسوم اشتراك عند الإطلاق"), WalletCards],
    [tx(locale, "Commission only when you sell", "عمولة فقط عند البيع"), BarChart3],
    [tx(locale, "Upload products for free", "رفع المنتجات مجاناً"), PackagePlus],
    [tx(locale, "Free marketing support", "دعم تسويقي مجاني"), Megaphone],
    [tx(locale, "Shipping support", "دعم الشحن"), Truck],
    [tx(locale, "Professional seller dashboard", "لوحة تحكم احترافية"), Send]
  ] as const;

  const fields = [
    tx(locale, "Name", "الاسم"),
    tx(locale, "Phone number", "رقم الهاتف"),
    tx(locale, "Email", "البريد الإلكتروني"),
    tx(locale, "Store name", "اسم المتجر"),
    tx(locale, "Business type", "نوع النشاط"),
    tx(locale, "Facebook / Instagram / TikTok link", "رابط فيسبوك أو إنستجرام أو تيك توك"),
    tx(locale, "Approximate product count", "عدد المنتجات التقريبي"),
    tx(locale, "Governorate", "المحافظة")
  ];

  return (
    <main>
      <section className="bg-midnight text-white">
        <div className="container-shell grid gap-8 py-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">{tx(locale, "Sell on AL-Abdeen", "بيع على العابدين")}</p>
            <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">{tx(locale, "Start your online business", "ابدأ تجارتك أونلاين")}</h1>
            <p className="mt-4 max-w-2xl leading-8 text-white/75">
              {tx(locale, "Join a premium marketplace with COD orders, shipping support, affiliate growth, and professional seller tools.", "انضم لمنصة سوق احترافية توفر الدفع عند الاستلام ودعم الشحن ونظام المسوقين وأدوات احترافية للبائعين.")}
            </p>
          </div>
          <img src="/brand/logistics-hero.png" alt="Sell on AL-Abdeen" className="min-h-[320px] rounded-lg object-cover shadow-soft" />
        </div>
      </section>

      <section className="container-shell py-8">
        <h2 className="mb-4 text-2xl font-black text-ink">{tx(locale, "Why sell on AL-Abdeen?", "لماذا تبيع على AL-Abdeen؟")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(([benefit, Icon]) => (
            <div key={benefit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <Icon className="h-6 w-6 text-ocean" />
              <p className="mt-3 font-bold">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell grid gap-6 py-6 lg:grid-cols-[1fr_0.9fr]">
        <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black">{tx(locale, "Seller registration request", "طلب تسجيل بائع")}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <label key={field} className="block text-sm font-semibold">
                {field}
                <input className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold" />
              </label>
            ))}
          </div>
          <button className="focus-ring mt-5 h-12 w-full rounded-md bg-midnight font-bold text-white">{tx(locale, "Send request", "إرسال الطلب")}</button>
        </form>

        <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black">{tx(locale, "Seller plans", "باقات البائعين")}</h2>
          <div className="mt-4 space-y-3">
            {sellerPlans.map((plan) => (
              <article key={plan.code} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-black">{localizedName(locale, plan)}</p>
                  <span className="rounded-full bg-sand px-2 py-1 text-xs font-bold text-ocean">{plan.maxProducts} {tx(locale, "products", "منتج")}</span>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {(locale === "ar" ? plan.featuresAr : plan.featuresEn).map((feature) => <li key={feature}>• {feature}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
