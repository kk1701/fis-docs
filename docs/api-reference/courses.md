---
title: Courses
sidebar_position: 9
---

# Courses API

Base path: `/courses`

---

## POST /courses

Creates a new course in the catalog.

**Access:** Admin only

**Request Body:**
```json
{
  "name": "Data Structures and Algorithms",
  "code": "CS301",
  "departmentId": 1,
  "courseLevel": "UG",
  "credits": 4
}
```

| Field | Type | Required | Accepted Values |
|---|---|---|---|
| name | string | Yes | Full course name |
| code | string | Yes | Must be unique across catalog |
| departmentId | number | Yes | Must reference an existing department |
| courseLevel | string | Yes | `UG`, `PG`, `PHD` |
| credits | number | No | Number of credits |

**Response `201`:** Created course object with department details

**Error responses:**
- `404` — Department not found
- `409` — Course code already exists

---

## GET /courses

Returns all courses in the catalog with optional filters.

**Access:** Public

**Query Parameters:**

| Parameter | Type | Description |
|---|---|---|
| departmentId | number | Filter by department |
| level | string | Filter by level: `UG`, `PG`, `PHD` |

**Response `200`:**
```json
[
  {
    "id": 1,
    "name": "Data Structures and Algorithms",
    "code": "CS301",
    "level": "UG",
    "credits": 4,
    "departmentId": 1,
    "department": { "id": 1, "name": "Computer Science", "code": "CS" }
  }
]
```

---

## GET /courses/:id

Returns a single course with the list of faculty who have taught it.

**Access:** Public

**Response `200`:**
```json
{
  "id": 1,
  "name": "Data Structures and Algorithms",
  "code": "CS301",
  "level": "UG",
  "credits": 4,
  "department": { "id": 1, "name": "Computer Science", "code": "CS" },
  "coursesTaught": [
    {
      "id": 1,
      "semester": "ODD",
      "academicYear": "2024-25",
      "role": "LECTURER",
      "faculty": { "id": 1, "name": "Dr. John Doe" }
    }
  ]
}
```

**Error responses:**
- `404` — Course not found

---

## PATCH /courses/:id

Updates a course in the catalog.

**Access:** Admin only

**Request Body:** All fields optional
```json
{
  "name": "Advanced Data Structures",
  "credits": 3,
  "courseLevel": "PG"
}
```

**Response `200`:** Updated course object

**Error responses:**
- `404` — Course not found

---

## DELETE /courses/:id

Deletes a course from the catalog.

**Access:** Admin only

**Response `200`:**
```json
{
  "message": "Course deleted successfully"
}
```

**Error responses:**
- `404` — Course not found
- `409` — Cannot delete — N faculty course record(s) linked to this course
