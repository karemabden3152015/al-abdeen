# AL-Abdeen Marketplace Platform

AL-Abdeen is a production-oriented Next.js marketplace platform inspired by Amazon/Noon concepts with original branding, seller workflows, affiliate referrals, wallet accounting, commission splitting, COD checkout, and payment-gateway-ready architecture.

## Included

- Customer storefront, product listing, product details, cart, checkout, account pages
- Seller dashboard with approval state, product management, stock alerts, seller wallet, orders, reports
- Affiliate dashboard with referral links, clicks, sales, wallet earnings, product promotion
- Recruiter dashboard with seller referral link, invited sellers, uploaded products, sales volume, and recruiter commissions
- Public seller recruitment page at `/sell`
- Public recruiter/affiliate recruitment page at `/recruiters`
- Admin dashboard with analytics, commissions, affiliates, approvals, wallets, coupons, shipping, reviews, notifications, payment provider readiness
- Full Arabic/English switching with persisted cookie, RTL for Arabic, LTR for English
- WhatsApp support button, professional in-app chatbot, and editable message templates scaffold
- Seller plans: Free, Silver, Gold
- Analytics placeholders for Google Analytics, Meta Pixel, and TikTok Pixel
- Prisma schema for sellers, affiliates, wallets, coupons, shipping zones, inventory, reviews, notifications, payments, refunds
- Seed data and demo accounts
- SEO: slugs, metadata, Open Graph, sitemap, robots, product JSON-LD
- PWA: manifest, app icons, service worker, offline fallback
- API layer ready for Flutter / React Native clients
- Deployment files for Vercel, Netlify, Docker/VPS

## Branding

The official visual identity is stored in:

- `public/brand/al-abdeen-brand-kit.png`
- `public/brand/logo-lockup.png`
- `public/brand/homepage-hero-premium.png`
- `public/brand/brand-logo-card.png`
- `public/brand/brand-icon-row.png`
- `public/brand/icons/*.png`
- `public/brand/seller-hero.png`
- `public/brand/logistics-hero.png`
- `public/brand/marketplace-hero.png`
- `public/icons/icon-192.png`
- `public/icons/icon-512.png`

Primary colors:

- Dark blue: `#0F172A`
- Gold: `#D4AF37`
- White: `#FFFFFF`
- Black: `#111111`

## Demo Accounts

All demo accounts use `Password123!`.

- Admin: `admin@al-abdeen.test`
- Seller: `seller@al-abdeen.test`
- Customer: `customer@al-abdeen.test`
- Affiliate: `affiliate@al-abdeen.test`
- Recruiter: `recruiter@al-abdeen.test`

## Local Setup

```bash
cp .env.example .env
pnpm install
pnpm prisma:generate
pnpm prisma:migrate --name init
pnpm db:seed
pnpm dev
```

Open `http://localhost:3000`.

## Commission Engine

Commission priority:

1. Product-specific commission
2. Category commission
3. Global commission

The engine supports:

- Product price
- Platform commission
- Affiliate commission
- Seller earning
- Wallet transactions

Example:

```text
Product price: 1000 EGP
Platform commission: 10% = 100 EGP
Affiliate commission: 3% = 30 EGP
Seller earns: 870 EGP
```

## Payment Architecture

Only these are active now:

- Cash on Delivery
- Manual Confirmation

Prepared adapters:

- Paymob
- Fawry
- Stripe
- Visa
- Mastercard

Payment fields already support provider, transaction IDs, payment status, and refunds. Real gateway keys are intentionally empty in `.env.example`.

## Mobile App Ready APIs

Examples:

- `GET /api/v1/products`
- `GET /api/v1/products?category=electronics`
- `GET /api/v1/affiliate`
- `GET /api/v1/wallets`
- `GET /api/v1/recruiters`
- `GET /api/v1/settings`
- `POST /api/orders`

These routes return JSON suitable for Flutter or React Native clients.

## Production Notes

This project is ready to deploy as a full Next.js app. SQLite is included for development; for production, switch Prisma datasource to PostgreSQL and set `DATABASE_URL` to your managed database.

## Going Live With Real Data

For a real public launch:

1. Create a PostgreSQL database on Vercel Postgres, Neon, Supabase, Railway, Render, or your VPS.
2. Change `prisma/schema.prisma` datasource provider from `sqlite` to `postgresql`.
3. Set production `DATABASE_URL`.
4. Run:

```bash
pnpm prisma:generate
pnpm prisma:migrate deploy
pnpm db:seed
pnpm build
```

5. Replace demo seed data with your real categories, sellers, products, shipping zones, and admin account.
6. Upload product images to object storage such as S3, Cloudflare R2, Supabase Storage, or UploadThing.

Recommended production work before accepting real money:

- Replace demo auth with a complete session provider
- Enable real email/SMS notifications
- Connect a payment adapter and run gateway sandbox tests
- Add server-side admin forms and audit logs
- Use object storage for seller image uploads
