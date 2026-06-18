import { NextResponse } from "next/server";
import { affiliates, products } from "@/lib/mock-data";
import { createProductUrl } from "@/lib/commerce";

export async function GET() {
  const affiliate = affiliates[0];
  return NextResponse.json({
    affiliate,
    links: products
      .filter((product) => product.status === "PUBLISHED")
      .map((product) => ({
        productId: product.id,
        slug: product.slug,
        url: `${createProductUrl(product.slug)}?ref=${affiliate.code}`
      }))
  });
}
