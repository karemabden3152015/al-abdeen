import { Clock, Home, Link2, TrendingUp, Users, WalletCards } from "lucide-react";
import { getLocale, tx } from "@/lib/i18n";

export default async function RecruitersLandingPage() {
  const locale = await getLocale();
  const benefits = [
    [tx(locale, "Work from home", "العمل من المنزل"), Home],
    [tx(locale, "Invite sellers and earn commissions", "دعوة البائعين وكسب عمولات"), Users],
    [tx(locale, "Flexible working hours", "ساعات عمل مرنة"), Clock],
    [tx(locale, "Track earnings from dashboard", "متابعة الأرباح من لوحة التحكم"), TrendingUp],
    [tx(locale, "Get your own referral link", "الحصول على رابط إحالة خاص"), Link2],
    [tx(locale, "No withdrawals now, only balance tracking", "لا يوجد سحب حالياً، فقط تتبع الأرصدة"), WalletCards]
  ] as const;
  const fields = [
    tx(locale, "Name", "الاسم"),
    tx(locale, "Phone number", "رقم الهاتف"),
    tx(locale, "Email", "البريد الإلكتروني"),
    tx(locale, "Governorate", "المحافظة"),
    tx(locale, "Social accounts link", "رابط حسابات التواصل الاجتماعي"),
    tx(locale, "Marketing or sales experience", "الخبرة في التسويق أو المبيعات")
  ];

  return (
    <main>
      <section className="bg-midnight text-white">
        <div className="container-shell grid gap-8 py-10 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">{tx(locale, "Recruiters program", "برنامج جاذبي البائعين")}</p>
            <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">{tx(locale, "Invite sellers. Earn commissions.", "ادعُ البائعين واكسب عمولات.")}</h1>
            <p className="mt-4 leading-8 text-white/75">{tx(locale, "Help merchants join AL-Abdeen and track your earnings from a dedicated dashboard.", "ساعد التجار على الانضمام إلى العابدين وتابع أرباحك من لوحة تحكم خاصة.")}</p>
          </div>
          <img src="/brand/seller-hero.png" alt="Recruit sellers" className="min-h-[320px] rounded-lg object-cover shadow-soft" />
        </div>
      </section>
      <section className="container-shell grid gap-6 py-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map(([benefit, Icon]) => (
            <div key={benefit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <Icon className="h-6 w-6 text-ocean" />
              <p className="mt-3 font-bold">{benefit}</p>
            </div>
          ))}
        </div>
        <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black">{tx(locale, "Recruiter registration", "تسجيل جاذب بائعين")}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <label key={field} className="block text-sm font-semibold">
                {field}
                <input className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold" />
              </label>
            ))}
          </div>
          <button className="focus-ring mt-5 h-12 w-full rounded-md bg-midnight font-bold text-white">{tx(locale, "Send application", "إرسال الطلب")}</button>
        </form>
      </section>
    </main>
  );
}
