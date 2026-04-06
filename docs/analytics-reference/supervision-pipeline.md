---
title: Supervision Pipeline
sidebar_position: 8
---

# Supervision Pipeline

**Report type identifier:** `SUPERVISION_PIPELINE`

---

## What it Shows

The state of PhD thesis and PG dissertation supervision activity across the institution — broken down by department and status, with a leaderboard of top supervisors.

---

## Why it Matters

- Shows how actively the institution is producing research scholars — a key metric for research university rankings
- Identifies departments with high supervision load vs those with no supervision activity
- Tracks ongoing supervisions to anticipate when new PhD or PG scholars will complete
- Useful for identifying faculty who are strong research mentors vs those not contributing to research guidance
- NAAC and NIRF rankings reward institutions for PhD output — this report tracks that directly

---

## Data Sources

| Source | Fields Used |
|---|---|
| `ThesisSupervision` | `facultyId`, `status` |
| `DissertationSupervision` | `facultyId` |
| `Faculty` | `departmentId`, `name` |

---

## How it is Calculated

**Department data:**

For each department, thesis supervisions are counted by status — Ongoing, Submitted, Completed, Awarded. Dissertation supervisions are counted as a total without status breakdown (dissertations do not have a status field).

**Top supervisors:**

All approved faculty with at least one thesis or dissertation record are ranked by total supervision count (`theses + dissertations`). The top 10 are shown.

Active theses (status = `Ongoing`) are separately counted per faculty to show current supervision load.

---

## Output Structure

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

---

## Visualizations

**Stacked bar chart** — one bar per department showing thesis status breakdown (Ongoing, Submitted, Completed, Awarded) as stacked segments. Color coded:
- 🔴 Red — Ongoing (in progress)
- ⚫ Gray — Submitted (under evaluation)
- 🌑 Dark — Completed (result awaited)
- 🌫 Light gray — Awarded (degree conferred)

**Top supervisors table** — ranked list with thesis count, dissertation count, active theses badge, and total. Active theses are highlighted with an orange badge to show current workload.

---

## Interpreting the Results

**Department view:**
- **High Ongoing count** — department is actively producing research scholars. Good for research output metrics.
- **High Awarded count** — department has a strong history of successfully completing PhD programmes.
- **Zero across all statuses** — department has no research supervision activity. May be a teaching-only department or an area that needs encouragement to engage in doctoral programmes.
- **High Submitted, low Awarded** — theses are being submitted but may be facing evaluation delays. Worth investigating.

**Top supervisors:**
- Faculty at the top with high active theses counts are carrying significant supervision load. Monitor to ensure quality of supervision is not compromised.
- Faculty with high total but zero active — experienced supervisors who have stepped back from active supervision. Could be encouraged to take on new scholars.
- Faculty with zero supervision records — either genuinely not supervising, or have not entered their records. Encourage record completion.

---

## Dissertation vs Thesis

In FIS, these are treated as separate record types:

| Type | Level | Has Status Field |
|---|---|---|
| ThesisSupervision | PhD (Doctoral) | Yes — Ongoing, Submitted, Completed, Awarded |
| DissertationSupervision | PG (Master's) | No — just role and year |

The pipeline chart focuses on thesis status because doctoral output is the more significant institutional metric. Dissertation counts are shown separately in the department table and supervisor leaderboard.
