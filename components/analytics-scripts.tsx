import Script from "next/script";
import { platformSettings } from "@/lib/mock-data";

export function AnalyticsScripts() {
  const googleId = process.env.NEXT_PUBLIC_GA_ID || platformSettings.analytics.googleAnalyticsId;
  const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID || platformSettings.analytics.metaPixelId;
  const tiktokId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || platformSettings.analytics.tiktokPixelId;

  return (
    <>
      {googleId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleId}');
          `}</Script>
        </>
      ) : null}
      {metaId ? <Script id="meta-pixel-placeholder" strategy="afterInteractive">{`window.AL_ABDEEN_META_PIXEL='${metaId}';`}</Script> : null}
      {tiktokId ? <Script id="tiktok-pixel-placeholder" strategy="afterInteractive">{`window.AL_ABDEEN_TIKTOK_PIXEL='${tiktokId}';`}</Script> : null}
    </>
  );
}
