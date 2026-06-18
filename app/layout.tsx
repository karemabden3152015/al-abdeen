import type { Metadata } from "next";
import { Inter, Noto_Kufi_Arabic } from "next/font/google";
import { AnalyticsScripts } from "@/components/analytics-scripts";
import { ChatBot } from "@/components/chatbot";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PwaRegister } from "@/components/pwa-register";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { dir, getLocale, tx } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const kufi = Noto_Kufi_Arabic({ subsets: ["arabic"], variable: "--font-kufi" });

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
    title: tx(locale, "Al-Abdeen Marketplace", "العابدين ماركت بليس"),
    description: tx(
      locale,
      "Premium bilingual marketplace platform for customers, sellers, affiliates, recruiters, COD orders, wallets, and future online payments.",
      "منصة سوق إلكتروني احترافية ثنائية اللغة للعملاء والبائعين والمسوقين وجاذبي البائعين والدفع عند الاستلام والمحافظ والمدفوعات المستقبلية."
    ),
    applicationName: tx(locale, "Al-Abdeen Marketplace", "العابدين ماركت بليس"),
    manifest: "/manifest.webmanifest",
    icons: {
      icon: "/icons/icon-192.png",
      apple: "/icons/apple-touch-icon.png"
    },
    openGraph: {
      title: tx(locale, "Al-Abdeen Marketplace", "العابدين ماركت بليس"),
      description: tx(locale, "Shop more, sell more, earn more with Al-Abdeen.", "تسوق أكثر، بيع أكثر، اربح أكثر مع العابدين."),
      images: ["/brand/homepage-hero-premium.png"]
    }
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={`${inter.variable} ${kufi.variable} font-sans antialiased`}>
        <AnalyticsScripts />
        <PwaRegister />
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
        <ChatBot locale={locale} />
        <WhatsAppButton locale={locale} />
      </body>
    </html>
  );
}
