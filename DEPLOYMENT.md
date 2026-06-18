# AL-Abdeen Deployment Guide

## Vercel

1. Push this project to a Git repository.
2. Import the repository in Vercel.
3. Set environment variables from `.env.example`.
4. Use the included build command:

```bash
pnpm prisma:generate && pnpm build
```

5. For production, use PostgreSQL and update `DATABASE_URL`.

## Netlify

The project includes `netlify.toml`.

```bash
pnpm install
pnpm prisma:generate
pnpm build
```

Install `@netlify/plugin-nextjs` in your Netlify site if it is not auto-detected.

## Docker / VPS

```bash
docker build -t al-abdeen .
docker run -p 3000:3000 --env-file .env al-abdeen
```

For VPS deployments:

1. Use PostgreSQL.
2. Run migrations before starting the app.
3. Put the app behind Nginx or Caddy with HTTPS.
4. Configure backups for the database and uploaded media.

## Production Environment

Required:

```text
DATABASE_URL
NEXT_PUBLIC_APP_URL
AUTH_SECRET
AUTH_COOKIE_NAME
```

Optional future payment keys:

```text
PAYMOB_API_KEY
FAWRY_MERCHANT_CODE
STRIPE_SECRET_KEY
NEXT_PUBLIC_GA_ID
NEXT_PUBLIC_META_PIXEL_ID
NEXT_PUBLIC_TIKTOK_PIXEL_ID
SUPPORT_EMAIL
SUPPORT_PHONE
WHATSAPP_SUPPORT_NUMBER
```

## Business Email Setup

The project is prepared to use `support@alabdeen.com`, but the mailbox must be created inside the hosting or domain provider after the domain is purchased/connected.

Recommended options:

1. Hosting email from your provider, if included with the plan.
2. Zoho Mail or Google Workspace for a full mailbox.
3. Cloudflare Email Routing if you only need forwarding at first.

Launch steps:

1. Buy/connect the production domain.
2. Create the mailbox `support@alabdeen.com`.
3. Add the MX, SPF, DKIM, and DMARC records provided by the email host.
4. Set `SUPPORT_EMAIL`, `MAIL_FROM`, `SUPPORT_PHONE`, and `WHATSAPP_SUPPORT_NUMBER` in the hosting dashboard.
5. Send a test message from the contact page after deployment.

## Real Database Launch

SQLite is for development only. For a real site used by customers:

1. Create PostgreSQL.
2. Update Prisma datasource provider to `postgresql`.
3. Set `DATABASE_URL` in the hosting dashboard.
4. Run migrations with `pnpm prisma:migrate deploy`.
5. Seed only safe production data, then change all demo passwords.
6. Connect image storage before allowing sellers to upload real images.

## Launch Checklist

- Production build passes
- Prisma migrations applied
- Seed data removed or replaced
- Admin account password changed
- Real domain configured in `NEXT_PUBLIC_APP_URL`
- Email/SMS provider connected
- Image uploads moved to object storage
- Payment gateway tested in sandbox before activation
