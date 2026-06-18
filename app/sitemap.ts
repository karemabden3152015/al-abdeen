import type { MetadataRoute } from "next";
import { products } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const staticRoutes = ["", "/products", "/seller", "/affiliate", "/admin", "/about", "/contact", "/login", "/register"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date()
    })),
    ...products
      .filter((product) => product.status === "PUBLISHED")
      .map((product) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: new Date()
      }))
  ];
}
