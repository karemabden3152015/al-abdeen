import { cookies } from "next/headers";

export type AppLocale = "en" | "ar";

export const LOCALE_COOKIE = "alabdeen_locale";

export async function getLocale(): Promise<AppLocale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return value === "ar" ? "ar" : "en";
}

export function isArabic(locale: AppLocale) {
  return locale === "ar";
}

export function dir(locale: AppLocale) {
  return isArabic(locale) ? "rtl" : "ltr";
}

export function tx(locale: AppLocale, en: string, ar: string) {
  return isArabic(locale) ? ar : en;
}

export function statusLabel(locale: AppLocale, status: string) {
  const labels: Record<string, { en: string; ar: string }> = {
    PENDING: { en: "Pending", ar: "قيد الانتظار" },
    PENDING_REVIEW: { en: "Pending review", ar: "بانتظار المراجعة" },
    CONFIRMED: { en: "Confirmed", ar: "تم التأكيد" },
    PROCESSING: { en: "Processing", ar: "قيد التجهيز" },
    SHIPPED: { en: "Shipped", ar: "تم الشحن" },
    DELIVERED: { en: "Delivered", ar: "تم التسليم" },
    CANCELLED: { en: "Cancelled", ar: "ملغي" },
    RETURNED: { en: "Returned", ar: "مرتجع" },
    REFUNDED: { en: "Refunded", ar: "تم رد المبلغ" },
    PAID: { en: "Paid", ar: "مدفوع" },
    AUTHORIZED: { en: "Authorized", ar: "مصرح" },
    FAILED: { en: "Failed", ar: "فشل" },
    PUBLISHED: { en: "Published", ar: "منشور" },
    REJECTED: { en: "Rejected", ar: "مرفوض" },
    APPROVED: { en: "Approved", ar: "مقبول" },
    SUSPENDED: { en: "Suspended", ar: "موقوف" },
    DRAFT: { en: "Draft", ar: "مسودة" },
    ARCHIVED: { en: "Archived", ar: "مؤرشف" }
  };

  const label = labels[status];
  return label ? tx(locale, label.en, label.ar) : status.replaceAll("_", " ");
}

export function localizedName(locale: AppLocale, item: { nameEn: string; nameAr: string }) {
  return tx(locale, item.nameEn, item.nameAr);
}

export function localizedDescription(locale: AppLocale, item: { descriptionEn: string; descriptionAr: string }) {
  return tx(locale, item.descriptionEn, item.descriptionAr);
}
