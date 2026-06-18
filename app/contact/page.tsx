import { Mail, MapPin, Phone } from "lucide-react";
import { getLocale, tx } from "@/lib/i18n";

export default async function ContactPage() {
  const locale = await getLocale();
  const contactItems = [
    { Icon: Mail, text: "support@alabdeen.com" },
    { Icon: Phone, text: "01124460043" },
    { Icon: MapPin, text: tx(locale, "Cairo, Egypt", "القاهرة، مصر") }
  ];

  return (
    <main className="container-shell py-10">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1fr]">
        <section>
          <p className="text-sm font-semibold uppercase tracking-wide text-ocean">{tx(locale, "Contact", "تواصل معنا")}</p>
          <h1 className="mt-2 text-4xl font-black text-ink">{tx(locale, "Contact us", "اتصل بنا")}</h1>
          <div className="mt-6 space-y-3">
            {contactItems.map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <Icon className="h-5 w-5 text-ocean" />
                <span className="font-semibold">{text}</span>
              </div>
            ))}
          </div>
        </section>
        <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold">
              {tx(locale, "Name", "الاسم")}
              <input className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold" />
            </label>
            <label className="block text-sm font-semibold">
              {tx(locale, "Email", "البريد الإلكتروني")}
              <input type="email" className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold" />
            </label>
          </div>
          <label className="mt-4 block text-sm font-semibold">
            {tx(locale, "Message", "الرسالة")}
            <textarea className="mt-1 min-h-36 w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-gold" />
          </label>
          <button className="focus-ring mt-5 h-12 w-full rounded-md bg-midnight font-bold text-white">{tx(locale, "Send", "إرسال")}</button>
        </form>
      </div>
    </main>
  );
}
