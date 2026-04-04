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
      items: ["admin-guide/approvals"],
    },
    {
      type: "category",
      label: "API Reference",
      collapsed: true,
      items: ["api-reference/auth"],
    },
    {
      type: "category",
      label: "Analytics Reference",
      collapsed: true,
      items: ["analytics-reference/research-domains"],
    },
  ],
};

export default sidebars;
