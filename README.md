# Siddhant Yojit Portfolio CMS

This is the existing personal portfolio, extended into a custom CMS inside the same Next.js app.

## What changed

- Public pages still use the same visual design.
- Content now comes from Prisma-backed data instead of hard-coded arrays.
- Admin auth lives inside Next.js at `/admin/login` and `/admin/dashboard`.
- The contact page and Web3Forms integration are unchanged.

## Stack

- Next.js 16 App Router
- TypeScript
- Prisma ORM
- SQLite-compatible database
- Turso/libSQL for Vercel persistence

## Environment

Copy `.env.example` to your local environment and set:

- `DATABASE_URL`
- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`
- `ADMIN_SESSION_SECRET`
- `ADMIN_PASSWORD_HASH`

Local development can use:

```bash
DATABASE_URL="file:./prisma/dev.db"
```

Production on Vercel should point `DATABASE_URL` to your Turso libSQL URL and set `TURSO_AUTH_TOKEN`.
The install/build hooks automatically apply the checked-in SQLite migration SQL before Prisma Client generation.

## Admin login

The admin area is password-protected.

- Go to `/admin/login`
- Sign in with the password whose bcrypt hash is stored in `ADMIN_PASSWORD_HASH`
- The session is stored in an HTTP-only signed cookie
- Generate a hash with:

```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
```

## Development

```bash
npm install
npm run dev
```

The app seeds its initial portfolio content automatically from the existing site copy the first time the database is empty.

## Database

Prisma is configured in:

- [`prisma/schema.prisma`](/prisma/schema.prisma)
- [`prisma.config.ts`](/prisma.config.ts)

Useful scripts:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:deploy
npm run prisma:studio
```

## Deployment on Vercel

1. Create a Turso database.
2. Set Vercel environment variables:
   - `DATABASE_URL`
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
   - `ADMIN_SESSION_SECRET`
   - `ADMIN_PASSWORD_HASH`
3. Deploy normally on Vercel.
4. Visit `/admin/login` to manage the portfolio content.

## Content areas

Editable sections:

- Home
- Education
- Skills
- Projects
- My Work
- Certificate
- Experience

## Notes

- Images uploaded in the admin dashboard are stored as data URLs in the database so the app stays self-contained.
- The contact page and its form were intentionally left untouched.
