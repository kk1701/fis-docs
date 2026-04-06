---
title: Architecture Overview
sidebar_position: 2
---

# Architecture Overview

FIS is a decoupled full-stack application — the frontend and backend are completely separate projects that communicate over HTTP. This page explains how the system is structured, how the parts connect, and what each layer is responsible for.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        CLIENT                           │
│                                                         │
│   React + TypeScript + Vite        localhost:5173       │
│                                                         │
│   ┌──────────┐  ┌──────────┐  ┌──────────────────┐     │
│   │  Zustand │  │  Axios   │  │ React Hook Form  │     │
│   │  (state) │  │  (HTTP)  │  │ + Zod (forms)    │     │
│   └──────────┘  └──────────┘  └──────────────────┘     │
└────────────────────────┬────────────────────────────────┘
                         │ REST API (JSON)
                         │ JWT in Authorization header
                         ▼
┌─────────────────────────────────────────────────────────┐
│                        SERVER                           │
│                                                         │
│   NestJS + TypeScript              localhost:3000       │
│                                                         │
│   ┌──────────┐  ┌──────────┐  ┌──────────────────┐     │
│   │ Guards   │  │ Services │  │    Prisma ORM    │     │
│   │ JWT/Role │  │ Business │  │  (DB queries)    │     │
│   │ Approved │  │  logic   │  │                  │     │
│   └──────────┘  └──────────┘  └────────┬─────────┘     │
└────────────────────────────────────────┼────────────────┘
                                         │
                    ┌────────────────────┼────────────────┐
                    │                    │                 │
                    ▼                    ▼                 ▼
            ┌─────────────┐    ┌──────────────┐  ┌──────────────┐
            │ PostgreSQL  │    │  Cloudinary  │  │    Resend    │
            │  Database   │    │(profile pics)│  │   (emails)   │
            └─────────────┘    └──────────────┘  └──────────────┘
```

---

## Layers Explained

### Client (Frontend)

The client is a single-page application built with React and TypeScript, bundled with Vite. It is responsible for:

- Rendering the UI for faculty, admin, and public users
- Managing authentication state via Zustand with localStorage persistence
- Making all API calls through a central Axios instance with JWT interceptors
- Validating form inputs client-side using React Hook Form and Zod before sending to the server
- Rendering charts using Recharts and generating downloadable PDFs using jsPDF

The client has no direct database access — it only talks to the server via REST API.

### Server (Backend)

The server is a NestJS application structured as a collection of modules, each responsible for a domain of the application. It handles:

- Authentication and authorization via JWT and role-based guards
- All business logic and data validation
- Database operations via Prisma ORM
- File uploads to Cloudinary
- Email delivery via Resend

The server exposes a REST API consumed exclusively by the client. There is no server-side rendering.

### Database

PostgreSQL is the primary data store. All schema changes are managed through Prisma migrations — the `schema.prisma` file is the single source of truth for the database structure.

### Third-party Services

| Service | Purpose | When it is called |
|---|---|---|
| Cloudinary | Profile picture storage and CDN delivery | When faculty uploads a profile picture |
| Resend | Transactional email delivery | When faculty requests a password reset OTP |

---

## Request Lifecycle

A typical authenticated request from the client to the server follows this path:

```
1. User action in React UI
      ↓
2. Axios sends HTTP request
   — Authorization: Bearer <token> header attached by interceptor
      ↓
3. NestJS receives request
      ↓
4. JwtAuthGuard validates token
   — Decodes payload, attaches { userId, email, role } to req.user
      ↓
5. RolesGuard checks req.user.role (if @Roles decorator present)
      ↓
6. ApprovedGuard checks faculty status === APPROVED (if present)
      ↓
7. Controller method executes
      ↓
8. Service method runs business logic
      ↓
9. Prisma executes database query
      ↓
10. Response returned to client
```

If any guard fails, the request is rejected with a `401 Unauthorized` or `403 Forbidden` response before reaching the controller.

---

## Authentication Flow

```
Faculty registers
      ↓
User + Faculty rows created in DB (status = PENDING)
      ↓
Faculty logs in → receives JWT
      ↓
Client calls /auth/me → gets status
      ↓
status = PENDING → dashboard shows pending banner
status = APPROVED → full dashboard access
status = REJECTED → login allowed, limited access
```

The JWT payload contains `{ sub: userId, email, role }`. It does not contain `status` — status is always fetched fresh from `/auth/me` on login to reflect any changes made by the admin.

---

## Module Structure (Server)

```
src/
├── auth/                 # JWT strategy, login, register, OTP, password reset
├── users/                # User CRUD
├── departments/          # Department management
├── courses/              # Course catalog
├── faculty-profile/      # Personal info, academic profile, addresses, photo upload
├── faculty-courses/      # Teaching history
├── faculty-experiences/  # Experience entries
├── faculty-publications/ # Publications
├── faculty-education/    # Degree records
├── faculty-supervision/  # Thesis and dissertation supervisions
├── approvals/            # Faculty approval workflow
├── admin/                # Admin dashboard, stats, exports, dept/course management
├── analytics/            # All 8 analytics report queries
├── published-reports/    # Admin publish + public read of report snapshots
├── cloudinary/           # Cloudinary upload service
└── mail/                 # Resend email service
```

Each module follows NestJS conventions — a `module.ts`, `controller.ts`, `service.ts`, and `dto/` folder for request/response shapes.

---

## Page Structure (Client)

```
src/pages/
├── auth/           # Login, Register, Forgot Password, Verify OTP, Reset Password
├── faculty/        # Faculty dashboard with 7 tabs
├── admin/          # Admin dashboard with sidebar + 7 sections + 8 analytics reports
├── directory/      # Public faculty directory + individual profile pages
├── reports/        # Public reports listing + report detail with charts
└── LandingPage.tsx # Public landing page
```

---

## Key Design Decisions

**Decoupled architecture**
The client and server are completely independent. They can be deployed separately, scaled independently, and the client can be replaced or redesigned without touching the server.

**Guard execution order**
NestJS guards must be passed in a single `@UseGuards()` call — stacking multiple decorators causes only the last one to execute. All routes follow the pattern `@UseGuards(JwtAuthGuard, ApprovedGuard)`.

**Snapshot-based public reports**
When an admin publishes a report, the current analytics data is saved as a JSON snapshot in the `PublishedReport` table. The public sees this fixed snapshot rather than live data — this gives the admin full control over what is published and when.

**Soft delete**
Users are never permanently deleted. The `deletedAt` field is set instead, and all queries filter out records where `deletedAt` is not null. This preserves historical data and audit trails.

**Transaction-based registration**
Faculty registration creates both a `User` row and a `Faculty` row in a single Prisma transaction. If either fails, both are rolled back — there are no orphaned records.
