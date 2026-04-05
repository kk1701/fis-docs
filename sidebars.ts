import type { SidebarsConfig } from "@docusaurus/types";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    "intro",
    "architecture",
    "getting-started",
    "roles-permissions",
    {
      type: "category",
      label: "Faculty Guide",
      items: [
        "faculty-guide/registration",
        "faculty-guide/personal-info",
        "faculty-guide/academic-profile",
        "faculty-guide/education",
        "faculty-guide/courses",
        "faculty-guide/experience",
        "faculty-guide/publications",
        "faculty-guide/supervision",
      ],
    },
    {
      type: "category",
      label: "Admin Guide",
      items: [
        "admin-guide/approvals",
        "admin-guide/departments-courses",
        "admin-guide/faculty-management",
        "admin-guide/analytics",
        "admin-guide/publishing-reports",
      ],
    },
    "public-pages",
    {
      type: "category",
      label: "API Reference",
      collapsed: true,
      items: [
        "api-reference/auth",
        "api-reference/faculty-profile",
        "api-reference/faculty-education",
        "api-reference/faculty-courses",
        "api-reference/faculty-experiences",
        "api-reference/faculty-publications",
        "api-reference/faculty-supervision",
        "api-reference/departments",
        "api-reference/courses",
        "api-reference/approvals",
        "api-reference/admin",
        "api-reference/analytics",
        "api-reference/published-reports",
      ],
    },
    "database-schema",
    {
      type: "category",
      label: "Analytics Reports Reference",
      collapsed: true,
      items: [
        "analytics-reference/research-domains",
        "analytics-reference/publication-trends",
        "analytics-reference/department-health",
        "analytics-reference/research-momentum",
        "analytics-reference/qualification-distribution",
        "analytics-reference/experience-profile",
        "analytics-reference/course-load",
        "analytics-reference/supervision-pipeline",
      ],
    },
  ],
};

export default sidebars;
