---
title: Analytics
sidebar_position: 4
---

# Analytics

The Analytics section provides 8 institutional reports derived from faculty data. These reports are the primary differentiator of FIS — they transform raw faculty records into actionable institutional insights.

---

## Accessing Analytics

Click **Analytics** in the admin sidebar. The page opens with 8 horizontal tabs — one per report.

---

## Available Reports

| Tab | Report Name | What it answers |
|---|---|---|
| Research Domains | Research Domain Profiling | Which faculty are working in which research areas? |
| Publication Trends | Publication Trends | How has publication output changed over the years? |
| Dept Health Score | Department Health Score | How academically healthy is each department? |
| Research Momentum | Faculty Research Momentum | Which faculty are most actively publishing right now? |
| Qualifications | Qualification Distribution | Are departments meeting PhD compliance requirements? |
| Experience Profile | Experience Profile | What types of experience does the faculty have? |
| Course Load | Course Load Analysis | Who is carrying the most teaching load? |
| Supervision Pipeline | Supervision Pipeline | What is the state of thesis and dissertation supervisions? |

Detailed documentation for each report — including data sources, formulas, and interpretation — is in the [Analytics Reports Reference](../analytics-reference/research-domains) section.

---

## Common Controls

Every report tab has two action buttons in the top-right corner:

### Download PDF

Generates a PDF of the current report data — including all charts and tables — and downloads it to your device. The PDF is generated client-side using jsPDF and includes:

- FIS header with report title
- Generation date
- All data tables from the report

Charts are not currently included in the PDF — only the tabular data. The PDF is suitable for sharing in meetings or attaching to institutional reports.

### Publish to Public Page

Opens a modal to publish the current report as a snapshot to the public reports page. See [Publishing Reports](./publishing-reports) for the full workflow.

---

## Data Freshness

All analytics reports query live data from the database every time you open the tab. There is no caching — the numbers always reflect the current state of faculty records.

This means:
- If a faculty member adds a new publication, it appears in the Publication Trends report immediately on the next page load
- If a faculty member's account is approved, they are included in all reports immediately

---

## Report-specific Filters

Some reports have additional filters:

| Report | Filter |
|---|---|
| Research Momentum | Department — filter by a specific department |
| Course Load | Academic Year — filter by a specific academic year, e.g. 2024-25 |

---

## Interpreting the Reports

Each report in the Analytics Reference section explains:

- What data it uses
- How scores or groupings are calculated
- What the output means
- How to act on the insights

Start with the [Department Health Score](../analytics-reference/department-health) report for an institution-wide view, then drill down into specific reports for more detail.
