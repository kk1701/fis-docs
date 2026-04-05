---
title: Faculty Experiences
sidebar_position: 5
---

# Faculty Experiences API

Base path: `/faculty`

---

## POST /faculty/experiences

Adds an experience entry for the authenticated faculty member.

**Access:** Authenticated + Approved (Faculty)

**Request Body:**
```json
{
  "type": "TEACHING",
  "title": "Associate Professor",
  "organization": "MANIT Bhopal",
  "startDate": "2015-07-01",
  "endDate": "2020-06-30",
  "location": "Bhopal, MP",
  "details": "Teaching UG and PG courses in CS",
  "payScale": "Level 10"
}
```

| Field | Type | Required | Accepted Values |
|---|---|---|---|
| type | string | Yes | `TEACHING`, `INDUSTRIAL`, `RESEARCH`, `ADMINISTRATIVE` |
| title | string | Yes | Job title or designation |
| organization | string | Yes | Employer or institution name |
| startDate | string | Yes | ISO date string |
| endDate | string | No | Leave blank for current positions |
| location | string | No | City and state |
| details | string | No | Nature of work description |
| payScale | string | No | Pay level or scale |

**Response `201`:** Created experience object

---

## GET /faculty/experiences

Returns all experience entries for the authenticated faculty member, grouped by type.

**Access:** Authenticated + Approved (Faculty)

**Query Parameters:**
- `type` — optional filter: `TEACHING`, `INDUSTRIAL`, `RESEARCH`, `ADMINISTRATIVE`

**Response `200`:**
```json
{
  "TEACHING": [
    {
      "id": 1,
      "type": "TEACHING",
      "designation": "Associate Professor",
      "organization": "MANIT Bhopal",
      "startDate": "2015-07-01T00:00:00.000Z",
      "endDate": "2020-06-30T00:00:00.000Z",
      "location": "Bhopal, MP",
      "natureOfWork": "Teaching UG and PG courses",
      "payScale": "Level 10",
      "facultyId": 1
    }
  ],
  "INDUSTRIAL": [],
  "RESEARCH": [],
  "ADMINISTRATIVE": []
}
```

---

## GET /faculty/:id/experiences

Returns experience entries for any faculty member by their faculty ID, grouped by type.

**Access:** Public

**Query Parameters:**
- `type` — optional filter

**Response `200`:** Grouped experience object (same structure as above)

---

## PATCH /faculty/experiences/:id

Updates an experience entry.

**Access:** Authenticated + Approved (Faculty)

**Request Body:** All fields optional
```json
{
  "title": "Professor",
  "organization": "IIT Bhopal",
  "startDate": "2020-07-01",
  "endDate": null,
  "location": "Bhopal, MP",
  "details": "Updated responsibilities",
  "payScale": "Level 12"
}
```

**Response `200`:** Updated experience object

**Error responses:**
- `403` — You can only modify your own experience records
- `404` — Experience record not found

---

## DELETE /faculty/experiences/:id

Deletes an experience entry.

**Access:** Authenticated + Approved (Faculty or Admin)

**Response `200`:**
```json
{
  "message": "Experience record deleted successfully"
}
```

**Error responses:**
- `403` — You can only modify your own experience records
- `404` — Experience record not found
