---
title: Faculty Profile
sidebar_position: 2
---

# Faculty Profile API

Base path: `/faculty`

---

## GET /faculty/profile

Returns the full profile of the currently authenticated faculty member.

**Access:** Authenticated (Faculty)

**Response `200`:**
```json
{
  "id": 1,
  "name": "Dr. John Doe",
  "dob": "1985-06-15T00:00:00.000Z",
  "gender": "MALE",
  "nationality": "Indian",
  "category": "GENERAL",
  "mobile": "9876543210",
  "orcidId": "0000-0000-0000-0001",
  "designation": "Associate Professor",
  "specialization": ["Machine Learning", "Data Science"],
  "joiningDate": "2015-07-01T00:00:00.000Z",
  "highestQualification": "PhD",
  "experienceYears": 10,
  "photoUrl": "https://res.cloudinary.com/...",
  "departmentId": 1,
  "department": { "id": 1, "name": "Computer Science", "code": "CS" },
  "addresses": [],
  "degrees": []
}
```

**Error responses:**
- `404` — Faculty profile not initialized yet

---

## PATCH /faculty/profile/personal

Updates personal information fields for the authenticated faculty member.

**Access:** Authenticated + Approved (Faculty)

**Request Body:** All fields optional
```json
{
  "name": "Dr. John Doe",
  "mobile": "9876543210",
  "photoUrl": "https://...",
  "dob": "1985-06-15",
  "gender": "MALE",
  "nationality": "Indian",
  "category": "GENERAL",
  "orcidId": "0000-0000-0000-0001"
}
```

**Response `200`:** Updated faculty object

---

## PATCH /faculty/profile/academic

Updates academic profile fields for the authenticated faculty member.

**Access:** Authenticated + Approved (Faculty)

**Request Body:** All fields optional
```json
{
  "designation": "Associate Professor",
  "highestQualification": "PhD",
  "specialization": ["Machine Learning", "Data Science"],
  "joiningDate": "2015-07-01",
  "experienceYears": 10,
  "departmentId": 1
}
```

**Response `200`:** Updated faculty object

---

## POST /faculty/profile/picture

Uploads a profile picture to Cloudinary and saves the URL to the faculty profile.

**Access:** Authenticated + Approved (Faculty)

**Content-Type:** `multipart/form-data`

**Form field:**
- `file` — image file (JPG, JPEG, or PNG, max 2MB)

**Response `200`:**
```json
{
  "id": 1,
  "photoUrl": "https://res.cloudinary.com/fis/image/upload/..."
}
```

**Error responses:**
- `400` — No file uploaded
- `400` — Only JPG, JPEG and PNG files are allowed
- `400` — File size must be less than 2MB

---

## GET /faculty/addresses

Returns all addresses for the authenticated faculty member.

**Access:** Authenticated + Approved (Faculty)

**Response `200`:**
```json
[
  {
    "id": 1,
    "type": "CORRESPONDENCE",
    "line1": "123 Main Street",
    "line2": "Green Park",
    "district": "Bhopal",
    "state": "Madhya Pradesh",
    "country": "India",
    "pin": "462001",
    "facultyId": 1
  }
]
```

---

## PATCH /faculty/addresses?type=CORRESPONDENCE

Creates or updates an address of the specified type.

**Access:** Authenticated + Approved (Faculty)

**Query Parameters:**
- `type` — `CORRESPONDENCE` or `PERMANENT`

**Request Body:**
```json
{
  "line1": "123 Main Street",
  "line2": "Green Park",
  "line3": "Near City Mall",
  "district": "Bhopal",
  "state": "Madhya Pradesh",
  "country": "India",
  "pin": "462001"
}
```

**Response `200`:** Created or updated address object

---

## DELETE /faculty/addresses?type=CORRESPONDENCE

Deletes the address of the specified type.

**Access:** Authenticated + Approved (Faculty)

**Query Parameters:**
- `type` — `CORRESPONDENCE` or `PERMANENT`

**Response `200`:**
```json
{
  "message": "Address deleted successfully"
}
```

---

## GET /faculty/directory

Returns a paginated list of approved faculty for the public directory.

**Access:** Public

**Query Parameters:**

| Parameter | Type | Description |
|---|---|---|
| search | string | Search by faculty name (case-insensitive) |
| departmentId | number | Filter by department |
| specialization | string | Filter by a specific specialization |
| page | number | Page number (default: 1) |
| limit | number | Results per page (default: 12) |

**Response `200`:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Dr. John Doe",
      "designation": "Associate Professor",
      "photoUrl": "https://...",
      "specialization": ["Machine Learning"],
      "highestQualification": "PhD",
      "experienceYears": 10,
      "department": { "id": 1, "name": "Computer Science", "code": "CS" },
      "_count": { "publications": 15, "coursesTaught": 8 }
    }
  ],
  "meta": {
    "total": 47,
    "page": 1,
    "limit": 12,
    "totalPages": 4
  }
}
```

---

## GET /faculty/:id/public

Returns the full public profile for a single faculty member.

**Access:** Public

**Response `200`:** Full faculty profile including degrees, coursesTaught, experiences, publications, and theses — with sensitive fields excluded.

**Error responses:**
- `404` — Faculty not found or not approved
