import { clsx } from "clsx";

export function StatCard({ label, value, compact = false }: { label: string; value: string; compact?: boolean }) {
  return (
    <div className={clsx("rounded-lg border border-slate-200 bg-white", compact ? "p-3" : "p-4 shadow-sm")}>
      <p className={clsx("font-black text-ink", compact ? "text-lg" : "text-2xl")}>{value}</p>
      <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
}
