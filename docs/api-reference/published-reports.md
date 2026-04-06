---
title: Published Reports
sidebar_position: 13
---

# Published Reports API

Two sets of endpoints — admin endpoints for managing published reports, and public endpoints for reading them.

---

## Admin Endpoints

Base path: `/admin/published-reports` — Admin access required.

### POST /admin/published-reports

Publishes a report snapshot to the public page.

**Request Body:**
```json
{
  "title": "Research Domain Analysis — April 2026",
  "description": "This report reflects specialization data for 47 approved faculty as of April 2026.",
  "reportType": "RESEARCH_DOMAINS",
  "data": { }
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| title | string | Yes | Custom title for the public page |
| description | string | No | Context description for the public |
| reportType | string | Yes | One of the 8 report type identifiers |
| data | object | Yes | The full report data object (JSON snapshot) |

**Report type identifiers:**

| Value | Report |
|---|---|
| `RESEARCH_DOMAINS` | Research Domain Profiling |
| `PUBLICATION_TRENDS` | Publication Trends |
| `DEPARTMENT_HEALTH` | Department Health Score |
| `RESEARCH_MOMENTUM` | Faculty Research Momentum |
| `QUALIFICATION_DISTRIBUTION` | Qualification Distribution |
| `EXPERIENCE_PROFILE` | Experience Profile |
| `COURSE_LOAD` | Course Load Analysis |
| `SUPERVISION_PIPELINE` | Supervision Pipeline |

**Response `201`:** Created published report object

---

### GET /admin/published-reports

Returns all published reports including hidden ones.

**Response `200`:**
```json
[
  {
    "id": 1,
    "title": "Research Domain Analysis — April 2026",
    "description": "Context description",
    "reportType": "RESEARCH_DOMAINS",
    "isPublic": true,
    "publishedAt": "2026-04-01T10:00:00.000Z",
    "updatedAt": "2026-04-01T10:00:00.000Z",
    "publishedBy": { "id": 1, "email": "admin@fis.com" }
  }
]
```

---

### PATCH /admin/published-reports/:id

Updates the title, description, or visibility of a published report.

**Request Body:** All fields optional
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "isPublic": false
}
```

**Response `200`:** Updated published report object

**Error responses:**
- `404` — Report not found

---

### DELETE /admin/published-reports/:id

Permanently deletes a published report and its data snapshot.

**Response `200`:**
```json
{
  "message": "Report unpublished successfully"
}
```

**Error responses:**
- `404` — Report not found

---

## Public Endpoints

Base path: `/public/reports` — No authentication required.

### GET /public/reports

Returns all published reports where `isPublic = true`.

**Response `200`:**
```json
[
  {
    "id": 1,
    "title": "Research Domain Analysis — April 2026",
    "description": "Context description",
    "reportType": "RESEARCH_DOMAINS",
    "publishedAt": "2026-04-01T10:00:00.000Z",
    "publishedBy": { "id": 1, "email": "admin@fis.com" }
  }
]
```

Note: The `data` field is not included in the listing — only in the single report endpoint.

---

### GET /public/reports/:id

Returns a single published report with its full data snapshot.

**Response `200`:**
```json
{
  "id": 1,
  "title": "Research Domain Analysis — April 2026",
  "description": "Context description",
  "reportType": "RESEARCH_DOMAINS",
  "data": { },
  "isPublic": true,
  "publishedAt": "2026-04-01T10:00:00.000Z",
  "publishedBy": { "id": 1, "email": "admin@fis.com" }
}
```

**Error responses:**
- `404` — Report not found
- `403` — This report is not public
