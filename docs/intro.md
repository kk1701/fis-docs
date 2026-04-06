---
title: Introduction
sidebar_position: 1
---

# Faculty Information System (FIS)

FIS is a full-stack web application designed for academic institutions to manage faculty information, academic contributions, research output, and institutional analytics — all in one place.

---

## What is FIS?

FIS replaces scattered spreadsheets, manual records, and disconnected ERP modules with a unified platform where:

- **Faculty** manage their own academic profiles — qualifications, publications, research experience, courses taught, and thesis supervisions
- **Administrators** manage the institution's faculty roster, approve registrations, maintain department and course records, and generate institutional analytics reports
- **The public** can browse an open faculty directory and view published research reports from the institution

The application is built around a simple but important idea — the data a faculty member enters about themselves (their publications, research areas, experience, and supervision records) is the same data that powers the institution's analytics and public reporting. There is no double entry.

---

## Who is FIS for?

| User | Role |
|---|---|
| Faculty members | Register, maintain their academic profile, track their contributions |
| Department administrators | Approve faculty, manage departments and course catalogs |
| Institutional administrators | View analytics, generate reports, publish insights to the public |
| General public | Browse faculty profiles and view published institutional reports |

---

## Key Features

### For Faculty
- Complete academic profile management across 7 sections — personal information, academic profile, education history, courses taught, experience, publications, and thesis/dissertation supervisions
- Profile picture upload via Cloudinary
- Correspondence and permanent address management
- Self-service password reset via email OTP

### For Administrators
- Faculty registration approval workflow
- Department and course catalog management
- Faculty list with search, filters and CSV export
- Admin-controlled password reset for faculty accounts

### Analytics & Reports

FIS includes 8 institutional analytics reports — the primary differentiator of the platform over generic ERP systems:

| Report | What it shows |
|---|---|
| Research Domain Profiling | Which faculty are working in which research areas |
| Publication Trends | Year-wise publication output by category and indexing |
| Department Health Score | Composite academic health score per department |
| Faculty Research Momentum | Per-faculty score based on recent publication activity |
| Qualification Distribution | PhD compliance check per department (NAAC standard) |
| Experience Profile | Teaching, industrial, and research experience distribution |
| Course Load Analysis | Workload distribution and single-faculty course risks |
| Supervision Pipeline | Thesis and dissertation supervision activity |

All reports can be downloaded as PDF. Administrators can also publish selected reports to a public-facing page.

### Public Pages
- **Faculty Directory** — searchable, filterable list of all approved faculty with public profile pages
- **Research Reports** — admin-curated institutional reports visible to anyone without login
- **Landing Page** — public entry point linking the directory, reports, login, and registration

---

## Technology Overview

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| State Management | Zustand |
| Backend | NestJS, TypeScript |
| Database | PostgreSQL via Prisma ORM |
| Authentication | JWT (passport-jwt) |
| File Storage | Cloudinary |
| Email | Resend |
| Charts | Recharts |
| PDF Export | jsPDF + jsPDF-autotable |

---

## How to Navigate These Docs

| Section | What you will find |
|---|---|
| **Getting Started** | Set up the server and client locally |
| **User Roles & Permissions** | What each role can and cannot do |
| **Faculty Guide** | End-user documentation for faculty members |
| **Admin Guide** | End-user documentation for administrators |
| **Public Pages** | Documentation for public-facing features |
| **API Reference** | All backend endpoints with request and response details |
| **Database Schema** | Full ERD and model descriptions |
| **Analytics Reports Reference** | Detailed explanation of each report including data sources and formulas |
| **Security** | OTP flow, password reset, and authentication details |
| **Deployment** | How to deploy FIS to production |