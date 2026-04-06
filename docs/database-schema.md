---
title: Database Schema
sidebar_position: 9
---

# Database Schema

FIS uses PostgreSQL as its database, managed through Prisma ORM. This page documents the complete database schema — the Entity Relationship Diagram, all models and their fields, and the relationships between them.

---

## Entity Relationship Diagram

Click the diagram to open it in full resolution in a new tab where you can zoom into any part of the schema.

<a href="/img/ERD_svg.svg" target="_blank">
  <img src="/img/ERD_svg.svg" alt="FIS Database Schema ERD" style={{width: '100%', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '8px'}} />
</a>

---

## Models

### User

The central authentication model. Every person who logs into FIS — faculty or admin — has a `User` record.

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| email | String | Unique login identifier |
| passwordHash | String | bcrypt hashed password |
| role | UserRole | `ADMIN` or `FACULTY` |
| status | AccountStatus | `PENDING`, `APPROVED`, `REJECTED`, `SUSPENDED` |
| createdAt | DateTime | Registration timestamp |
| approvedAt | DateTime? | When the account was approved or rejected |
| deletedAt | DateTime? | Soft delete timestamp — null means active |
| approvedById | Int? | FK → User (self-reference to the admin who acted) |

**Relationships:**
- Has one optional `Faculty` record (1:1)
- Self-references `User` via `approvedById` — tracks which admin approved or rejected the account
- Has many `PublishedReport` records (admin role)

---

### Faculty

Stores all academic profile information for a faculty member. Always linked to exactly one `User`.

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| userId | Int | FK → User (unique — one faculty per user) |
| departmentId | Int | FK → Department |
| name | String | Faculty member's full name |
| dob | DateTime? | Date of birth |
| gender | Gender? | `MALE`, `FEMALE`, `OTHER` |
| nationality | String? | Nationality |
| category | String? | General, OBC, SC, ST, EWS |
| mobile | String? | Contact number |
| orcidId | String? | ORCID researcher ID (unique) |
| designation | String? | Current job title |
| specialization | String[] | Array of research/teaching specializations |
| joiningDate | DateTime? | Date of joining the institution |
| highestQualification | String? | Highest academic degree |
| experienceYears | Int? | Total years of experience |
| photoUrl | String? | Cloudinary URL of profile picture |
| createdAt | DateTime | Record creation timestamp |

**Relationships:**
- Belongs to one `User` (1:1)
- Belongs to one `Department` (many:1)
- Has many `Address` records
- Has many `Degree` records
- Has many `Experience` records
- Has many `Employment` records
- Has many `Courses` (teaching) records
- Has many `Publication` records
- Has many `ThesisSupervision` records
- Has many `DissertationSupervision` records
- Has many `Laboratory` records

---

### Department

Represents an academic department at the institution.

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| name | String | Full department name (unique) |
| code | String | Short code, e.g. CSE (unique) |

**Relationships:**
- Has many `Faculty` members
- Has many `Courses` (teaching records)
- Has many `CourseCatalog` entries

---

### Address

Stores correspondence or permanent address for a faculty member. A faculty member can have at most one address of each type enforced by a unique constraint.

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| facultyId | Int | FK → Faculty |
| type | AddressType | `CORRESPONDENCE` or `PERMANENT` |
| line1 | String | House/flat number and street |
| line2 | String? | Area or locality |
| line3 | String? | Landmark |
| district | String | District |
| state | String | State |
| country | String | Country |
| pin | String | PIN or postal code |

**Unique constraint:** `(facultyId, type)` — one address per type per faculty.

**Relationships:**
- Belongs to one `Faculty`

---

### Degree

Stores academic qualification records for a faculty member.

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| facultyId | Int | FK → Faculty |
| level | DegreeLevel | `TENTH`, `TWELFTH`, `DIPLOMA`, `GRADUATION`, `POST_GRADUATION`, `DOCTORATE`, `OTHER` |
| degreeName | String | Name of the degree or certificate |
| specialization | String | Subject or stream |
| institute | String | Institution, board, or university |
| yearOfPassing | Int | Year of completion |
| score | Float? | Score or CGPA |
| scoreType | String? | `PERCENTAGE`, `CGPA_10`, `CGPA_4` |
| division | String? | `DISTINCTION`, `FIRST`, `SECOND`, `THIRD`, `PASS` |

