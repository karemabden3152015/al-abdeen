import { clsx } from "clsx";
import type { AppLocale } from "@/lib/i18n";
import { statusLabel } from "@/lib/i18n";

const toneByStatus: Record<string, string> = {
  PUBLISHED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PENDING_REVIEW: "bg-amber-50 text-amber-700 border-amber-200",
  REJECTED: "bg-rose-50 text-rose-700 border-rose-200",
  DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CONFIRMED: "bg-sky-50 text-sky-700 border-sky-200",
  PROCESSING: "bg-indigo-50 text-indigo-700 border-indigo-200",
  SHIPPED: "bg-blue-50 text-blue-700 border-blue-200",
  RETURNED: "bg-orange-50 text-orange-700 border-orange-200",
  REFUNDED: "bg-slate-100 text-slate-700 border-slate-300",
  PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  CANCELLED: "bg-rose-50 text-rose-700 border-rose-200"
};

export function StatusPill({ status, locale = "en" }: { status: string; locale?: AppLocale }) {
  return (
    <span className={clsx("inline-flex rounded-full border px-2 py-1 text-xs font-bold", toneByStatus[status] ?? "border-slate-200 bg-slate-50 text-slate-700")}>
      {statusLabel(locale, status)}
    </span>
  );
}
