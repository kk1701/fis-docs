---
title: Experience Profile
sidebar_position: 6
---

# Experience Profile

**Report type identifier:** `EXPERIENCE_PROFILE`

---

## What it Shows

The distribution of experience types across departments — how many faculty have teaching experience, industrial experience, research experience, and administrative experience. Also surfaces the institution's "industry connect index" — the proportion of faculty with real-world non-academic exposure.

---

## Why it Matters

- Faculty with industrial experience bring practical relevance to teaching — important for professionally oriented programmes
- A high proportion of teaching-only faculty may indicate limited research or industry exposure
- Administrative experience helps identify faculty suited for management and leadership roles
- Industry connect data is useful for NBA accreditation (especially for engineering programmes) and for pitching industry collaboration proposals
- Helps in designing faculty development programmes — who needs research exposure, who needs industry exposure

---

## Data Sources

| Source | Fields Used |
|---|---|
| `Experience` | `type`, `facultyId` |
| `Faculty` | `departmentId` |

---

## How it is Calculated

For each department, the following counts are computed across all approved faculty:

- **TEACHING** — count of faculty with at least one `TEACHING` type experience
- **INDUSTRIAL** — count of faculty with at least one `INDUSTRIAL` type experience
- **RESEARCH** — count of faculty with at least one `RESEARCH` type experience
- **ADMINISTRATIVE** — count of faculty with at least one `ADMINISTRATIVE` type experience
- **Multi-domain** — count of faculty with experience entries in more than one type
- **Teaching only** — count of faculty whose only experience type is TEACHING

A faculty member is counted once per type regardless of how many entries they have in that type.

---

## Output Structure

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

## Visualizations

**Summary cards** — four institution-wide cards showing multi-domain faculty count, teaching-only count, faculty with industrial experience, and faculty with research experience.

**Grouped bar chart** — one group of bars per department, with four bars per group (Teaching, Industrial, Research, Administrative). Allows direct comparison across departments.

---

## Interpreting the Results

- **High teaching-only count** — a significant proportion of faculty lack non-teaching experience. Consider requiring or incentivising industry internships, sabbaticals, or research collaborations.
- **Low industrial count in engineering departments** — may be flagged in NBA accreditation. Engineering programmes are expected to have faculty with real industry exposure.
- **Low research count** — faculty are not engaging in formal research roles beyond classroom teaching. May correlate with low publication output.
- **High multi-domain count** — faculty are well-rounded with diverse experience. Positive signal for holistic institutional development.

---

## Notes on Data Completeness

This report reflects only experience entries that faculty have recorded in the Experience tab. Faculty who have industrial or research experience but have not entered it will appear as teaching-only. Encourage complete and accurate experience entry for meaningful data.