**Relationships:**
- Belongs to one `Faculty`

---

### Experience

Stores professional experience entries across four categories.

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| facultyId | Int | FK → Faculty |
| type | ExperienceType | `TEACHING`, `INDUSTRIAL`, `RESEARCH`, `ADMINISTRATIVE` |
| designation | String | Job title at this position |
| organization | String | Employer or institution name |
| natureOfWork | String | Description of responsibilities |
| payScale | String? | Pay level or scale |
| startDate | DateTime | Start date |
| endDate | DateTime? | End date — null means current position |
| location | String? | City and state |

**Relationships:**
- Belongs to one `Faculty`

---

### Employment

Stores formal employment records with organizational type and pay level details. Separate from Experience to capture structured employment history.

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| facultyId | Int | FK → Faculty |
| organization | String | Employer name |
| designation | String | Job title |
| natureOfWork | String | Nature of work |
| payLevel | String? | Pay level |
| organizationType | String | Type of organization |
| startDate | DateTime | Start date |
| endDate | DateTime? | End date |

**Relationships:**
- Belongs to one `Faculty`

---

### CourseCatalog

The central catalog of all courses offered by the institution. Managed by the admin. Faculty pick from this catalog when recording their teaching history.

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| departmentId | Int | FK → Department |
| name | String | Full course name |
| code | String | Course code (unique across catalog) |
| level | CourseLevel | `UG`, `PG`, `PHD` |
| credits | Int? | Number of credits |

**Relationships:**
- Belongs to one `Department`
- Has many `Courses` (teaching records) — tracks which faculty taught this course

---

### Courses

A faculty member's teaching record — one entry per course per semester per academic year. Links a `Faculty` to a `CourseCatalog` entry with metadata about the teaching context.

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| facultyId | Int | FK → Faculty |
| catalogCourseId | Int | FK → CourseCatalog |
| departmentId | Int | FK → Department (denormalized for query convenience) |
| semester | String | `ODD` or `EVEN` |
| academicYear | String | e.g. `2024-25` |
| role | String | `LECTURER`, `COORDINATOR`, `LAB` |
| hoursPerWeek | Int? | Weekly teaching hours |
| mode | String? | `THEORY` or `LAB` |
| notes | String? | Additional notes |
| createdAt | DateTime | Record creation timestamp |

**Relationships:**
- Belongs to one `Faculty`
- Belongs to one `CourseCatalog`
- Belongs to one `Department`

---

### Publication

Stores research publication records for a faculty member.

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| facultyId | Int | FK → Faculty |
| category | PublicationCategory | `JOURNAL`, `CONFERENCE`, `BOOK`, `BOOK_CHAPTER` |
| title | String | Publication title |
| authors | String[] | Array of author names |
| venue | String? | Journal or conference name |
| year | Int | Year of publication |
| publisher | String | Publisher name |
| isbn | String? | ISBN (for books) |
| edition | String? | Edition (for books) |
| indexing | PublicationIndexing | `SCI`, `SCOPUS`, `NONE` |
| doi | String? | Digital Object Identifier |
| url | String? | Link to publication |
| citation | String? | Full citation string |
| pages | String? | Page range |

**Relationships:**
- Belongs to one `Faculty`

---

### ThesisSupervision

Stores PhD thesis supervision records.

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| facultyId | Int | FK → Faculty |
| title | String | Full thesis title |
| researchArea | String | Primary research domain |
| year | Int | Year of submission or award |
| status | String | `Ongoing`, `Submitted`, `Completed`, `Awarded` |
| role | String | `Supervisor`, `Co-Supervisor`, `External Examiner` |

**Relationships:**
- Belongs to one `Faculty`

---

### DissertationSupervision

