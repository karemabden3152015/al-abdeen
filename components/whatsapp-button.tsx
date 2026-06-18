import { MessageCircle } from "lucide-react";
import type { AppLocale } from "@/lib/i18n";
import { tx } from "@/lib/i18n";
import { platformSettings } from "@/lib/mock-data";

export function WhatsAppButton({ locale }: { locale: AppLocale }) {
  const message = tx(
    locale,
    "Hello Al-Abdeen support, I need help with my order.",
    "مرحباً دعم العابدين، أحتاج مساعدة بخصوص طلبي."
  );
  const phone = platformSettings.whatsappSupportNumber.replace(/[^\d]/g, "");

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 z-50 inline-flex h-12 items-center gap-2 rounded-full bg-emerald-600 px-4 font-bold text-white shadow-soft hover:bg-emerald-700 ltr:right-5 rtl:left-5"
      aria-label={tx(locale, "WhatsApp support", "دعم واتساب")}
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">{tx(locale, "Support", "الدعم")}</span>
    </a>
  );
}
