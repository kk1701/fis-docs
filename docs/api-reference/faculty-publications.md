---
title: Faculty Publications
sidebar_position: 6
---

# Faculty Publications API

Base path: `/faculty`

---

## POST /faculty/publications

Adds a publication record for the authenticated faculty member.

**Access:** Authenticated + Approved (Faculty)

**Request Body:**
```json
{
  "type": "JOURNAL",
  "title": "Deep Learning for Medical Imaging",
  "authors": ["Dr. John Doe", "Dr. Jane Smith"],
  "venue": "IEEE Transactions on Medical Imaging",
  "year": 2023,
  "doi": "10.1109/TMI.2023.1234567",
  "url": "https://ieeexplore.ieee.org/document/1234567",
  "pages": "123-135",
  "publisher": null,
  "citation": "Doe, J., Smith, J. (2023). Deep Learning...",
  "indexing": "SCI"
}
```

| Field | Type | Required | Accepted Values |
|---|---|---|---|
| type | string | Yes | `JOURNAL`, `CONFERENCE`, `BOOK`, `BOOK_CHAPTER` |
| title | string | Yes | Full publication title |
| authors | string[] | Yes | Array of author names |
| venue | string | No | Journal or conference name |
| year | number | Yes | 1900 to current year + 1 |
| doi | string | No | Digital Object Identifier |
| url | string | No | Link to publication |
| pages | string | No | Page range e.g. 123-135 |
| publisher | string | No | Publisher name (for books) |
| citation | string | No | Full citation string |
| indexing | string | No | `SCI`, `SCOPUS`, `NONE` (default: `NONE`) |

**Response `201`:** Created publication object

---

## GET /faculty/publications

Returns all publications for the authenticated faculty member, grouped by category.

**Access:** Authenticated + Approved (Faculty)

**Query Parameters:**
- `type` — optional filter: `JOURNAL`, `CONFERENCE`, `BOOK`, `BOOK_CHAPTER`

**Response `200`:**
```json
{
  "JOURNAL": [
    {
      "id": 1,
      "category": "JOURNAL",
      "title": "Deep Learning for Medical Imaging",
      "authors": ["Dr. John Doe", "Dr. Jane Smith"],
      "venue": "IEEE Transactions on Medical Imaging",
      "year": 2023,
      "doi": "10.1109/TMI.2023.1234567",
      "url": "https://...",
      "pages": "123-135",
      "indexing": "SCI",
      "facultyId": 1
    }
  ],
  "CONFERENCE": [],
  "BOOK": [],
  "BOOK_CHAPTER": []
}
```

---

## GET /faculty/:id/publications

Returns all publications for any faculty member by their faculty ID, grouped by category.

**Access:** Public

**Query Parameters:**
- `type` — optional filter

**Response `200`:** Grouped publications object

---

## PATCH /faculty/publications/:id

Updates a publication record.

**Access:** Authenticated + Approved (Faculty)

**Request Body:** All fields optional
```json
{
  "title": "Updated Title",
  "authors": ["Dr. John Doe"],
  "venue": "Nature",
  "year": 2024,
  "doi": "10.1038/...",
  "url": "https://...",
  "pages": "1-10",
  "publisher": null,
  "citation": "Updated citation"
}
```

**Response `200`:** Updated publication object

**Error responses:**
- `403` — You can only modify your own publications
- `404` — Publication not found

---

## DELETE /faculty/publications/:id

Deletes a publication record.

**Access:** Authenticated + Approved (Faculty or Admin)

**Response `200`:**
```json
{
  "message": "Publication deleted successfully"
}
```

**Error responses:**
- `403` — You can only modify your own publications
- `404` — Publication not found
