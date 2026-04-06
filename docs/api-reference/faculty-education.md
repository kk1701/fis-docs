---
title: Faculty Education
sidebar_position: 3
---

# Faculty Education API

Base path: `/faculty`

---

## POST /faculty/education

Adds a new degree record for the authenticated faculty member.

**Access:** Authenticated + Approved (Faculty)

**Request Body:**
```json
{
  "level": "DOCTORATE",
  "degreeName": "PhD",
  "specialization": "Computer Science",
  "institute": "MANIT Bhopal",
  "yearOfPassing": 2015,
  "score": 8.5,
  "scoreType": "CGPA_10",
  "division": "DISTINCTION"
}
```

| Field | Type | Required | Accepted Values |
|---|---|---|---|
| level | string | Yes | `TENTH`, `TWELFTH`, `DIPLOMA`, `GRADUATION`, `POST_GRADUATION`, `DOCTORATE`, `OTHER` |
| degreeName | string | Yes | e.g. B.Tech, M.Tech, PhD, SSC |
| specialization | string | Yes | Subject or stream |
| institute | string | Yes | Institution, board, or university name |
| yearOfPassing | number | Yes | 1950 to current year |
| score | number | No | Numeric score or CGPA |
| scoreType | string | No | `PERCENTAGE`, `CGPA_10`, `CGPA_4` |
| division | string | No | `DISTINCTION`, `FIRST`, `SECOND`, `THIRD`, `PASS` |

**Response `201`:** Created degree object

**Error responses:**
- `409` — A record for this level already exists (except DIPLOMA and OTHER which allow multiples)

---

## GET /faculty/education

Returns all degree records for the authenticated faculty member, sorted by qualification level order.

**Access:** Authenticated + Approved (Faculty)

**Response `200`:**
```json
[
  {
    "id": 1,
    "level": "TENTH",
    "degreeName": "SSC",
    "specialization": "General",
    "institute": "CBSE",
    "yearOfPassing": 2003,
    "score": 92.4,
    "scoreType": "PERCENTAGE",
    "division": "DISTINCTION",
    "facultyId": 1
  }
]
```

---

## GET /faculty/:id/education

Returns all degree records for any faculty member by their faculty ID.

**Access:** Public

**Response `200`:** Array of degree objects sorted by level order

---

## PATCH /faculty/education/:id

Updates an existing degree record.

**Access:** Authenticated + Approved (Faculty)

**Request Body:** All fields optional
```json
{
  "degreeName": "B.Tech",
  "specialization": "Computer Science",
  "institute": "NIT Bhopal",
  "yearOfPassing": 2010,
  "score": 8.2,
  "scoreType": "CGPA_10",
  "division": "FIRST"
}
```

**Response `200`:** Updated degree object

**Error responses:**
- `403` — You can only modify your own education records
- `404` — Degree record not found

---

## DELETE /faculty/education/:id

Deletes a degree record.

**Access:** Authenticated + Approved (Faculty or Admin)

**Response `200`:**
```json
{
  "message": "Degree record deleted successfully"
}
```

**Error responses:**
- `403` — You can only modify your own education records
- `404` — Degree record not found
