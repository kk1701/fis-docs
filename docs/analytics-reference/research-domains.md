---
title: Research Domain Profiling
sidebar_position: 1
---

# Research Domain Profiling

**Report type identifier:** `RESEARCH_DOMAINS`

---

## What it Shows

This report maps every approved faculty member to their research domains and groups faculty by domain — showing how many faculty are working in each area and who they are.

---

## Why it Matters

- Identifies which research areas the institution is strong in
- Reveals understaffed or absent research domains — useful for hiring decisions
- Useful for accreditation reports that require listing active research areas
- Helps in forming interdisciplinary research groups
- Shows research breadth vs depth across the institution

---

## Data Sources

| Source | Field Used |
|---|---|
| `Faculty` | `specialization` array |
| `ThesisSupervision` | `researchArea` |

Each faculty member contributes to the domain map through two sources. Their listed specializations and the research areas of the theses they supervise are both treated as domains they are active in. A faculty member can appear in multiple domains.

---

## How it is Calculated

For each approved faculty member:

1. All values in their `specialization` array are added to a domain set
2. All `researchArea` values from their `ThesisSupervision` records are added to the same domain set
3. Duplicate domains within a single faculty's set are deduplicated
4. For each domain, a global counter increments and the faculty member's name and department are added to the domain's faculty list

The result is a flat list of domains sorted by faculty count descending.

---

## Output Structure

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

---

## Visualizations

**Horizontal bar chart** — top 15 domains by faculty count, with full domain name shown in tooltip on hover.

**Expandable domain table** — click any domain row to expand and see the list of faculty working in that area.

---

## Interpreting the Results

- **High count domains** — the institution's core research strengths. These are areas where collaboration, joint grants, and cluster hiring make sense.
- **Count of 1** — single-faculty domains. These represent individual specializations. If this faculty member leaves, the domain disappears from the institution.
- **Missing domains** — if an expected research area does not appear, it means no faculty have listed it as a specialization or supervised a thesis in that area.

---

## Improving the Data Quality

The accuracy of this report depends on faculty keeping their specializations updated. Encourage faculty to:

- List specific, meaningful specializations rather than broad terms like "Computer Science"
- Update specializations when their research focus shifts
- Add thesis research areas accurately when recording supervision records
