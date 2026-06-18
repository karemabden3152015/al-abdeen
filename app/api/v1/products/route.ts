import { NextResponse } from "next/server";
import { products } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q")?.toLowerCase();

  const data = products.filter((product) => {
    const matchesCategory = !category || product.categorySlug === category;
    const matchesQuery = !q || `${product.nameEn} ${product.nameAr} ${product.descriptionEn}`.toLowerCase().includes(q);
    return product.status === "PUBLISHED" && matchesCategory && matchesQuery;
  });

  return NextResponse.json({ products: data });
}
