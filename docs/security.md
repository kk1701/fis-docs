---
title: Security
sidebar_position: 11
---

# Security

This page documents the authentication system, password reset flow, and security design decisions in FIS.

---

## Authentication

FIS uses **JSON Web Tokens (JWT)** for authentication. There are no sessions, no cookies, and no server-side state — the token is the credential.

### Token Structure

The JWT payload contains:

```json
{
  "sub": 1,
  "email": "john@university.ac.in",
  "role": "FACULTY",
  "iat": 1712345678,
  "exp": 1712432078
}
```

| Claim | Description |
|---|---|
| `sub` | The user's database ID (`User.id`) |
| `email` | The user's registered email |
| `role` | `ADMIN` or `FACULTY` |
| `iat` | Issued at timestamp |
| `exp` | Expiry timestamp |

:::info
The `status` field (PENDING / APPROVED / REJECTED) is intentionally **not** included in the JWT payload. Status is always fetched fresh from the database via `/auth/me` on login. This ensures that if an admin approves or rejects an account, the change is reflected the next time the faculty logs in — without waiting for the token to expire.
:::

### Token Storage

The token is stored in `localStorage` via the Zustand auth store with persist middleware. It is attached to every API request via an Axios request interceptor:

```
Authorization: Bearer <token>
```

### Token Expiry

If a request returns `401 Unauthorized`, the Axios response interceptor automatically clears the token from localStorage and redirects the user to `/login`.

---

## Password Hashing

All passwords are hashed using **bcrypt** with a salt rounds value of `10` before storage. Plain text passwords are never stored or logged anywhere in the system.

When a user logs in, the submitted password is compared against the stored hash using `bcrypt.compare()`. The hash is never sent to the client.

---

## Password Reset — OTP Flow

The password reset flow uses a time-limited, single-use OTP sent to the faculty's registered email via Resend.

### Step-by-step Flow

```
1. Faculty submits email at /forgot-password
      ↓
2. Server checks if email belongs to an active FACULTY account
   — If not found, same success response is returned (prevents email enumeration)
      ↓
3. Any existing unused OTPs for this email are invalidated
      ↓
4. A 6-digit OTP is generated using crypto.randomInt(100000, 999999)
      ↓
5. OTP is hashed with bcrypt and stored in the OTP table with a 10-minute expiry
      ↓
6. OTP is sent to the faculty's email via Resend
      ↓
7. Faculty submits OTP at /verify-otp
      ↓
8. Server finds the most recent unused, non-expired OTP for that email
      ↓
9. Submitted OTP is compared against the stored hash using bcrypt.compare()
      ↓
10. If valid:
    — The OTP record is marked as used
    — A 32-byte cryptographically random reset token is generated
    — Reset token is hashed and stored as a new OTP record with a 5-minute expiry
    — Plain-text reset token is returned to the client
      ↓
11. Faculty submits new password + reset token at /reset-password
      ↓
12. Server finds the unused, non-expired reset token record for that email
      ↓
13. Submitted token is compared against the stored hash
      ↓
14. If valid:
    — Password is hashed and updated in the User table
    — Reset token record is marked as used
      ↓
15. Faculty can now log in with new password
```

### Security Properties of the OTP Flow

| Property | How it is achieved |
|---|---|
| OTP is not stored in plain text | bcrypt hashed before storage |
| OTP expires automatically | `expiresAt` checked on every verification attempt |
| OTP can only be used once | `used` flag set to true after first successful use |
| Previous OTPs are invalidated on new request | All unused OTPs for the email are marked used before generating a new one |
| Reset token is separate from OTP | Two-step flow — OTP grants a short-lived reset token, not direct password change |
| Email enumeration is prevented | Same response returned whether email exists or not |
| Reset token expires in 5 minutes | Shorter window than OTP since the faculty already proved identity |

### OTP Table Structure

The `OTP` model is used for both the initial OTP and the subsequent reset token. The `used` flag and `expiresAt` field enforce single-use and time-limited behaviour for both.

```
OTP record (first phase):
  email      = faculty email
  otpHash    = bcrypt(6-digit OTP)
  expiresAt  = now + 10 minutes
  used       = false

OTP record (second phase, after OTP verified):
  email      = faculty email
  otpHash    = bcrypt(32-byte random token)
  expiresAt  = now + 5 minutes
  used       = false
```

---

## Admin Password Reset

Admins can reset any faculty member's password directly from the Faculty list page without going through the OTP flow. This is an administrative override — no email is sent and no OTP is involved.

The admin sets a new password directly via `PATCH /admin/faculty/:userId/reset-password`. The new password is bcrypt hashed before storage.

:::warning
There is no notification sent to the faculty when an admin resets their password. The admin must communicate the new password to the faculty through a secure channel. Instruct the faculty to change their password immediately after receiving it.
:::

---

## Change Password (Authenticated)

Any logged-in user — faculty or admin — can change their own password via the Change Password modal in the navbar. This requires providing the current password for verification before the new password is set.

The server uses `bcrypt.compare()` to verify the current password against the stored hash before allowing the change.

---

## Authorization Guards

Three guards enforce access control at the server level:

### JwtAuthGuard

Validates the JWT token on every protected route. Decodes the token and attaches `{ userId, email, role }` to `req.user`. Rejects with `401 Unauthorized` if the token is missing, malformed, or expired.

### RolesGuard

Checks `req.user.role` against the roles specified in the `@Roles()` decorator. Used to restrict routes to `ADMIN` only. Rejects with `403 Forbidden` if the role does not match.

### ApprovedGuard

Checks that the authenticated faculty member's account status is `APPROVED` before allowing write operations. Makes a database call to fetch the current status — this ensures the check reflects any admin action taken after the token was issued. Admins bypass this guard automatically.

:::warning
Guards must always be combined in a **single** `@UseGuards()` call:

```typescript
// Correct
@UseGuards(JwtAuthGuard, ApprovedGuard)

// Wrong — only ApprovedGuard executes, JwtAuthGuard is ignored
@UseGuards(JwtAuthGuard)
@UseGuards(ApprovedGuard)
```

Stacking multiple `@UseGuards()` decorators on the same method causes only the **last** one to execute in NestJS.
:::

---

## Soft Delete

Users are never permanently deleted from the database. The `deletedAt` field is set to the current timestamp instead. All queries that retrieve users filter on `deletedAt: null` to exclude deleted accounts.

This approach:
- Preserves all historical faculty data and publication records
- Maintains audit trails — you can always see who registered and when
- Allows recovery if a deletion was made in error (via direct database access)

---

## Environment Variables

The following security-sensitive values must be set as environment variables and must never be committed to version control:

| Variable | Purpose |
|---|---|
| `JWT_SECRET` | Signs and verifies JWT tokens — must be a long random string |
| `DATABASE_URL` | Full database connection string including credentials |
| `CLOUDINARY_API_KEY` | Cloudinary upload authentication |
| `CLOUDINARY_API_SECRET` | Cloudinary upload authentication |
| `RESEND_API_KEY` | Resend email API authentication |

Generate a strong `JWT_SECRET` with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## CORS

The server restricts cross-origin requests to the configured client origin only. In development this is `http://localhost:5173`. In production this should be updated to the actual deployed client URL:

```typescript
app.enableCors({
  origin: 'https://your-fis-client.com',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
```
