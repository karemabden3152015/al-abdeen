import { Link2, Store, TrendingUp, WalletCards } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { StatCard } from "@/components/stat-card";
import { StatusPill } from "@/components/status-pill";
import { formatEGP } from "@/lib/commerce";
import { platformSettings, recruiters, wallets } from "@/lib/mock-data";
import { getLocale, tx } from "@/lib/i18n";

export default async function RecruiterDashboardPage() {
  const locale = await getLocale();
  const recruiter = recruiters[0];
  const wallet = wallets.find((item) => item.owner === "Recruiter");
  const referralUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/sell?rec=${recruiter.code}`;

  return (
    <DashboardShell
      eyebrow={tx(locale, "Recruiter workspace", "لوحة جاذب البائعين")}
      title={tx(locale, "Recruiter dashboard", "لوحة تحكم جاذب البائعين")}
      nav={[
        [tx(locale, "Overview", "نظرة عامة"), "#overview"],
        [tx(locale, "Referral link", "رابط الإحالة"), "#link"],
        [tx(locale, "Wallet", "المحفظة"), "#wallet"]
      ]}
    >
      <section id="overview" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={tx(locale, "Invited sellers", "البائعون المدعوون")} value={String(recruiter.invitedSellers)} />
        <StatCard label={tx(locale, "Active sellers", "البائعون النشطون")} value={String(recruiter.activeSellers)} />
        <StatCard label={tx(locale, "Uploaded products", "المنتجات المرفوعة")} value={String(recruiter.uploadedProducts)} />
        <StatCard label={tx(locale, "Commission", "العمولة")} value={formatEGP(recruiter.commissionEGP)} />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div id="link" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-ocean" />
            <h2 className="font-bold">{tx(locale, "Your seller referral link", "رابط دعوة البائعين الخاص بك")}</h2>
          </div>
          <p className="mt-4 rounded-md bg-slate-50 p-3 text-sm text-slate-600">{referralUrl}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <StatusPill status={recruiter.status} locale={locale} />
            <span className="rounded-full bg-sand px-3 py-1 text-xs font-bold text-ocean">
              {tx(locale, "Fixed per active seller", "مبلغ ثابت لكل بائع نشط")}: {formatEGP(platformSettings.recruiterFixedCommissionEGP)}
            </span>
            <span className="rounded-full bg-sand px-3 py-1 text-xs font-bold text-ocean">
              {tx(locale, "Platform commission share", "نسبة من عمولة المنصة")}: {platformSettings.recruiterPlatformCommissionSharePercent}%
            </span>
          </div>
        </div>
        <div id="wallet" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <WalletCards className="h-6 w-6 text-ocean" />
            <div>
              <p className="text-sm text-slate-500">{tx(locale, "Recruiter wallet", "محفظة جاذب البائعين")}</p>
              <p className="text-2xl font-black">{formatEGP(wallet?.balanceEGP ?? 0)}</p>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {wallet?.transactions.map((transaction) => (
              <div key={`${transaction.reference}-${transaction.amountEGP}`} className="flex justify-between rounded-lg border border-slate-200 p-3 text-sm">
                <span>{transaction.reference}</span>
                <span className="font-bold">{formatEGP(transaction.amountEGP)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <Store className="h-6 w-6 text-ocean" />
          <h2 className="mt-3 font-bold">{tx(locale, "Seller performance", "أداء البائعين")}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">{tx(locale, "Track how many sellers joined, became active, and uploaded products.", "تابع عدد البائعين الذين انضموا وأصبحوا نشطين ورفعوا منتجات.")}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <TrendingUp className="h-6 w-6 text-ocean" />
          <h2 className="mt-3 font-bold">{tx(locale, "Sales volume", "حجم المبيعات")}</h2>
          <p className="mt-2 text-2xl font-black">{formatEGP(recruiter.salesEGP)}</p>
        </div>
      </section>
    </DashboardShell>
  );
}
