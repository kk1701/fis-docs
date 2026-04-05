---
title: Approvals
sidebar_position: 10
---

# Approvals API

Base path: `/approvals`

All endpoints in this section require Admin access.

---

## GET /approvals/pending

Returns all faculty accounts with `PENDING` status, ordered oldest first.

**Access:** Admin only

**Response `200`:**
```json
[
  {
    "id": 2,
    "email": "faculty@university.ac.in",
    "name": "Dr. Jane Smith",
    "department": {
      "id": 1,
      "name": "Computer Science",
      "code": "CS"
    },
    "appliedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

## POST /approvals/:userId/approve

Approves a faculty account, setting its status to `APPROVED`.

**Access:** Admin only

**Request Body:** Optional
```json
{
  "reason": "Verified faculty credentials"
}
```

**Response `200`:**
```json
{
  "message": "Faculty account approved successfully",
  "user": {
    "id": 2,
    "email": "faculty@university.ac.in",
    "status": "APPROVED",
    "approvedAt": "2024-01-16T09:00:00.000Z",
    "faculty": { "name": "Dr. Jane Smith" }
  }
}
```

**Error responses:**
- `400` — User is already approved / rejected / suspended
- `404` — User not found

---

## POST /approvals/:userId/reject

Rejects a faculty account, setting its status to `REJECTED`.

**Access:** Admin only

**Request Body:** Optional
```json
{
  "reason": "Incomplete registration details"
}
```

**Response `200`:**
```json
{
  "message": "Faculty account rejected: Incomplete registration details",
  "user": {
    "id": 2,
    "email": "faculty@university.ac.in",
    "status": "REJECTED",
    "faculty": { "name": "Dr. Jane Smith" }
  }
}
```

**Error responses:**
- `400` — User is already approved / rejected / suspended
- `404` — User not found
