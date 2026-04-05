---
title: Faculty Management
sidebar_position: 3
---

# Faculty Management

The Faculty section gives the admin a complete view of all faculty accounts in the system with filtering, search, and management actions.

---

## Accessing the Faculty List

Click **Faculty** in the admin sidebar. The page shows a paginated table of all faculty accounts.

---

## Faculty Table Columns

| Column | Description |
|---|---|
| Name | Faculty member's name and email |
| Department | Their assigned department |
| Status | APPROVED / PENDING / REJECTED / SUSPENDED |
| Publications | Total number of publication records |
| Courses | Total number of course teaching records |
| Joined | Account registration date |
| Actions | Reset Password button |

---

## Filtering the Faculty List

Use the filter controls at the top of the page:

- **Status** — filter by APPROVED, PENDING, REJECTED, or SUSPENDED
- **Department** — filter by a specific department

Filters apply immediately. The total count at the top updates to reflect the filtered result.

---

## Pagination

Results are paginated at 10 per page. Use the **Prev** and **Next** buttons at the bottom of the table to navigate between pages. The current page and total pages are shown between the buttons.

---

## Resetting a Faculty Password

The admin can reset any faculty member's password directly — useful when a faculty member cannot access their email for the OTP reset flow.

1. Find the faculty member in the list
2. Click **Reset Password** in the Actions column
3. A modal appears with a password input field
4. Enter the new password (minimum 6 characters)
5. Click **Reset Password**
6. A success message confirms the reset
7. Communicate the new password to the faculty member through a secure channel

:::warning
There is no email notification sent when an admin resets a password. You must inform the faculty member manually.
:::

---

## Exporting Faculty Data

The admin dashboard provides a CSV export of all faculty data.

1. Go to **Dashboard** in the sidebar
2. Click **⬇ Export Faculty CSV** in the top-right of the dashboard
3. The browser downloads a file named `faculty-export.csv`

The CSV includes the following columns:

| Column | Description |
|---|---|
| userId | Internal user ID |
| name | Faculty name |
| email | Registered email |
| status | Account status |
| designation | Current designation |
| mobile | Mobile number |
| highestQualification | Highest qualification |
| experienceYears | Years of experience |
| joiningDate | Date of joining |
| department | Department name |
| departmentCode | Department code |
| totalPublications | Count of publications |
| totalExperiences | Count of experience records |
| totalCoursesTaught | Count of course records |
| registeredAt | Account creation date |
| approvedAt | Date of approval |

You can also export a filtered subset by applying status or department filters before exporting — the export respects the current filters.

---

## System Stats Dashboard

The Dashboard page (`/admin/dashboard`) provides a quick overview of the institution:

| Metric | Description |
|---|---|
| Total Faculty | All faculty accounts excluding deleted |
| Approved | Accounts with APPROVED status |
| Pending | Accounts awaiting approval |
| Rejected | Accounts that were rejected |
| Total Courses | Total courses in the catalog |
| Departments | Total number of departments |

These stats update in real time based on the current database state.

---

## Viewing a Faculty Profile

The admin can view any faculty member's complete profile by using the API endpoint `GET /faculty/:id/profile`. There is currently no dedicated admin profile view page in the UI — this is accessible via direct API call or Prisma Studio during administration.
