"use client";

import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";

type AppLocale = "en" | "ar";
const LOCALE_COOKIE = "alabdeen_locale";

export function LanguageSwitcher({ locale, compact = false }: { locale: AppLocale; compact?: boolean }) {
  const router = useRouter();
  const nextLocale: AppLocale = locale === "ar" ? "en" : "ar";

  function switchLanguage() {
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    window.localStorage.setItem(LOCALE_COOKIE, nextLocale);
    document.documentElement.lang = nextLocale;
    document.documentElement.dir = nextLocale === "ar" ? "rtl" : "ltr";
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={switchLanguage}
      className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-md border border-current/20 px-3 text-sm font-bold hover:border-gold hover:text-gold"
      aria-label={locale === "ar" ? "Switch to English" : "تغيير اللغة إلى العربية"}
      title={locale === "ar" ? "English" : "العربية"}
    >
      <Languages className="h-4 w-4" />
      {compact ? nextLocale.toUpperCase() : locale === "ar" ? "English" : "العربية"}
    </button>
  );
}
