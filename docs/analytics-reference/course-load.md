---
title: Course Load Analysis
sidebar_position: 7
---

# Course Load Analysis

**Report type identifier:** `COURSE_LOAD`

---

## What it Shows

Two complementary views of teaching workload — a ranking of faculty by total teaching hours per week, and a list of courses that only one faculty member is teaching (single-faculty courses).

---

## Why it Matters

- Identifies overloaded faculty who may need course load relief or additional support
- Identifies underutilised faculty who could take on more teaching
- Highlights single-faculty courses — a risk because if that faculty member leaves, falls ill, or goes on leave, no one else can cover the course
- Useful for timetable planning and workload balancing at the start of each semester
- Provides data for faculty appraisal discussions

---

## Data Sources

| Source | Fields Used |
|---|---|
| `Courses` | `facultyId`, `catalogCourseId`, `hoursPerWeek`, `academicYear` |
| `Faculty` | `name`, `departmentId` |
| `CourseCatalog` | `name`, `code` |

---

## How it is Calculated

**Faculty load ranking:**

For each faculty member, the system sums:
- `totalCourses` — count of course teaching records
- `totalHours` — sum of `hoursPerWeek` across all records

Faculty are ranked by `totalHours` descending. The top 15 are shown in the chart.

**Single-faculty course risks:**

For each unique course in the catalog, the count of faculty who have a teaching record for it is calculated. Any course with `facultyCount ≤ 1` is flagged as a risk.

---

## Academic Year Filter

Unlike most other reports, Course Load Analysis supports filtering by academic year. Use the input field to enter a year like `2024-25` to see load data for that specific year only. Without a filter, all teaching records across all years are included.

For workload planning purposes, always filter to the current academic year.

---

## Output Structure

```json
{
  "facultyRanking": [
    {
      "name": "Dr. John Doe",
      "department": "Computer Science",
      "totalCourses": 5,
      "totalHours": 18
    }
  ],
  "courseRisks": [
    {
      "name": "Advanced Algorithms",
      "code": "CS501",
      "facultyCount": 1
    }
  ]
}
```

`facultyRanking` is limited to top 15. `courseRisks` contains all courses with `facultyCount ≤ 1`.

---

## Visualizations

**Bar chart** — top faculty by total hours per week. Faculty names abbreviated to last name on axis, full name in tooltip.

**Risk list** — highlighted cards for single-faculty courses showing course name and code with an orange warning style.

---

## Interpreting the Results

**Faculty load:**
- Faculty at the top of the chart with significantly more hours than average may be overloaded — consider redistributing courses
- Faculty with 0 hours (not in the chart) have no `hoursPerWeek` data entered — either they have no course records or they have not filled in the hours field
- The chart shows teaching load only — it does not account for research, administrative, or supervisory workload

**Course risks:**
- Any course with `facultyCount = 0` means the course exists in the catalog but no faculty have any teaching record for it — the course may be inactive or newly added
- Any course with `facultyCount = 1` should have a backup faculty identified. Consider cross-training or co-teaching arrangements

---

## Notes on Data Completeness

The `hoursPerWeek` field is optional in the course teaching record. Faculty who have course records but have not entered hours will appear as 0 hours and will not feature prominently in the ranking chart even if they have a heavy load. Encourage faculty to fill in this field for accurate reporting.
