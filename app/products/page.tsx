import { Filter } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/mock-data";
import { getLocale, localizedName, tx } from "@/lib/i18n";

type ProductsPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    min?: string;
    max?: string;
    rating?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const locale = await getLocale();
  const params = await searchParams;
  const query = params.q?.toLowerCase() ?? "";
  const filtered = products.filter((product) => {
    const matchesQuery = !query || [product.nameEn, product.nameAr, product.descriptionEn].join(" ").toLowerCase().includes(query);
    const matchesCategory = !params.category || product.categorySlug === params.category;
    const matchesMin = !params.min || product.priceEGP >= Number(params.min);
    const matchesMax = !params.max || product.priceEGP <= Number(params.max);
    const matchesRating = !params.rating || product.rating >= Number(params.rating);
    return product.status === "PUBLISHED" && matchesQuery && matchesCategory && matchesMin && matchesMax && matchesRating;
  });

  return (
    <main className="container-shell py-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-ocean">{tx(locale, "Marketplace", "السوق")}</p>
        <h1 className="text-3xl font-black text-ink">{tx(locale, "Products", "المنتجات")}</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-2 font-semibold">
            <Filter className="h-5 w-5 text-ocean" />
            {tx(locale, "Filters", "الفلاتر")}
          </div>
          <form className="space-y-4">
            <label className="block text-sm font-semibold">
              {tx(locale, "Search", "بحث")}
              <input name="q" defaultValue={params.q} className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold" />
            </label>
            <label className="block text-sm font-semibold">
              {tx(locale, "Category", "القسم")}
              <select name="category" defaultValue={params.category} className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold">
                <option value="">{tx(locale, "All", "الكل")}</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {localizedName(locale, category)}
                  </option>
                ))}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="block text-sm font-semibold">
                {tx(locale, "Min", "الأقل")}
                <input name="min" type="number" defaultValue={params.min} className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold" />
              </label>
              <label className="block text-sm font-semibold">
                {tx(locale, "Max", "الأعلى")}
                <input name="max" type="number" defaultValue={params.max} className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold" />
              </label>
            </div>
            <label className="block text-sm font-semibold">
              {tx(locale, "Rating", "التقييم")}
              <select name="rating" defaultValue={params.rating} className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-gold">
                <option value="">{tx(locale, "Any", "أي تقييم")}</option>
                <option value="4">4+</option>
                <option value="4.5">4.5+</option>
              </select>
            </label>
            <button className="focus-ring h-11 w-full rounded-md bg-midnight font-semibold text-white">{tx(locale, "Apply", "تطبيق")}</button>
          </form>
        </aside>
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">{tx(locale, `${filtered.length} products found`, `تم العثور على ${filtered.length} منتج`)}</p>
            <select aria-label={tx(locale, "Sort products", "ترتيب المنتجات")} className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-gold">
              <option>{tx(locale, "Featured", "المميزة")}</option>
              <option>{tx(locale, "Price low to high", "السعر من الأقل للأعلى")}</option>
              <option>{tx(locale, "Top rated", "الأعلى تقييماً")}</option>
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
