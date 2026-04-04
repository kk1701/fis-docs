---
title: Education
sidebar_position: 4
---

# Education

The Education tab stores your complete academic qualification history — from 10th standard through to your doctoral degree and beyond.

---

## Qualification Levels

FIS supports the following qualification levels:

| Level | Description |
|---|---|
| 10th (Secondary) | Secondary school certificate |
| 12th (Senior Secondary) | Higher secondary certificate |
| Diploma | Diploma in any discipline |
| Graduation (UG) | Bachelor's degree |
| Post Graduation (PG) | Master's degree |
| Doctorate (PhD) | Doctoral degree |
| Other | Any other qualification not covered above |

---

## Adding a Qualification

1. Click **+ Add Qualification**
2. Select the qualification level by clicking one of the level buttons
3. Fill in the details:

| Field | Description | Required |
|---|---|---|
| Degree / Certificate Name | e.g. B.Tech, M.Tech, SSC, HSC | Yes |
| Specialization / Stream | e.g. Computer Science, Physics, Science | Yes |
| Institution / Board / University | e.g. MANIT Bhopal, CBSE, VTU | Yes |
| Year of Passing | The year you completed this qualification | Yes |
| Score | Your score or CGPA | No |
| Score Type | Percentage / CGPA (out of 10) / CGPA (out of 4) | No |
| Division / Grade | Distinction / First / Second / Third / Pass | No |

4. Click **Add**

---

## Duplicate Level Restriction

You can only have one record per qualification level, with the exception of **Diploma** and **Other** which allow multiple entries. If you try to add a second record for a level that already exists (e.g. two Graduation records), the system will reject it with a conflict error.

If you need to correct an existing record, use the **Edit** button instead.

---

## Editing a Qualification

Click **Edit** on any qualification card to open the form pre-filled with existing data. Make your changes and click **Update**.

:::info
You cannot change the qualification level when editing. If you selected the wrong level, delete the record and create a new one with the correct level.
:::

---

## Deleting a Qualification

Click **Delete** on any qualification card. You will be asked to confirm before the record is removed.

---

## How Qualifications are Displayed

Qualifications are displayed as a vertical timeline ordered by level — from 10th at the top to Doctorate at the bottom. Each entry shows:

- The qualification level icon and label
- Degree name
- Specialization
- Institution
- Year of passing
- Score and division (if provided)

---

## Relationship to Analytics

The Education tab feeds into the **Qualification Distribution** analytics report. The report checks whether faculty hold a Doctorate (`DOCTORATE` level) and calculates PhD percentage per department for NAAC compliance.
