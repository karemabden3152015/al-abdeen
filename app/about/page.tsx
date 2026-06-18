import { getLocale, tx } from "@/lib/i18n";

export default async function AboutPage() {
  const locale = await getLocale();

  return (
    <main className="container-shell py-10">
      <section className="rounded-lg bg-midnight p-8 text-white">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold">{tx(locale, "About", "من نحن")}</p>
        <h1 className="mt-2 text-4xl font-black">{tx(locale, "AL-Abdeen", "العابدين")}</h1>
        <p className="mt-4 max-w-3xl leading-8 text-white/76">
          {tx(locale, "AL-Abdeen is a scalable marketplace platform for sellers, customers, affiliates, and recruiters in Egypt. It supports COD orders, commission tracking, wallets, shipping zones, coupons, and future payment gateways.", "العابدين منصة سوق إلكتروني قابلة للتوسع للبائعين والعملاء والمسوقين وجاذبي البائعين في مصر. تدعم الدفع عند الاستلام وتتبع العمولات والمحافظ ومناطق الشحن والكوبونات وبوابات الدفع المستقبلية.")}
        </p>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          [tx(locale, "Original brand", "هوية أصلية"), tx(locale, "Dark blue, gold, white, and black marketplace identity.", "هوية سوق إلكتروني بالأزرق الداكن والذهبي والأبيض والأسود.")],
          [tx(locale, "Commission-led", "نظام عمولات"), tx(locale, "Every sale calculates platform, seller, affiliate, and recruiter balances.", "كل عملية بيع تحسب أرصدة المنصة والبائع والمسوق وجاذب البائعين.")],
          [tx(locale, "Launch-ready", "جاهزة للإطلاق"), tx(locale, "COD is active while online payment adapters are prepared for future activation.", "الدفع عند الاستلام مفعل وبوابات الدفع الإلكتروني مجهزة للتفعيل لاحقاً.")]
        ].map(([title, text]) => (
          <article key={title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold">{title}</h2>
            <p className="mt-2 leading-7 text-slate-600">{text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
