---
title: Faculty Research Momentum
sidebar_position: 4
---

# Faculty Research Momentum

**Report type identifier:** `RESEARCH_MOMENTUM`

---

## What it Shows

A per-faculty momentum score that measures how actively a faculty member is currently publishing. Faculty with recent, high-quality publications score higher than those with older or unindexed output.

---

## Why it Matters

- Identifies the most research-active faculty at any given time — useful for nominating faculty for grants, awards, or collaborations
- Distinguishes faculty who published heavily in the past from those actively publishing now
- Useful for performance reviews and research incentive programmes
- Helps identify faculty who may need research support or mentoring

---

## Data Sources

| Source | Fields Used |
|---|---|
| `Publication` | `year`, `indexing` |
| `Faculty` | `name`, `designation`, `departmentId` |

---

## Scoring Formula

For each publication, a score contribution is calculated as:

```
contribution = indexing_weight × recency_weight
```

**Indexing weights:**

| Indexing | Weight |
|---|---|
| SCI | 3 |
| SCOPUS | 2 |
| NONE | 1 |

**Recency weights** (based on years since publication):

| Age | Weight |
|---|---|
| Current year (0 years ago) | 1.0 |
| 1 year ago | 0.8 |
| 2 years ago | 0.6 |
| 3 years ago | 0.4 |
| 4+ years ago | 0.2 |

**Total momentum score = sum of contributions across all publications, rounded to 1 decimal place.**

---

## Example Calculation

A faculty member has 3 publications:

| Year | Indexing | Age | Indexing Weight | Recency Weight | Contribution |
|---|---|---|---|---|---|
| 2025 | SCI | 0 | 3 | 1.0 | 3.0 |
| 2024 | SCOPUS | 1 | 2 | 0.8 | 1.6 |
| 2020 | NONE | 5 | 1 | 0.2 | 0.2 |

**Total momentum score = 3.0 + 1.6 + 0.2 = 4.8**

---

## Output Structure

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

`recentPublications` counts publications from the last 3 years. Sorted by `momentumScore` descending.

---

## Department Filter

The report can be filtered by department using the dropdown above the chart. This is useful for comparing faculty within a single department without the noise of institution-wide rankings.

---

## Visualizations

**Bar chart** — top 12 faculty by momentum score. Faculty names are abbreviated to last name on the chart axis, with full name shown in the tooltip.

**Leaderboard table** — full ranked list with rank badge (gold for #1, silver for #2, bronze for #3), name, department, total publications, recent publications, and momentum score.

---

## Interpreting the Results

- **High score with high recent count** — actively publishing faculty. Strong candidates for research leadership roles.
- **High score with low recent count** — faculty with strong historical output but declining recent activity. May need research support.
- **Low score with high total publications** — faculty who published heavily in the past but not recently, or primarily in unindexed venues.
- **Low score with low total** — faculty who are not publishing. May be early-career or in primarily teaching roles.

---

## Score is Relative, Not Absolute

There is no fixed "good" or "bad" threshold for momentum score — it is a ranking tool, not an absolute measure. A score of 5.0 may be excellent in a department where most faculty score below 2.0, or average in a research-intensive department where scores of 10+ are common.

Use this report to identify relative leaders and laggards within a cohort, not to make absolute judgements.
