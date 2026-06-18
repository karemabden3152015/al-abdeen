import { LockKeyhole, UserPlus } from "lucide-react";
import Link from "next/link";
import { demoAccounts } from "@/lib/auth";
import { getLocale, tx } from "@/lib/i18n";

export default async function LoginPage() {
  const locale = await getLocale();

  return (
    <main className="container-shell grid min-h-[calc(100vh-80px)] items-center py-8">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft lg:grid-cols-2">
        <section className="bg-midnight p-8 text-white">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-gold text-xl font-black text-ink">A</div>
          <h1 className="mt-6 text-3xl font-black">{tx(locale, "Welcome to AL-Abdeen", "مرحباً بك في العابدين")}</h1>
          <p className="mt-3 leading-7 text-white/75">{tx(locale, "Sign in as a customer, seller, affiliate, recruiter, or admin for the production-ready demo dashboards.", "ادخل كعميل أو بائع أو مسوق أو جاذب بائعين أو أدمن لتجربة لوحات التحكم الجاهزة.")}</p>
          <div className="mt-6 space-y-3">
            {demoAccounts.map((account) => (
              <div key={account.email} className="rounded-lg border border-white/15 bg-white/10 p-3 text-sm">
                <p className="font-bold">{account.label}</p>
                <p className="text-white/75">{account.email} / Password123!</p>
              </div>
            ))}
          </div>
        </section>
        <section className="p-8">
          <h2 className="text-2xl font-black text-ink">{tx(locale, "Login", "تسجيل الدخول")}</h2>
          <form className="mt-6 space-y-4">
            <label className="block text-sm font-semibold">
              {tx(locale, "Email", "البريد الإلكتروني")}
              <input type="email" className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold" />
            </label>
            <label className="block text-sm font-semibold">
              {tx(locale, "Password", "كلمة المرور")}
              <input type="password" className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold" />
            </label>
            <button className="focus-ring inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-midnight font-bold text-white">
              <LockKeyhole className="h-5 w-5" />
              {tx(locale, "Login", "دخول")}
            </button>
          </form>
          <Link href="/register" className="focus-ring mt-4 inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm font-semibold text-ocean">
            <UserPlus className="h-4 w-4" />
            {tx(locale, "Create account", "إنشاء حساب")}
          </Link>
        </section>
      </div>
    </main>
  );
}
