import Link from "next/link";
import { getLocale, tx } from "@/lib/i18n";

export default async function OfflinePage() {
  const locale = await getLocale();

  return (
    <main className="container-shell grid min-h-[60vh] place-items-center py-10">
      <section className="max-w-xl rounded-lg border border-slate-200 bg-white p-6 text-center shadow-soft">
        <img src="/icons/icon-192.png" alt="AL-Abdeen" className="mx-auto h-20 w-20 rounded-lg" />
        <h1 className="mt-5 text-3xl font-black text-ink">{tx(locale, "You are offline", "أنت غير متصل")}</h1>
        <p className="mt-3 leading-7 text-slate-600">
          {tx(locale, "AL-Abdeen is installable as a PWA. Cached pages and assets will keep working while the network reconnects.", "يمكن تثبيت العابدين كتطبيق PWA. ستعمل الصفحات والملفات المخزنة مؤقتاً لحين عودة الاتصال.")}
        </p>
        <Link href="/" className="focus-ring mt-5 inline-flex h-11 items-center rounded-md bg-midnight px-5 font-bold text-white">
          {tx(locale, "Back home", "العودة للرئيسية")}
        </Link>
      </section>
    </main>
  );
}
