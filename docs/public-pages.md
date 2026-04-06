---
title: Public Pages
sidebar_position: 7
---

# Public Pages

FIS has three public-facing pages accessible to anyone without login. These pages form the institutional presence of FIS — what the outside world sees.

---

## Landing Page

**URL:** `/`

The landing page is the entry point to FIS. It introduces the platform and links to all major public sections.

### Sections

**Navbar**
Fixed at the top with links to:
- Faculty Directory
- Research Reports
- Login
- Register

**Hero**
The main headline section with two call-to-action buttons — Explore Faculty Directory and Faculty Login — and three feature highlight cards covering Academic Profiles, Smart Analytics, and Public Reports.

**Features Grid**
Six feature cards describing what FIS offers — complete profiles, publication records, department management, teaching history, public directory, and institutional analytics.

**CTA Strip**
A dark section with three actions — Create Faculty Account, Browse Directory, and View Reports.

**Footer**
Links to Directory, Reports, Login, and Register.

---

## Faculty Directory

**URL:** `/directory`

The faculty directory is a public searchable listing of all approved faculty members at the institution.

### Search and Filters

| Control | Description |
|---|---|
| Search bar | Search by faculty name — results update after a short delay as you type |
| Department filter | Filter by a specific department |
| Clear filters | Removes all active filters and resets the list |

The total count of faculty matching the current filters is shown next to the filter controls.

### Faculty Cards

Each faculty card displays:
- Profile photo (or initial avatar if no photo)
- Name
- Designation
- Department
- Specialization tags (up to 2 shown, with a +N badge for more)
- Publication count
- Course count
- Years of experience (if provided)

Clicking a card opens the faculty's public profile page.

### Pagination

Results are paginated at 12 per page. Use the Prev and Next buttons to navigate.

---

## Public Faculty Profile

**URL:** `/directory/:id`

Clicking a faculty card opens their full public profile page.

### Profile Header

Displayed against a dark background:
- Profile photo or initial avatar
- Department label
- Name
- Designation
- Highest qualification
- Years of experience
- ORCID link (if provided)
- Specialization tags

### Profile Tabs

The public profile has up to 5 tabs depending on what data the faculty has entered:

| Tab | What it shows |
|---|---|
| Overview | Education history and quick stats (publications, courses, experience, theses) |
| Courses | Teaching history with course name, code, level, semester, year, and role |
| Experience | All experience entries grouped by type with date range and location |
| Publications | All publications with authors, venue, year, indexing badge, DOI and URL links |
| Thesis | Thesis supervisions with research area, year, role, and status (only shown if records exist) |

### Data Not Shown Publicly

The following fields are intentionally excluded from public profiles:

- Mobile number
- Date of birth
- Addresses
- Category (General/OBC/SC/ST/EWS)
- Pay scale

---

## Public Research Reports

**URL:** `/reports`

The public reports page lists all analytics reports published by the admin.

### Report Cards

Each card displays:
- Report type icon
- Report type label (e.g. Publication Trends)
- Custom title given by the admin
- Description (if provided)
- Publication date
- View Report link

### Filters

Filter chips at the top allow filtering by report type — only types that have at least one published report appear as filter options.

### Empty State

If no reports have been published yet, a message is shown indicating that reports will appear here when the administration publishes them.

---

## Public Report Detail

**URL:** `/reports/:id`

Clicking a report card opens the full report page with charts rendered from the stored data snapshot.

### Page Structure

**Header**
Dark background showing:
- Report type icon and label
- Custom title
- Description (if provided)
- Publication date

**Download PDF button**
Generates a PDF of the report's tabular data.

**Charts and Tables**
Each report type renders its own appropriate charts and data tables. The charts are identical to what the admin sees in the Analytics section — rendered from the stored JSON snapshot.

### Chart Types by Report

| Report | Visualizations |
|---|---|
| Research Domains | Horizontal bar chart + expandable domain detail table |
| Publication Trends | Stacked bar chart by category + line chart by indexing + summary cards |
| Department Health | Bar chart of scores + detailed metrics table |
| Research Momentum | Bar chart of top faculty + leaderboard table |
| Qualification Distribution | Donut chart + department compliance table |
| Experience Profile | Summary cards + grouped bar chart by department |
| Course Load | Bar chart by hours + single-faculty course risk list |
| Supervision Pipeline | Stacked bar chart by status + top supervisors table |

:::info
Public report data is a fixed snapshot taken when the admin published the report. It does not update automatically. The admin must publish a new snapshot to reflect newer data.
:::
