---
title: Analytics
sidebar_position: 12
---

# Analytics API

Base path: `/admin/analytics`

All endpoints require Admin access. Each endpoint returns live data queried from the database at request time.

---

## GET /admin/analytics/research-domains

Returns faculty grouped by research domains derived from specializations and thesis research areas.

**Response `200`:**
```json
[
  {
    "domain": "Machine Learning",
    "count": 8,
    "faculty": [
      "Dr. John Doe (Computer Science)",
      "Dr. Jane Smith (Electronics)"
    ]
  }
]
```

Sorted by faculty count descending.

---

## GET /admin/analytics/publication-trends

Returns year-wise publication counts broken down by category and indexing.

**Response `200`:**
```json
{
  "trends": [
    {
      "year": 2023,
      "total": 24,
      "JOURNAL": 12,
      "CONFERENCE": 8,
      "BOOK": 2,
      "BOOK_CHAPTER": 2,
      "SCI": 6,
      "SCOPUS": 10,
      "NONE": 8
    }
  ],
  "summary": {
    "total": 312,
    "SCI": 48,
    "SCOPUS": 124,
    "NONE": 140
  }
}
```

---

## GET /admin/analytics/department-health

Returns a health score for each department based on weighted metrics.

**Response `200`:**
```json
[
  {
    "department": "Computer Science",
    "totalFaculty": 12,
    "totalPublications": 180,
    "sciScopusCount": 96,
    "sciScopusRatio": 53,
    "phdCount": 9,
    "phdPercent": 75,
    "avgExperienceYears": 11.2,
    "activeTheses": 4,
    "score": 72
  }
]
```

Sorted by score descending. Score is out of 100.

---

## GET /admin/analytics/research-momentum

Returns a momentum score per faculty based on recency and indexing quality of publications.

**Query Parameters:**
- `departmentId` — optional: filter by department

**Response `200`:**
```json
[
  {
    "facultyId": 1,
    "name": "Dr. John Doe",
    "designation": "Associate Professor",
    "department": "Computer Science",
    "totalPublications": 22,
    "recentPublications": 8,
    "momentumScore": 14.6
  }
]
```

Sorted by momentum score descending.

---

## GET /admin/analytics/qualification-distribution

Returns qualification breakdown institution-wide and per department with NAAC PhD compliance status.

**Response `200`:**
```json
{
  "institutionWide": {
    "DOCTORATE": 32,
    "POST_GRADUATION": 10,
    "GRADUATION": 4,
    "OTHER": 1
  },
  "deptBreakdown": [
    {
      "department": "Computer Science",
      "total": 12,
      "phdCount": 9,
      "pgCount": 2,
      "ugCount": 1,
      "otherCount": 0,
      "phdPercent": 75,
      "compliant": true
    }
  ]
}
```

`compliant` is `true` when `phdPercent >= 50`.

---

## GET /admin/analytics/experience-profile

Returns experience type distribution per department and institution-wide summary.

**Response `200`:**
```json
{
  "deptData": [
    {
      "department": "Computer Science",
      "totalFaculty": 12,
      "TEACHING": 12,
      "INDUSTRIAL": 5,
      "RESEARCH": 8,
      "ADMINISTRATIVE": 3,
      "multiDomain": 7,
      "teachingOnly": 5
    }
  ],
  "summary": {
    "TEACHING": 47,
    "INDUSTRIAL": 18,
    "RESEARCH": 29,
    "ADMINISTRATIVE": 11,
    "multiDomain": 24,
    "teachingOnly": 23
  }
}
```

---

## GET /admin/analytics/course-load

Returns faculty ranked by teaching hours and a list of courses with only one faculty assigned.

**Query Parameters:**
- `academicYear` — optional: filter by academic year e.g. `2024-25`

**Response `200`:**
```json
{
  "facultyRanking": [
    {
      "name": "Dr. John Doe",
      "department": "Computer Science",
      "totalCourses": 5,
      "totalHours": 18
    }
  ],
  "courseRisks": [
    {
      "name": "Advanced Algorithms",
      "code": "CS501",
      "facultyCount": 1
    }
  ]
}
```

`facultyRanking` is sorted by `totalHours` descending, limited to top 15. `courseRisks` contains courses with `facultyCount <= 1`.

---

## GET /admin/analytics/supervision-pipeline

Returns thesis supervision status per department and a list of top supervisors.

**Response `200`:**
```json
{
  "deptData": [
    {
      "department": "Computer Science",
      "totalFaculty": 12,
      "Ongoing": 4,
      "Submitted": 2,
      "Completed": 8,
      "Awarded": 6,
      "totalTheses": 20,
      "totalDissertations": 35
    }
  ],
  "topSupervisors": [
    {
      "name": "Dr. John Doe",
      "department": "Computer Science",
      "theses": 6,
      "dissertations": 12,
      "activeTheses": 2,
      "total": 18
    }
  ]
}
```
