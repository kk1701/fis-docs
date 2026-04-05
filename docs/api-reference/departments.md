---
title: Departments
sidebar_position: 8
---

# Departments API

Base path: `/departments`

---

## POST /departments

Creates a new department.

**Access:** Admin only

**Request Body:**
```json
{
  "name": "Computer Science and Engineering",
  "code": "CSE"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| name | string | Yes | Must be unique |
| code | string | Yes | Short identifier, must be unique |

**Response `201`:** Created department object

**Error responses:**
- `409` — Department with this name or code already exists

---

## GET /departments

Returns all departments.

**Access:** Public

**Response `200`:**
```json
[
  { "id": 1, "name": "Computer Science and Engineering", "code": "CSE" },
  { "id": 2, "name": "Electronics Engineering", "code": "EC" }
]
```

---

## GET /departments/:id

Returns a single department with its faculty and course catalog.

**Access:** Public

**Response `200`:**
```json
{
  "id": 1,
  "name": "Computer Science and Engineering",
  "code": "CSE",
  "faculty": [
    { "id": 1, "name": "Dr. John Doe", "designation": "Associate Professor" }
  ],
  "courseCatalog": [
    { "id": 1, "name": "Data Structures", "code": "CS301", "level": "UG" }
  ]
}
```

**Error responses:**
- `404` — Department not found

---

## PATCH /departments/:id

Updates a department's name or code.

**Access:** Admin only

**Request Body:** All fields optional
```json
{
  "name": "Computer Science",
  "code": "CS"
}
```

**Response `200`:** Updated department object

**Error responses:**
- `404` — Department not found

---

## DELETE /departments/:id

Deletes a department.

**Access:** Admin only

**Response `200`:**
```json
{
  "message": "Department deleted successfully"
}
```

**Error responses:**
- `404` — Department not found
- `409` — Cannot delete — N faculty member(s) assigned to this department
