import { Heart, LayoutDashboard, Menu, Search, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { AppLocale } from "@/lib/i18n";
import { tx } from "@/lib/i18n";

export function Header({ locale }: { locale: AppLocale }) {
  const navItems = [
    [tx(locale, "Products", "المنتجات"), "/products"],
    [tx(locale, "Affiliate", "المسوقين"), "/affiliate"],
    [tx(locale, "Recruiter", "جذب البائعين"), "/recruiter"],
    [tx(locale, "Sell", "بيع معنا"), "/sell"],
    [tx(locale, "Admin", "الأدمن"), "/admin"],
    [tx(locale, "Contact", "اتصل بنا"), "/contact"]
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-midnight text-white shadow-sm">
      <div className="container-shell flex min-h-20 items-center gap-3">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-md">
          <img src="/icons/icon-192.png" alt="Al-Abdeen logo" className="h-12 w-12 rounded-md object-cover" />
          <div className="leading-tight">
            <p className="font-[var(--font-kufi)] text-lg font-black tracking-wide text-white">{tx(locale, "Al-Abdeen", "العابدين")}</p>
            <p className="font-[var(--font-kufi)] text-xs text-white/70">{tx(locale, "Marketplace", "ماركت بليس")}</p>
          </div>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="focus-ring rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-3">
          <LanguageSwitcher locale={locale} compact />
          <Link href="/products" aria-label={tx(locale, "Search", "البحث")} className="focus-ring grid h-10 w-10 place-items-center rounded-md hover:bg-white/10">
            <Search className="h-5 w-5" />
          </Link>
          <Link href="/account" aria-label={tx(locale, "Wishlist", "المفضلة")} className="focus-ring grid h-10 w-10 place-items-center rounded-md hover:bg-white/10">
            <Heart className="h-5 w-5" />
          </Link>
          <Link href="/cart" aria-label={tx(locale, "Cart", "السلة")} className="focus-ring relative grid h-10 w-10 place-items-center rounded-md hover:bg-white/10">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink">2</span>
          </Link>
          <Link href="/login" aria-label={tx(locale, "Account", "الحساب")} className="focus-ring hidden h-10 items-center gap-2 rounded-md bg-gold px-3 text-sm font-semibold text-ink sm:inline-flex">
            <UserRound className="h-4 w-4" />
            {tx(locale, "Login", "دخول")}
          </Link>
          <Link href="/admin" aria-label={tx(locale, "Dashboard", "لوحة التحكم")} className="focus-ring hidden h-10 w-10 place-items-center rounded-md hover:bg-white/10 sm:grid">
            <LayoutDashboard className="h-5 w-5" />
          </Link>
          <button aria-label={tx(locale, "Menu", "القائمة")} className="focus-ring grid h-10 w-10 place-items-center rounded-md hover:bg-white/10 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
