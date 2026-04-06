---
title: Department Health Score
sidebar_position: 3
---

# Department Health Score

**Report type identifier:** `DEPARTMENT_HEALTH`

---

## What it Shows

A single composite score out of 100 for each department, calculated from five weighted academic metrics. Departments are ranked from healthiest to lowest scoring.

---

## Why it Matters

- Gives leadership a single-number view of each department's academic standing
- Identifies departments that need targeted support — faculty hiring, research incentives, or PhD admission drives
- Useful for comparing departments of different sizes fairly (metrics are normalized)
- Directly maps to metrics used in NAAC and NBA accreditation frameworks

---

## Data Sources

| Metric | Source | Fields Used |
|---|---|---|
| Publications | `Publication` | `facultyId`, `indexing` |
| SCI/Scopus ratio | `Publication` | `indexing` |
| PhD holders | `Degree` | `level` and `Faculty.highestQualification` |
| Average experience | `Faculty` | `experienceYears` |
| Active theses | `ThesisSupervision` | `status` |

---

## Scoring Formula

Each metric contributes a weighted component to the total score. The total is capped at 100.

| Metric | Weight | Calculation |
|---|---|---|
| Publications per faculty | 30% | `min((totalPublications / totalFaculty) × 10, 30)` |
| SCI + Scopus ratio | 25% | `(sciScopusCount / totalPublications) × 25` |
| PhD holders percentage | 20% | `(phdCount / totalFaculty) × 20` |
| Average experience years | 15% | `min((avgExperienceYears / 20) × 15, 15)` |
| Active thesis supervisions | 10% | `min(activeTheses × 2, 10)` |

**Total score = sum of all five components, rounded to nearest integer.**

---

## How PhD Holders are Counted

A faculty member is counted as a PhD holder if either of the following is true:
- They have a `Degree` record with `level = DOCTORATE`
- Their `highestQualification` field contains "phd" (case-insensitive)

This dual check ensures faculty who entered their qualification in the academic profile before adding their degree records are still counted correctly.

---

## Output Structure

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

Sorted by `score` descending.

---

## Visualizations

**Bar chart** — departments on the X axis, score (0–100) on the Y axis. Quick visual comparison of all departments.

**Detail table** — all metrics per department with color-coded score badges:
- 🟢 Green — score ≥ 70 (healthy)
- 🟡 Yellow — score 40–69 (moderate)
- 🔴 Red — score < 40 (needs attention)

PhD percentage column is highlighted green if ≥ 50% (NAAC compliant) or red if below.

---

## Interpreting the Results

- **Score ≥ 70** — strong department with good publication output, qualified faculty, and active research supervision
- **Score 40–69** — performing adequately but with room for improvement in one or more areas
- **Score < 40** — significant gaps in one or more metrics. Review individual metric columns to identify where to focus

**Common patterns:**

- High score but low PhD % — department is productive but may fail NAAC compliance. Push for doctoral admissions or require faculty to pursue PhDs.
- Low score with high experience — experienced faculty not publishing. Consider publication incentives.
- Low active theses — department is not contributing to doctoral output. Review research supervision capacity.

---

## Departments with No Faculty

Departments with zero approved faculty return a score of 0 across all metrics. These appear at the bottom of the ranked list.
