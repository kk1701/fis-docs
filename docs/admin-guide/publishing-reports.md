---
title: Publishing Reports
sidebar_position: 5
---

# Publishing Reports

The admin can publish selected analytics reports to a public-facing page visible to anyone without login. This page explains the full publishing workflow — from publishing a report to managing it after publication.

---

## What is a Published Report?

A published report is a **snapshot** of an analytics report at a specific point in time. When you publish a report:

- The current data from that report is saved to the database as JSON
- A title and optional description are stored alongside the data
- The report appears on the public reports page at `/reports`
- The public sees the fixed snapshot — not live data

This means you have full control over what the public sees and when. Publishing a new snapshot of the same report type creates a separate entry — the old one remains until you delete it.

---

## Publishing a Report

1. Go to **Analytics** in the admin sidebar
2. Open the report tab you want to publish
3. Click **🌐 Publish** in the top-right corner
4. A modal appears with two fields:
   - **Report Title** — pre-filled with the report name. Customise it to add context, e.g. "Research Domain Analysis — April 2026"
   - **Description** — optional. Add context for the public about what this report shows or why it was published
5. Click **🌐 Publish to Public Page**
6. A success message confirms the report has been published

:::info
The data snapshot is taken at the moment you click Publish. If faculty update their records after you publish, the published report will not change. Publish a new snapshot to reflect updated data.
:::

---

## Managing Published Reports

Click **Published Reports** in the admin sidebar. The page shows all reports you have published, ordered from newest to oldest.

### Report Card

Each published report card shows:

- A colored left border — green if public, gray if hidden
- Report type icon and label
- Custom title you gave it
- Description (if provided)
- Current visibility status — 🌐 Public or 🔒 Hidden
- Publication date

### Hiding and Showing a Report

Click **Hide** on a public report to make it invisible to the public without deleting it. The report remains in your list but is no longer accessible at `/reports`.

Click **Make Public** on a hidden report to restore its visibility.

This is useful when you want to temporarily remove a report — for example, if the underlying data is being corrected — without losing the published entry.

### Editing a Report

Click **Edit** on any report card to update its title or description. You cannot update the underlying data of a published report — publish a new snapshot instead.

### Deleting a Report

Click **Delete** on any report card. You will be asked to confirm. Deletion is permanent — the published report and its data snapshot are removed from the database.

---

## Viewing the Public Reports Page

Click **View public page →** at the top-right of the Published Reports page to open `/reports` in a new tab and preview exactly what the public sees.

---

## Public Reports Page

The public page at `/reports` shows:

- All published reports where `isPublic = true`
- Report cards with title, type label, description, and publication date
- Filter chips to filter by report type
- Click any card to open the full report with charts

The public can view charts rendered from the stored snapshot data and download a PDF of the tabular data.

---

## Publishing Strategy

Some recommendations for publishing reports effectively:

**Publish at key institutional milestones**
Publish reports at the start or end of each semester, before accreditation visits, or after a significant hiring period so the public sees current and relevant data.

**Add descriptive titles**
Instead of the default "Department Health Score", use something like "Department Health Score — Academic Year 2025-26" so multiple published snapshots of the same report type are distinguishable.

**Use descriptions for context**
Add a brief description explaining what the data shows and any relevant context — for example, "This report reflects publication data as of March 2026 and includes 47 approved faculty members across 6 departments."

**Hide before deleting**
If you are unsure whether to keep a report, hide it first. You can always make it public again. Deletion is permanent.
