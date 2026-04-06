---
title: Departments & Courses
sidebar_position: 2
---

# Departments & Courses

The admin manages the institution's department structure and course catalog. These are foundational records — departments and courses must exist before faculty can register and build their profiles.

---

## Departments

### Accessing Departments

Click **Departments** in the admin sidebar. The page lists all departments in a table with their name, code, and counts of faculty and courses linked to them.

### Creating a Department

1. Click **+ Add Department**
2. Fill in:
   - **Name** — full department name, e.g. Computer Science and Engineering
   - **Code** — short identifier, e.g. CSE
3. Click **Add**

Both name and code must be unique across all departments. If either already exists, the system returns a conflict error.

### Editing a Department

Click **Edit** on any department row. The form opens pre-filled. Update the name or code and click **Update**.

:::warning
Changing a department's name or code updates it everywhere it is referenced — in faculty profiles, course catalog, and public directory.
:::

### Deleting a Department

Click **Delete** on any department row. You will be asked to confirm.

:::warning
A department cannot be deleted if any faculty members are assigned to it. Reassign or remove all faculty from the department before deleting it.
:::

---

## Course Catalog

The course catalog is the central list of all courses offered by the institution. Faculty pick from this catalog when recording their teaching history.

### Accessing the Course Catalog

Click **Courses** in the admin sidebar. The page lists all courses with their name, code, department, level, credits, and how many faculty have taught them.

### Filtering Courses

Use the filters at the top to narrow down the list:

- **Department** — show courses from a specific department
- **Level** — show UG, PG, or PhD courses only

### Creating a Course

1. Click **+ Add Course**
2. Fill in:

| Field | Description | Required |
|---|---|---|
| Name | Full course name, e.g. Data Structures and Algorithms | Yes |
| Code | Course code, e.g. CS301 | Yes |
| Department | Select the owning department | Yes |
| Level | UG / PG / PHD | Yes |
| Credits | Number of credits | No |

3. Click **Add**

Course codes must be unique across the entire catalog.

### Editing a Course

Click **Edit** on any course row. You can update the name, credits, and level. The course code and department cannot be changed after creation — delete and recreate if needed.

### Deleting a Course

Click **Delete** on any course row. You will be asked to confirm.

:::warning
A course cannot be deleted if any faculty members have teaching records linked to it. Ask the relevant faculty to remove those records first, or handle it directly in the database.
:::

---

## Recommended Setup Order

When setting up FIS for the first time, follow this order:

1. Create all departments
2. Create all courses linked to those departments
3. Announce the registration URL to faculty
4. Faculty register and select their department
5. Approve faculty accounts from the Approvals page
