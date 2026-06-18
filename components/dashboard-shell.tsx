import Link from "next/link";
import type { ReactNode } from "react";

export function DashboardShell({
  title,
  eyebrow,
  nav,
  children
}: {
  title: string;
  eyebrow: string;
  nav: Array<[string, string]>;
  children: ReactNode;
}) {
  return (
    <main className="container-shell py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-ocean">{eyebrow}</p>
          <h1 className="text-3xl font-black text-ink">{title}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="focus-ring rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold hover:border-gold">
              {label}
            </Link>
          ))}
        </div>
      </div>
      {children}
    </main>
  );
}
