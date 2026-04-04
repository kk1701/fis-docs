---
title: User Roles & Permissions
sidebar_position: 4
---

# User Roles & Permissions

FIS has two authenticated roles — **Admin** and **Faculty** — plus unauthenticated **Public** access. This page describes what each role can and cannot do across every part of the application.

---

## Roles Overview

| Role | How it is assigned | Account status required |
|---|---|---|
| **Admin** | Seeded directly into the database | Always active |
| **Faculty** | Self-registration via `/register` | Must be `APPROVED` for write access |
| **Public** | No account required | N/A |

---

## Account Status (Faculty only)

Faculty accounts go through an approval lifecycle managed by the admin:

```
PENDING → APPROVED → (optionally) SUSPENDED
              ↓
           REJECTED
```

| Status | What the faculty can do |
|---|---|
| `PENDING` | Log in, view the pending banner, change password |
| `APPROVED` | Full dashboard access — read and write all profile sections |
| `REJECTED` | Log in, view rejection notice, no write access |
| `SUSPENDED` | Treated the same as rejected — no write access |

The `ApprovedGuard` on the server enforces this — all faculty write endpoints reject requests where `status !== APPROVED`. Admins bypass this guard automatically.

---

## Permissions Table

### Authentication

| Action | Public | Faculty | Admin |
|---|---|---|---|
| Register | ✅ | — | — |
| Login | ✅ | ✅ | ✅ |
| Forgot password / OTP reset | ✅ | ✅ | ✅ |
| Change own password | — | ✅ | ✅ |
| View own profile (`/auth/me`) | — | ✅ | ✅ |

### Faculty Profile

| Action | Public | Faculty | Admin |
|---|---|---|---|
| View own profile | — | ✅ | — |
| Update own personal info | — | ✅ (Approved) | — |
| Update own academic profile | — | ✅ (Approved) | — |
| Upload own profile picture | — | ✅ (Approved) | — |
| Manage own addresses | — | ✅ (Approved) | — |
| View any faculty profile | — | — | ✅ |
| Update any faculty profile | — | — | ✅ |

### Education, Courses, Experience, Publications, Supervision

| Action | Public | Faculty | Admin |
|---|---|---|---|
| Add own records | — | ✅ (Approved) | — |
| Edit own records | — | ✅ (Approved) | — |
| Delete own records | — | ✅ (Approved) | — |
| View own records | — | ✅ | — |
| View any faculty's records | ✅ (public endpoints) | ✅ | ✅ |
| Edit another faculty's records | — | ❌ | ✅ |

### Departments

| Action | Public | Faculty | Admin |
|---|---|---|---|
| List departments | ✅ | ✅ | ✅ |
| View department details | ✅ | ✅ | ✅ |
| Create department | — | — | ✅ |
| Update department | — | — | ✅ |
| Delete department | — | — | ✅ |

### Course Catalog

| Action | Public | Faculty | Admin |
|---|---|---|---|
| List / search courses | ✅ | ✅ | ✅ |
| View course details | ✅ | ✅ | ✅ |
| Create course | — | — | ✅ |
| Update course | — | — | ✅ |
| Delete course | — | — | ✅ |

### Approvals

| Action | Public | Faculty | Admin |
|---|---|---|---|
| View pending accounts | — | — | ✅ |
| Approve faculty account | — | — | ✅ |
| Reject faculty account | — | — | ✅ |

### Admin Dashboard

| Action | Public | Faculty | Admin |
|---|---|---|---|
| View system stats | — | — | ✅ |
| View faculty list with filters | — | — | ✅ |
| Export faculty data as CSV | — | — | ✅ |
| Reset any faculty's password | — | — | ✅ |

### Analytics Reports

| Action | Public | Faculty | Admin |
|---|---|---|---|
| View any analytics report | — | — | ✅ |
| Download report as PDF | — | — | ✅ |
| Publish report to public page | — | — | ✅ |

### Published Reports (Public Page)

| Action | Public | Faculty | Admin |
|---|---|---|---|
| List published reports | ✅ | ✅ | ✅ |
| View published report with charts | ✅ | ✅ | ✅ |
| Manage published reports | — | — | ✅ |
| Toggle report visibility | — | — | ✅ |
| Delete published report | — | — | ✅ |

### Public Directory

| Action | Public | Faculty | Admin |
|---|---|---|---|
| Browse faculty directory | ✅ | ✅ | ✅ |
| View public faculty profile | ✅ | ✅ | ✅ |
| Search and filter directory | ✅ | ✅ | ✅ |

---

## How Permissions are Enforced (Server)

Permissions are enforced at the server level using three NestJS guards applied to controller routes:

### JwtAuthGuard
Validates the JWT token in the `Authorization` header. If the token is missing, expired, or invalid, the request is rejected with `401 Unauthorized`. All non-public routes require this guard.

### RolesGuard
Checks `req.user.role` against the roles specified in the `@Roles()` decorator. Used to restrict routes to `ADMIN` only. If a `FACULTY` user hits an admin-only route, they receive `403 Forbidden`.

### ApprovedGuard
Checks that the faculty's account status is `APPROVED` before allowing write operations. Admins bypass this check automatically. If a `PENDING` or `REJECTED` faculty tries to update their profile, they receive `403 Forbidden` with the message `Your account is not approved yet`.

:::info
Guards must always be combined in a **single** `@UseGuards()` call. For example:

```typescript
@UseGuards(JwtAuthGuard, ApprovedGuard)
```

Stacking multiple `@UseGuards()` decorators on the same method causes only the **last** one to execute, leaving the earlier guards ineffective.
:::

---

## What Public Users Can See

Public users (no login required) can access:

- The landing page at `/`
- The faculty directory at `/directory` with search and department filters
- Individual faculty public profiles at `/directory/:id` — showing designation, department, specialization, courses, experience, and publications. Sensitive fields like mobile number, date of birth, address, category, and pay scale are never exposed on public endpoints.
- The published reports page at `/reports`
- Individual published report pages at `/reports/:id` with full charts

---

## Data Visibility on Public Faculty Profiles

Not all faculty data is shown publicly. The following fields are intentionally excluded from public-facing endpoints:

| Field | Reason |
|---|---|
| Mobile number | Personal contact information |
| Date of birth | Sensitive personal data |
| Addresses | Personal location data |
| Category (General/OBC/SC/ST) | Sensitive personal data |
| Pay scale / pay level | Confidential employment data |
| ORCID ID | Shown only on public profile, not in directory cards |
