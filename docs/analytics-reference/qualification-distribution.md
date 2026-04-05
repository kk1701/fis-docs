---
title: Qualification Distribution
sidebar_position: 5
---

# Qualification Distribution

**Report type identifier:** `QUALIFICATION_DISTRIBUTION`

---

## What it Shows

The breakdown of highest academic qualifications held by faculty across the institution and per department — with a specific focus on PhD (Doctorate) percentage as a compliance metric against NAAC accreditation standards.

---

## Why it Matters

- NAAC accreditation requires a minimum of 50% PhD-qualified faculty per department — this report shows compliance status at a glance
- Helps prioritise hiring — departments below 50% PhD can be targeted for doctoral-qualified recruitment
- Gives a picture of the overall academic qualification depth of the institution
- Useful for grant applications that require faculty qualification statistics

---

## Data Sources

| Source | Fields Used |
|---|---|
| `Degree` | `level`, `facultyId` |
| `Faculty` | `highestQualification` |

Each faculty member is categorised into one qualification tier — the highest they hold. A faculty member with both a Graduation and Doctorate degree is counted only in the Doctorate tier.

---

## Qualification Tiers

Faculty are categorised as follows:

| Tier | Condition |
|---|---|
| Doctorate | Has a `Degree` record with `level = DOCTORATE` OR `highestQualification` contains "phd" |
| Post Graduation | Has `level = POST_GRADUATION` (and no Doctorate) |
| Graduation | Has `level = GRADUATION` (and no higher) |
| Other | Has only Diploma, Tenth, Twelfth, or Other level records |

---

## NAAC Compliance Check

A department is marked **Compliant** if its PhD percentage is ≥ 50%.

```
phdPercent = (phdCount / totalFaculty) × 100
compliant = phdPercent >= 50
```

---

## Output Structure

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

`deptBreakdown` is sorted by `phdPercent` descending — most compliant departments appear first.

---

## Visualizations

**Donut chart** — institution-wide breakdown by qualification tier with percentage labels. Shows the overall qualification profile at a glance.

**Department compliance table** — one row per department showing total faculty, PhD count, PG count, UG count, PhD percentage, and a compliance badge:
- ✓ Compliant — green badge (PhD % ≥ 50)
- ✗ Below 50% — red badge

---

## Interpreting the Results

- **All departments compliant** — the institution meets NAAC baseline qualification requirements
- **One or two non-compliant departments** — target these specifically in the next hiring cycle with PhD-qualified candidates
- **Many non-compliant departments** — a systemic issue requiring institution-level policy — PhD incentive programmes, sponsored doctoral admissions for existing faculty, or a hiring freeze on non-PhD candidates

---

## Improving Accuracy

Faculty must enter their degree records in the Education tab for this report to be fully accurate. Faculty who have a PhD but have not entered it in the Education tab will only be counted if they have also set their `highestQualification` field in the Academic Profile tab to a value containing "phd".

Encourage all faculty to complete both sections for best data quality.