Stores PG (Master's level) dissertation supervision records.

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| facultyId | Int | FK → Faculty |
| title | String | Full dissertation title |
| specialization | String | Specialization area |
| year | Int | Year of completion |
| role | String | `Supervisor`, `Co-Supervisor`, `External Examiner` |

**Relationships:**
- Belongs to one `Faculty`

---

### Laboratory

Stores laboratory management records for a faculty member.

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| facultyId | Int | FK → Faculty |
| name | String | Laboratory name |
| level | CourseLevel | `UG`, `PG`, `PHD` |
| branch | String | Branch or discipline |

**Relationships:**
- Belongs to one `Faculty`

---

### OTP

Stores hashed one-time passwords for the password reset flow. Also reused to store short-lived reset tokens after OTP verification.

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| email | String | Email address the OTP was sent to |
| otpHash | String | bcrypt hash of the OTP or reset token |
| expiresAt | DateTime | Expiry timestamp |
| used | Boolean | Whether this OTP has been consumed |
| createdAt | DateTime | Creation timestamp |

**Index:** `email` — for fast lookup during verification.

**Note:** This model is not related to any other model via foreign key — it is keyed by email string only.

---

### PublishedReport

Stores snapshots of analytics reports published to the public page by the admin.

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| publishedById | Int | FK → User (the admin who published) |
| title | String | Custom title given by the admin |
| description | String? | Optional context for the public |
| reportType | String | Identifier string, e.g. `RESEARCH_DOMAINS` |
| data | Json | Full report data snapshot at time of publishing |
| isPublic | Boolean | Whether the report is visible on the public page |
| publishedAt | DateTime | When it was first published |
| updatedAt | DateTime | Last update timestamp |

**Relationships:**
- Belongs to one `User` (the publishing admin)

---

## Enums

| Enum | Values |
|---|---|
| UserRole | `ADMIN`, `FACULTY` |
| AccountStatus | `PENDING`, `APPROVED`, `REJECTED`, `SUSPENDED` |
| Gender | `MALE`, `FEMALE`, `OTHER` |
| AddressType | `CORRESPONDENCE`, `PERMANENT` |
| DegreeLevel | `TENTH`, `TWELFTH`, `DIPLOMA`, `GRADUATION`, `POST_GRADUATION`, `DOCTORATE`, `OTHER` |
| ExperienceType | `TEACHING`, `INDUSTRIAL`, `RESEARCH`, `ADMINISTRATIVE` |
| PublicationCategory | `JOURNAL`, `CONFERENCE`, `BOOK`, `BOOK_CHAPTER` |
| PublicationIndexing | `SCI`, `SCOPUS`, `NONE` |
| CourseLevel | `UG`, `PG`, `PHD` |

---

## Key Relationships Summary

```
User ──────────────── Faculty (1:1)
Faculty ────────────── Department (many:1)
Faculty ────────────── Address (1:many, max 2 — one per AddressType)
Faculty ────────────── Degree (1:many)
Faculty ────────────── Experience (1:many)
Faculty ────────────── Employment (1:many)
Faculty ────────────── Courses (1:many)
Faculty ────────────── Publication (1:many)
Faculty ────────────── ThesisSupervision (1:many)
Faculty ────────────── DissertationSupervision (1:many)
Faculty ────────────── Laboratory (1:many)
Department ─────────── CourseCatalog (1:many)
CourseCatalog ──────── Courses (1:many)
User ───────────────── User via approvedById (self-reference)
User ───────────────── PublishedReport (1:many, admin role)
```

---

## Design Notes

**Soft delete on User**
The `deletedAt` field allows users to be logically deleted without removing their data. All queries filter `deletedAt: null` to exclude deleted users. Faculty records and all their data remain intact.

**Faculty created at registration**
When a faculty registers, both the `User` and `Faculty` rows are created in a single Prisma transaction. This ensures there are never orphaned user accounts without a corresponding faculty profile.

**Denormalized departmentId on Courses**
The `Courses` model has its own `departmentId` in addition to inheriting it through `CourseCatalog`. This is intentional — it allows faster filtering of teaching records by department without a join through the catalog.

**OTP model uses email not userId**
The OTP model is intentionally not linked to the `User` model via foreign key. This allows OTP generation for any email — including before account creation or for unlinked flows — without requiring a user record to exist first.

**PublishedReport stores data as JSON**
The `data` field is a Prisma `Json` type (PostgreSQL `jsonb` column). This stores the complete analytics report output as a snapshot. The public always sees this fixed snapshot — not live data — giving the admin full control over publication timing and content.
