---
title: Faculty Supervision
sidebar_position: 7
---

# Faculty Supervision API

Base path: `/faculty`

---

## Thesis Supervisions

### POST /faculty/thesis

Adds a thesis supervision record.

**Access:** Authenticated + Approved (Faculty)

**Request Body:**
```json
{
  "title": "Deep Learning Approaches for Medical Image Segmentation",
  "researchArea": "Machine Learning",
  "year": 2023,
  "status": "Ongoing",
  "role": "Supervisor"
}
```

| Field | Type | Required | Accepted Values |
|---|---|---|---|
| title | string | Yes | Full thesis title |
| researchArea | string | Yes | Research domain |
| year | number | Yes | 1990 to current year + 1 |
| status | string | Yes | `Ongoing`, `Submitted`, `Completed`, `Awarded` |
| role | string | Yes | `Supervisor`, `Co-Supervisor`, `External Examiner` |

**Response `201`:** Created thesis supervision object

---

### GET /faculty/thesis

Returns all thesis supervision records for the authenticated faculty member.

**Access:** Authenticated + Approved (Faculty)

**Response `200`:**
```json
[
  {
    "id": 1,
    "title": "Deep Learning Approaches for Medical Image Segmentation",
    "researchArea": "Machine Learning",
    "year": 2023,
    "status": "Ongoing",
    "role": "Supervisor",
    "facultyId": 1
  }
]
```

---

### GET /faculty/:id/thesis

Returns thesis supervision records for any faculty member by faculty ID.

**Access:** Public

**Response `200`:** Array of thesis supervision objects

---

### PATCH /faculty/thesis/:id

Updates a thesis supervision record.

**Access:** Authenticated + Approved (Faculty)

**Request Body:** All fields optional
```json
{
  "title": "Updated thesis title",
  "researchArea": "Computer Vision",
  "year": 2024,
  "status": "Submitted",
  "role": "Co-Supervisor"
}
```

**Response `200`:** Updated thesis object

**Error responses:**
- `403` — You can only modify your own thesis records
- `404` — Thesis record not found

---

### DELETE /faculty/thesis/:id

Deletes a thesis supervision record.

**Access:** Authenticated + Approved (Faculty or Admin)

**Response `200`:**
```json
{
  "message": "Thesis record deleted successfully"
}
```

---

## Dissertation Supervisions

### POST /faculty/dissertation

Adds a dissertation supervision record.

**Access:** Authenticated + Approved (Faculty)

**Request Body:**
```json
{
  "title": "Predictive Analytics for Student Performance",
  "specialization": "Data Science",
  "year": 2023,
  "role": "Supervisor"
}
```

| Field | Type | Required | Accepted Values |
|---|---|---|---|
| title | string | Yes | Full dissertation title |
| specialization | string | Yes | Specialization area |
| year | number | Yes | 1990 to current year + 1 |
| role | string | Yes | `Supervisor`, `Co-Supervisor`, `External Examiner` |

**Response `201`:** Created dissertation supervision object

---

### GET /faculty/dissertation

Returns all dissertation supervision records for the authenticated faculty member.

**Access:** Authenticated + Approved (Faculty)

**Response `200`:** Array of dissertation supervision objects

---

### GET /faculty/:id/dissertation

Returns dissertation supervision records for any faculty member by faculty ID.

**Access:** Public

**Response `200`:** Array of dissertation supervision objects

---

### PATCH /faculty/dissertation/:id

Updates a dissertation supervision record.

**Access:** Authenticated + Approved (Faculty)

**Request Body:** All fields optional
```json
{
  "title": "Updated title",
  "specialization": "Machine Learning",
  "year": 2024,
  "role": "Co-Supervisor"
}
```

**Response `200`:** Updated dissertation object

**Error responses:**
- `403` — You can only modify your own dissertation records
- `404` — Dissertation record not found

---

### DELETE /faculty/dissertation/:id

Deletes a dissertation supervision record.

**Access:** Authenticated + Approved (Faculty or Admin)

**Response `200`:**
```json
{
  "message": "Dissertation record deleted successfully"
}
```
