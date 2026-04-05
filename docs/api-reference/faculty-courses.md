---
title: Faculty Courses
sidebar_position: 4
---

# Faculty Courses API

Base path: `/faculty`

---

## POST /faculty/courses

Adds a course teaching record for the authenticated faculty member.

**Access:** Authenticated + Approved (Faculty)

**Request Body:**
```json
{
  "catalogCourseId": 1,
  "semester": "ODD",
  "academicYear": "2024-25",
  "role": "LECTURER",
  "hoursPerWeek": 4,
  "mode": "THEORY",
  "notes": "Core subject for 3rd year"
}
```

| Field | Type | Required | Accepted Values |
|---|---|---|---|
| catalogCourseId | number | Yes | Must reference an existing course in the catalog |
| semester | string | Yes | `ODD`, `EVEN` |
| academicYear | string | Yes | e.g. `2024-25` |
| role | string | Yes | `LECTURER`, `COORDINATOR`, `LAB` |
| hoursPerWeek | number | No | Teaching hours per week |
| mode | string | No | `THEORY`, `LAB` |
| notes | string | No | Additional notes |

**Response `201`:** Created course record with catalog course and department details

**Error responses:**
- `404` — Course not found in catalog

---

## GET /faculty/courses

Returns all course teaching records for the authenticated faculty member.

**Access:** Authenticated + Approved (Faculty)

**Query Parameters:**

| Parameter | Type | Description |
|---|---|---|
| semester | string | Filter by ODD or EVEN |
| academicYear | string | Filter by academic year, e.g. 2024-25 |

**Response `200`:**
```json
[
  {
    "id": 1,
    "catalogCourseId": 1,
    "semester": "ODD",
    "academicYear": "2024-25",
    "role": "LECTURER",
    "hoursPerWeek": 4,
    "mode": "THEORY",
    "notes": "Core subject for 3rd year",
    "createdAt": "2024-07-01T00:00:00.000Z",
    "catalogCourse": {
      "id": 1,
      "name": "Data Structures",
      "code": "CS301",
      "level": "UG",
      "credits": 4
    },
    "department": { "id": 1, "name": "Computer Science", "code": "CS" }
  }
]
```

---

## GET /faculty/:id/courses

Returns all course teaching records for any faculty member by their faculty ID.

**Access:** Public

**Query Parameters:**
- `semester` — optional filter
- `academicYear` — optional filter

**Response `200`:** Array of course records

---

## PATCH /faculty/courses/:id

Updates a course teaching record.

**Access:** Authenticated + Approved (Faculty)

**Request Body:** All fields optional
```json
{
  "semester": "EVEN",
  "academicYear": "2024-25",
  "role": "COORDINATOR",
  "hoursPerWeek": 6,
  "mode": "THEORY",
  "notes": "Updated notes"
}
```

**Response `200`:** Updated course record

**Error responses:**
- `403` — You can only modify your own course records
- `404` — Course record not found

---

## DELETE /faculty/courses/:id

Deletes a course teaching record.

**Access:** Authenticated + Approved (Faculty or Admin)

**Response `200`:**
```json
{
  "message": "Course record deleted successfully"
}
```

**Error responses:**
- `403` — You can only modify your own course records
- `404` — Course record not found
