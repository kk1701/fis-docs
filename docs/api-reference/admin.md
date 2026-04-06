---
title: Admin
sidebar_position: 11
---

# Admin API

Base path: `/admin`

All endpoints in this section require Admin access.

---

## GET /admin/stats

Returns key system metrics.

**Response `200`:**
```json
{
  "totalFaculty": 47,
  "approvedCount": 42,
  "pendingCount": 3,
  "rejectedCount": 2,
  "totalCourses": 85,
  "totalDepartments": 6
}
```

---

## GET /admin/faculty

Returns a paginated list of all faculty with optional filters.

**Query Parameters:**

| Parameter | Type | Description |
|---|---|---|
| status | string | `APPROVED`, `PENDING`, `REJECTED`, `SUSPENDED` |
| departmentId | number | Filter by department |
| page | number | Page number (default: 1) |
| limit | number | Results per page (default: 10) |

**Response `200`:**
```json
{
  "data": [
    {
      "id": 1,
      "email": "john@university.ac.in",
      "status": "APPROVED",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "approvedAt": "2024-01-02T00:00:00.000Z",
      "faculty": {
        "id": 1,
        "name": "Dr. John Doe",
        "designation": "Associate Professor",
        "department": { "id": 1, "name": "Computer Science", "code": "CS" },
        "_count": {
          "publications": 15,
          "experiences": 3,
          "coursesTaught": 8
        }
      }
    }
  ],
  "meta": {
    "total": 47,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

---

## GET /admin/export/faculty

Exports all faculty data as a CSV file.

**Query Parameters:**
- `status` — optional filter
- `departmentId` — optional filter

**Response:** CSV file download with `Content-Disposition: attachment; filename=faculty-export.csv`

---

## PATCH /admin/faculty/:userId/reset-password

Resets a faculty member's password directly without OTP verification.

**Request Body:**
```json
{
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
- `404` — User not found or deleted

---

## GET /admin/departments

Returns all departments with faculty and course counts.

**Response `200`:**
```json
[
  {
    "id": 1,
    "name": "Computer Science",
    "code": "CS",
    "_count": {
      "faculty": 12,
      "courseCatalog": 18
    }
  }
]
```

---

## POST /admin/departments

Creates a department. Same as `POST /departments` — see [Departments API](./departments).

---

## PATCH /admin/departments/:id

Updates a department. Same as `PATCH /departments/:id`.

---

## DELETE /admin/departments/:id

Deletes a department. Same as `DELETE /departments/:id`.

---

## GET /admin/courses

Returns all courses with faculty usage counts and optional filters.

**Query Parameters:**
- `departmentId` — filter by department
- `level` — filter by `UG`, `PG`, `PHD`

**Response `200`:**
```json
[
  {
    "id": 1,
    "name": "Data Structures",
    "code": "CS301",
    "level": "UG",
    "credits": 4,
    "department": { "id": 1, "name": "Computer Science", "code": "CS" },
    "_count": { "coursesTaught": 5 }
  }
]
```

---

## POST /admin/courses

Creates a course. Same as `POST /courses` — see [Courses API](./courses).

---

## PATCH /admin/courses/:id

Updates a course. Same as `PATCH /courses/:id`.

---

## DELETE /admin/courses/:id

Deletes a course. Same as `DELETE /courses/:id`.
