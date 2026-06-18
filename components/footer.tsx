import { Facebook, Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { AppLocale } from "@/lib/i18n";
import { tx } from "@/lib/i18n";

export function Footer({ locale }: { locale: AppLocale }) {
  return (
    <footer className="mt-12 bg-midnight text-white">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src="/icons/icon-192.png" alt="Al-Abdeen icon" className="h-12 w-12 rounded-md" />
            <div>
              <p className="font-[var(--font-kufi)] text-lg font-black">{tx(locale, "Al-Abdeen", "العابدين")}</p>
              <p className="text-xs uppercase tracking-[0.24em] text-gold">{tx(locale, "Marketplace", "ماركت بليس")}</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
            {tx(locale, "Premium bilingual marketplace architecture for sellers, affiliates, recruiters, customers, COD orders, wallets, and future payment gateways.", "منصة سوق احترافية ثنائية اللغة للبائعين والمسوقين وجاذبي البائعين والعملاء والدفع عند الاستلام والمحافظ وبوابات الدفع المستقبلية.")}
          </p>
          <div className="mt-4">
            <LanguageSwitcher locale={locale} />
          </div>
          <div className="mt-4 flex gap-2">
            {[Facebook, Instagram, Send].map((Icon, index) => (
              <button key={index} aria-label="Social link" className="grid h-9 w-9 place-items-center rounded-md border border-white/15 text-white/80 hover:border-gold hover:text-gold">
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-bold text-gold">{tx(locale, "Shop", "تسوق")}</h2>
          <div className="mt-3 grid gap-2 text-sm text-white/70">
            <Link href="/products">{tx(locale, "All categories", "جميع الأقسام")}</Link>
            <Link href="/products?sort=best-sellers">{tx(locale, "Best sellers", "الأكثر مبيعاً")}</Link>
            <Link href="/products?sort=new-arrivals">{tx(locale, "New arrivals", "وصل حديثاً")}</Link>
            <Link href="/affiliate">{tx(locale, "Affiliate program", "برنامج المسوقين")}</Link>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-gold">{tx(locale, "Support", "المساعدة")}</h2>
          <div className="mt-3 grid gap-2 text-sm text-white/70">
            <Link href="/account">{tx(locale, "Track orders", "تتبع الطلبات")}</Link>
            <Link href="/sell">{tx(locale, "Sell on Al-Abdeen", "بيع على العابدين")}</Link>
            <Link href="/recruiters">{tx(locale, "Recruit sellers", "جذب البائعين")}</Link>
            <Link href="/about">{tx(locale, "About", "من نحن")}</Link>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-gold">{tx(locale, "Contact", "تواصل معنا")}</h2>
          <div className="mt-3 grid gap-3 text-sm text-white/70">
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> 01124460043</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> support@alabdeen.com</p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> Cairo, Egypt</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/55">
        {tx(locale, "© 2026 Al-Abdeen Marketplace. COD active. Online payments scaffolded for future launch.", "© 2026 العابدين ماركت بليس. الدفع عند الاستلام متاح والمدفوعات الإلكترونية مجهزة للإطلاق لاحقاً.")}
      </div>
    </footer>
  );
}
