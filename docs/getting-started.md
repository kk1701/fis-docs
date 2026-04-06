---
title: Getting Started
sidebar_position: 3
---

# Getting Started

This guide walks you through setting up the complete FIS application locally — both the server and the client.

---

## Prerequisites

Make sure the following are installed on your machine before proceeding:

| Tool | Version | Purpose |
|---|---|---|
| Node.js | v18 or higher | Runtime for both server and client |
| npm | v9 or higher | Package manager |
| PostgreSQL | v14 or higher | Primary database |
| Git | Any recent version | Version control |

You will also need accounts on the following services:

| Service | Free Tier | Purpose |
|---|---|---|
| [Cloudinary](https://cloudinary.com) | Yes | Profile picture uploads |
| [Resend](https://resend.com) | Yes (3000 emails/month) | OTP emails for password reset |

---

## 1. Clone the Repositories

```bash
# server
git clone https://github.com/YOUR_USERNAME/fis-server.git
cd fis-server

# client (in a separate terminal)
git clone https://github.com/YOUR_USERNAME/fis-client.git
cd fis-client
```

---

## 2. Server Setup

### Install dependencies

```bash
cd fis-server
npm install
```

### Configure environment variables

Create a `.env` file in the root of `fis-server/`:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/fis"

JWT_SECRET="your_jwt_secret_here"

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

RESEND_API_KEY="re_your_api_key_here"
FROM_EMAIL="onboarding@resend.dev"
```

**Where to find these values:**

- `DATABASE_URL` — your local PostgreSQL connection string. Replace `USERNAME`, `PASSWORD`, and `fis` (database name) with your own values.
- `JWT_SECRET` — any long random string. You can generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
- `CLOUDINARY_*` — from your Cloudinary dashboard under Settings → Access Keys.
- `RESEND_API_KEY` — from your Resend dashboard under API Keys.
- `FROM_EMAIL` — use `onboarding@resend.dev` on the free tier. If you have a verified domain on Resend, use your own address.

### Create the database

Open your PostgreSQL client (psql or pgAdmin) and create the database:

```sql
CREATE DATABASE fis;
```

### Run migrations

```bash
npx prisma migrate dev
```

This creates all the tables defined in `schema.prisma`.

### Seed the database

```bash
npm run seed
```

This creates the default admin account and a sample department.

**Default admin credentials:**

| Field | Value |
|---|---|
| Email | admin@fis.com |
| Password | admin123 |

:::warning
Change the admin password immediately after your first login in a production environment.
:::

### Start the server

```bash
# development (watch mode)
npm run start:dev
```

The server runs on `http://localhost:3000`.

---

## 3. Client Setup

### Install dependencies

```bash
cd fis-client
npm install
```

### Configure environment variables

Create a `.env` file in the root of `fis-client/`:

```env
VITE_API_URL=http://localhost:3000
```

### Start the client

```bash
npm run dev
```

The client runs on `http://localhost:5173`.

---

## 4. Verify the Setup

With both server and client running, open `http://localhost:5173` in your browser. You should see the FIS landing page.

To verify everything is connected:

1. Go to `http://localhost:5173/login`
2. Log in with `admin@fis.com` / `admin123`
3. You should be redirected to the admin dashboard at `/admin/dashboard`
4. The stats card should show `0` faculty, `0` courses, and `1` department

If the dashboard loads without errors, the setup is complete.

---

## 5. Creating Your First Department and Course

Before faculty can register, at least one department must exist. The seed script creates one sample department. To add more:

1. Log in as admin
2. Go to **Departments** in the sidebar
3. Click **+ Add Department** and fill in the name and code
4. Go to **Courses** in the sidebar
5. Click **+ Add Course**, select the department, level, and credits

---

## 6. Registering a Faculty Account

1. Go to `http://localhost:5173/register`
2. Fill in name, email, department, and password
3. Submit — the account is created with `PENDING` status
4. Log in as admin and go to **Approvals**
5. Approve the faculty account
6. The faculty can now log in and access their full dashboard

---

## Common Issues

### `PrismaClientInitializationError` on seed

This means the `DATABASE_URL` in your `.env` is not being picked up. Make sure:
- The `.env` file is in the root of `fis-server/`, not inside `src/`
- The database name in the URL matches the database you created in PostgreSQL
- PostgreSQL is running

### CORS error in browser console

The server only allows requests from `http://localhost:5173` by default. If your client is running on a different port, update the `origin` in `main.ts`:

```typescript
app.enableCors({
  origin: 'http://localhost:YOUR_PORT',
  ...
});
```

### `Cannot find module` errors on server start

Run `npm install` again — a dependency may not have installed correctly.

### OTP emails not arriving

On the Resend free tier, emails can only be sent to the address registered on your Resend account unless you have a verified domain. During development, use the email address you signed up to Resend with when testing the forgot password flow.

---

## Useful Commands

### Server

```bash
npm run start:dev          # Start in watch mode
npm run build              # Compile TypeScript
npm run start:prod         # Run compiled output
npm run seed               # Seed admin + sample data
npx prisma studio          # Open Prisma Studio (database GUI)
npx prisma migrate dev --name <name>   # Create and run a new migration
```

### Client

```bash
npm run dev                # Start development server
npm run build              # Build for production
npm run preview            # Preview production build locally
```
