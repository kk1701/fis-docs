---
title: Publication Trends
sidebar_position: 2
---

# Publication Trends

**Report type identifier:** `PUBLICATION_TRENDS`

---

## What it Shows

Year-wise publication output across the entire institution, broken down by publication category (Journal, Conference, Book, Book Chapter) and indexing quality (SCI, Scopus, None).

---

## Why it Matters

- Shows whether research output is growing, stagnating, or declining over time
- Tracks the quality shift — are publications moving toward higher-indexed venues?
- Essential for NAAC and NBA accreditation where annual publication counts are a key performance metric
- Helps set targets for upcoming academic years
- Identifies high-output years that can be correlated with institutional events (new hires, research grants, etc.)

---

## Data Sources

| Source | Fields Used |
|---|---|
| `Publication` | `year`, `category`, `indexing` |

All publications from all approved faculty are included. There is no department filter — this is an institution-wide view.

---

## How it is Calculated

Publications are grouped by year. For each year, counts are computed for:

- Total publications
- Each category: `JOURNAL`, `CONFERENCE`, `BOOK`, `BOOK_CHAPTER`
- Each indexing level: `SCI`, `SCOPUS`, `NONE`

A summary object totals all publications across all years for each indexing level.

---

## Output Structure

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

## Visualizations

**Summary cards** — four cards showing total publications, SCI count, Scopus count, and others at a glance.

**Stacked bar chart (By Category)** — each bar represents a year, divided into Journal, Conference, Book, and Book Chapter segments.

**Line chart (By Indexing)** — three lines tracking SCI, Scopus, and unindexed publications per year. Switch between views using the toggle buttons above the chart.

---

## Interpreting the Results

- **Rising total with flat SCI/Scopus lines** — output is growing but quality is not improving. Focus on encouraging faculty to target indexed venues.
- **Flat total with rising SCI line** — quality is improving even if quantity is not. A positive trend.
- **Dip in a specific year** — may correlate with a batch of retirements, reduced hiring, or institutional disruptions.
- **High NONE count** — a large proportion of unindexed publications may indicate faculty are publishing in non-peer-reviewed or low-quality venues.

---

## Improving the Data Quality

- Faculty should enter all publications, not just recent ones, for historical trend accuracy
- Indexing must be set correctly — publications default to `NONE` if the faculty does not set it
- Encourage faculty to update indexing status if a publication's index status changes after entry
