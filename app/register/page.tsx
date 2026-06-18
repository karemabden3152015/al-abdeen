import { BadgeDollarSign, Store, UserPlus } from "lucide-react";
import { getLocale, tx } from "@/lib/i18n";

export default async function RegisterPage() {
  const locale = await getLocale();

  return (
    <main className="container-shell grid min-h-[calc(100vh-80px)] items-center py-8">
      <form className="mx-auto w-full max-w-3xl rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-black text-ink">{tx(locale, "Create account", "إنشاء حساب")}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {tx(locale, "Customers can shop immediately. Seller, affiliate, and recruiter requests enter an admin approval workflow.", "يمكن للعملاء التسوق مباشرة. طلبات البائعين والمسوقين وجاذبي البائعين تدخل مسار موافقة الأدمن.")}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold">
            {tx(locale, "Name", "الاسم")}
            <input className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold" />
          </label>
          <label className="block text-sm font-semibold">
            {tx(locale, "Email", "البريد الإلكتروني")}
            <input type="email" className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold" />
          </label>
          <label className="block text-sm font-semibold">
            {tx(locale, "Password", "كلمة المرور")}
            <input type="password" className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold" />
          </label>
          <label className="block text-sm font-semibold">
            {tx(locale, "Account path", "نوع الحساب")}
            <select className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold">
              <option>{tx(locale, "Customer", "عميل")}</option>
              <option>{tx(locale, "Seller request", "طلب بائع")}</option>
              <option>{tx(locale, "Affiliate request", "طلب مسوق")}</option>
              <option>{tx(locale, "Recruiter request", "طلب جاذب بائعين")}</option>
            </select>
          </label>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <Store className="h-5 w-5 text-ocean" />
            <p className="mt-2 font-bold">{tx(locale, "Seller approval", "موافقة البائع")}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{tx(locale, "Seller stores start as pending until admin approval.", "تبدأ المتاجر كطلبات معلقة حتى موافقة الأدمن.")}</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <BadgeDollarSign className="h-5 w-5 text-ocean" />
            <p className="mt-2 font-bold">{tx(locale, "Affiliate and recruiter approval", "موافقة المسوقين وجاذبي البائعين")}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{tx(locale, "Affiliates and recruiters receive unique referral codes after review.", "يحصل المسوقون وجاذبو البائعين على أكواد إحالة بعد المراجعة.")}</p>
          </div>
        </div>
        <button className="focus-ring mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-midnight font-bold text-white">
          <UserPlus className="h-5 w-5" />
          {tx(locale, "Register", "تسجيل")}
        </button>
      </form>
    </main>
  );
}
