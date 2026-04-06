---
title: Auth
sidebar_position: 1
---

# Auth API

Base path: `/auth`

All auth endpoints are public unless marked as authenticated.

---

## POST /auth/register

Creates a new faculty account and faculty profile in a single transaction.

**Access:** Public

**Request Body:**
```json
{
  "name": "Dr. John Doe",
  "email": "john.doe@university.ac.in",
  "password": "securepassword",
  "departmentId": 1,
  "role": "FACULTY"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| name | string | Yes | Full name of the faculty member |
| email | string | Yes | Must be unique across all users |
| password | string | Yes | Minimum 6 characters |
| departmentId | number | Yes | Must reference an existing department |
| role | string | No | Defaults to `FACULTY` |

**Response `201`:**
```json
{
  "access_token": "eyJhbGci..."
}
```

**Error responses:**
- `400` — Email already in use
- `400` — Department not found

---

## POST /auth/login

Authenticates a user and returns a JWT access token.

**Access:** Public

**Request Body:**
```json
{
  "email": "john.doe@university.ac.in",
  "password": "securepassword"
}
```

**Response `200`:**
```json
{
  "access_token": "eyJhbGci..."
}
```

**Error responses:**
- `401` — Invalid credentials

---

## GET /auth/me

Returns the current authenticated user's profile and approval status.

**Access:** Authenticated

**Headers:**
```
Authorization: Bearer <token>
```

**Response `200`:**
```json
{
  "id": 1,
  "email": "john.doe@university.ac.in",
  "role": "FACULTY",
  "status": "APPROVED",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "faculty": {
    "id": 1,
    "name": "Dr. John Doe",
    "designation": "Associate Professor",
    "department": {
      "id": 1,
      "name": "Computer Science",
      "code": "CS"
    }
  }
}
```

---

## POST /auth/forgot-password

Sends a 6-digit OTP to the registered email address.

**Access:** Public

**Request Body:**
```json
{
  "email": "john.doe@university.ac.in"
}
```

**Response `200`:**
```json
{
  "message": "If this email is registered, an OTP has been sent."
}
```

:::info
The response is always the same regardless of whether the email exists — this prevents email enumeration attacks.
:::

---

## POST /auth/verify-otp

Verifies the OTP and returns a short-lived reset token valid for 5 minutes.

**Access:** Public

**Request Body:**
```json
{
  "email": "john.doe@university.ac.in",
  "otp": "482910"
}
```

**Response `200`:**
```json
{
  "resetToken": "a3f8c2...",
  "message": "OTP verified successfully"
}
```

**Error responses:**
- `400` — Invalid or expired OTP

---

## POST /auth/reset-password

Resets the password using the reset token obtained from `/auth/verify-otp`.

**Access:** Public

**Request Body:**
```json
{
  "email": "john.doe@university.ac.in",
  "resetToken": "a3f8c2...",
  "newPassword": "newpassword123"
}
```

**Response `200`:**
```json
{
  "message": "Password reset successfully"
}
```

**Error responses:**
- `400` — Reset session expired. Please start over.
- `400` — Invalid reset token

---

## PATCH /auth/change-password

Changes the password for the currently authenticated user.

**Access:** Authenticated (Faculty or Admin)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

**Response `200`:**
```json
{
  "message": "Password changed successfully"
}
```

**Error responses:**
- `400` — Current password is incorrect
- `404` — User not found
