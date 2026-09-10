# Gouri Fashions

Premium men's fashion catalog + secure admin CMS.

## Stack
- Next.js App Router
- MongoDB Atlas + Mongoose
- JWT-style signed HTTP-only cookie auth using `jose`
- Optional Cloudinary direct media uploads
- Vercel-ready

## Local setup

1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local`.
3. Create a MongoDB Atlas database and put the connection string in `MONGODB_URI`.
4. Set a strong `AUTH_SECRET`.
5. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
6. Install and run:

```bash
npm install
npm run seed-admin
npm run dev
```

Open `http://localhost:3000`.

Admin: `http://localhost:3000/admin/login`

## Media
The CMS accepts image/video URLs immediately. For actual uploads in production, configure Cloudinary values in `.env.local`. The upload signature API is included; wire the Cloudinary upload widget/button in the admin media form if you want direct uploads.

## Vercel
Push the project to GitHub, import it into Vercel, and add all required environment variables. Do not commit `.env.local`.

## Important
MongoDB stores product/content metadata and media URLs. Do not store large video binaries inside MongoDB.
